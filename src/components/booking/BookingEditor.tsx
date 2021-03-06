import { Booking } from '../../entities/Booking'
import { Sauna } from '../../entities/Sauna'
import { CheckableNumber } from '../../entities/CheckableNumber'
import CheckboxLabel from '../base/CheckboxLabel'
import Input from '../base/Input'
import { ModifiableDate } from '../../entities/ModifiableDate'
import Subtitle from '../base/Subtitle'

export type BookingEditorProps = {
    value: Booking.Request
    sauna?: Sauna.Response
    onChange?: (newValue: Booking.Request) => void
    isEditingAsAdmin?: boolean
}

const BookingEditor = (props: BookingEditorProps) => {
    const booking = props.value
    const saunaLocation = props.sauna ? `${props.sauna?.street}, ${props.sauna?.zip} ${props.sauna?.location}` : ''

    const onChange = (newValue: Booking.Request) => props.onChange?.(newValue)

    function updateChecked(newValue: boolean, key: keyof CheckableNumber.Extract<Booking.Request>) {
        onChange({ ...booking, [key]: { number: booking[key].number, checked: newValue } })
    }

    function updateNumber(newValue: string, key: keyof CheckableNumber.Extract<Booking.Request>) {
        onChange({ ...booking, [key]: { checked: booking[key].checked, number: newValue } })
    }

    function updateDate(newValue: string, key: keyof ModifiableDate.Extract<Booking.Request>) {
        onChange({ ...booking, [key]: { time: booking[key].time, date: newValue } })
    }

    function updateTime(newValue: string, key: keyof ModifiableDate.Extract<Booking.Request>) {
        onChange({ ...booking, [key]: { date: booking[key].date, time: newValue } })
    }

    return (
        <div data-testid="booking-editor" className="space-y-6">
            <div className="grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2">
                <Input
                    name="Startdatum"
                    type="date"
                    value={booking.startBookingDate.date}
                    max={booking.endBookingDate.date}
                    onChange={newValue => updateDate(newValue, 'startBookingDate')}
                />
                <Input
                    name="Startzeit"
                    type="time"
                    value={booking.startBookingDate.time || ''}
                    onChange={newValue => updateTime(newValue, 'startBookingDate')}
                />
                <Input
                    name="Enddatum"
                    type="date"
                    min={booking.startBookingDate.date}
                    value={booking.endBookingDate.date}
                    onChange={newValue => updateDate(newValue, 'endBookingDate')}
                />
                <Input
                    name="Endzeit"
                    type="time"
                    value={booking.endBookingDate.time || ''}
                    onChange={newValue => updateTime(newValue, 'endBookingDate')}
                />
                <Input
                    name="Wunschort der Sauna"
                    value={booking.location}
                    onChange={newValue => props.onChange?.({ ...booking, location: newValue })}
                />
                <Input
                    name="Bemerkungen"
                    value={booking.comment || ''}
                    onChange={newValue => props.onChange?.({ ...booking, comment: newValue })}
                />

                {props.isEditingAsAdmin && (
                    <>
                        <Input
                            name="Preisreduktion"
                            type="number"
                            value={booking.discount}
                            onChange={newValue => props.onChange?.({ ...booking, discount: newValue })}
                        />
                        <Input
                            name="Bemerkung zur Preisanpassung"
                            value={booking.discountDescription || ''}
                            onChange={newValue => props.onChange?.({ ...booking, discountDescription: newValue })}
                        />
                    </>
                )}
            </div>
            <div>
                <Subtitle className="mb-4"> Extras hinzuf??gen </Subtitle>
                <div className="grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2">
                    <CheckboxLabel
                        label="Transportservice"
                        details="Die Sauna wird direkt an Ihren Wunschort geliefert. Der Preis berechnet sich aus den Anzahl Kilometer vom Lagerplatz der Sauna zu Ihrem Wunschort."
                        value={booking.transportService.checked}
                        onChange={newValue => updateChecked(newValue, 'transportService')}
                    />
                    <div className="space-y-2">
                        <Input
                            name="Kilometer zum Wunschplatz"
                            type="number"
                            min="0"
                            disabled={!booking.transportService.checked}
                            value={booking.transportService.number}
                            onChange={newValue => updateNumber(newValue, 'transportService')}
                        />
                        <p
                            className={`text-sm ${
                                booking.transportService.checked ? 'text-primary-500' : 'text-primary-300'
                            }`}
                        >
                            Der Lagerplatz der Sauna befindet sich in
                            <span
                                className={`font-medium ${
                                    booking.transportService.checked ? 'text-primary-700' : 'text-primary-300'
                                }`}
                            >
                                {' '}
                                {saunaLocation}
                            </span>
                            .
                        </p>
                    </div>
                    <CheckboxLabel
                        label="Handt??cher"
                        details="Frische Handt??cher f??r die Saunag??nge. Der Preis wird pro Handtuch berechnet."
                        value={booking.handTowel.checked}
                        onChange={newValue => updateChecked(newValue, 'handTowel')}
                    />
                    <Input
                        name="Anzahl Handt??cher"
                        type="number"
                        min="0"
                        disabled={!booking.handTowel.checked}
                        value={booking.handTowel.number}
                        onChange={newValue => updateNumber(newValue, 'handTowel')}
                    />
                    <CheckboxLabel
                        label="Holzkisten"
                        details="Eine Holzkiste versorgt den Holzofen f??r mehrere Stunden. Der Preis wird pro Holzkiste berechnet."
                        value={booking.wood.checked}
                        onChange={newValue => updateChecked(newValue, 'wood')}
                    />
                    <Input
                        name="Anzahl Holzkisten"
                        type="number"
                        min="0"
                        disabled={!booking.wood.checked}
                        value={booking.wood.number}
                        onChange={newValue => updateNumber(newValue, 'wood')}
                    />
                    <CheckboxLabel
                        label="Saunawichtel"
                        details="Der Saunawichtel verw??hnt Sie mit einer perfekten Saunatemperatur und besonderen Aufg??sse. Der Preis wird pro Stunde berechnet."
                        value={booking.saunahImp.checked}
                        onChange={newValue => updateChecked(newValue, 'saunahImp')}
                    />
                    <Input
                        name="Stunden Saunawichtel"
                        type="number"
                        min="0"
                        disabled={!booking.saunahImp.checked}
                        value={booking.saunahImp.number}
                        onChange={newValue => updateNumber(newValue, 'saunahImp')}
                    />
                    <div className="md:col-span-2">
                        <CheckboxLabel
                            label="Waschservice"
                            details="Die Sauna wird nach Ihrem Aufenthalt f??r Sie gereinigt."
                            value={booking.washService}
                            onChange={newValue => props.onChange?.({ ...booking, washService: newValue })}
                        />
                    </div>
                    {props.isEditingAsAdmin && (
                        <div className="md:col-span-2">
                            <CheckboxLabel
                                label="Depot"
                                details="Der Benutzer zahlt das definierte Depot f??r diese Buchung."
                                value={booking.deposit}
                                onChange={newValue => props.onChange?.({ ...booking, deposit: newValue })}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookingEditor
