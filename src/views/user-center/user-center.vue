<template>
    <transition name="slide">
        <div class="user-center">
            <div class="back" @click="back">
                <i class="iconfont icon-return"></i>
            </div>
            <div class="switches-wrapper">
                <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
            </div>
            <div ref="playBtn" class="play-btn" @click="random">
                <i class="iconfont icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <scroll ref="loveList" class="list-scroll" v-if="currentIndex === 0" :data="loveList">
                    <div class="list-inner">
                        <song-list @select="selectSong" :songs="loveList"></song-list>
                    </div>
                </scroll>
                <scroll ref="playList" class="list-scroll" v-if="currentIndex === 1" :data="playHistory">
                    <div class="list-inner">
                        <song-list @select="selectSong" :songs="playHistory"></song-list>
                    </div>
                </scroll>
            </div>
            <div class="no-result-wrapper" v-show="noResult">
                <no-result :title="noTitle"></no-result>
            </div>
        </div>
    </transition>
</template>
<script>
import switches from '_c/switches/switches'
import scroll from '_c/scroll/scroll'
import SongList from '_c/songList/songList'
import Song from '@/assets/js/song'
import NoResult from '_c/no-result/no-result'
import{ mapGetters, mapActions } from 'vuex'
import { playlistMixin } from '@/assets/js/mixin'
export default {
    mixins: [playlistMixin],
    data() {
        return {
            currentIndex: 0,
            switches: [
                { name: '我喜欢的'},
                { name: '最近听的'}
            ]
        }
    },
    computed: {
        noResult() {
            if(this.currentIndex === 0) {
                return !this.loveList.length
            }else{
                return !this.playHistory.length
            }
        },
        noTitle() {
            if(this.currentIndex === 0) {
                return '暂无收藏歌曲'
            }else{
                return '你还没有听过一首歌'
            }
        },
        ...mapGetters([
            'loveList',
            'playHistory'
        ])
    },
    methods: {
        back() {
            this.$router.back()
        },
        switchItem(index) {
            this.currentIndex = index
        },
        selectSong(song) {
            this.insertSong(new Song(song))
        },
        random() {
            let list = this.currentIndex === 0 ? this.loveList : this.playHistory
            if(list.length ===0) return
            list = list.map((item) => {
                return new Song(item)
            })
            this.randomPlay({
                list
            })
        },
        handlePlayList(playList) {
            const bottom = this.playList.length > 0 ? '60px' : ''
            this.$refs.listWrapper.style.bottom = bottom
            this.$refs.loveList && this.$refs.loveList.refresh()
            this.$refs.playList && this.$refs.playList.refresh()
        },
        ...mapActions([
            'insertSong',
            'randomPlay'
        ])
    },
    components: {
        switches,
        scroll,
        SongList,
        NoResult
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
.user-center{
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: $color-background;
    &.slide-enter-active, &.slide-leave-active{
        transition: all .3s;
    }
    &.slide-enter, &.slide-leave-to{
        transform: translate3d(100%, 0, 0)
    }
    .back{
        position: absolute;
        top: 0;
        left: px2rem(6px);
        z-index: 50;
        .icon-return{
            display: block;
            padding: px2rem(10px);
            font-size: $font-size-large-x;
            color: $color-theme;
        }
    }
    .switches-wrapper{
        margin: px2rem(10px) 0 px2rem(30px) 0
    }
    .play-btn{
        box-sizing: border-box;
        width: px2rem(135px);
        padding: px2rem(7px) 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid  $color-text-l;
        color: $color-text-l;
        border-radius: px2rem(100px);
        font-size: 0;
        .icon-play{
            display: inline-block;
            vertical-align: middle;
            margin-right: px2rem(6px);
            font-size: $font-size-medium-x;
        }
        .text{
            display: inline-block;
            vertical-align: middle;
            font-size: $font-size-small;
        }
    }
    .list-wrapper{
        position: absolute;
        top: px2rem(110px);
        bottom: 0;
        width: 100%;
        .list-scroll{
            height: 100%;
            overflow: hidden;
            .list-inner{
                padding: px2rem(20px) px2rem(30px)
            }
        }
    }
    .no-result-wrapper{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>

