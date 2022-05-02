import { Fragment, SVGProps, useState } from 'react'
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom'

/**
 * This component provides the structure for a
 * navigation bar. Items can be passed as children.
 */
const AppMenu = (props: AppMenuProps) => {
    const [secondaryVisible, setSecondaryVisible] = useState<boolean>(false)
    const secondaryVisibilityClass = secondaryVisible ? 'visible' : 'invisible'
    const toggleSecondaryMenu = () => setSecondaryVisible(!secondaryVisible)

    return (
        <div className="p-4 w-full fixed top-0 left-0" data-testid="app-menu">
            <div className="h-14 px-4 py-2 w-full bg-primary-100 rounded-3xl flex flex-row justify-center shrink-0 shadow-xl shadow-primary-900/[0.1]">
                <nav className="flex flex-row justify-start grow items-center space-x-4">
                    {props.leadingItem && createMenuElement(props.leadingItem)}
                    {props.mainItems &&
                        props.mainItems.map((item, index) => (
                            <Fragment key={index}>
                                {createMenuElement(item)}
                                {props.mainItems && index + 1 < props.mainItems.length && (
                                    <span className="text-primary-300">/</span>
                                )}
                            </Fragment>
                        ))}
                </nav>
                <div className="flex flex-row justify-end grow-0 items-center space-x-4">
                    {props.trailingItem && createMenuElement({ onClick: toggleSecondaryMenu, ...props.trailingItem })}
                </div>
            </div>
            <nav
                className={`absolute bg-primary-50 rounded-3xl px-5 py-2 right-4 top-16 shadow-xl shadow-primary-900/[0.1] min-w-[12rem] flex flex-col divide-y divide-solid ${secondaryVisibilityClass}`}
            >
                {props.secondaryItems &&
                    props.secondaryItems.map((item, index) => (
                        <Fragment key={index}>
                            <div className="py-1">{createMenuElement(item)}</div>
                        </Fragment>
                    ))}
            </nav>
        </div>
    )
}

export default AppMenu

export type AppMenuProps = {
    leadingItem?: AppMenuItem
    mainItems?: AppMenuItem[]
    trailingItem?: AppMenuItem
    secondaryItems?: AppMenuItem[]
}

export type AppMenuItem = AppMenuTextItem | AppMenuElementItem

export type AppMenuTextItem = {
    title: string
    url?: string
}

export type AppMenuElementItem = {
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    size?: number
    url?: string
    onClick?: () => void
}

export function isAppMenuTextItem(item: AppMenuItem): item is AppMenuTextItem {
    return typeof (item as AppMenuTextItem).title === 'string'
}

export function isAppMenuElementItem(item: AppMenuItem): item is AppMenuElementItem {
    return typeof (item as AppMenuElementItem).icon === 'object'
}

function createMenuElement(fromItem: AppMenuItem): JSX.Element {
    if (isAppMenuElementItem(fromItem)) {
        const iconSize = fromItem.size || 7
        const iconClasses = `transition ease-in-out duration-200 h-${iconSize} w-${iconSize} cursor-pointer text-primary-500 hover:text-primary-400`

        if (fromItem.onClick != null) {
            return (
                <button onClick={() => fromItem.onClick?.()}>
                    {fromItem.icon && <fromItem.icon className={iconClasses} />}
                </button>
            )
        }
        return (
            <MenuLink to={fromItem.url || ''}>
                <fromItem.icon className={iconClasses} />
            </MenuLink>
        )
    } else if (isAppMenuTextItem(fromItem)) {
        return <MenuLink to={fromItem.url || ''}>{fromItem.title}</MenuLink>
    }
    return <></>
}

function MenuLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: true })
    const ifActiveClass = to && match ? 'active' : 'text-primary-500'

    return (
        <Link className={`font-medium ${ifActiveClass}`} to={to} {...props}>
            {children}
        </Link>
    )
}

function showSecondaryMenu() {
    console.log('Show secondary menu pressed')
}
