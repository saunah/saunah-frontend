/* eslint-disable testing-library/no-node-access */
import { ReactNode } from 'react'
import { Route, Routes, Outlet, Link, MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthContext, AuthState } from './AuthProvider'
import ProtectedRoute from './ProtectedRoute'

describe('<ProtectedRoute>', () => {
    test('shows home route at start', () => {
        render(TestRoutes(), { wrapper: createWrapper() })
        expect(screen.getByTestId('parent')).toHaveTextContent('home')
    })

    test('shows unprotected routes when not authenticated', () => {
        render(TestRoutes(), { wrapper: createWrapper(false) })
        expect(screen.getByTestId('parent')).toHaveTextContent('home')

        screen.getByTestId('link-u').click()
        expect(screen.getByTestId('parent')).toHaveTextContent('parent-unprotected')

        screen.getByTestId('link-u-u').click()
        expect(screen.getByTestId('parent')).toHaveTextContent('parent-unprotected')
        expect(screen.getByTestId('child')).toHaveTextContent('child-unprotected')
    })

    test('does not show protected routes when not authenticated', async () => {
        render(TestRoutes(), { wrapper: createWrapper(false) })
        expect(screen.getByTestId('parent')).toHaveTextContent('home')

        screen.getByTestId('link-u-p').click()
        await waitFor(() => expect(screen.getByTestId('parent')).toHaveTextContent('home'))

        screen.getByTestId('link-p').click()
        await waitFor(() => expect(screen.getByTestId('parent')).toHaveTextContent('home'))

        screen.getByTestId('link-p-u').click()
        await waitFor(() => expect(screen.getByTestId('parent')).toHaveTextContent('home'))

        screen.getByTestId('link-p-p').click()
        await waitFor(() => expect(screen.getByTestId('parent')).toHaveTextContent('home'))
    })

    test('shows all routes when authenticated', async () => {
        render(TestRoutes(), { wrapper: createWrapper(true) })
        expect(screen.getByTestId('parent')).toHaveTextContent('home')

        screen.getByTestId('link-u').click()
        expect(screen.getByTestId('parent')).toHaveTextContent('parent-unprotected')

        screen.getByTestId('link-p').click()
        expect(screen.getByTestId('parent')).toHaveTextContent('parent-protected')

        screen.getByTestId('link-u-p').click()
        expect(screen.getByTestId('parent')).toHaveTextContent('parent-unprotected')
        expect(screen.getByTestId('child')).toHaveTextContent('child-protected')

        screen.getByTestId('link-u-u').click()
        expect(screen.getByTestId('parent')).toHaveTextContent('parent-unprotected')
        expect(screen.getByTestId('child')).toHaveTextContent('child-unprotected')

        screen.getByTestId('link-p-p').click()
        expect(screen.getByTestId('parent')).toHaveTextContent('parent-protected')
        expect(screen.getByTestId('child')).toHaveTextContent('child-protected')

        screen.getByTestId('link-u-u').click()
        expect(screen.getByTestId('parent')).toHaveTextContent('parent-unprotected')
        expect(screen.getByTestId('child')).toHaveTextContent('child-unprotected')
    })
})

const defaultAuthState = (isAuthenticated?: boolean): AuthState => {
    return {
        isAuthenticated: isAuthenticated || false,
        login: () => Promise.resolve(),
        logout: () => {
            // Ignore logout
        },
    }
}

const createWrapper = (isAuthenticated?: boolean) => (props: { children: ReactNode }) =>
    (
        <MemoryRouter initialEntries={['/']}>
            <Link to="/unprotected" data-testid="link-u" />
            <Link to="/unprotected/child-unprotected" data-testid="link-u-u" />
            <Link to="/unprotected/child-protected" data-testid="link-u-p" />
            <Link to="/protected" data-testid="link-p" />
            <Link to="/protected/child-unprotected" data-testid="link-p-u" />
            <Link to="/protected/child-protected" data-testid="link-p-p" />
            <AuthContext.Provider value={defaultAuthState(isAuthenticated)}>{props.children}</AuthContext.Provider>
        </MemoryRouter>
    )

const TestRoutes = () => (
    <Routes>
        <Route index element={<span data-testid="parent"> home </span>} />
        <Route
            path="/unprotected"
            element={
                <span data-testid="parent">
                    parent-unprotected <Outlet />
                </span>
            }
        >
            <Route path="child-unprotected" element={<span data-testid="child"> child-unprotected </span>} />
            <Route
                path="child-protected"
                element={
                    <ProtectedRoute>
                        <span data-testid="child">child-protected</span>
                    </ProtectedRoute>
                }
            />
        </Route>
        <Route
            path="/protected"
            element={
                <ProtectedRoute>
                    <span data-testid="parent">
                        parent-protected <Outlet />
                    </span>
                </ProtectedRoute>
            }
        >
            <Route path="child-unprotected" element={<span data-testid="child"> child-unprotected </span>} />
            <Route
                path="child-protected"
                element={
                    <ProtectedRoute>
                        <span data-testid="child">child-protected</span>
                    </ProtectedRoute>
                }
            />
        </Route>
    </Routes>
)
