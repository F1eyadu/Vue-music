import { SEARCH_HOT, SEARCH_SUGGEST } from './baseUrl'
import axios from 'axios'
export function searchHot() {
    return axios.get(SEARCH_HOT)
    .then( res => {
        if(res.status === 200) {
            return Promise.resolve(res.data.result.hots)
        }
    })
}
export function searchSuggest(keyWord,page) {
    let url = SEARCH_SUGGEST + keyWord + '&offset=' + page
    return axios.get(url)
    .then( res => {
        if(res.status === 200) {
            return Promise.resolve(res.data.result.songs)
        }
    })
}
