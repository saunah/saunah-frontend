import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SaunaImageCarousel from '../../../components/saunas/SaunaImageCarousel'
import { Sauna } from '../../../entities/Sauna'
import { SaunaImage } from '../../../entities/SaunaImage'
import api from '../../../networking/api'
import { parseId } from '../../../utils/identifiable'

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
        <div>
            <span>Details für {sauna?.name} </span>
            <SaunaImageCarousel images={images} />
        </div>
    )
}

export default SaunaDetailView
