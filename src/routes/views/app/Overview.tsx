import React from 'react'
// TODO : Inputs via Props importieren
const piclink : string = 'https://www.asvz.ch/sites/default/files/styles/hero_lg_2x/public/sport/images/mood/Innenansicht%20Sauna_Fotograf%20Jan%20Sobotkiewicz.jpg?h=74328444&itok=sJjDj5NF'
const saunaType : string = "Sauna One"
const saunaText : string = "Lorem ipsum dolor sit amet consectetur"

const Overview = () => {
  return (
        <div className='flex justify'>

          <div className="space-y-25 w-70">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{saunaType}</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <img 
                    src={piclink}
                    alt={"saunaOnePicture"}
                />
            </div>
            <div className="mt-4 flex justify-between">
                 <div>
                   <h3 className="text-sm text-gray-700">
                     <a href={"link"}>
                         {"LINK"}
                     </a>
                   </h3>
                   <p className="mt-1 text-sm text-gray-500">{saunaText}</p>
                 </div>
            </div>
          </div>

        </div>
      )
}
export default Overview
