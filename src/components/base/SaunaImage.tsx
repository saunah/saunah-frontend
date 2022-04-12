import React from 'react'
// TODO : Sauna Bilder anpassen

type Props ={
  name : string,
  imgLink : string,
  description : string,
  refLink : string,
  alt? : string
}

const SaunaImage = (props:Props) => {
  return (
    <div className="space-y-25 w-70">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{props.name}</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
                <img 
                    src={"https://u.profitroom.pl/2018-hotel-burgblick-com/thumb/1650x600/uploads/Sauna/pool-3001209_1920.jpg"}
                    alt={props.alt}
                />
            </div>
            <div className="mt-4 flex justify-between">
                 <div>
                   <h3 className="text-sm text-gray-700">
                     <a href={props.refLink}>
                         {"LINK"}
                     </a>
                   </h3>
                   <p className="mt-1 text-sm text-gray-500">{props.description}</p>
                 </div>
            </div>
    </div>
  )
}

export default SaunaImage
