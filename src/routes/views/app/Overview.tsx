import React from 'react'
import SaunaImage from '../../../components/base/SaunaImage'

const Overview = () => {
  return (
        <div className='flex justify'>
            <SaunaImage name='Karhu' imgLink='imgLink1' description='KARHU SAUNA TEXT' refLink='GoTO' />
            <SaunaImage name='Puola' imgLink='imgLink2' description='PUOLA SAUNA TEXT' refLink='GoTO' />
            <SaunaImage name='Telta' imgLink='imgLink3' description='TELTA SAUNA TEXT' refLink='GoTO' />
        </div>
      )
}
export default Overview
