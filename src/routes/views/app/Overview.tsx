import React from 'react'
import SaunaImage from '../../../components/base/SaunaImage'
const imgLink1 = "https://u.profitroom.pl/2018-hotel-burgblick-com/thumb/1650x600/uploads/Sauna/pool-3001209_1920.jpg"

const Overview = () => {
  return (
        <div className='ml-16 mr-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <SaunaImage name='Karhu' imgLink={imgLink1} description='KARHU SAUNA TEXT' refLink='GoTO' />
            <SaunaImage name='Puola' imgLink={imgLink1} description='PUOLA SAUNA TEXT' refLink='GoTO' />
            <SaunaImage name='Telta' imgLink={imgLink1} description='TELTA SAUNA TEXT' refLink='GoTO' />
        </div>
      )
}
export default Overview
