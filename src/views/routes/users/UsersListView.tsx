import { PencilIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import Table from '../../../components/base/Table'
import { User } from '../../../entities/User'
import api from '../../../networking/api'

function UsersListView() {
    const headings = ['Name', 'E-Mail', 'Telefon', 'Benutzerrolle', '']
    const [users, setUsers] = useState<User.Response[]>([])

    useEffect(() => {
        api.user.list().then(setUsers)
    }, [])

    function implodeNonEmpty(values: string[], separator: string = ' ') {
        return values.filter(v => v.trim().length > 0).join(separator)
    }

    return (
        <div data-testid="users-list-view">
            <PageTitle>Benutzerverwaltung</PageTitle>
            <Table
                headings={headings}
                elements={users.map(user => {
                    return [
                        <Link to={`/users/${user.id}`}>{implodeNonEmpty([user.firstName, user.lastName])}</Link>,
                        <a href={`mailto:${user.email}`}>{user.email}</a>,
                        <a href={`tel:${user.telephone}`}>{user.telephone}</a>,
                        user.role,
                        <Link to={`/users/${user.id}`} className="text-right">
                            <PencilIcon className="w-6 h-6 float-right" />
                        </Link>,
                    ]
                })}
            />
        </div>
    )
}

export default UsersListView
