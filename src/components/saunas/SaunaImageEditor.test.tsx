import { fireEvent, render, screen, within } from '@testing-library/react'
import { SaunaImagesMock } from '../../networking/api/saunaImages.mock'
import SaunaImageEditor from './SaunaImageEditor'

describe('<SaunaImageEditor>', () => {
    test('displays images correctly', () => {
        render(<SaunaImageEditor images={images} />)
        expect(getEditor()).toBeInTheDocument()
        expect(getImage(1)).toBeInTheDocument()
        expect(getImage(2)).toBeInTheDocument()
        expect(getImage(3)).toBeInTheDocument()
    })

    test('calls remove when the remove button is clicked', () => {
        const remove = jest.fn()
        render(<SaunaImageEditor images={images} onRemove={remove} />)

        for (let i = 1; i <= 3; i++) {
            fireEvent.click(getRemoveButton(i))
            expect(remove).toBeCalledTimes(i)
            expect(remove).toBeCalledWith({ id: i, saunaId: i, url: `http://localhost/test-sauna-${i}.jpg` })
        }
    })
})

const getEditor = () => screen.getByTestId('sauna-image-editor')
const getImage = (id: number) => within(getEditor()).getByTestId('image-' + id)
const getRemoveButton = (id: number) => within(getEditor()).getByTestId('remove-button-' + id)

const images = [SaunaImagesMock.sampleResponse1, SaunaImagesMock.sampleResponse2, SaunaImagesMock.sampleResponse3]
