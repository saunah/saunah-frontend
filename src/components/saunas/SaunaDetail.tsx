import React from 'react'
import { Sauna } from '../../entities/Sauna'
import { formatPrice } from '../../utils/format'
import List, { ListItem } from '../base/List'
import Subtitle from '../base/Subtitle'

export type SaunaDetailProps = {
    sauna: Sauna.Response
    ['data-testid']?: string
}

const SaunaDetail = (props: SaunaDetailProps) => {
    const listItems: ListItem[] = [
        { title: 'Art der Sauna', text: props.sauna.type },
        { title: 'Preis pro Stunde', text: formatPrice(props.sauna.price) },
        { title: 'Maximale Temperatur', text: `${props.sauna.maxTemp} °C` },
        { title: 'Anzahl Personen', text: `${props.sauna.numberOfPeople} Personen` },
        { title: 'Addresse', text: props.sauna.street },
        { title: 'Ort', text: `${props.sauna.zip} ${props.sauna.location}` },
    ]

    return (
        <div className="space-y-4" data-testid={props['data-testid'] || 'sauna-detail'}>
            <div>
                <Subtitle className="mb-1">Beschreibung der Sauna</Subtitle>
                <p data-testid="description" className="text-primary-700">
                    {props.sauna.description}
                </p>
            </div>
            <div>
                <Subtitle>Informationen</Subtitle>
                <List items={listItems} />
            </div>
        </div>
    )
}

export default SaunaDetail
