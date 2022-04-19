import React from "react"

export type InputFieldType = {
    title: string
    placeholder?: string
    type: 'input' | 'password'
    color?: string
    disabled?: boolean
    children?: React.ReactNode
    value: string
    username?: string
    password?:string
    onChange: (newValue: string) => void
}