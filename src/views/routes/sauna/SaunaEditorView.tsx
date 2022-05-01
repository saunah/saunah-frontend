import { useParams } from 'react-router-dom'
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

const SaunaEditorView = () => {
    const params = useParams()
    const saunaId = parseId(params['saunaId'])

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
    const submit = async () => {
        if (saunaId) api.sauna.edit(saunaId, sauna).then(() => success('Die Sauna wurde erfolgreich gespeichert.'))
        else await api.sauna.add(sauna).then(() => success('Die Sauna wurde erfolgreich erstellt.'))
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
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-medium text-primary-700 mb-4"> Informationen </h2>
                    <SaunaEditor value={sauna} onChange={setSauna} onSubmit={submit} />
                </div>
                <div>
                    <h2 className="text-xl font-medium text-primary-700 mb-4"> Bilder </h2>
                    {images.length > 0 && <SaunaImageEditor className="mb-4" images={images} onRemove={removeImage} />}
                    <SaunaImageUploader onSubmit={uploadImages} />
                </div>
            </div>
        </div>
    )
}

export default SaunaEditorView
