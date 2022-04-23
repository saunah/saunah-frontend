import { useParams } from 'react-router-dom'
import { parseId } from '../../../utils/identifiable'
import SaunaEditor from '../../../components/saunas/SaunaEditor'
import { useEffect, useState } from 'react'
import api from '../../../networking/api'
import { Sauna } from '../../../entities/Sauna'
import { useAlert } from '../../shared/AlertProvider'

const SaunaEditorView = () => {
    const params = useParams()
    const saunaId = parseId(params['saunaId'])

    const [sauna, setSauna] = useState<Sauna.Request>(Sauna.emptyRequest())

    useEffect(() => {
        if (saunaId) api.sauna.get(saunaId).then(sauna => setSauna(Sauna.mapToRequest(sauna)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { success } = useAlert()
    const submit = async () => {
        if (saunaId) api.sauna.edit(saunaId, sauna).then(() => success('Die Sauna wurde erfolgreich gespeichert.'))
        else await api.sauna.add(sauna).then(() => success('Die Sauna wurde erfolgreich erstellt.'))
    }

    return (
        <div>
            <h1 className="font-semibold text-2xl mb-4">{saunaId == null ? 'Sauna erstellen' : 'Sauna bearbeiten'}</h1>
            <SaunaEditor value={sauna} onChange={setSauna} onSubmit={submit} />
        </div>
    )
}

export default SaunaEditorView
