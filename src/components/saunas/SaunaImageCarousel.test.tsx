import { render, screen } from '@testing-library/react'
import { SaunaImage } from '../../entities/SaunaImage'
import apiRoutes, { getAbsoluteUrl } from '../../networking/apiRoutes'
import SaunaImageCarousel from './SaunaImageCarousel'

describe('<SaunaImageCarousel>', () => {
    test('displays images correctly', () => {
        render(<SaunaImageCarousel images={images} />)
        images.forEach(image => {
            screen.getAllByTestId(`image-${image.id}`).forEach(element => {
                expect(element).toHaveStyle({
                    backgroundImage: `url(${getAbsoluteUrl(apiRoutes.saunaImages.get(image.fileName))})`,
                })
            })
        })
    })
})

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
