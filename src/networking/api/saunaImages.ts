import axios from 'axios'
import { SaunaImage } from '../../entities/SaunaImage'
import { mapInArray } from '../../utils/mapping'
import { DeepReadonly } from '../../utils/object'
import apiRoutes from '../apiRoutes'

export type SaunaImageAPI = DeepReadonly<{
    list(saunaId: number): Promise<SaunaImage.Response[]>
    add(saunaId: number, files: File[]): Promise<void>
    remove(imageId: number): Promise<void>
}>

const saunaImageApi: SaunaImageAPI = {
    async list(saunaId: number): Promise<SaunaImage.Response[]> {
        const response = await axios.get(apiRoutes.saunaImages.list(saunaId))
        return mapInArray(response.data, SaunaImage.mapIn)
    },
    async add(saunaId: number, files: File[]): Promise<void> {
        const multiplart = new FormData()
        files.forEach(file => multiplart.append('images', file))
        await axios.post(apiRoutes.saunaImages.add(saunaId), multiplart)
    },
    async remove(imageId: number): Promise<void> {
        await axios.post(apiRoutes.saunaImages.remove(imageId), undefined, { params: { imageId: imageId } })
    },
}

export default saunaImageApi
