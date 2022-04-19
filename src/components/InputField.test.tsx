import {render, screen} from '@testing-library/react'
import { InputFieldType } from '../entities/InputFieldType'
import InputField from './InputField'

const testfield : InputFieldType = { 
    title : 'testTitle',
    placeholder:'testingPlaceholder',
    type:'input',
    color:'red',
    disabled: false,
    value:'testingValue',
    onChange: jest.fn(),
    
}
// Before each with render(<InputField />)
// add -> onChange test 
describe('InputField tests', () => {

    test('render correctly', () => {
        render(<InputField values={testfield}/>)
        const field = screen.getByText('testTitle')
        expect(field).toBeInTheDocument()
    })

    test('check class div', () => {
        render(<InputField values={testfield}/>)
        const field = screen.getByTestId("divId")
        expect(field).toHaveClass("mb-4")
    })

    test('check class label', () => {
        render(<InputField values={testfield}/>)
        const field = screen.getByTestId("labelTagId")
        expect(field).toHaveClass(`block text-${testfield.color} text-sm font-bold mb-2`)
    })

    test('check class input enabled', () => {
        render(<InputField values={testfield}/>)
        const field = screen.getByTestId("inputTagId")
        expect(field).toHaveClass(`shadow appearance-none border rounded w-full py-2 px-4 text-${testfield.color}-900 bg-${testfield.color}-200 hover:bg-${testfield.color}-300`)
    })
})