import { ReactElement } from 'react'
import { Receipt } from '../../entities/Receipt'
import Table from '../base/Table'

export type ReceiptProps = {
    receipt: Receipt.Response
}

const ReceiptTable = (props: ReceiptProps) => {
    return <Table headings={['Kostenpunkt', 'Preis', 'Gebucht', 'Total']} elements={buildElements(props.receipt)} />
}

function formatPrice(price: number): string {
    if (price > 0) return `CHF ${Math.round(price * 20) / 20}`
    else return `- CHF ${Math.round(-price * 20) / 20}`
}

function buildElements(receipt: Receipt.Response) {
    const highlight = (text: string | ReactElement) => <span className="font-semibold text-gray-700">{text}</span>

    const elements: (string | ReactElement)[][] = [
        [
            'Stundenpreis',
            `${formatPrice(receipt.prices.hourlyRate)} / h`,
            `${receipt.booked.duration} h`,
            formatPrice(receipt.prices.hourlyRate * receipt.booked.duration),
        ],
    ]

    if (receipt.booked.transportService > 0)
        elements.push([
            'Transportservice',
            `${formatPrice(receipt.prices.transportService)} / km`,
            `${receipt.booked.transportService} km`,
            formatPrice(receipt.prices.transportService * receipt.booked.transportService),
        ])

    if (receipt.booked.handTowel > 0)
        elements.push([
            'Handtücher',
            `${formatPrice(receipt.prices.handTowel)} / Stück`,
            `${receipt.booked.handTowel} Stück`,
            formatPrice(receipt.prices.handTowel * receipt.booked.handTowel),
        ])

    if (receipt.booked.wood > 0)
        elements.push([
            'Holzkisten',
            `${formatPrice(receipt.prices.wood)} / Stück`,
            `${receipt.booked.wood} Stück`,
            formatPrice(receipt.prices.wood * receipt.booked.wood),
        ])
    if (receipt.booked.saunahImp > 0)
        elements.push([
            'Saunawichtel',
            `${formatPrice(receipt.prices.saunahImp)} / h`,
            `${receipt.booked.saunahImp} h`,
            formatPrice(receipt.prices.saunahImp * receipt.booked.saunahImp),
        ])

    if (receipt.booked.washService)
        elements.push([
            'Waschservice',
            formatPrice(receipt.prices.washService),
            `${receipt.booked.washService ? 'Gebucht' : '-'}`,
            formatPrice(receipt.booked.washService ? receipt.prices.washService : 0),
        ])

    if (receipt.booked.deposit)
        elements.push([
            'Depot',
            formatPrice(receipt.prices.deposit),
            `${receipt.booked.deposit ? 'Notwendig' : '-'}`,
            formatPrice(receipt.booked.deposit ? receipt.prices.deposit : 0),
        ])

    if (receipt.booked.discount) elements.push(['Preisanpassung', '', '', formatPrice(-receipt.booked.discount)])

    elements.push([highlight('Total'), '', '', highlight(`CHF ${Receipt.calculateTotal(receipt)}`)])
    return elements
}

export default ReceiptTable
