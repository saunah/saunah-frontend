import SaunaDetail from '../../../components/saunas/SaunaDetail'
import api from '../../../networking/api'
import React, { useEffect, useState } from 'react'
import { Sauna } from '../../../entities/Sauna'
import { parseId } from '../../../utils/identifiable'
import { useParams } from 'react-router-dom'
import SaunaImageCarousel from '../../../components/saunas/SaunaImageCarousel'
import { SaunaImage } from '../../../entities/SaunaImage'
import PageTitle from '../../../components/base/PageTitle'

const SaunaDetailView = () => {
    const params = useParams()
    const saunaId = parseId(params['saunaId'])

    const [sauna, setSauna] = useState<Sauna.Response>()
    const [images, setImages] = useState<SaunaImage.Response[]>([])

    useEffect(() => {
        if (saunaId) {
            api.sauna.get(saunaId).then(setSauna)
            api.saunaImages.list(saunaId).then(setImages)
        }
    }, [saunaId])

    return (
        <div className="space-y-4" data-testid={'sauna-detail-view'}>
            <PageTitle>{sauna?.name}</PageTitle>
            <SaunaImageCarousel images={images} />
            {sauna && <SaunaDetail sauna={sauna} />}
        </div>
    )
}

export default SaunaDetailView
