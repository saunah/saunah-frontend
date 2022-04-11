import { useState } from 'react'
import Alert from '../../../components/base/Alert'
import Button from '../../../components/base/Button'
import Checkbox from '../../../components/base/Checkbox'
import CheckboxLabel from '../../../components/base/CheckboxLabel'
import Input from '../../../components/base/Input'

const Showroom = () => {
    const [checked, setChecked] = useState(false)

    return (
        <div className="space-y-2 w-96">
            <Button color="blue" title="Click me" />
            <Input name="Name" placeholder="Maybe Frank?" disabled={true} />
            <Input name="Falsy Name" error={true} placeholder="Seems so wrong" />
            <div className="flex space-x-2">
                <Checkbox color="blue" value={checked} onChange={setChecked} />
                <Checkbox color="blue" disabled={true} value={checked} onChange={setChecked} />
                <Checkbox color="red" disabled={false} value={checked} onChange={setChecked} />
                <Checkbox color="red" disabled={true} value={checked} onChange={setChecked} />
            </div>
            <CheckboxLabel
                label="I will pay saunah a lot of money"
                details="Seriously a lot, like 1000 francs"
                color="blue"
                value={checked}
                onChange={setChecked}
            />
            <CheckboxLabel
                label="I will book 15 saunas a year."
                details="Maybe even more, just at least 15"
                color="blue"
                value={checked}
                disabled={true}
                onChange={setChecked}
            />
            <Alert text="This was successful" variant="success" />
            <Alert text="This was an error" variant="error" />
        </div>
    )
}

export default Showroom
