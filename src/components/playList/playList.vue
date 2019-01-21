<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon iconfont" :class="iconMode" @click="changeMode"></i>
                        <span class="text">{{modeTags}}</span>
                        <span class="clear" @click.stop="clearList">
                            <i class="iconfont icon-delete"></i>
                        </span>
                    </h1>
                </div>
                <scroll ref="listCount" :data="sequenceList" class="list-content" :refreshDelay="refreshDelay">
                    <transition-group ref="list" name="list" tag="ul">
                        <li ref="listItem" :key="item.id" class="item" v-for="(item, index) in sequenceList"
                            @click="selectItem(item, index)"
                        >
                        <i class="current" :class="getCurrentIcon(item)"></i>
                        <span class="text">{{item.name}}</span>
                        <span class="like">
                            <i class="iconfont icon-love"></i>
                        </span>
                        <span class="delete" @click.stop="deleteOne(item)">
                            <i class="iconfont icon-cancel"></i>
                        </span>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-operate">
                    <div class="add" @click="addSong" >
                        <i class="iconfont icon-add"></i>
                        <span class="text">添加歌曲到队列</span>
                    </div>
                </div>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
            <add-song ref="addsong"></add-song>
        </div>
    </transition>
</template>
<script>
import Scroll from '_c/scroll/scroll'
import Confirm from '_c/confirm/confirm'
import AddSong from '_c/add-song/add-song'
import { playMode } from '@/assets/js/config'
import { mapGetters, mapMutations, mapActions} from 'vuex'
import { playerMixin } from '@/assets/js/mixin'
export default {
    mixins: [playerMixin],
    data() {
        return {
            refreshDelay: 120,
            showFlag: false
        }
    },
    computed: {
        modeTags() {
            return this.mode === playMode.random ? '随机播放' : this.mode === playMode.sequence ? '顺序播放' : '单曲循环'
        }  
    },
    methods: {
        selectItem(item, index) {
            if(this.mode === playMode.random){
                index = this.playList.findIndex((song) => {
                    return item.id === song.id
                })
            }
            this.SET_CURRENT_INDEX(index)
            this.SET_PLAYING(true)
        },
        scrollToCurrent(current) {
            const index = this.sequenceList.findIndex((item) => {
                return current.id === item.id
            })
            this.$refs.listCount.scrollToElement(this.$refs.listItem[index], 300)
        },
        deleteOne(item) {
            this.deleteSong(item)
            if(!this.playList.length) {
                this.hide()
            }
        },
        hide() {
            this.showFlag = false
        },
        show() {
            this.showFlag = true
            setTimeout(() => {
                this.$refs.listCount.refresh()
                this.scrollToCurrent(this.currentSong)
            }, 20)
        },
        getCurrentIcon(item) {
            if(this.currentSong.id === item.id) {
                return `iconfont icon-play`
            }else{
                return ''
            }
        },
        clearList() {
            this.$refs.confirm.show()
        },
        confirmClear() {
            this.deleteSongList()
            this.hide()
        },
        addSong() {
            this.$refs.addsong.show()
        },
        ...mapActions([
            'deleteSong',
            'deleteSongList'
        ])
    },
    watch: {
        currentSong(newSong, oldSong) {
            if(!this.showFlag || newSong.id === oldSong.id) {
                return
            }
            this.scrollToCurrent(newSong)
        }
    },
    components: {
        Scroll,
        Confirm,
        AddSong
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
.playlist{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background: $color-background-d;
    &.list-fade-enter-active, &.list-fade-leave-active{
        transition: opacity .3s;
        .list-wrapper{
            transition: all .3s;
        }
    }
    &.list-fade-enter, &.list-fade-leave-to{
        opacity: 0;
        .list-wrapper{
            transform: translate3d(0, 100%, 0)
        }
    }
    .list-wrapper{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: $color-highlight-background;
        .list-header{
            position: relative;
            padding: px2rem(15px) px2rem(20px);
            .title{
                display: flex;
                align-items: center;
                .icon{
                    margin-right: px2rem(10px);
                    font-size: px2rem(15px);
                    color: $color-theme-d;
                }
                .text{
                    flex: 1;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                }
                .clear{
                    display: flex;
                    align-items: center;
                    .icon-delete{
                        font-size: $font-size-medium;
                        color: $color-text-d;
                    }
                }
            }
        }
        .list-content{
            max-height: px2rem(240px);
            overflow: hidden;
            .item{
                display: flex;
                align-items: center;
                height: px2rem(40px);
                padding: 0 px2rem(30px) 0 px2rem(20px);
                overflow: hidden;
                &.list-enter-active, &.list-leave-active{
                    transition: all .3s;
                }
                &.list-enter, &.list-leave-to{
                    height: 0;
                }
                .current{
                    flex:  0 0 px2rem(20px);
                    width: px2rem(20px);
                    font-size: $font-size-small;
                    color: $color-theme-d;
                }
                .text{
                    flex: 1;
                    font-size: $font-size-medium;
                    color: $color-text-d;
                }
                .like{
                    margin-right: px2rem(15px);
                    font-size: $font-size-small;
                    color: $color-theme;
                    .icon-love{
                        color: $color-sub-theme
                    }
                }
                .delete{
                    font-size: $font-size-small;
                    color: $color-theme;
                }
            }
        }
        .list-operate{
            width: px2rem(140px);
            margin: px2rem(20px) auto px2rem(30px) auto;
            .add{
                display: flex;
                align-items: center;
                padding: px2rem(8px) px2rem(16px);
                border: 1px solid $color-text-l;
                border-radius: px2rem(100px);
                color: $color-text-l;
                .icon-add{
                    margin-right: 5px;
                    font-size: $font-size-small-s;
                }
                .text{
                    font-size: $font-size-small
                }
            }
        }
        .list-close{
            text-align: center;
            line-height: px2rem(50px);
            background: $color-background;
            font-size: $font-size-medium-x;
            color: $color-text-l;
        }
    }
}
</style>
