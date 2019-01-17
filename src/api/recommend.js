import axios from 'axios'
import { BANNER, SONGSHEET, PLAYLIST } from './baseUrl'
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

export function getPlayList(id) {
    let url = PLAYLIST + id
    return axios.get(url)
    .then(res => {
      if(res.status === 200) {
          return Promise.resolve(res.data.playlist.tracks)
      }
    })
}
