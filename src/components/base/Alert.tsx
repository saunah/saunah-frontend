import { CheckCircleIcon, InformationCircleIcon, ExclamationIcon, XIcon } from '@heroicons/react/solid'
import { ReactNode, SVGProps } from 'react'
import { AlertVariant } from '../../routes/alert/Alert'
import IconButton from './IconButton'

export type AlertProps = {
    variant?: AlertVariant
    text?: string
    children?: ReactNode
    className?: string
    onDismiss?: () => void
}

/**
 * An alert component which has different style variants,
 * displays a text and has a dismiss button.
 */
const Alert = (props: AlertProps) => {
    const variant = props.variant || 'success'
    const style = VARIANTS[variant]

    return (
        <div className={`rounded-md p-3 bg-${style.color}-50 ${props.className}`}>
            <div className="flex items-center">
                <div className="flex-shrink-0">{<style.icon className={`h-5 w-5 text-${style.color}-500`} />}</div>

                <div className="ml-3 flex-grow">
                    <p className={`text-sm font-medium text-${style.color}-900`} data-testid="alert-text">
                        {props.children || props.text}
                    </p>
                </div>

                <div className="flex-shrink-0 ml-3 flex items-center">
                    <IconButton color={style.color} size={5} icon={XIcon} onClick={props.onDismiss} />
                </div>
            </div>
        </div>
    )
}

type VariantStyle = {
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    color: string
}

const VARIANTS: Record<AlertVariant, VariantStyle> = {
    success: {
        icon: CheckCircleIcon,
        color: 'green',
    },
    info: {
        icon: InformationCircleIcon,
        color: 'blue',
    },
    warning: {
        icon: ExclamationIcon,
        color: 'yellow',
    },
    error: {
        icon: ExclamationIcon,
        color: 'red',
    },
}

export default Alert
