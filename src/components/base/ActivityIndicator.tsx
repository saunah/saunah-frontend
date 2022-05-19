import { useEffect } from 'react'
import './ActivityIndicator.css'

const ActivityIndicator = (props: AcitivityIndicatorProps) => {
    const gap = (props.height / 13) * 24
    const totalWidth = gap * 2 + props.height

    useEffect(() => {
        document.documentElement.style.setProperty('--ellipsis-gap', gap + 'px')
    }, [gap])

    return (
        <div className="lds-ellipsis" style={{ height: `${props.height}px`, width: `${totalWidth}px` }}>
            <div
                className={`bg-${props.color}-${props.shade}`}
                style={{
                    height: `${props.height}px`,
                    width: `${props.height}px`,
                    left: '0px',
                }}
            />
            <div
                className={`bg-${props.color}-${props.shade}`}
                style={{
                    height: `${props.height}px`,
                    width: `${props.height}px`,
                    left: '0px',
                }}
            />
            <div
                className={`bg-${props.color}-${props.shade}`}
                style={{
                    height: `${props.height}px`,
                    width: `${props.height}px`,
                    left: `${gap}px`,
                }}
            />
            <div
                className={`bg-${props.color}-${props.shade}`}
                style={{
                    height: `${props.height}px`,
                    width: `${props.height}px`,
                    left: `${2 * gap}px`,
                }}
            />
        </div>
    )
}

export default ActivityIndicator

export type AcitivityIndicatorProps = {
    color: string
    shade: number
    height: number
}
