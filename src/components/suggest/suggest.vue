<template>
    <scroll class="suggest" 
        ref="scroll" 
        :data="songs" 
        :beforeScroll="beforeScroll" 
        @scrollToEnd="searchMore" 
        @beforeScroll="listScroll"
        :pullup="pullup">
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in songs" :key="index">
                <div class="icon">
                    <i class="iconfont icon-music"></i>
                </div>
                <div class="name">
                    <p class="text no-wrap">{{item.name}} - {{format(item.artists)}}</p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !songs.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>
<script>
import { searchSuggest} from '_api/search'
import Scroll from '_c/scroll/scroll'
import Loading from '_c/loading/loading'
import { getSongDetail } from '_api/song'
import { createSong } from '@/assets/js/song'
import { mapActions} from 'vuex'
import NoResult from '_c/no-result/no-result'
export default {
    props: {
        query: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            page: 0,
            songs: [],
            pullup: true,
            hasMore: true,
            beforeScroll: true
        }
    },
    methods: {
        _search() {
            this.page = 0
            this.hasMore = true
            this.$refs.scroll.scrollTo(0, 0)
            this.songs = []
            if(!this.query) return
            searchSuggest(this.query, this.page).then( res => {
                this.songs.push(...res.songs)
                this._checkMore(res)
            })
        },
        searchMore() {
            if(!this.hasMore) {
                return
            }
            this.page++
            searchSuggest(this.query, this.page).then( res => {
                this.songs.push(...res.songs)
                this._checkMore(res)
            })
        },
        _checkMore(result) {
            if(this.songs.length === result.songCount) {
                this.hasMore = false
            }
        },
        format(artists) {
            let ret = []
            artists.forEach(item => {
                ret.push(item.name)
            })
            return ret.join('/')
        },
        selectItem(item) {
            getSongDetail(item.id).then( res => {
                let song = createSong(res)
                this.insertSong(song)
                this.$emit('select')
            })
        },
        listScroll() {
            this.$emit('listScroll')
        },
        refresh() {
            this.$refs.scroll.refresh()
        },
        ...mapActions([
            'insertSong'
        ])
    },
    watch: {
        query(newVal) {
            this._search()
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
.suggest{
    height: 100%;
    overflow: hidden;
    .suggest-list{
        padding: 0 px2rem(30px);
        .suggest-item{
            display: flex;
            align-items: center;
            padding-bottom: px2rem(20px);
        }
        .icon{
            flex: 0 0 px2rem(30px);
            width: px2rem(30px);
            display:flex;
            align-items: center;
            [class^="icon-"] {
                font-size: px2rem(14px);
                color: $color-text-d
            }
        }
        .name{
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-d;
            overflow: hidden;
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
