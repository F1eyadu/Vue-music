
const getters = {
    singer(state) {
        return state.singer
    },
    playing(state) {
        return state.playing
    },
    fullScreen(state) {
        return state.fullScreen
    },
    playList(state) {
        return state.playList
    },
    sequenceList(state) {
        return state.sequenceList
    },
    mode(state) {
        return state.mode
    },
    currentIndex(state) {
        return state.currentIndex
    },
    currentSong(state) {
        return state.playList[state.currentIndex] || {}
        
    },
    currentDesc(state) {
        return state.desc
    },
    currentTopList(state) {
        return state.topList
    },
    getHistory(state) {
        return state.searchHistory
    },
    playHistory(state) {
        return state.playHistory
    },
    loveList(state) {
        return state.loveList
    }
}
export default getters