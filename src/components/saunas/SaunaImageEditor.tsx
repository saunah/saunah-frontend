import { SaunaImage } from '../../entities/SaunaImage'
import apiRoutes, { getAbsoluteUrl } from '../../networking/apiRoutes'
import IconButton from '../base/IconButton'
import { TrashIcon } from '@heroicons/react/solid'

export type SaunaImageEditorProps = {
    images: SaunaImage.Response[]
    onRemove?: (image: SaunaImage.Response) => void
    className?: string
}

const SaunaImageEditor = (props: SaunaImageEditorProps) => {
    return (
        <div className={props.className + ' flex flex-wrap gap-4'}>
            {props.images.map(image => (
                <div key={image.fileName} className="relative h-40">
                    <IconButton
                        icon={TrashIcon}
                        className="top-1 left-1 absolute"
                        color="red"
                        size={4}
                        onClick={() => props.onRemove?.(image)}
                    />

                    <img
                        className="h-full"
                        src={getAbsoluteUrl(apiRoutes.saunaImages.get(image.fileName))}
                        alt={image.fileName}
                    />
                </div>
            ))}
        </div>
    )
}

export default SaunaImageEditor
