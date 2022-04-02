import InputField from '../../../components/InputField'
import InputFieldPassword from '../../../components/InputFieldPassword'
import Button from '../../../components/Button'
import { Link, Outlet } from 'react-router-dom'
import { routes } from '../../routes'

const LoginView = () => {
    return (
        <div>
            <InputField titel="Username" placeholder="Username" />
            <InputFieldPassword titel="**********" placeholder="******" />
            <div className="flex items-center justify-between">
                <Button input="Login" />
                <Link
                    to={routes.home}
                    className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                >
                    Forgot Password?
                </Link>
            </div>
        </div>
    )
}

export default LoginView
