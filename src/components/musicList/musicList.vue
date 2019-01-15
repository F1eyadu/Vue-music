<template>
    <div class="music-list">
        <div class="back" @click = "back">
            <i class="iconfont icon-return"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length" ref="playBtn" @click="random">
                    <i class="iconfont icon-random"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll @scroll="scroll" :data="songs" ref="list" class="list" :probe-type="probeType" :listen-scroll="listenScroll">
            <div class="song-list-wrapper">
                <song-list @select="selectItem" :songs="songs"></song-list>
            </div>
            <div class="loading-container" v-if="!songs.length">
                <Loading/>
            </div>
        </scroll>
    </div>
</template>
<script>
import SongList from '_c/songList/songList'
import Scroll from '_c/scroll/scroll'
import Loading from '_c/loading/loading'
import { prefixStyle} from '@/assets/js/dom'
const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
import { mapActions} from 'vuex'
export default {
    props: {
        bgImage: {
            type: String,
            default: ''
        },
        songs: {
            type:Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            scrollY: 0
        }
    },
    computed: {
        bgStyle() {
            return `background-image: url('${this.bgImage}')`
        }
    },
    created() {
        this.probeType = 3
        this.listenScroll = true
    },
    mounted() {
        this.imageHeight = this.$refs.bgImage.clientHeight
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
        this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
        scroll(pos) {
            this.scrollY = pos.y
        },
        back () {
            this.$router.back()
        },
        selectItem(item, index) {
            this.selectPlay({
                list: this.songs,
                index
            })
        },
        random() {
            this.randomPlay({list: this.songs})
        },
        ...mapActions([
            'selectPlay',
            'randomPlay'
        ])
    },
    watch:{
        scrollY(newY) {
            let translateY = Math.max(this.minTranslateY, newY)
            let zIndex = 0
            let scale = 1
            let blur = 0
            this.$refs.layer.style[transform] = `translate3d(0,${translateY}px, 0)`
            const percent = Math.abs(newY / this.imageHeight)
            if(newY > 0) {
                scale = 1 + percent
                zIndex = 10
            }else {
                blur = Math.min(20* percent, 20)
            }
            this.$refs.filter.style[backdrop] = `blur(${blur}px)`
            if(newY < this.minTranslateY) {
                zIndex = 10
                this.$refs.bgImage.style.paddingTop = 0
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
                this.$refs.playBtn.style.display = 'none'
            }else {
                this.$refs.bgImage.style.paddingTop = '70%'
                this.$refs.bgImage.style.height = '0px'
                this.$refs.playBtn.style.display = 'block'
            }
            this.$refs.bgImage.style.zIndex = zIndex
            this.$refs.bgImage.style[transform] = `scale(${scale})`
        }
    },
    components: {
        SongList,
        Scroll,
        Loading
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
.music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
    .back{
        position: absolute;
        top: 0;
        z-index: 50;
        .icon-return{
            display: block;
            padding: px2rem(10px);
            font-size: $font-size-large-x;
            color: $color-theme;
        }
    }
    .title{
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-align: center;
        line-height: px2rem(40px);
        font-size: $font-size-large;
        color: $color-text
    }
    .bg-image{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        .play-wrapper{
            position: absolute;
            bottom: px2rem(20px);
            z-index: 50;
            width: 100%;
            .play{
                box-sizing: border-box;
                width: px2rem(135px);
                padding: px2rem(7px) 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid $color-theme;
                color: $color-theme;
                border-radius: px2rem(100px);
                font-size: 0;
                .icon-random {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: px2rem(6px);
                    font-size: $font-size-medium-x
                }
                .text{
                    display: inline-block;
                    vertical-align: middle;
                    font-size: $font-size-small;
                }
            }
            .filter{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(7,17,27,.4);
            }
        }
    }
    .bg-layer{
        position: relative;
        height: 100%;
        background: $color-background;
    }
    .list{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: $color-background;
        .song-list-wrapper{
            padding: px2rem(20px) px2rem(30px);
        }
        .loading-container{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
