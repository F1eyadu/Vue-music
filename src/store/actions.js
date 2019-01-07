import { SET_PLAYING, SET_FULL_SCREEN, SET_PLAT_LIST, SET_SEQUENCE_LIST, SET_CURRENT_INDEX } from './mutationTypes'
const actions = {
    selectPlay({commit, state}, {list, index}) {
        commit(SET_SEQUENCE_LIST, list)
        commit(SET_PLAT_LIST, list)
        commit(SET_CURRENT_INDEX, index)
        commit(SET_SEQUENCE_LIST, list)
        commit(SET_FULL_SCREEN, true)
        commit(SET_PLAYING, true)
    }
}

export default actions
