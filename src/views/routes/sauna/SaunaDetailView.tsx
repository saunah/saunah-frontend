import SaunaDetail from '../../../components/saunas/SaunaDetail'
import api from '../../../networking/api'
import { useEffect, useState } from 'react'
import { Sauna } from '../../../entities/Sauna'
import { parseId } from '../../../utils/identifiable'
import { useParams } from 'react-router-dom'
import SaunaCaledar from '../../../components/saunas/SaunaCalendar'
import SaunaImageCarousel from '../../../components/saunas/SaunaImageCarousel'
import { SaunaImage } from '../../../entities/SaunaImage'
import PageTitle from '../../../components/base/PageTitle'
import ButtonLink from '../../../components/base/ButtonLink'
import { useAuth } from '../../shared/AuthProvider'
import Subtitle from '../../../components/base/Subtitle'

const SaunaDetailView = () => {
    const params = useParams()
    const saunaId = parseId(params['saunaId'])
    const { isAdmin } = useAuth()

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
            <div className="space-y-4" data-testid={'sauna-detail-view'}>
                <PageTitle>
                    <div className="flex justify-between">
                        <span>{sauna?.name}</span>
                        {isAdmin() && <ButtonLink to="./edit">Sauna bearbeiten</ButtonLink>}
                    </div>
                </PageTitle>
                <SaunaImageCarousel images={images} />
                {sauna && <SaunaDetail sauna={sauna} />}
                {sauna?.googleCalendarId && (
                    <div>
                        <Subtitle>Verfügbarkeit</Subtitle>
                        <SaunaCaledar googleCalendarId={sauna.googleCalendarId} />
                    </div>
                )}
            </div>
            <div className="mt-6">
                <ButtonLink to="./book">Buchung anfragen</ButtonLink>
            </div>
        </div>
    )
}

export default SaunaDetailView
