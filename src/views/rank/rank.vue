<template>
    <div class="rank" ref="rank">
        <scroll ref="scroll" class="toplist" :data="topList">
            <ul>
                <template v-for="(item) in topList">
                    <li class="item" :key="item.id" @click="selectItem(item)">
                        <div class="icon">
                            <img v-lazy="item.coverImgUrl" width="100" height="100"/>
                        </div>
                        <ul class="songlist">
                            <li v-for="(song, index) in item.tracks" :key="index" class="song no-wrap">
                                <span>{{index + 1}} </span>
                                <span>{{song.second + song.first}}</span>
                            </li>
                        </ul>
                    </li>
                </template>
            </ul>
            <div class="loading-container" v-show="!topList.length > 0">
                <loading />
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import { getRankList} from '_api/rank'
import Scroll from '_c/scroll/scroll'
import Loading from '_c/loading/loading'
import { playlistMixin } from '@/assets/js/mixin'
import { mapMutations } from 'vuex'
export default {
    mixins: [playlistMixin],
    data() {
        return {
            topList: []
        }
    },
    created() {
        this._getTopList()
    },
    methods: {
        _getTopList() {
            getRankList().then(res => {
                this.topList = res
            })
        },
        handlePlayList(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.rank.style.bottom = bottom
            this.$refs.scroll.refresh()
        },
        selectItem(item) {
            this.$router.push({
                path: `/rank/${item.id}`
            })
            this.SET_TOP_LIST(item)
        },
        ...mapMutations([
            'SET_TOP_LIST'
        ])
    },
    components: {
        Scroll,
        Loading
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/variable';
    @import '@/assets/scss/mixin';
    .rank{
        position: fixed;
        width: 100%;
        top: px2rem(80px);
        bottom: 0;
        .toplist{
            height: 100%;
            overflow: hidden;
            .item{
                display: flex;
                margin: 0 px2rem(20px);
                padding-top: px2rem(20px);
                height: px2rem(100px);
                &:last-child{
                    padding-bottom: px2rem(20px)
                }
                .icon{
                    flex:  0 0 px2rem(100px);
                    width: px2rem(100px);
                    height: px2rem(100px);
                }
                .songlist{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 px2rem(20px);
                    height: px2rem(100px);
                    overflow: hidden;
                    background: $color-highlight-background;
                    color: $color-text-d;
                    font-size: $font-size-small;
                    .song{
                        line-height: px2rem(26px);
                    }
                }
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
