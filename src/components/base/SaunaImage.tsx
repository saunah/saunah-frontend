import React from 'react'
export type SaunaImageProps ={
  name : string,
  imgLink : string,
  description : string,
  refLink : string,
  alt? : string
}

const SaunaImage = (props:SaunaImageProps) => {
  return (
    <div className="grid gap-4">
            <h2 className="text-2xl font-extrabold text-gray-900">{props.name}</h2>
            <div>
                <img 
                    src={props.imgLink}
                    alt={props.alt}
                />
            </div>
            <div>
                 <div>
                   <h3 className="text-sm text-gray-700">
                     <a href={props.refLink}>
                         {"LINK"}
                     </a>
                   </h3>
                   <p className="text-gray-500">{props.description}</p>
                 </div>
            </div>
    </div>
  )
}

export default SaunaImage
