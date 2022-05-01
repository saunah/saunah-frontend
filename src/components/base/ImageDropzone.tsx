import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export type DropzoneProps = {
    onFilesChanged?: (files: File[]) => void
}

const Dropzone = (props: DropzoneProps) => {
    const [previews, setPreviews] = useState<string[]>([])

    const { getRootProps, isDragAccept } = useDropzone({
        accept: { 'image/*': [] },
        onDropAccepted: acceptedFiles => {
            props.onFilesChanged?.(acceptedFiles)
            const previews = acceptedFiles.map(file => URL.createObjectURL(file))
            setPreviews(previews)
        },
    })

    const rootClasses =
        'w-full h-20 rounded-lg border-dashed border-2 flex items-center justify-center ' +
        (isDragAccept ? 'bg-accent-100 border-accent-200' : 'bg-primary-100 border-primary-200')

    return (
        <div>
            <div {...getRootProps()} className={rootClasses}>
                <p className="text-primary-500 text-sm font-semibold">{'Fügen Sie Dateien per Drag & Drop hinzu.'}</p>
            </div>
            {previews.length > 0 && (
                <div className="mt-2">
                    <h4 className="text-lg font-medium text-primary-700"> Ausgewählte Dateien </h4>
                    <div className="mt-2 flex flex-wrap gap-4">
                        {previews.map(preview => (
                            <div key={preview}>
                                <div>
                                    <img
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
}

export default Dropzone
