import React, { useEffect, useState } from 'react'
import SaunaCard from '../../components/saunas/SaunaCard'
import { Sauna } from '../../entities/Sauna'
import api from '../../networking/api'

const Overview = () => {

    const [saunas, setSaunas] = useState<Sauna.Response[]>([])

    const getSaunas = () => {
        api.sauna.list().then(setSaunas)
      }

    useEffect(() =>{
        getSaunas()
    },[])

    return (
        <div data-testid="overviewTID" className="ml-16 mr-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
             {saunas.map(sauna => <SaunaCard sauna={sauna}/>)}
        </div>
    )
}
export default Overview
