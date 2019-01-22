<template>
    <div class="search-list" v-show="searches.length">
        <transition-group name="list" tag="ul">
            <li :key="`${item}${index}`" @click="selectItem(item)" class="search-item" v-for="(item, index) in searches">
                <span class="text">{{item}}</span>
                <span class="icon">
                    <i @click.stop="deleteOne(item)" class="iconfont icon-cancel"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>
<script>
export default {
    props: {
        searches: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        selectItem(item) {
            this.$emit('select', item)
        },
        deleteOne(item) {
            this.$emit('delete', item)
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

