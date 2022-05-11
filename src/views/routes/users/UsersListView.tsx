import Table from '../../../components/base/Table'

function UsersListView() {
    const headings = ['Head1', 'Head2', 'Head3']

    const elements = [
        ['One One', 'One Two', 'One Three'],
        ['Two One', 'Two Two', 'Two Three'],
        ['Three One', 'Three Two', 'Three Three'],
    ]

    return <Table headings={headings} elements={elements} />
}

export default UsersListView
