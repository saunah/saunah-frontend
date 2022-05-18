import { SaunaImage } from '../../entities/SaunaImage'
import IconButton from '../base/IconButton'
import { TrashIcon } from '@heroicons/react/solid'

export type SaunaImageEditorProps = {
    images: SaunaImage.Response[]
    onRemove?: (image: SaunaImage.Response) => void
    className?: string
}

const SaunaImageEditor = (props: SaunaImageEditorProps) => {
    return (
        <div className={props.className + ' flex flex-wrap gap-4'} data-testid="sauna-image-editor">
            {props.images.map(image => (
                <div key={image.url} className="relative h-40">
                    <IconButton
                        data-testid={'remove-button-' + image.id}
                        icon={TrashIcon}
                        className="top-1 left-1 absolute"
                        color="red"
                        size={4}
                        onClick={() => props.onRemove?.(image)}
                    />

                    <img data-testid={'image-' + image.id} className="h-full" src={image.url} alt="" />
                </div>
            ))}
        </div>
    )
}

export default SaunaImageEditor
