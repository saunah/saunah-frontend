import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/base/PageTitle'
import SaunaCard from '../../components/saunas/SaunaCard'
import { Sauna } from '../../entities/Sauna'
import api from '../../networking/api'

const Overview = () => {
    const [saunas, setSaunas] = useState<Sauna.Response[]>([])

    useEffect(() => {
        api.sauna.list().then(setSaunas)
    }, [])

    return (
        <div>
            <PageTitle>Unsere Saunas</PageTitle>
            <div data-testid="overviewTID" className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {saunas.map(sauna => (
                    <SaunaCard sauna={sauna} />
                ))}
            </div>
        </div>
    )
}
export default Overview
