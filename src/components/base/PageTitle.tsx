/**
 * This component provides a simple page title.
 */
const PageTitle = (props: PageTitleProps) => {
    return (
        <h1 className="text-primary-500 text-4xl font-bold mb-4" data-testid="page-title">
            {props.children}
        </h1>
    )
}

export default PageTitle

export type PageTitleProps = {
    children: string
}
