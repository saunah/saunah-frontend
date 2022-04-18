import AppFooter from '../../components/structural/AppFooter'

const Footer = () => {
    return (
        <AppFooter>
            <span> REACT_APP_API_BASE_URL: {process.env.REACT_APP_API_BASE_URL || '-'} </span>
            <br />
            <span> REACT_APP_TEST_VAR: {process.env.REACT_APP_TEST_VAR || '-'} </span>
        </AppFooter>
    )
}

export default Footer
