import { Link, Outlet } from 'react-router-dom'

function App() {
    return (
        <div className="p-4 h-screen bg-amber-100 text-amber-500 flex flex-col justify-between items-center">
            <div className="space-x-4">
                <Link to="/"> Home </Link>
                <Link to="/test"> Test </Link>
            </div>
            <Outlet />
            <p> Hello from your parent... </p>
        </div>
    )
}

export default App
