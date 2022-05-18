import { ReactElement } from 'react'

const enum TableColumnType {
    HEAD = 'th',
    DATA = 'td',
}

export type TableProps = {
    headings?: (string | ReactElement)[]
    elements: (string | ReactElement)[][]
    testId?: string
}

/**
 * A simple table component, to which headings (optional) and
 * data elements can be passed, which will then be rendered as
 * a table.
 * Data can either be a ReactElement of a plain string.
 */
function Table({ headings, elements, testId }: TableProps) {
    const defaultTestId = 'table'
    const tableClasses = 'table-auto min-w-full text-left'

    return (
        <div className="overflow-x-auto">
            <table className={tableClasses} data-testid={testId || defaultTestId}>
                {headings && headings.length > 0 && (
                    <thead>
                        <TableRow row={headings} columnType={TableColumnType.HEAD} />
                    </thead>
                )}
                {elements.length > 0 && (
                    <tbody>
                        {elements.map((row, rowIdx) => (
                            <TableRow row={row} key={rowIdx} />
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default Table

type TableRowProps = {
    row: (string | ReactElement)[]
    columnType?: TableColumnType
}

function TableRow({ row, columnType }: TableRowProps) {
    const ColumnType = columnType || TableColumnType.DATA
    const rowClasses = 'border-b border-primary-200 transition duration-300 ease-in-out hover:bg-primary-100'
    const columnClasses =
        'py-4 px-2 ' +
        (ColumnType === TableColumnType.HEAD ? 'text-primary-500 font-semibold' : 'text-primary-600 font-normal')

    function isLastElement(index: number) {
        return index + 1 === row.length
    }

    return (
        <tr className={rowClasses}>
            {row.map((element, elementIdx) => (
                <ColumnType
                    key={elementIdx}
                    className={columnClasses + (isLastElement(elementIdx) ? ' text-right' : ' text-left')}
                >
                    {element}
                </ColumnType>
            ))}
        </tr>
    )
}
