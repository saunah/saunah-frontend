import { useState } from 'react'
import Alert from '../../components/base/Alert'
import Button from '../../components/base/Button'
import Checkbox from '../../components/base/Checkbox'
import CheckboxLabel from '../../components/base/CheckboxLabel'
import Dropdown from '../../components/base/Dropdown'
import Input from '../../components/base/Input'
import PageTitle from '../../components/base/PageTitle'
import { useAlert } from '../shared/AlertProvider'

/**
 * The showroom is a little demo view, which shows all base components on one glance.
 * This can be removed later, when the components are in use.
 */
const Showroom = () => {
    const [checked, setChecked] = useState(false)
    const { success } = useAlert()

    return (
        <>
            <PageTitle>Showroom</PageTitle>
            <div className="space-y-2">
                <Button title="Click me" onClick={() => success('You clicked the button.')} />
                <Input name="Name" placeholder="Maybe Frank?" disabled={true} />
                <Input name="Falsy Name" error={true} placeholder="Seems so wrong" />
                <div className="flex space-x-2">
                    <Checkbox value={checked} onChange={setChecked} />
                    <Checkbox disabled={true} value={checked} onChange={setChecked} />
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
                <Dropdown
                    title="Dropdown"
                    items={[[{ label: 'Item 1' }, { label: 'Item 2' }], [{ label: 'Home', route: '/' }]]}
                />
            </div>
        </>
    )
}

export default Showroom
