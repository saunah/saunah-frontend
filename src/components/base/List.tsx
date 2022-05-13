const List = ({ items }: ListProps) => {
    return (
        <dl>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={
                        'py-4 px-2 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-primary-200 transition duration-300 ease-in-out hover:bg-primary-100'
                    }
                >
                    <dt className="font-medium text-primary-500">{item.title}</dt>
                    <dd className="mt-1 sm:mt-0 sm:col-span-2 text-primary-600">{item.text || '-'}</dd>
                </div>
            ))}
        </dl>
    )
}

export default List

export type ListProps = {
    items: ListItem[]
}

export type ListItem = {
    title: string
    text?: string | null
}
