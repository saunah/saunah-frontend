import AppFooter from '../../components/structural/AppFooter'

/**
 * Content view for the footer. It uses
 * the {@link AppFooter} component.
 */
const Footer = () => {
    return (
        <AppFooter>
            <span>&copy; {`${new Date().getFullYear()} SauNah`}</span>
        </AppFooter>
    )
}

export default Footer
