import { Sauna } from '../../entities/Sauna'
import Button from '../base/Button'
import CheckboxLabel from '../base/CheckboxLabel'
import Input from '../base/Input'

export type SaunaEditorProps = {
    value: Sauna.Request
    onChange?: (newValue: Sauna.Request) => void
    onSubmit?: () => void
}

const SaunaEditor = (props: SaunaEditorProps) => {
    const sauna = props.value

    return (
        <div className="space-y-2" data-testid="sauna-editor">
            <Input
                name="Name"
                data-testid="input-name"
                value={sauna.name}
                onChange={newValue => props.onChange?.({ ...sauna, name: newValue })}
            />
            <Input
                name="Beschreibung"
                data-testid="input-description"
                value={sauna.description}
                onChange={newValue => props.onChange?.({ ...sauna, description: newValue })}
            />
            <Input
                name="Art"
                data-testid="input-type"
                value={sauna.type}
                onChange={newValue => props.onChange?.({ ...sauna, type: newValue })}
            />
            <Input
                name="Preis"
                data-testid="input-price"
                value={'' + sauna.price}
                type="number"
                onChange={newValue => props.onChange?.({ ...sauna, price: +newValue })}
            />
            <Input
                name="Maximale Temperatur"
                data-testid="input-maxTemp"
                value={'' + sauna.maxTemp}
                type="number"
                onChange={newValue => props.onChange?.({ ...sauna, maxTemp: +newValue })}
            />
            <Input
                name="Anzahl Personen"
                data-testid="input-numberOfPeople"
                value={'' + sauna.numberOfPeople}
                type="number"
                onChange={newValue => props.onChange?.({ ...sauna, numberOfPeople: +newValue })}
            />
            <Input
                name="Adresse"
                data-testid="input-street"
                value={sauna.street}
                onChange={newValue => props.onChange?.({ ...sauna, street: newValue })}
            />
            <Input
                name="PLZ"
                data-testid="input-zip"
                value={'' + sauna.zip}
                type="number"
                onChange={newValue => props.onChange?.({ ...sauna, zip: +newValue })}
            />
            <Input
                name="Ort"
                data-testid="input-location"
                value={sauna.location}
                onChange={newValue => props.onChange?.({ ...sauna, location: newValue })}
            />
            <CheckboxLabel
                data-testid="input-mobile"
                label="Mobil"
                details="Die Sauna ist mobil und kann abgeholt oder geliefert werden."
                value={sauna.mobile}
                onChange={newValue => props.onChange?.({ ...sauna, mobile: newValue })}
            />
            <Button title="Speichern" data-testid="submit-button" onClick={props.onSubmit} />
        </div>
    )
}

export default SaunaEditor
