import { render, screen } from '@testing-library/react'
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { Sauna } from '../../entities/Sauna'
import { mockSaunaAPI } from '../../networking/api'
import { deferred } from '../../utils/deferred'
import SaunaDetailBreadcrumb from './SaunaDetailBreadcrumb'

describe('<SaunaDetailBreadcrumb>', () => {
    const breadcrumbTestId = 'test-detail-breadcrumb'
    const defaultRouteText = 'Detail'

    test('sauna name is displayed correctly, before and after resolved promise', async () => {
        const { mock, get: getSaunas } = defaultMock()

        mockSaunaAPI(mock)
        render(<SaunaDetailBreadcrumb testId={breadcrumbTestId} {...defaultBreadcrumProps} />)

        const breadcrumbBefore = await screen.findByTestId(breadcrumbTestId)
        expect(breadcrumbBefore).toHaveTextContent(defaultRouteText)

        getSaunas.resolve(sauna1)

        const breadcrumbAfter = await screen.findByTestId(breadcrumbTestId)
        expect(breadcrumbAfter).toHaveTextContent(sauna1.name)
    })

    const sauna1: Sauna.Response = {
        id: 1,
        name: 'Sauna 1',
        description: 'Das ist Sauna 1.',
        price: 100000,
        maxTemp: 100,
        numberOfPeople: 10,
        street: 'Hinterstrasse 12',
        zip: 8400,
        location: 'Winterthur',
        type: 'Zeltsauna',
        mobile: false,
    }

    function defaultMock() {
        const listDefer = deferred<Sauna.Response[]>()
        const getDefer = deferred<Sauna.Response>()
        const addDefer = deferred<Sauna.Response>()
        const editDefer = deferred<Sauna.Response>()
        const removeDefer = deferred<void>()

        const mock = {
            list: jest.fn(() => listDefer.promise),
            get: jest.fn(() => getDefer.promise),
            add: jest.fn(() => addDefer.promise),
            edit: jest.fn(() => editDefer.promise),
            remove: jest.fn(() => removeDefer.promise),
        }

        return {
            mock,
            list: listDefer,
            get: getDefer,
            add: addDefer,
            edit: editDefer,
            remove: removeDefer,
        }
    }

    const defaultBreadcrumProps: BreadcrumbComponentProps<string> = {
        match: {
            params: {
                saunaId: '1',
            },
            pathname: '/saunas/1',
            pattern: { path: '/saunas/:saunaId', end: true },
            route: { index: true },
        },
        key: '',
        location: {
            key: 'default',
            state: null,
            pathname: '/saunas/1/edit',
            search: '',
            hash: '',
        },
    }
})
