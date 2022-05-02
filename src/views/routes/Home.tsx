import { useEffect, useState } from 'react'
import PageTitle from '../../components/base/PageTitle'
import SaunaImageCarousel from '../../components/saunas/SaunaImageCarousel'
import { SaunaImage } from '../../entities/SaunaImage'
import api from '../../networking/api'

const Home = () => {
    return (
        <div data-testid="home">
            <PageTitle> This is home </PageTitle>
        </div>
    )
}

export default Home
