import axios from 'axios'
import { SINGER} from './baseUrl'

export function getSingers () {
    return axios.get(SINGER)
      .then(res => {
        if (res.status === 200) {
          return Promise.resolve(res.data.artists)
        }
      })
  }