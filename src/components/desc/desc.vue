<template>
    <transition name="slide">
       <music-list :title="title" bg-image="bgImage"></music-list> 
    </transition>
</template>
<script>
import MusicList from '_c/musicList/musicList'
import { mapGetters} from 'vuex'
export default {
    components: {
        MusicList
    },
    computed: {
        title() {
            return this.disc.name
        },
        bgImage() {
            return this.desc.coverImgUrl
        },
        ...mapGetters([
            'disc'
        ])
    }
}
</script>
<style lang="scss" scoped>
    .slide-enter-active, .slide-leave-active{
        transition: all .3s
    }
    .slide-enter, .slide-leave-to{
        transform: translate3d(100%, 0, 0)
    }
</style>
