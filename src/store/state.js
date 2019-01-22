import { playMode} from '@/assets/js/config'
import { loadSearch, loadPlay, loadLove } from '@/assets/js/tool'
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
    searchHistory: loadSearch(),
    playHistory: loadPlay(),
    loveList: loadLove()
}

export default state