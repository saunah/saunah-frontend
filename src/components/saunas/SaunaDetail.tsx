import React from 'react'
import { Sauna } from '../../entities/Sauna'

export type SaunaDetailProps = {
    sauna: Sauna.Response
    ['data-testid']?: string
}

const SaunaDetail = (props: SaunaDetailProps) => {
    return (
        <div className="grid gap-4" data-testid={props['data-testid'] ||'sauna-detail'}>
            <h2 data-testid="title" className="text-2xl font-extrabold text-gray-900">
                {props.sauna.name}
            </h2>
            <div>
                <p data-testid="description" className="text-gray-500">
                    {props.sauna.description}
                </p>
            </div>
        </div>
    )
}

export default SaunaDetail
