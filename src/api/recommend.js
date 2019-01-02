import axios from 'axios'
import { BANNER, SONGSHEET } from './baseUrl'
export function getRecommend () {
  return axios.get(BANNER)
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data.banners)
      }
    })
}

export function getDiscLists () {
  return axios.get(SONGSHEET)
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data.playlists)
      }
    })
}
