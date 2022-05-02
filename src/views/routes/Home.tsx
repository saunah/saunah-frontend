import { useEffect, useState } from 'react'
import PageTitle from '../../components/base/PageTitle'
import SaunaImageCarousel from '../../components/saunas/SaunaImageCarousel'
import { SaunaImage } from '../../entities/SaunaImage'
import api from '../../networking/api'

const Home = () => {
    const [images, setImages] = useState<SaunaImage.Response[]>([])

    useEffect(() => {
        api.saunaImages.list(1).then(setImages)
    }, [])

    return (
        <div>
            <PageTitle> Schönes Sauna Karusell </PageTitle>
            <SaunaImageCarousel images={images} />
        </div>
    )
}

export default Home
