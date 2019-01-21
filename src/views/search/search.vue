<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box  @query="listenQuery" ref="searchBox"></search-box>
        </div>
        <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
            <scroll :refreshDelay="refreshDelay" class="shortcut" ref="shortcut" :data="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li @click="addQuery(item.first)" v-for="(item, index) in hots" :key="index" class="item">{{item.first}}</li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="getHistory.length > 0">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click="showConfirm">
                                <i class="iconfont icon-delete"></i>
                            </span>
                        </h1>
                        <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="getHistory"></search-list>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <search-suggest ref="suggest" @select="saveSearch"  @listScroll="blurInput" :query="query"></search-suggest>
        </div>
        <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空" ></confirm>
    </div>
</template>
<script>
import SearchBox from '_c/searchBox/searchBox'
import SearchSuggest from '_c/suggest/suggest'
import SearchList from '_c/searchList/searchList'
import Scroll from '_c/scroll/scroll'
import Confirm  from "_c/confirm/confirm";
import { searchHot } from '_api/search'
import { mapActions, mapGetters} from 'vuex'
import { searchMixin, playlistMixin } from '@/assets/js/mixin'
export default {
    mixins: [searchMixin, playlistMixin],
    data() {
        return {
            hots: [],
            query: ''
        }
    },
    created() {
        this._getSearchHot()
    },
    computed: {
        shortcut() {
            return this.hots.concat(this.getHistory)
        }
    },
    methods: {
        handlePlayList(playList) {
            const bottom = playList.length > 0 ? '60px' : ''
            this.$refs.searchResult.style.bottom = bottom
            this.$refs.suggest.refresh()
            this.$refs.shortcutWrapper.style.bottom = bottom
            this.$refs.shortcut.refresh()
        },
        _getSearchHot() {
            searchHot().then( res => {
                this.hots = res
            })
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        showConfirm() {
            this.$refs.confirm.show()
        },
        ...mapActions([
            'clearSearchHistory'
        ])
    },
    components:{ 
        SearchBox,
        SearchSuggest,
        SearchList,
        Scroll,
        Confirm
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
    .search{
        .search-box-wrapper{
            margin: px2rem(20px);
        }
        .shortcut-wrapper{
            position: fixed;
            top: px2rem(178px);
            bottom: 0;
            width: 100%;
            .shortcut{
                height: 100%;
                overflow: hidden;
                .hot-key{
                    margin:  0 px2rem(20px) px2rem(20px) px2rem(20px);
                    .title{
                        margin-bottom: px2rem(20px);
                        font-size: $font-size-medium;
                        color: $color-text-l;
                    }
                    .item{
                        display: inline-block;
                        padding: px2rem(5px) px2rem(10px);
                        margin:  0 px2rem(20px) px2rem(10px) 0;
                        background: $color-highlight-background;
                        font-size: $font-size-medium;
                        color: $color-text-d;
                    }
                }
                .search-history{
                    position: relative;
                    margin: 0 px2rem(20px);
                    .title{
                        display: flex;
                        align-items: center;
                        height: px2rem(40px);
                        font-size: $font-size-medium;
                        color: $color-text-l;
                        .text{
                            flex: 1;
                        }
                        .clear {
                            .icon-clear{
                                font-size: $font-size-medium;
                                color: $color-text-d;
                            }
                        }
                    }
                }
            }
        }
        .search-result {
            position: fixed;
            width: 100%;
            top: px2rem(178px);
            bottom: 0;
        }
    }
</style>

