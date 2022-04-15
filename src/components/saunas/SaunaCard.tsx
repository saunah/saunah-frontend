import React from 'react'
import { Sauna } from '../../entities/Sauna'

export type SaunaCardProps ={
  sauna : Sauna,
}

const SaunaCard = (props:SaunaCardProps) => {
  return (
    <div className="grid gap-4">
            <h2 className="text-2xl font-extrabold text-gray-900">{props.sauna.name}</h2>
            <div>
                <img 
                    src={props.sauna.imgLink}
                    alt={"props.alt"}
                />
            </div>
            <div>
                 <div>
                   <h3 className="text-sm text-gray-700">
                     <a href={"props.sauna.refLink"}>
                         {"LINK"}
                     </a>
                   </h3>
                   <p className="text-gray-500">{props.sauna.description}</p>
                 </div>
            </div>
    </div>
  )
}

export default SaunaCard
