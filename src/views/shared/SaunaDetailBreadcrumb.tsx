import { ReactElement, useEffect, useState } from 'react'
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { Sauna } from '../../entities/Sauna'
import api from '../../networking/api'

/**
 * Dynamic breadcrumb which display the name of the sauna in the
 * navigation stack. To get the name, it is fetched by id from the
 * API.
 */
function SaunaDetailBreadcrumb({ match, testId }: SaunaDetailBreadcrumbProps<string>): ReactElement {
    const saunaId = Number(match.params['saunaId'])
    const [sauna, setSauna] = useState<Sauna.Request>(Sauna.emptyRequest())

    useEffect(() => {
        setSauna({ ...sauna, name: 'Detail' })

        if (saunaId) {
            api.sauna.get(saunaId).then(response => setSauna(Sauna.mapToRequest(response)))
        }
    }, [saunaId])

    return <span data-testid={testId || 'detail-breadcrumb'}>{sauna.name}</span>
}

export default SaunaDetailBreadcrumb

export type SaunaDetailBreadcrumbProps<ParamKey extends string = string> = {
    testId?: string
} & BreadcrumbComponentProps<ParamKey>
