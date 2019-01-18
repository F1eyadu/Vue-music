import axios from 'axios'
import { SONGURL, SONGLYRICURL, SONG_DETAIL } from './baseUrl'
export function getSongUrl(songId) {
  const url = SONGURL + songId
  return axios.get(url)
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data.data[0].url)
      }
    })
}
export function getSongLyric(songId) {
  const url = SONGLYRICURL + songId
  return axios.get(url)
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data.lrc.lyric)
      }
    })
}

export function getSongDetail(songId) {
  const url = SONG_DETAIL + songId
  return axios.get(url)
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data.songs[0])
      }
    })
}