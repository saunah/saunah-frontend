import { render } from '@testing-library/react'
import GreetingView from './GreetingView'

test('If greeting view show greeting', () => {
    render(<GreetingView />)
})
