<template>
    <div class="search-list" v-show="searches.length">
        <ul>
            <li class="search-item" v-for="(item,index) in searches" :key="index">
                <span class="text">{{item}}</span>
                <span class="icon">
                    <i class="iconfont icon-cancel"></i>
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        searches: {
            type: Array,
            default: () => []
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
.search-list{
    .search-item{
        display: flex;
        align-items: center;
        height: px2rem(40px);
        overflow: hidden;
        &.list-enter-active, &.list-leave-active{
            transition: all 0.3s
        }
        &.list-enter, &.list-leave-to{
            height: 0;
        }
        .text{
            flex: 1;
            color: $color-text-l;
            font-size: $font-size-medium;
            display: inline-block;
            height: px2rem(40px);
            line-height: px2rem(40px);
        }
        .icon{
            display: inline-block;
            line-height: px2rem(40px);
            .icon-cancel{
                font-size: $font-size-small;
                color: $color-text-d
            }
        }
    }
}
</style>

