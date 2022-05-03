import { ReactElement, useEffect, useState } from 'react'
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { Sauna } from '../../entities/Sauna'
import api from '../../networking/api'

function SaunaDetailBreadcrumb({ match }: BreadcrumbComponentProps<string>): ReactElement {
    const saunaId = Number(match.params['saunaId'])
    const [sauna, setSauna] = useState<Sauna.Request>(Sauna.emptyRequest())

    useEffect(() => {
        setSauna({ ...sauna, name: 'Detail' })
        if (saunaId) {
            api.sauna.get(saunaId).then(response => setSauna(Sauna.mapToRequest(response)))
        }
    }, [saunaId])

    return <>{sauna.name}</>
}

export default SaunaDetailBreadcrumb
