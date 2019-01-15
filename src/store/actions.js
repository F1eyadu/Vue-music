import { playMode} from '@/assets/js/config'
import { shuffle} from '@/assets/js/tool'
import { SET_PLAYING, SET_FULL_SCREEN, SET_PLAT_LIST, SET_SEQUENCE_LIST, SET_CURRENT_INDEX, SET_MODE } from './mutationTypes'
const actions = {
    selectPlay({commit, state}, {list, index}) {
        commit(SET_SEQUENCE_LIST, list)
        if(state.mode === playMode.random) {
            let randomList = shuffle(list)
            commit(SET_PLAT_LIST, randomList)
            index = findIndexs(randomList, list[index])
            commit(SET_CURRENT_INDEX, index)
        }else{
            commit(SET_PLAT_LIST, list)
            commit(SET_CURRENT_INDEX, index)
        }
        commit(SET_SEQUENCE_LIST, list)
        commit(SET_FULL_SCREEN, true)
        commit(SET_PLAYING, true)
    },
    randomPlay({commit}, {list}) {
        commit(SET_MODE, playMode.random)
        commit(SET_SEQUENCE_LIST, list)
        let randomList = shuffle(list)
        commit(SET_PLAT_LIST, randomList)
        commit(SET_CURRENT_INDEX, 0)
        commit(SET_FULL_SCREEN, true)
        commit(SET_PLAYING, true)
    }
}

const findIndexs = (list, song) => {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}
export default actions
