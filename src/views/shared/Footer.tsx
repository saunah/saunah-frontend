import AppFooter from '../../components/structural/AppFooter'

/**
 * Content view for the footer. It uses
 * the {@link AppFooter} component.
 */
const Footer = () => {
    return (
        <AppFooter>
            <span> REACT_APP_API_BASE_URL: {process.env.REACT_APP_API_BASE_URL || '-'} </span>
        </AppFooter>
    )
}

export default Footer
