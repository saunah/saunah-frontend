import React from 'react'
import { Sauna } from '../../entities/Sauna'

export type SaunaDetailProps = {
    sauna: Sauna.Request
}

const PLACEHOLDER_LINK =
    'https://u.profitroom.pl/2018-hotel-burgblick-com/thumb/1650x600/uploads/Sauna/pool-3001209_1920.jpg'

const SaunaDetail = (props: SaunaDetailProps) => {
    return (
        <div className="grid gap-4" data-testid="sauna-detail">
            <h2 data-testid="title" className="text-2xl font-extrabold text-gray-900">
                {props.sauna.name}
            </h2>
            <div>
                <img src={PLACEHOLDER_LINK /* TODO: add correct link */} alt={'props.alt'} />
            </div>
            <div>
                <p data-testid="description" className="text-gray-500">
                    {props.sauna.description}
                </p>
            </div>
        </div>
    )
}

export default SaunaDetail
