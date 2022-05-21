import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import deLocale from '@fullcalendar/core/locales/de'
import './SaunaCalendar.css'
import { useMemo } from 'react'

function SaunaCalendar({ googleCalendarId }: SaunaCalendarProps) {
    const memorizedEvents = useMemo(() => {
        return { googleCalendarId }
    }, [])

    return (
        <div data-testid="sauna-calendar" className="sauna-calendar">
            <FullCalendar
                plugins={[dayGridPlugin, googleCalendarPlugin]}
                googleCalendarApiKey={process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY}
                events={memorizedEvents}
                eventDataTransform={function (event) {
                    event.url = ''
                    return event
                }}
                eventDisplay="block"
                displayEventTime={true}
                displayEventEnd={true}
                initialView="dayGridMonth"
                height="auto"
                locale={deLocale}
                weekends={true}
            />
        </div>
    )
}

export default SaunaCalendar

export type SaunaCalendarProps = {
    googleCalendarId: string
}
