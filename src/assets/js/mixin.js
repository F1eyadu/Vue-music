import { mapGetters, mapActions, mapMutations} from 'vuex'
import {playMode } from '@/assets/js/config'
import {shuffle } from '@/assets/js/tool'
export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
        this.handlePlayList(this.playList)
    },
    activated() {
        this.handlePlayList(this.playList)
    },
    watch: {
        playList (newVal) {
            this.handlePlayList(newVal)
        }  
    },
    methods: {
        handlePlayList() {
            throw new Error('component must important handlePlaylist method')
        }
    }
}

export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 120
        }
    },
    computed: {
        ...mapGetters([
            'getHistory'
        ])
    },
    methods: {
        listenQuery(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        addQuery(txt) {
            this.$refs.searchBox.setQuery(txt)
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory'
        ])
    }
}

export const playerMixin ={
    computed: {
        iconMode() {
            return this.mode === playMode['sequence'] ? 'icon-list': this.mode === playMode['loop'] ? 'icon-loop':'icon-random'
        },
        ...mapGetters([
            'sequenceList',
            'currentSong',
            'playList',
            'mode',
            'loveList'
        ])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.SET_MODE(mode)
            let list = null
            if(mode === playMode.random) {
                list = shuffle(this.sequenceList)
            }else{
                list = this.sequenceList
            }
            this._resetCurrentIndex(list)
            this.SET_PLAT_LIST(list)
        },
        _resetCurrentIndex(list) {
            let index = list.findIndex((value) => {
                return value.id === this.currentSong.id
            })
            this.SET_CURRENT_INDEX(index)
        },
        toggleLove(song) {
            if(this.isLove(song)) {
                this.deleteLoveList(song)
            }else{
                this.saveLoveList(song)
            }
        },
        getLoveIcon(song) {
            if(this.isLove(song)) {
                return `icon-love`
            }else{
                return `icon-notlove`
            }
        },
        isLove(song) {
            const index = this.loveList.findIndex((item) => {
                return item.id === song.id  
            })
            return index > -1
        },
        ...mapMutations([
            'SET_PLAYING',
            'SET_CURRENT_INDEX',
            'SET_MODE',
            'SET_PLAT_LIST'
        ]),
        ...mapActions([
            'saveLoveList',
            'deleteLoveList'
        ])
    },
}