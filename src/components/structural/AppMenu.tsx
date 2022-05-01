import { SVGProps } from 'react'
import { Link } from 'react-router-dom'

/**
 * This component provides the structure for a
 * navigation bar. Items can be passed as children.
 */
const AppMenu = (props: AppMenuProps) => {
    return (
        <div className="p-4 w-full fixed top-0 left-0" data-testid="app-menu">
            <div className="h-14 px-4 py-2 w-full bg-primary-100 rounded-3xl flex flex-row justify-center shrink-0 shadow-xl shadow-primary-900/[0.1]">
                <nav className="flex flex-row justify-start grow items-center space-x-4">
                    {props.leadingItem && createMenuElement(props.leadingItem)}
                    {props.mainItems &&
                        props.mainItems.map((item, index) => <span key={index}>{createMenuElement(item)}</span>)}
                </nav>
                <div className="flex flex-row justify-end grow-0 items-center space-x-4">
                    {props.trailingItemIcon &&
                        createMenuElement({ icon: props.trailingItemIcon, onClick: showSecondaryMenu })}
                </div>
            </div>
        </div>
    )
}

export default AppMenu

export type AppMenuProps = {
    leadingItem?: AppMenuItem
    mainItems?: AppMenuItem[]
    trailingItemIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
    secondaryItems?: AppMenuItem[]
}

export type AppMenuItem = AppMenuTextItem | AppMenuElementItem

export type AppMenuTextItem = {
    title: string
    url?: string
}

export type AppMenuElementItem = {
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
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
    const iconClasses =
        'transition ease-in-out duration-200 h-7 w-7 cursor-pointer text-primary-500 hover:text-primary-400'

    if (isAppMenuElementItem(fromItem)) {
        if (fromItem.onClick != null) {
            return (
                <button onClick={() => fromItem.onClick?.()}>
                    {fromItem.icon && <fromItem.icon className={iconClasses} />}
                </button>
            )
        }
        return (
            <Link to={fromItem.url || '#'}>
                <fromItem.icon className={iconClasses} />
            </Link>
        )
    } else if (isAppMenuTextItem(fromItem)) {
        return <Link to={fromItem.url || '#'}>{fromItem.title}</Link>
    }
    return <></>
}

function showSecondaryMenu() {
    console.log('Show secondary menu pressed')
}
