import React from 'react'
import { Link } from 'react-router-dom'
import { Sauna } from '../../entities/Sauna'

export type SaunaCardProps = {
    sauna: Sauna.Response
}

const PLACEHOLDER_LINK =
    'https://u.profitroom.pl/2018-hotel-burgblick-com/thumb/1650x600/uploads/Sauna/pool-3001209_1920.jpg'

const SaunaCard = (props: SaunaCardProps) => {
    return (
        <div className="grid gap-4">
            <h2 className="text-2xl font-extrabold text-gray-900">{props.sauna.name}</h2>
            <div>
                <img src={PLACEHOLDER_LINK /* TODO: add correct link */} alt={'props.alt'} />
            </div>
            <div>
                <Link to="/">LINK</Link>
                <p className="text-gray-500">{props.sauna.description}</p>
            </div>
        </div>
    )
}

export default SaunaCard
