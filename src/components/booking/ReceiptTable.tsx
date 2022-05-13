import { Receipt } from '../../entities/Receipt'
import Table from '../base/Table'

export type ReceiptProps = {
    receipt: Receipt.Response
}

const ReceiptTable = (props: ReceiptProps) => {
    const receipt = props.receipt
    return (
        <div>
            <Table
                headings={['Kostenpunkt', 'Preis', 'Gebucht', 'Total']}
                elements={[
                    [
                        'Stundenpreis',
                        `CHF ${receipt.prices.hourlyRate} / h`,
                        `${receipt.booked.duration} h`,
                        `CHF ${receipt.prices.hourlyRate * receipt.booked.duration}`,
                    ],
                    [
                        'Transportservice',
                        `CHF ${receipt.prices.transportService} / km`,
                        `${receipt.booked.transportService} km`,
                        `CHF ${receipt.prices.transportService * receipt.booked.transportService}`,
                    ],
                    [
                        'Handtücher',
                        `CHF ${receipt.prices.handTowel} / Stück`,
                        `${receipt.booked.handTowel} Stück`,
                        `CHF ${receipt.prices.handTowel * receipt.booked.handTowel}`,
                    ],
                    [
                        'Holzkisten',
                        `CHF ${receipt.prices.wood} / Stück`,
                        `${receipt.booked.wood} Stück`,
                        `CHF ${receipt.prices.wood * receipt.booked.wood}`,
                    ],
                    [
                        'Saunawichtel',
                        `CHF ${receipt.prices.saunahImp} / h`,
                        `${receipt.booked.saunahImp} h`,
                        `CHF ${receipt.prices.saunahImp * receipt.booked.saunahImp}`,
                    ],
                    [
                        'Waschservice',
                        `CHF ${receipt.prices.washService}`,
                        `${receipt.booked.washService ? 'Gebucht' : '-'}`,
                        `CHF ${receipt.booked.washService ? receipt.prices.washService : 0}`,
                    ],
                    [
                        'Depot',
                        `CHF ${receipt.prices.deposit}`,
                        `${receipt.booked.deposit ? '' : '-'}`,
                        `CHF ${receipt.booked.deposit ? receipt.prices.deposit : 0}`,
                    ],
                    ['Total', '', '', `CHF ${Receipt.calculateTotal(receipt)}`],
                ]}
            />

            {/* <div className="p-4 rounded-lg bg-primary-100 grid grid-cols-4">
                <div> Stundenpreis der Sauna </div>
                <div> CHF 4 / h </div>
                <div> Hello </div>
                <div> Hello </div>
                <div> Hello </div>
                <div> Hello </div>
                <div> Hello </div>
                <div> Hello </div>
            </div> */}
        </div>
    )
}

export default ReceiptTable
