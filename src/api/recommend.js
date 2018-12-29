import axios from 'axios'
import { BANNER } from './baseUrl'
export function getRecommend () {
  return axios.get(BANNER)
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data.banners)
      }
    })
}
