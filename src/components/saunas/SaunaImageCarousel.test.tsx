import { render, screen } from '@testing-library/react'
import { SaunaImagesMock } from '../../networking/api/saunaImages.mock'
import SaunaImageCarousel from './SaunaImageCarousel'

describe('<SaunaImageCarousel>', () => {
    test('displays images correctly', () => {
        render(<SaunaImageCarousel images={images} />)
        images.forEach(image => {
            screen.getAllByTestId(`image-${image.id}`).forEach(element => {
                expect(element).toHaveStyle({
                    backgroundImage: `url(${image.url})`,
                })
            })
        })
    })
})

const images = [SaunaImagesMock.sampleResponse1, SaunaImagesMock.sampleResponse2, SaunaImagesMock.sampleResponse3]
