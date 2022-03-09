import { Link, Outlet } from 'react-router-dom'
import { routes } from '../routes'

function App() {
    return (
        <div className="p-4 h-screen bg-amber-100 text-amber-500 flex flex-col justify-between items-center">
            <div className="space-x-4">
                <Link to={routes.home}> Home </Link>
                <Link to={routes.greeting('saunah')}> Greeting </Link>
            </div>
            <Outlet />
            <p> Hello from your parent... </p>
        </div>
    )
}

export default App
