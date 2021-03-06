import { useNavigate, useParams } from 'react-router-dom'
import { parseId } from '../../../utils/identifiable'
import SaunaEditor from '../../../components/saunas/SaunaEditor'
import { useEffect, useState } from 'react'
import api from '../../../networking/api'
import { Sauna } from '../../../entities/Sauna'
import { useAlert } from '../../shared/AlertProvider'
import SaunaImageEditor from '../../../components/saunas/SaunaImageEditor'
import SaunaImageUploader from '../../../components/saunas/SaunaImageUploader'
import { SaunaImage } from '../../../entities/SaunaImage'
import PageTitle from '../../../components/base/PageTitle'
import Subtitle from '../../../components/base/Subtitle'

const SaunaEditorView = () => {
    const params = useParams()
    const saunaId = parseId(params['saunaId'])
    const navigate = useNavigate()

    const [sauna, setSauna] = useState<Sauna.Request>(Sauna.emptyRequest())
    const [images, setImages] = useState<SaunaImage.Response[]>([])

    useEffect(() => {
        let loaded = true
        if (saunaId) {
            api.sauna.get(saunaId).then(response => loaded && setSauna(Sauna.mapToRequest(response)))
            fetchImages()
        }
        return () => {
            loaded = false
        }
    }, [saunaId])

    const { success } = useAlert()
    const submit = () => {
        if (saunaId)
            api.sauna.edit(saunaId, sauna).then(() => {
                success('Die Sauna wurde erfolgreich gespeichert.')
                navigate(`/saunas/${saunaId}`)
            })
        else
            api.sauna.add(sauna).then(addedSauna => {
                success('Die Sauna wurde erfolgreich erstellt.')
                navigate(`/saunas/${addedSauna.id}/edit`)
            })
    }

    const deleteSauna = () => {
        if (saunaId)
            api.sauna.remove(saunaId).then(() => {
                success('Die Sauna wurde gelöscht.')
                navigate('/saunas')
            })
    }

    const fetchImages = () => {
        saunaId && api.saunaImages.list(saunaId).then(setImages)
    }

    const uploadImages = async (files: File[]) => {
        if (saunaId) await api.saunaImages.add(saunaId, files)
        success('Die Bilder wurden erfolgreich hochgeladen.')
        fetchImages()
    }

    const removeImage = async (image: SaunaImage.Response) => {
        await api.saunaImages.remove(image.id)
        success('Das Bild wurde erfolgreich gelöscht.')
        fetchImages()
    }

    return (
        <div data-testid="sauna-editor-view">
            <PageTitle>{saunaId == null ? 'Sauna erstellen' : 'Sauna bearbeiten'}</PageTitle>
            <div className={'grid gap-8 grid-cols-1 ' + (saunaId ? 'lg:grid-cols-2' : '')}>
                <div className="space-y-4">
                    <Subtitle>Informationen</Subtitle>
                    <SaunaEditor
                        value={sauna}
                        onChange={setSauna}
                        onSubmit={submit}
                        showDelete={saunaId != null}
                        onDelete={deleteSauna}
                    />
                </div>
                {saunaId && (
                    <div className="space-y-4">
                        <Subtitle>Bilder</Subtitle>
                        {images.length > 0 && (
                            <SaunaImageEditor className="mb-4" images={images} onRemove={removeImage} />
                        )}
                        <SaunaImageUploader onSubmit={uploadImages} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SaunaEditorView
