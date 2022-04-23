import { useParams } from 'react-router-dom'

import { parseId } from '../../../utils/identifiable'
import SaunaEditor from '../../../components/saunas/SaunaEditor'
import { useEffect, useState } from 'react'
import api from '../../../networking/api'
import { Sauna } from '../../../entities/Sauna'

const SaunaEditorView = () => {
    const params = useParams()
    const saunaId = parseId(params['saunaId'])

    const [sauna, setSauna] = useState<Sauna.Request>(Sauna.emptyRequest())

    useEffect(() => {
        if (saunaId) api.sauna.get(saunaId).then(sauna => setSauna(Sauna.mapToRequest(sauna)))
    }, [])

    return (
        <div>
            <SaunaEditor sauna={sauna} />
        </div>
    )
}

export default SaunaEditorView
