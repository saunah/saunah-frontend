import { render, screen } from '@testing-library/react'
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { mockSaunaAPI } from '../../networking/api'
import { SaunaMock } from '../../networking/api/sauna.mock'
import SaunaDetailBreadcrumb from './SaunaDetailBreadcrumb'

describe('<SaunaDetailBreadcrumb>', () => {
    const breadcrumbTestId = 'test-detail-breadcrumb'
    const defaultRouteText = 'Detail'

    test('sauna name is displayed correctly, before and after resolved promise', async () => {
        const { mock, get: getSaunas } = SaunaMock.deferredMock()

        mockSaunaAPI(mock)
        render(<SaunaDetailBreadcrumb testId={breadcrumbTestId} {...defaultBreadcrumProps} />)

        const breadcrumbBefore = await screen.findByTestId(breadcrumbTestId)
        expect(breadcrumbBefore).toHaveTextContent(defaultRouteText)

        getSaunas.resolve(SaunaMock.sampleResponse1)

        const breadcrumbAfter = await screen.findByTestId(breadcrumbTestId)
        expect(breadcrumbAfter).toHaveTextContent(SaunaMock.sampleResponse1.name)
    })

    test('only default name is displayed on inavalid id', async () => {
        const { mock, get: getSaunas } = SaunaMock.deferredMock()

        mockSaunaAPI(mock)
        render(<SaunaDetailBreadcrumb testId={breadcrumbTestId} {...invalidBreadcrumProps} />)

        const breadcrumbBefore = await screen.findByTestId(breadcrumbTestId)
        expect(breadcrumbBefore).toHaveTextContent(defaultRouteText)

        getSaunas.resolve(SaunaMock.sampleResponse1)

        const breadcrumbAfter = await screen.findByTestId(breadcrumbTestId)
        expect(breadcrumbAfter).toHaveTextContent(defaultRouteText)
    })

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

    const invalidBreadcrumProps: BreadcrumbComponentProps<string> = {
        match: {
            params: {
                saunaId: 'a',
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
