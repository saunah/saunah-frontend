import React from 'react'
import SaunaCard from '../../../components/saunas/SaunaCard'
import { Sauna } from '../../../entities/Sauna'

const imgLink1 = "https://u.profitroom.pl/2018-hotel-burgblick-com/thumb/1650x600/uploads/Sauna/pool-3001209_1920.jpg"

// Change Hardcoded SaunaTypes 
const Telta : Sauna = {
  name : 'Telta',
  imgLink : imgLink1,
  description : 'TELTA SAUNA TEXT',
}
const Karhu : Sauna = {
  name : 'Karhu',
  imgLink : imgLink1,
  description : 'KARHU SAUNA TEXT',
}
const Puola : Sauna = {
  name : 'Puola',
  imgLink : imgLink1,
  description : 'PUOLA SAUNA TEXT',
}

const Overview = () => {

  return (
        <div data-testid="overviewTID" className='ml-16 mr-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <SaunaCard sauna={Puola}/>
            <SaunaCard sauna={Karhu}/>
            <SaunaCard sauna={Telta}/>
        </div>
      )
}
export default Overview
