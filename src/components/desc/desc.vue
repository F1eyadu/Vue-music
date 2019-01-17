<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import MusicList from "_c/musicList/musicList"
import { mapGetters } from "vuex"
import { getPlayList } from "_api/recommend"
import { createSong } from "@/assets/js/song"
export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.currentDesc.name
    },
    bgImage() {
      return this.currentDesc.coverImgUrl
    },
    ...mapGetters(["currentDesc"])
  },
  created() {
    this._getPlayList()
  },
  methods: {
    _getPlayList() {
        if(!this.currentDesc.id){
            this.$router.push('/recommend')
            return
        }
        getPlayList(this.currentDesc.id).then(res => {
            this.songs = this._normalizePlayList(res)
        })
    },
    _normalizePlayList(list) {
      let ret = []
      list.forEach(item => {
        if (item.id && item.al.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
};
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
