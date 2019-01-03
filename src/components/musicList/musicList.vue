<template>
    <div class="music-list">
        <div class="back">
            <i class="iconfont icon-return"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter"></div>
        </div>
        <scroll :data="songs" ref="list" class="list">
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
        </scroll>
    </div>
</template>
<script>
import SongList from '_c/songList/songList'
import Scroll from '_c/scroll/scroll'
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
    computed: {
        bgStyle() {
            return `background-image: url('${this.bgImage}')`
        }
    },
    mounted() {
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    },
    components: {
        SongList,
        Scroll
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
                .icon-play {
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
            transform: translateX(-50%);
        }
    }
}
</style>
