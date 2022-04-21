import { useState } from 'react'
import { Sauna } from '../entities/Sauna'
import api from '../networking/api'
import { Id, insert, removeId } from '../utils/identifiable'

export type SaunaState = {
    /**
     * All saunas which are currently fetched from the backend
     */
    saunas: Sauna.Response[]
    /**
     * Fetches all saunas from the backend
     */
    fetchAll: () => Promise<void>
    /**
     * Fetches the sauna with the given id from the backend
     */
    fetch: (saunaId: Id) => Promise<void>
    /**
     * Saves the provided sauna to the backend.
     * If the saunas id is null, the sauna will be created.
     * If the saunas id is set, and update request is performed.
     */
    save: (sauna: Sauna.Request) => Promise<void>
    /**
     * Removes the sauna from the backend and
     * the fetched saunas in the frontend.
     */
    remove: (saunaId: Id) => Promise<void>
}

/**
 * This hook provides the api needed to interact with saunas.
 */
export function useSauna(): SaunaState {
    const [saunas, setSaunas] = useState<Sauna.Response[]>([])
    const insertSauna = (newSauna: Sauna.Response) => setSaunas(insert(saunas, newSauna))

    const fetchAll = async () => setSaunas(await api.sauna.list())
    const fetch = async (saunaId: Id) => insertSauna(await api.sauna.get(saunaId))
    const save = async (sauna: Sauna.Request) => {
        if (sauna.id != null) await api.sauna.edit(sauna.id, sauna)
        else await api.sauna.add(sauna)
        fetchAll()
    }

    const remove = async (saunaId: Id) => {
        await api.sauna.remove(saunaId)
        setSaunas(removeId(saunas, saunaId))
    }

    return { saunas, fetchAll, fetch, save, remove }
}
