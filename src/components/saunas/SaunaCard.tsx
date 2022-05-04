import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sauna } from '../../entities/Sauna'
import { SaunaImage } from '../../entities/SaunaImage'
import api from '../../networking/api'
import apiRoutes, { getAbsoluteUrl } from '../../networking/apiRoutes'
import ButtonLink from '../base/ButtonLink'

export type SaunaCardProps = {
    sauna: Sauna.Response
}

const SaunaCard = (props: SaunaCardProps) => {
    const [images, setImages] = useState<SaunaImage.Response[]>([])
    const imgLink = images[0] ? getAbsoluteUrl(apiRoutes.saunaImages.get(images[0].fileName)) : ''
    const navLink = `/saunas/${props.sauna.id}`

    useEffect(() => {
        api.saunaImages.list(props.sauna.id).then(setImages)
    }, [props.sauna])

    return (
        <div>
            <Link to={navLink}>
                <div
                    className="aspect-video bg-center bg-no-repeat bg-cover rounded-2xl shadow-xl shadow-primary-900/[0.1] origin-center hover:scale-[1.02] transition duration-100"
                    style={{ backgroundImage: `url(${imgLink})` }}
                />
            </Link>
            <div className="pt-6 px-4">
                <h2 className="text-3xl font-bold text-primary-600 mb-2">{props.sauna.name}</h2>
                <p className="text-primary-900">{props.sauna.description}</p>

                <ButtonLink className="mt-4" to={navLink}>
                    Sauna ansehen
                </ButtonLink>
            </div>
        </div>
    )
}

export default SaunaCard
