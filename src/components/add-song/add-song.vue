<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close" @click="hide">
                    <i class="iconfont icon-cancel"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box ref="searchBox" @query="listenQuery" placeholder="搜索歌曲"></search-box>
            </div>
            <div class="shortcut" v-show="!query">
                <switches @switch="switchIndex" :switches="switches" :currentIndex="currentIndex"></switches>
                <div class="list-wrapper">
                    <scroll ref="songListWrapper" class="list-scroll" v-if="currentIndex === 0" :data="playHistory">
                        <div class="list-scroll-wrapper">
                            <song-list @select="selectSong" :songs="playHistory"></song-list>
                        </div>
                    </scroll>
                    <scroll ref="searchListWrapper" class="list-scroll" v-if="currentIndex === 1" :data="getHistory">
                        <div class="list-scroll-wrapper">
                            <search-list @delete="deleteSearchHistory" @select="addQuery" 
                                :searches="getHistory"
                            ></search-list>
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <suggest @listScroll="blurInput" @select="selectSuggest" :query="query"></suggest> 
            </div>
            <top-tip ref="toptip">
                <div class="tip-title">
                    <i class="iconfont icon-ok"></i>
                    <span class="text">1首歌曲已经添加到播放队列</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>
<script>
import SearchBox from '_c/searchBox/searchBox'
import suggest from '_c/suggest/suggest'
import switches from '_c/switches/switches'
import scroll from '_c/scroll/scroll'
import SongList from '_c/songList/songList'
import SearchList from '_c/searchList/searchList'
import TopTip from '_c/top-tip/top-tip'
import { searchMixin } from '@/assets/js/mixin'
import Song from '@/assets/js/song'
import{ mapGetters, mapActions} from 'vuex'
export default {
    mixins: [ searchMixin],
    data() {
        return {
            showFlag: false,
            currentIndex: 0,
            switches: [
                { name: '最近播放'},
                { name: '搜索历史'}
            ]
        }
    },
    computed: {
        ...mapGetters([
            'playHistory'
        ])
    },
    methods: {
        show() {
            this.showFlag = true
            setTimeout(() => {
                if(this.currentIndex === 0) {
                    this.$refs.songListWrapper.refresh()
                }else{
                    this.$refs.searchListWrapper.refresh()
                }
            }, 20)
        },
        hide() {
            this.showFlag = false 
        },
        selectSuggest() {
            this.saveSearch()
            this.showTip()
        },
        switchIndex(index) {
            this.currentIndex = index
        },
        selectSong(song, index) {
            if(index !== 0 ) {
                this.insertSong(new Song(song))
                this.showTip()
            }
        },
        showTip() {
            this.$refs.toptip.show()
        },
        ...mapActions([
            'insertSong'
        ])
    },
    components: {
        SearchBox,
        suggest,
        switches,
        scroll,
        SongList,
        SearchList,
        TopTip
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
.add-song{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: $color-background;
    &.slider-enter-active, &.slider-leave-active{
        transition: all 0.3s;
    }
    &.slider-enter, &.slider-leave-to{
        transform: translate3d(100%, 0, 0)
    }
    .header{
        position: relative;
        height: px2rem(44px);
        text-align: center;
        .title{
            line-height: px2rem(44px);
            font-size: $font-size-large;
            color: $color-text;
        }
        .close{
            position: absolute;
            top: 0;
            .icon-cancel{
                display: block;
                padding: px2rem(12px);
                font-size: px2rem(20px);
                color: $color-theme
            }
        }
    }
    .search-box-wrapper{
        margin: px2rem(20px);
    }
    .shortcut{
        .list-wrapper{
            position: absolute;
            top: px2rem(165px);
            bottom: 0;
            width: 100%;
            .list-scroll{
                height: 100%;
                overflow: hidden;
                .list-scroll-wrapper{
                    padding: px2rem(20px) px2rem(30px)
                }
            }
        }
    }
    .search-result{
        position: fixed;
        top: px2rem(124px);
        bottom: 0;
        width: 100%;
    }
    .tip-title{
        text-align: center;
        padding: px2rem(18px) 0;
        font-size: 0;
        .icon-ok{
            font-size: $font-size-medium;
            color: $color-theme;
            margin-right: px2rem(4px);
        }
        .text{
            font-size: $font-size-medium;
            color: $color-text  
        }
    }
}
</style>
