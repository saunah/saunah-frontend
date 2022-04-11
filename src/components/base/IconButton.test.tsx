import { render, screen, fireEvent } from '@testing-library/react'
import IconButton from './IconButton'

describe('<IconButton>', () => {
    test('applies props correctly to button', () => {
        render(<IconButton type="submit" disabled={true} />)
        expect(getIconButton()).toHaveProperty('type', 'submit')
        expect(getIconButton()).toHaveProperty('disabled', true)
    })

    test('onClick event is called', () => {
        const onClick = jest.fn()
        render(<IconButton onClick={onClick} />)
        fireEvent.click(getIconButton())
        expect(onClick).toBeCalledTimes(1)
    })

    test('disabled property prevents click', () => {
        const onClick = jest.fn()
        render(<IconButton disabled={true} onClick={onClick} />)
        fireEvent.click(getIconButton())
        expect(onClick).toBeCalledTimes(0)
    })
})

const getIconButton = () => screen.getByTestId('icon-button')
