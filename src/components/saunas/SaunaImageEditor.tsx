import { SaunaImage } from '../../entities/SaunaImage'

export type SaunaImageEditorProps = {
    images: SaunaImage.Response[]
}

const SaunaImageEditor = (props: SaunaImageEditorProps) => {
    return <div>{props.images.map(image => image.fileName)}</div>
}

export default SaunaImageEditor
