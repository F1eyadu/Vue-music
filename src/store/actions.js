import { playMode} from '@/assets/js/config'
import { shuffle, saveSearch, deleteSearch, clearSearch, savePlay, saveLove, deleteLove} from '@/assets/js/tool'
import { SET_PLAYING, SET_FULL_SCREEN, SET_PLAT_LIST, SET_SEQUENCE_LIST, SET_CURRENT_INDEX, SET_MODE, SET_SEARCH_HISTORY, SET_PLAY_HISTORY, SET_LOVE_LIST } from './mutationTypes'
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
    },
    insertSong({commit, state}, song) {
        let playList = state.playList.slice()
        let sequenceList = state.sequenceList.slice()
        let currentIndex = state.currentIndex
        
        let currentSong = playList[currentIndex]
        let finIndex = findIndexs(playList, song)
        currentIndex++
        playList.splice(currentIndex, 0, song)
        if(finIndex > -1) {
            if(currentIndex > finIndex){
                playList.splice(finIndex, 1)
                currentIndex--
            } else {
                playList.splice(finIndex + 1, 1)
            }
        }
        let currentSIndex = findIndexs(sequenceList, currentSong) + 1
        let fsIndex = findIndexs(sequenceList, song)
        sequenceList.splice(currentSIndex, 0, song)
        if(fsIndex > -1) {
            if(currentSIndex > fsIndex) {
                sequenceList.splice(fsIndex, 1)
            }else{
                sequenceList.splice(fsIndex + 1, 1)
            }
        }
        commit(SET_PLAT_LIST, playList)
        commit(SET_SEQUENCE_LIST, sequenceList)
        commit(SET_CURRENT_INDEX, currentIndex)
        commit(SET_FULL_SCREEN, true)
        commit(SET_PLAYING, true)
    },
    saveSearchHistory({commit}, query) {
        commit(SET_SEARCH_HISTORY, saveSearch(query))
    },
    deleteSearchHistory({commit}, query) {
        commit(SET_SEARCH_HISTORY, deleteSearch(query))
    },
    clearSearchHistory({commit}) {
        commit(SET_SEARCH_HISTORY, clearSearch())
    },
     deleteSong({commit, state},song) {
        let playList = state.playList.slice()
        let sequenceList = state.sequenceList.slice()
        let currentIndex = state.currentIndex
        let pIndex = findIndexs(playList, song)
        playList.splice(pIndex, 1)
        let sIndex = findIndexs(sequenceList, song)
        sequenceList.splice(sIndex, 1)
        if(currentIndex > pIndex || currentIndex === playList.length) {
            currentIndex --  
        }
        commit(SET_PLAT_LIST, playList)
        commit(SET_SEQUENCE_LIST, sequenceList)
        commit(SET_CURRENT_INDEX, currentIndex)
        const playingState = playList.length > 0
        commit(SET_PLAYING, playingState)
     }, 
     deleteSongList({commit}) {
        commit(SET_PLAT_LIST, [])
        commit(SET_SEQUENCE_LIST, [])
        commit(SET_CURRENT_INDEX, -1)
        commit(SET_PLAYING, false)
     },
     savePlayHistory({commit}, song) {
        commit(SET_PLAY_HISTORY, savePlay(song))
     },
     saveLoveList({commit}, song) {
        commit(SET_LOVE_LIST, saveLove(song))
     },
     deleteLoveList({commit}, song) {
        commit(SET_LOVE_LIST, deleteLove(song))
     }
}

const findIndexs = (list, song) => {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}
export default actions
