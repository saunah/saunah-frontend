import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export type DropdownProps = {
    title?: string
    /**
     * The item array is of dimension 2.
     * The first dimension is interpreted as groups of the items
     * and the second dimension as the contents of the groups.
     */
    items?: DropdownItem[][]
    /**
     * Shows the dropdown panel right-aligned, if set to true.
     * Default is left-aligned.
     */
    rightAligned?: boolean
    disabled?: boolean
}

/**
 * Represents one selectable item of the dropdown.
 */
export type DropdownItem = {
    label: string
    route?: string
    disabled?: boolean
    onClick?: () => void
}

/**
 * A dropdown which consits of a button and a floating panel
 * with all the dropdown options. The panel is hidden by default
 * and shown when the dropdown button is clicked.
 */
const Dropdown = (props: DropdownProps) => {
    return (
        <Menu as="div" className="relative z-10 inline-block text-left">
            <Menu.Button
                disabled={props.disabled}
                className={
                    'inline-flex justify-center w-full rounded-md border bg-white border-primary-300 px-4 py-2 text-sm font-medium ' +
                    (props.disabled ? 'text-primary-300 cursor-default' : 'text-primary-700 hover:bg-primary-100')
                }
                data-testid="dropdown-button"
            >
                {props.title}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" />
            </Menu.Button>

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
                    as="div"
                    className={
                        'absolute w-56 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ' +
                        (props.rightAligned ? 'origin-top-right right-0' : '  origin-top-left left-0')
                    }
                    data-testid="dropdown-panel"
                >
                    <div className="divide-y divide-primary-200">
                        {props.items?.map((group, groupIndex) => (
                            <div className="py-1" key={`group-${groupIndex}`}>
                                {group.map((item, itemIndex) => (
                                    <Menu.Item disabled={item.disabled} key={`group-${groupIndex}-item-${itemIndex}`}>
                                        {({ active }) => {
                                            const baseClasses = 'block w-full px-4 py-2 text-sm text-left '
                                            const activeClasses = active
                                                ? 'bg-primary-100 text-primary-900'
                                                : 'text-primary-700'
                                            const testId = `dropdown-item-${groupIndex}-${itemIndex}`

                                            if (item.disabled) {
                                                return (
                                                    <span
                                                        className={baseClasses + 'text-primary-300'}
                                                        data-testid={testId}
                                                    >
                                                        {item.label}
                                                    </span>
                                                )
                                            } else if (item.route) {
                                                return (
                                                    <Link
                                                        to={item.route}
                                                        className={baseClasses + activeClasses}
                                                        data-testid={testId}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                )
                                            } else {
                                                return (
                                                    <button
                                                        type="button"
                                                        onClick={item.onClick}
                                                        className={baseClasses + activeClasses}
                                                        data-testid={testId}
                                                    >
                                                        {item.label}
                                                    </button>
                                                )
                                            }
                                        }}
                                    </Menu.Item>
                                ))}
                            </div>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Dropdown
