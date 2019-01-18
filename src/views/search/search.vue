<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box  @query="listenQuery" ref="searchBox"></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li @click="addQuery(item.first)" v-for="(item, index) in hots" :key="index" class="item">{{item.first}}</li>
                    </ul>
                </div>
                <div class="search-history" v-show="getHistory.length > 0">
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span class="clear">
                            <i class="iconfont icon-delete"></i>
                        </span>
                    </h1>
                    <search-list :searches="getHistory"></search-list>
                </div>
            </div>
        </div>
        <div class="search-result" v-show="query">
            <search-suggest @select="saveSearch"  @listScroll="blurInput" :query="query"></search-suggest>
        </div>
    </div>
</template>
<script>
import SearchBox from '_c/searchBox/searchBox'
import SearchSuggest from '_c/suggest/suggest'
import SearchList from '_c/searchList/searchList'
import { searchHot } from '_api/search'
import { mapActions, mapGetters} from 'vuex'
export default {
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
        ...mapGetters([
            'getHistory'
        ])
    },
    methods: {
        _getSearchHot() {
            searchHot().then( res => {
                this.hots = res
            })
        },
        addQuery(txt) {
            this.$refs.searchBox.setQuery(txt)
        },
        listenQuery(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        ...mapActions([
            'saveSearchHistory'
        ])
    },
    components:{ 
        SearchBox,
        SearchSuggest,
        SearchList
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

