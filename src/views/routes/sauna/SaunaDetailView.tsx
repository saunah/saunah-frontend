import SaunaDetail from '../../../components/saunas/SaunaDetail'
import api from '../../../networking/api'
import React, { useEffect, useState } from 'react'
import { Sauna } from '../../../entities/Sauna'
import { parseId } from '../../../utils/identifiable'
import { useParams } from 'react-router-dom'
import SaunaImageCarousel from '../../../components/saunas/SaunaImageCarousel'
import { SaunaImage } from '../../../entities/SaunaImage'

const SaunaDetailView = () => {
    const params = useParams()
    const saunaId = parseId(params['saunaId'])

    const [sauna, setSauna] = useState<Sauna.Request>()
    const [images, setImages] = useState<SaunaImage.Response[]>([])

    useEffect(() => {
        if (saunaId) {
            api.sauna.get(saunaId).then(setSauna)
            api.saunaImages.list(saunaId).then(setImages)
        }
    }, [saunaId])

    return (
        <div className="ml-16 mr-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <span>Details für {sauna?.name} </span>
            <SaunaImageCarousel images={images} />
            <SaunaDetail sauna={sauna} />
        </div>
    )
}

export default SaunaDetailView
