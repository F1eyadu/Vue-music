<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box/>
        </div>
    </div>
</template>
<script>
import SearchBox from '_c/searchBox/searchBox'
export default {
    components:{ 
        SearchBox
    }
}
</script>
<style lang="scss" scoped>
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

