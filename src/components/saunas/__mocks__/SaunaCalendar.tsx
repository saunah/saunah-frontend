import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import deLocale from '@fullcalendar/core/locales/de'

function SaunaCalendar(_props: SaunaCalendarProps) {
    return (
        <div data-testid="sauna-calendar" className="sauna-calendar py-4">
            <FullCalendar
                plugins={[dayGridPlugin]}
                events={{}}
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
