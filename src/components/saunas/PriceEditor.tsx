import { Price } from '../../entities/Price'
import Button from '../base/Button'
import Input from '../base/Input'

export type PriceEditorProps = {
    value: Price.Request
    onChange?: (newValue: Price.Request) => void
    onSubmit?: () => void
}

const PriceEditor = (props: PriceEditorProps) => {
    const price = props.value

    return (
        <div data-testid="price-editor">
            <div className="space-y-2">
                <div>
                    <Input
                        name="Preis pro Kilometer"
                        data-testid="input-transportService"
                        placeholder="Preis in CHF"
                        type="number"
                        value={price.transportService}
                        onChange={newValue => props.onChange?.({ ...price, transportService: newValue })}
                    />
                    <p className="mt-1 text-sm text-primary-500">
                        Der Preis sollte so berechnet sein, dass er für jeden Kilometer zweimal den Hin- und Rückweg
                        beinhaltet.
                    </p>
                </div>
                <Input
                    name="Reinigunsservice"
                    data-testid="input-washService"
                    type="number"
                    placeholder="Preis in CHF"
                    value={price.washService}
                    onChange={newValue => props.onChange?.({ ...price, washService: newValue })}
                />
                <Input
                    name="Saunawichtel"
                    data-testid="input-saunahImp"
                    type="number"
                    placeholder="Preis in CHF"
                    value={price.saunahImp}
                    onChange={newValue => props.onChange?.({ ...price, saunahImp: newValue })}
                />
                <Input
                    name="Depot"
                    data-testid="input-deposit"
                    type="number"
                    placeholder="Preis in CHF"
                    value={price.deposit}
                    onChange={newValue => props.onChange?.({ ...price, deposit: newValue })}
                />
                <Input
                    name="Preis pro Handtuch"
                    data-testid="input-handTowel"
                    placeholder="Preis in CHF"
                    type="number"
                    value={price.handTowel}
                    onChange={newValue => props.onChange?.({ ...price, handTowel: newValue })}
                />
                <Input
                    name="Preis für Holz"
                    data-testid="input-wood"
                    placeholder="Preis in CHF"
                    type="number"
                    value={price.wood}
                    onChange={newValue => props.onChange?.({ ...price, wood: newValue })}
                />
            </div>
            <Button className="mt-6" title="Speichern" data-testid="submit-button" onClick={props.onSubmit} />
        </div>
    )
}

export default PriceEditor
