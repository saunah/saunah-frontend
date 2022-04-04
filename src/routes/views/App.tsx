import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthProvider'

function App() {
    const { isAuthenticated, login, logout } = useAuth()

    return (
        <div className="p-4 h-screen bg-amber-100 text-amber-500 flex flex-col justify-between items-center">
            <div className="space-x-4">
                <div>
                    <Link to="/"> Home </Link>
                    <Link to="/greeting/1"> Greeting </Link>
                    <Link to="/protected"> Protected </Link>
                </div>
                <div className="flex space-x-4">
                    <button className="bg-white px-2" onClick={login}>
                        Login
                    </button>
                    <button className="bg-white px-2" onClick={logout}>
                        Logout
                    </button>
                    <span>isAuthenticated: {`${isAuthenticated}`} </span>
                </div>
            </div>

            <Outlet />
            <div>
                <span> REACT_APP_API_BASE_URL: {process.env.REACT_APP_API_BASE_URL || '-'} </span>
                <br />
                <span> REACT_APP_TEST_VAR: {process.env.REACT_APP_TEST_VAR || '-'} </span>
            </div>
        </div>
    )
}

export default App
