<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box @query="listenQuery" ref="searchBox"></search-box>
        </div>
        <div class="shortcut-wrapper">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li @click="addQuery(item.first)" v-for="(item, index) in hots" :key="index" class="item">{{item.first}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <search-suggest :query="query"></search-suggest>
    </div>
</template>
<script>
import SearchBox from '_c/searchBox/searchBox'
import SearchSuggest from '_c/suggest/suggest'
import { searchHot } from '_api/search'
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
        }
    },
    components:{ 
        SearchBox,
        SearchSuggest
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

