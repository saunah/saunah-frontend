import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SaunaImage } from '../../entities/SaunaImage'
import apiRoutes, { getAbsoluteUrl } from '../../networking/apiRoutes'

export type SaunaImageCarouselProps = {
    images: SaunaImage.Response[]
}

const SaunaImageCarousel = (props: SaunaImageCarouselProps) => {
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
    }

    return (
        <div className="px-12  bg-primary-200">
            <Slider {...settings} className="">
                {props.images.map(image => (
                    <div key={image.fileName}>
                        <img
                            src={getAbsoluteUrl(apiRoutes.saunaImages.get(image.fileName))}
                            alt={image.fileName}
                            className="h-96 m-auto"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SaunaImageCarousel
