import Button from '../../../components/base/Button'
import Input from '../../../components/base/Input'

const Showroom = () => {
    return (
        <div className="space-y-2">
            <Button color="blue" title="Click me" />
            <Input name="Name" placeholder="Maybe Frank?" disabled={true} />
            <Input name="Falsy Name" error={true} placeholder="Seems so wrong" />
        </div>
    )
}

export default Showroom
