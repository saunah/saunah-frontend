import { Receipt } from '../../entities/Receipt'
import Table from '../base/Table'

export type ReceiptProps = {
    receipt: Receipt.Response
}

const ReceiptTable = (props: ReceiptProps) => {
    return <Table headings={['Kostenpunkt', 'Preis', 'Gebucht', 'Total']} elements={buildElements(props.receipt)} />
}

function buildElements(receipt: Receipt.Response) {
    const elements = [
        [
            'Stundenpreis',
            `CHF ${receipt.prices.hourlyRate} / h`,
            `${receipt.booked.duration} h`,
            `CHF ${receipt.prices.hourlyRate * receipt.booked.duration}`,
        ],
    ]

    if (receipt.booked.transportService > 0)
        elements.push([
            'Transportservice',
            `CHF ${receipt.prices.transportService} / km`,
            `${receipt.booked.transportService} km`,
            `CHF ${receipt.prices.transportService * receipt.booked.transportService}`,
        ])

    if (receipt.booked.handTowel > 0)
        elements.push([
            'Handtücher',
            `CHF ${receipt.prices.handTowel} / Stück`,
            `${receipt.booked.handTowel} Stück`,
            `CHF ${receipt.prices.handTowel * receipt.booked.handTowel}`,
        ])

    if (receipt.booked.wood > 0)
        elements.push([
            'Holzkisten',
            `CHF ${receipt.prices.wood} / Stück`,
            `${receipt.booked.wood} Stück`,
            `CHF ${receipt.prices.wood * receipt.booked.wood}`,
        ])
    if (receipt.booked.saunahImp > 0)
        elements.push([
            'Saunawichtel',
            `CHF ${receipt.prices.saunahImp} / h`,
            `${receipt.booked.saunahImp} h`,
            `CHF ${receipt.prices.saunahImp * receipt.booked.saunahImp}`,
        ])

    if (receipt.booked.washService)
        elements.push([
            'Waschservice',
            `CHF ${receipt.prices.washService}`,
            `${receipt.booked.washService ? 'Gebucht' : '-'}`,
            `CHF ${receipt.booked.washService ? receipt.prices.washService : 0}`,
        ])

    if (receipt.booked.deposit)
        elements.push([
            'Depot',
            `CHF ${receipt.prices.deposit}`,
            `${receipt.booked.deposit ? '' : '-'}`,
            `CHF ${receipt.booked.deposit ? receipt.prices.deposit : 0}`,
        ])

    elements.push(['Total', '', '', `CHF ${Receipt.calculateTotal(receipt)}`])
    return elements
}

export default ReceiptTable
