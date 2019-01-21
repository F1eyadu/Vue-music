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
                <search-box @query="istenQuery" placeholder="搜索歌曲"></search-box>
            </div>
            <div class="shortcut" v-show="!query"></div>
            <div class="search-result" v-show="query">
                <suggest @listScroll="blurInput" @select="selectSuggest" :query="query"></suggest> 
            </div>
        </div>
    </transition>
</template>
<script>
import SearchBox from '_c/searchBox/searchBox'
import suggest from '_c/suggest/suggest'
import { searchMixin } from '@/assets/js/mixin'
export default {
    mixins: [ searchMixin],
    data() {
        return {
            showFlag: false
        }
    },
    methods: {
        show() {
            this.showFlag = true
        },
        hide() {
            this.showFlag = false 
        },
        selectSuggest() {
            this.saveSearch()
        }
    },
    components: {
        SearchBox,
        suggest
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
                .list-inner{
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
    .tip-top{
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
