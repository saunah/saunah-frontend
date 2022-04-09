import {render, screen, fireEvent} from '@testing-library/react'
import Button from './Button'

test('Button click event', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}/>)
    const btn = screen.getByTestId('mainButton')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(onClick).toHaveBeenCalledTimes(2)
})