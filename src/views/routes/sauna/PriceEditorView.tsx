import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import PriceEditor from '../../../components/saunas/PriceEditor'
import { Price } from '../../../entities/Price'
import api from '../../../networking/api'
import { useAlert } from '../../shared/AlertProvider'

const PriceEditorView = () => {
    const [price, setPrice] = useState(Price.emptyRequest())
    const { success } = useAlert()
    const navigate = useNavigate()

    const fetch = () => {
        api.price.list().then(prices => {
            if (prices.length > 0) setPrice(Price.mapToRequest(prices[0]))
        })
    }

    useEffect(() => fetch(), [])

    const onSubmit = async () => {
        if (price.id != null) await api.price.edit(price.id, price)
        else await api.price.add(price)
        success('Die Preise wurden gespeichert.')
        navigate('/saunas')
    }

    return (
        <div data-testid="price-editor-view">
            <PageTitle>Preise anpassen</PageTitle>
            <PriceEditor value={price} onChange={setPrice} onSubmit={onSubmit} />
        </div>
    )
}

export default PriceEditorView
