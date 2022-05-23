import { ReactNode, useState } from 'react'
import ActivityIndicator from './ActivityIndicator'

export type ButtonProps = {
    title?: string
    type?: 'button' | 'submit' | 'reset'
    color?: string
    disabled?: boolean
    onClick?: () => void | Promise<unknown>
    link?: string
    children?: ReactNode
    ['data-testid']?: string
    className?: string
}

/**
 * A styled button component based on the html button.
 */
const Button = (props: ButtonProps) => {
    const [loading, setLoading] = useState(false)
    const disabled = props.disabled || loading

    const color = props.color || 'accent'
    const classes =
        `${props.className} py-3 px-5 text-sm font-medium rounded-2xl shadow-lg shadow-primary-900/[0.1] ` +
        (disabled
            ? `text-${color}-900 text-opacity-50 bg-${color}-100 cursor-default`
            : `text-${color}-900 bg-${color}-200 hover:bg-${color}-300`)

    const onClick = () => {
        const maybePromise = props.onClick?.()
        if (maybePromise) {
            setLoading(true)
            const minPromise = new Promise(r => setTimeout(r, 1000))
            Promise.allSettled([maybePromise, minPromise]).then(() => setLoading(false))
            maybePromise.catch(error => Promise.reject(error))
        }
    }

    return (
        <button
            className={classes}
            type={props.type || 'button'}
            onClick={onClick}
            disabled={disabled}
            data-testid={props['data-testid'] || 'button'}
        >
            <div className="relative">
                <span className={loading ? 'opacity-0' : ''}>{props.children || props.title}</span>
                {loading && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <ActivityIndicator color={color} shade={300} height={7} />
                    </div>
                )}
            </div>
        </button>
    )
}

export default Button
