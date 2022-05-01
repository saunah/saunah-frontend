import React, { useState } from 'react'
import SaunaCard from '../../components/saunas/SaunaCard'
import { Sauna } from '../../entities/Sauna'
import api from '../../networking/api'

// Change Hardcoded SaunaTypes
const Telta: Sauna.Response = {
    id: 1,
    name: 'Telta',
    description: 'Dies ist eine Zeltsauna.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: 8400,
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

const Karhu: Sauna.Response = {
    id: 2,
    name: 'Karhu',
    description: 'Dies ist ein Saunawagen.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: 8400,
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

const Puola: Sauna.Response = {
    id: 3,
    name: 'Puola',
    description: 'Dies ist ein Saunawagen.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: 8400,
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

const Overview = () => {

    const [saunas, setSaunas] = useState<Sauna.Response[]>([])

    const getSaunas = () => {
        api.sauna.list().then(setSaunas)
      }

    return (
        <div data-testid="overviewTID" className="ml-16 mr-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <SaunaCard sauna={Puola} />
            <SaunaCard sauna={Karhu} />
            <SaunaCard sauna={Telta} />
            
        </div>
    )
}
export default Overview
