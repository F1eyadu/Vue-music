import axios from 'axios'
import { SONGURL} from './baseUrl'
export function getSongUrl(songId) {
    const url = SONGURL + songId
    return axios.get(url)
      .then(res => {
        if (res.status === 200) {
          return Promise.resolve(res.data.data[0].url)
        }
      })
}