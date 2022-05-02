import { fireEvent, getByTestId, render, screen, within } from '@testing-library/react'
import { SaunaImage } from '../../entities/SaunaImage'
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
            expect(remove).toBeCalledWith({ id: i, saunaId: i, fileName: `file-${i}` })
        }
    })
})

const getEditor = () => screen.getByTestId('sauna-image-editor')
const getImage = (id: number) => within(getEditor()).getByTestId('image-' + id)
const getRemoveButton = (id: number) => within(getEditor()).getByTestId('remove-button-' + id)

const image1: SaunaImage.Response = {
    id: 1,
    saunaId: 1,
    fileName: 'file-1',
}

const image2: SaunaImage.Response = {
    id: 2,
    saunaId: 2,
    fileName: 'file-2',
}

const image3: SaunaImage.Response = {
    id: 3,
    saunaId: 3,
    fileName: 'file-3',
}

const images = [image1, image2, image3]
