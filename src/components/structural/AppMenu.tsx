import { Menu, Transition } from '@headlessui/react'
import { ForwardedRef, forwardRef, Fragment, ReactElement, ReactNode, SVGProps } from 'react'
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom'

const defaultTestIdElement = 'menu-element'
const defaultIconClasses = 'transition ease-in-out duration-200 cursor-pointer text-primary-500 hover:text-primary-400'
const secondaryElementDefaultTextColor = 'text-primary-500'
const secondaryElementCurrentTextColor = 'text-accent-300'
const secondaryElementActiveTextColor = 'text-accent-200'

/**
 * This component provides the structure for a
 * navigation bar. Items can be passed as children.
 */
function AppMenu(props: AppMenuProps) {
    return (
        <div className="p-4 w-full fixed top-0 left-0 z-50" data-testid="app-menu">
            <div className="min-h-[3.5rem] w-full bg-primary-100 rounded-3xl flex flex-row justify-center shrink-0 shadow-xl shadow-primary-900/[0.1]">
                <nav
                    className="flex flex-row px-4 py-2 justify-start grow items-center space-x-2 overflow-x-auto"
                    data-testid="app-menu-primary-items"
                >
                    <PrimaryMenu {...props} />
                </nav>
                <div className="flex flex-row px-4 py-2 justify-end grow-0 items-center space-x-4">
                    <SecondaryMenu {...props} />
                </div>
            </div>
        </div>
    )
}
export default AppMenu

export type AppMenuProps = {
    leadingItem?: AppMenuItem
    primaryItems?: AppMenuItem[]
    trailingItem?: AppMenuItem
    secondaryItems?: AppMenuItem[]
}

export type AppMenuItem = AppMenuTextItem | AppMenuIconItem

type AppMenuItemBase = {
    url?: string
    onClick?: () => void
    testId?: string
}

export type AppMenuTextItem = {
    title: ReactElement | string
} & AppMenuItemBase

export function isAppMenuTextItem(item: AppMenuItem): item is AppMenuTextItem {
    const textItem = item as AppMenuTextItem
    return typeof textItem.title === 'object' || typeof textItem.title === 'string'
}

export type AppMenuIconItem = {
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    iconClasses?: string
} & AppMenuItemBase

export function isAppMenuIconItem(item: AppMenuItem): item is AppMenuIconItem {
    return typeof (item as AppMenuIconItem).icon === 'object'
}

/**
 * Create element for menu item, by connecting the outer
 * element (<code>OuterAppMenuElement</code>) and inner
 * element (<code>InnerAppMenuElement</code>)
 */
const MenuElement = forwardRef((props: MenuElementProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <OuterAppMenuElement {...props} ref={ref}>
        <InnerAppMenuElement {...props} />
    </OuterAppMenuElement>
))

type MenuElementProps = {
    fromItem: AppMenuItem
    className?: string
    isActive?: boolean
}

type OuterAppMenuElementProps = {
    children: ReactNode
} & MenuElementProps

/**
 * Outer wrapper for menu element, which can be either a
 * <code>button</code> or <code>MenuLink</code>.
 */
const OuterAppMenuElement = forwardRef(
    (
        { children, fromItem, className, isActive, ...props }: OuterAppMenuElementProps,
        ref: ForwardedRef<HTMLButtonElement>
    ) => {
        if (isAppMenuIconItem(fromItem) && fromItem.onClick) {
            return (
                <button
                    {...props}
                    onClick={() => fromItem.onClick?.()}
                    data-testid={fromItem.testId || defaultTestIdElement}
                    className={`${className} ${
                        isActive ? secondaryElementActiveTextColor : secondaryElementDefaultTextColor
                    }`}
                    ref={ref}
                >
                    {children}
                </button>
            )
        } else if (fromItem.url) {
            return (
                <MenuLink
                    {...props}
                    to={fromItem.url || ''}
                    data-testid={fromItem.testId || defaultTestIdElement}
                    className={className}
                    isActive={isActive}
                >
                    {children}
                </MenuLink>
            )
        } else {
            return (
                <button
                    {...props}
                    className={`font-medium text-left ${className} ${
                        isActive ? secondaryElementActiveTextColor : secondaryElementDefaultTextColor
                    }`}
                    onClick={fromItem.onClick}
                    data-testid={fromItem.testId || defaultTestIdElement}
                    ref={ref}
                >
                    {children}
                </button>
            )
        }
    }
)

/**
 * Inner wrapper for menu element, which can either be text or an icon.
 */
function InnerAppMenuElement({ fromItem }: MenuElementProps): JSX.Element {
    if (isAppMenuIconItem(fromItem)) {
        const iconSizedClasses = `${defaultIconClasses} ${fromItem.iconClasses || 'w-7 h-7'}`
        return <fromItem.icon className={iconSizedClasses} />
    } else if (isAppMenuTextItem(fromItem)) {
        return <>{fromItem.title}</>
    }
    return <></>
}

/**
 * Sub-component to create the primary menu out of leadingItem and primaryItems
 * passed to the main component.
 */
function PrimaryMenu({ leadingItem, primaryItems }: AppMenuProps) {
    return (
        <>
            {leadingItem && (
                <>
                    <MenuElement fromItem={leadingItem} />
                    <div className="w-0"></div> {/* spacing */}
                </>
            )}
            {primaryItems &&
                primaryItems.map((item, index) => (
                    <Fragment key={index}>
                        <MenuElement fromItem={item} />
                        {primaryItems && index + 1 < primaryItems.length && <span className="text-primary-300">/</span>}
                    </Fragment>
                ))}
        </>
    )
}

/**
 * Sub-component to create the secondary menu out of trailingItem and secondaryItems
 * passed to the main component.
 */
function SecondaryMenu({ trailingItem, secondaryItems }: AppMenuProps) {
    return (
        <div className="text-right">
            <Menu as="div" className="relative block text-left">
                <div>
                    <Menu.Button
                        className="block focus:outline-none"
                        data-testid={trailingItem?.testId || defaultTestIdElement}
                    >
                        {trailingItem && <InnerAppMenuElement fromItem={trailingItem} />}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        as="nav"
                        className="absolute -right-4 origin-top-right bg-primary-50 rounded-3xl px-5 py-1 shadow-xl shadow-primary-900/[0.1] min-w-[12rem] flex flex-col divide-y divide-solid focus:outline-none"
                    >
                        {secondaryItems &&
                            secondaryItems.map((item, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => {
                                        return (
                                            <MenuElement
                                                fromItem={item}
                                                className="py-2 transition ease-in-out duration-200"
                                                isActive={active}
                                            />
                                        )
                                    }}
                                </Menu.Item>
                            ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

type MenuLinkProps = {
    isActive?: boolean
} & LinkProps

/**
 * Component to wrap and style links in the menu.
 */
function MenuLink({ children, to, className, isActive, ...props }: MenuLinkProps) {
    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: true })
    const defaultColor = to && match ? secondaryElementCurrentTextColor : secondaryElementDefaultTextColor
    const activeColor = isActive ? secondaryElementActiveTextColor : defaultColor

    return (
        <Link {...props} className={`block font-medium ${activeColor} ${className}`} to={to}>
            {children}
        </Link>
    )
}
