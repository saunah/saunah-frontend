import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SaunaImage } from '../../entities/SaunaImage'
import apiRoutes, { getAbsoluteUrl } from '../../networking/apiRoutes'
import { useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import './SaunaImageCarousel.css'

export type SaunaImageCarouselProps = {
    images: SaunaImage.Response[]
}

const SaunaImageCarousel = (props: SaunaImageCarouselProps) => {
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
    }

    const ref = useRef<Slider>(null)

    return (
        <div className="relative rounded-lg overflow-hidden" data-testid="sauna-image-carousel">
            <button className="carousel-side-button top-0 left-0" onClick={() => ref.current?.slickPrev()}>
                <ChevronLeftIcon />
            </button>
            {/* The desired padding of the images is 6. px-14 is 8 (side-button) + 6. pb-14 because of dots.*/}
            <div className="px-14 pt-6 pb-12 bg-primary-100">
                <Slider {...settings} ref={ref}>
                    {props.images.map(image => (
                        <div key={image.fileName}>
                            <div
                                data-testid={`image-${image.id}`}
                                className="h-60 md:h-80 lg:h-96 bg-contain bg-no-repeat bg-center"
                                style={{
                                    backgroundImage: `url(${getAbsoluteUrl(
                                        apiRoutes.saunaImages.get(image.fileName)
                                    )})`,
                                }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <button className="carousel-side-button top-0 right-0" onClick={() => ref.current?.slickNext()}>
                <ChevronRightIcon />
            </button>
        </div>
    )
}

export default SaunaImageCarousel
