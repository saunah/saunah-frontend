import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'use-react-router-breadcrumbs'
import { BreadcrumbRoutes } from '../shared/BreadcrumbsRouter'
import Home from './Home'

const redirectedPageTestId = 'redirected-page'

describe('<Home />', () => {
    test('redirect to "/saunas" is working', () => {
        render(
            <BrowserRouter>
                <BreadcrumbRoutes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/saunas" element={<RedirectedPage />}></Route>
                </BreadcrumbRoutes>
            </BrowserRouter>
        )

        const redirectedPage = screen.getByTestId(redirectedPageTestId)
        expect(redirectedPage).toBeInTheDocument()
    })
})

function RedirectedPage(): JSX.Element {
    return <div data-testid={redirectedPageTestId}></div>
}
