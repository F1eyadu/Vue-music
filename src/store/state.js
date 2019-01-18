import { playMode} from '@/assets/js/config'
import { loadSearch } from '@/assets/js/tool'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    desc: {},
    topList: {},
    searchHistory: loadSearch()
}

export default state