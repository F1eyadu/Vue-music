<template>
    <scroll class="listview" 
        :data="data"
        ref="listview" 
        @scroll="scroll" 
        :listenScroll="listenScroll"
        :probeType= "probeType"

    >
        <ul>
            <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="(item, index) in group.items" @click="selectItem(item)" class="list-group-item" :key="index">
                        <img v-lazy="item.picUrl" class="avatar"/>
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart.stop.prevent = "onShortcutTouchStart" @touchmove.stop.prevent = "onShortcutTouchMove"
            @touchend.stop
        >
            <ul>
                <li v-for="(item, index) in shortcutList" :class="{current:currentIndex === index}"
                :data-index = "index" :key="index" class="item">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading/>
        </div>
    </scroll>
</template>
<script>
import Scroll from '../scroll/scroll'
import Loading from '_c/loading/loading'
import { getData } from '@/assets/js/dom'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            scrollY : -1,
            currentIndex: 0
        }
    },
    created () {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3
        this.diff = -1
    },
    computed: {
        shortcutList () {
            return this.data.map( item => {
                return item.title.substr(0,1)
            })
        },
        fixedTitle() {
            if(screenY > 0){
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
    methods: {
        onShortcutTouchStart (e) {
            let anchorIndex = getData(e.target, 'index')
            let firstTouch = e.touches[0]
            this.touch.Y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove (e) {
            let firstTouch = e.touches[0]
            this.touch.Y2 = firstTouch.pageY
            let delta = (this.touch.Y2 - this.touch.Y1) / ANCHOR_HEIGHT | 0
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta
            this._scrollTo(anchorIndex)
        },
        _scrollTo (index) {
            if(!index && index !==0) {
                return
            }
            if( index < 0) {
                index = 0
            }else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length -2
            }
            this.scrollY = -this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        },
        scroll (pos) {
            this.scrollY = pos.y
        },
        _calculateHeight () {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for(let i=0; i<list.length; i++){
                let item = list[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        selectItem (item) {
            this.$emit('select', item)
        },
        refresh() {
            this.$refs.listview.refresh()
        }
    },
    watch: {
        data() {
            setTimeout( () => {
                this._calculateHeight()
            }, 20)
        },
        scrollY(newY) {
            const listHeight = this.listHeight
            if(newY > 0){
                this.currentIndex = 0
                return
            }
            for(let i=0; i<listHeight.length - 1; i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                if(-newY >= height1 && -newY < height2) {
                    this.currentIndex = i
                    this.diff = height2 + newY
                    return
                }
            }
            this.currentIndex = listHeight.length -2
        },
        diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
            if (this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    },
    components: {
        Scroll,
        Loading
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
.listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group{
        padding-bottom: px2rem(30px);
        .list-group-title{
            height: px2rem(30px);
            line-height: px2rem(30px);
            padding-left: px2rem(20px);
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
        .list-group-item{
            display: flex;
            align-items: center;
            padding: px2rem(20px) 0 0 px2rem(30px);
            .avatar {
                width: px2rem(50px);
                height: px2rem(50px);
                border-radius: 50%;
            }
            .name{
                margin-left: px2rem(20px);
                color: $color-text-l;
                font-size: $font-size-medium
            }
        }
    }
    .list-shortcut{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: px2rem(20px);
        padding:  px2rem(20px) 0;
        border-radius: px2rem(10px);
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;
        .item{
            padding: px2rem(3px);
            line-height: 1;
            color: $color-text-l;
            font-size: $font-size-small;
            &.current{
                color: $color-theme
            }
        }
    }
    .list-fixed{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title{
            height: px2rem(30px);
            line-height: px2rem(30px);
            padding-left: px2rem(20px);
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>

