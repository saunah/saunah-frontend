import SaunaDetail from '../../../components/saunas/SaunaDetail'
import api from '../../../networking/api'
import React, { useEffect, useState } from 'react'
import { Sauna } from '../../../entities/Sauna'
import { parseId } from '../../../utils/identifiable'
import { useParams } from 'react-router-dom'

const SaunaDetailView = () => {
    const [saunaDetail, setSaunaDetail] = useState<Sauna.Request>(Sauna.emptyRequest())
    const params = useParams()
    const saunaId = parseId(params['saunaId'])

    const getSaunaDetail = () => {
        if (saunaId != null) {
            api.sauna.get(saunaId).then(setSaunaDetail)
        }
    }

    useEffect(() => {
        getSaunaDetail()
    })

    return (
        <div
            data-testid={'sauna-detail-view'}
            className="ml-16 mr-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
            <SaunaDetail sauna={saunaDetail} />
        </div>
    )
}
export default SaunaDetailView
