import React from 'react'
import { Sauna } from '../../entities/Sauna'

export type SaunaDetailProps = {
    sauna: Sauna.Response
    ['data-testid']?: string
}

const SaunaDetail = (props: SaunaDetailProps) => {
    return (
        <div className="grid gap-4" data-testid={props['data-testid'] || 'sauna-detail'}>
            <h2 data-testid="title" className="text-3xl font-bold text-primary-600 mb-2">
                {props.sauna.name}
            </h2>
            <div>
                <p data-testid="description" className="text-gray-900">
                    {props.sauna.description}
                </p>
            </div>
            <div className="text-primary-900 grid gap-8 grid-cols-2">
                <div>
                    <div>Preis:</div>
                    <div>Max. Temperatur:</div>
                    <div>Anzahl Personen:</div>
                    <div>Hauptstandort:</div>
                    <div>Art der Sauna:</div>
                </div>
                <div>
                    <div>{props.sauna.price} CHF</div>
                    <div>{props.sauna.maxTemp} °C</div>
                    <div>{props.sauna.numberOfPeople}</div>
                    <div>
                        {props.sauna.zip} {props.sauna.location}
                    </div>
                    <div>{props.sauna.type}</div>
                </div>
            </div>
        </div>
    )
}

export default SaunaDetail
