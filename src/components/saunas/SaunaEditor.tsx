import { Sauna } from '../../entities/Sauna'

export type SaunaEditorProps = {
    sauna: Sauna.Request
    onSubmit?: () => void
}

const SaunaEditor = (props: SaunaEditorProps) => {
    return <div>{`name: ${props.sauna.name}`}</div>
}

export default SaunaEditor
