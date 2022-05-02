import { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export type DropzoneProps = {
    onFilesChanged?: (files: File[]) => void
}

export type DropzoneRef = {
    reset: () => void
}

const Dropzone = forwardRef((props: DropzoneProps, ref: Ref<DropzoneRef>) => {
    const [previews, setPreviews] = useState<string[]>([])

    const { getRootProps, isDragAccept } = useDropzone({
        accept: { 'image/*': [] },
        onDropAccepted: acceptedFiles => {
            props.onFilesChanged?.(acceptedFiles)
            const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file))
            setPreviews(newPreviews)
        },
    })

    useImperativeHandle(ref, () => ({
        reset: () => setPreviews([]),
    }))

    const rootClasses =
        'w-full h-20 rounded-lg border-dashed border-2 flex items-center justify-center ' +
        (isDragAccept ? 'bg-accent-100 border-accent-200' : 'bg-primary-100 border-primary-200')

    return (
        <div data-testid="image-dropzone">
            <div {...getRootProps()} className={rootClasses} data-testid="dropzone">
                <p className="text-primary-500 text-sm font-semibold">{'Fügen Sie Dateien per Drag & Drop hinzu.'}</p>
            </div>
            {previews.length > 0 && (
                <div className="mt-2">
                    <h4 className="text-lg font-medium text-primary-700"> Ausgewählte Dateien </h4>
                    <div className="mt-2 flex flex-wrap gap-4">
                        {previews.map((preview, index) => (
                            <div key={preview}>
                                <div>
                                    <img
                                        data-testid={`preview-${index + 1}`}
                                        className="h-40"
                                        alt="preview"
                                        src={preview}
                                        // Revoke data uri after image is loaded
                                        onLoad={() => URL.revokeObjectURL(preview)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
})

export default Dropzone
