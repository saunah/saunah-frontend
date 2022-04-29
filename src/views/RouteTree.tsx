import { Route } from 'use-react-router-breadcrumbs'
import Layout from './Layout'
import Home from './routes/Home'
import Overview from './routes/Overview'
import SaunaEditorView from './routes/sauna/SaunaEditorView'
import Showroom from './routes/Showroom'
import ProtectedRoute from './shared/ProtectedRoute'

const RouteTree = () => {
    return (
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/showroom" breadcrumb="Showroom" element={<Showroom />} />
            <Route path="/saunas" breadcrumb="Saunas">
                <Route index element={<Overview />} />
                <Route path=":saunaId" breadcrumb="Sauna Detail">
                    <Route index element={<div>Sauna Details</div>} />
                    <Route path="edit" breadcrumb="Bearbeiten" element={<SaunaEditorView />} />
                </Route>
                <Route path="create" breadcrumb="Erstellen" element={<SaunaEditorView />} />
            </Route>
            <Route path="/protected" element={<ProtectedRoute element={<div> Protected Route </div>} />} />
        </Route>
    )
}

export default RouteTree
