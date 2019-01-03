<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '_api/singer'
import { createSong } from '@/assets/js/song'
import MusicList from '_c/musicList/musicList'
export default {
    data() {
        return {
          songs: []
        }
    },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage() {
            return this.singer.picUrl
        },
        ...mapGetters(['singer'])
    },
    created() {
        this._getDetail()
    },
    methods: {
        _getDetail() {
         if(!this.singer.id){
             this.$router.push('/singer')
             return
         }
          getSingerDetail(this.singer.id).then( res => {
            this.songs = this._normalizeSongs(res.hotSongs)
          })
        },
        _normalizeSongs(lists) {
            let ret = []
            lists.forEach(item => {
                if(item.id && item.al.id){
                    ret.push(createSong(item))
                }
            })
            return ret
        }
     },
     components: {
         MusicList
     } 
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
.slide-enter-active, .slide-leave-active{
    transition: all .3s;
}
.slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
}
</style>
