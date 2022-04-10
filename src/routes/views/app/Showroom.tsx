import { useState } from 'react'
import Button from '../../../components/base/Button'
import Checkbox from '../../../components/base/Checkbox'
import Input from '../../../components/base/Input'

const Showroom = () => {
    const [checked, setChecked] = useState(false)

    return (
        <div className="space-y-2">
            <Button color="blue" title="Click me" />
            <Input name="Name" placeholder="Maybe Frank?" disabled={true} />
            <Input name="Falsy Name" error={true} placeholder="Seems so wrong" />
            <div className="flex space-x-2">
                <Checkbox color="purple" value={checked} onChange={setChecked} />
                <Checkbox color="purple" disabled={true} value={checked} onChange={setChecked} />
                <Checkbox color="blue" disabled={false} value={checked} onChange={setChecked} />
                <Checkbox color="blue" disabled={true} value={checked} onChange={setChecked} />
            </div>
        </div>
    )
}

export default Showroom
