import { RANKLIST } from './baseUrl'
import axios from 'axios'
export function getRankList() {
    return axios.get(RANKLIST)
    .then(res => {
        if(res.status === 200) {
            return Promise.resolve(res.data.list)
        }
    })
}