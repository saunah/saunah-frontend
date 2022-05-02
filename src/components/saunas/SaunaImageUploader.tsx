import { useRef, useState } from 'react'
import ImageDropzone, { DropzoneRef } from '../base/ImageDropzone'
import Button from '../base/Button'

export type SaunaImageUploaderProps = {
    onSubmit?: (files: File[]) => void
}

const SaunaImageUploader = (props: SaunaImageUploaderProps) => {
    const [images, setImages] = useState<File[]>([])
    const dropzoneRef = useRef<DropzoneRef>(null)

    const submit = () => {
        props.onSubmit?.(images)
        dropzoneRef.current?.reset()
        setImages([])
    }

    let buttonText = 'Bilder hochladen'
    if (images.length === 1) buttonText = '1 Bild hochladen'
    else if (images.length > 1) buttonText = `${images.length} Bilder hochladen`

    return (
        <div data-testid="sauna-image-uploader">
            <ImageDropzone onFilesChanged={setImages} ref={dropzoneRef} />
            <div className="mt-2">
                <Button disabled={images.length === 0} onClick={submit}>
                    {buttonText}
                </Button>
            </div>
        </div>
    )
}

export default SaunaImageUploader
