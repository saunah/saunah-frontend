import { Sauna } from '../../entities/Sauna'
import Input from '../base/Input'

export type SaunaEditorProps = {
    value: Sauna.Request
    onChange?: (newValue: Sauna.Request) => void
    onSubmit?: () => void
}

const SaunaEditor = (props: SaunaEditorProps) => {
    const sauna = props.value

    return (
        <div className="space-y-2">
            <Input
                name="Name"
                value={sauna.name}
                onChange={newValue => props.onChange?.({ ...sauna, name: newValue })}
            />
            <Input
                name="Beschreibung"
                value={sauna.description}
                onChange={newValue => props.onChange?.({ ...sauna, description: newValue })}
            />
            <Input
                name="Preis"
                value={'' + sauna.price}
                type="number"
                onChange={newValue => props.onChange?.({ ...sauna, price: +newValue })}
            />
            <Input
                name="Maximale Temperatur"
                value={'' + sauna.maxTemp}
                type="number"
                onChange={newValue => props.onChange?.({ ...sauna, maxTemp: +newValue })}
            />
            <Input
                name="Anzahl Personen"
                value={'' + sauna.numberOfPeople}
                type="number"
                onChange={newValue => props.onChange?.({ ...sauna, numberOfPeople: +newValue })}
            />
            <Input
                name="Adresse"
                value={sauna.street}
                onChange={newValue => props.onChange?.({ ...sauna, street: newValue })}
            />
            <Input name="PLZ" value={sauna.zip} onChange={newValue => props.onChange?.({ ...sauna, zip: newValue })} />
            <Input
                name="Ort"
                value={sauna.location}
                onChange={newValue => props.onChange?.({ ...sauna, location: newValue })}
            />
        </div>
    )
}

export default SaunaEditor
