<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script>
import MusicList from '_c/musicList/musicList'
import { mapGetters} from 'vuex'
import { getPlayList } from '_api/recommend'
import { createSong} from '@/assets/js/song'
export default {
    data() {
        return {
            songs: [],
            rank: true
        }
    },
    computed: {
        ...mapGetters([
            'currentTopList'
        ]),
        title() {
            return this.currentTopList.name
        },
        bgImage() {
            return this.currentTopList.coverImgUrl
        }
    },
    created() {
        this._getRankDetail()
    },
    methods: {
        _getRankDetail() {
            if(!this.currentTopList.id){
                this.$router.push({
                    path: '/rank'
                })
                return
            }
            getPlayList(this.currentTopList.id).then(res => {
                this.songs = this._normalized(res)
            })
        },
        _normalized(list) {
            let ret = []
            list.forEach(item => {
                if (item.id && item.al.id) {
                    ret.push(createSong(item))
                }
            })
            return ret
        }
    },
    components:{
        MusicList
    }
}
</script>
<style lang="scss" scoped>
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }
    .slide-enter, .slide-leave-to{
        transform: translate3d(100%, 0 , 0)
    }
</style>
