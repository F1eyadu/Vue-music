import axios from 'axios'
import { SINGER, SINGERDETAIL} from './baseUrl'

export function getSingers () {
    return axios.get(SINGER)
      .then(res => {
        if (res.status === 200) {
          return Promise.resolve(res.data.artists)
        }
      })
  }

export function getSingerDetail(singerId) {
    const url = SINGERDETAIL + singerId
    return axios.get(url)
      .then(res => {
        if (res.status === 200) {
          return Promise.resolve(res.data)
        }
      })
}