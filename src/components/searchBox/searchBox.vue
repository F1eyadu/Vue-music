<template>
    <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input class="box" v-model="query" :placeholder="placeholder"/>
        <i @click="clear" v-show="query" class="iconfont icon-dismiss"></i>
    </div>
</template>
<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '搜索歌手、歌曲'
        }
    },
    data() {
        return {
            query: ''
        }
    },
    created() {
        this.$watch('query', (newVal) => {
            this.$emit('query', newVal)
        })
    },
    methods: {
        clear() {
            this.query = ''
        },
        setQuery(query) {
            this.query = query
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
.search-box{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 px2ren(6px);
    height: px2rem(40px);
    background: $color-highlight-background;
    border-radius: px2rem(6px);
    .icon-search{
        font-size: px2rem(20px);
        color: $color-background;
        margin-left: px2rem(5px);
    }
    .box{
        flex: 1;
        margin: 0 px2rem(5px);
        line-height: px2rem(18px);
        background: $color-highlight-background;
        color: $color-text;
        font-size: $font-size-medium;
        &::placeholder {
            color: $color-text-d
        }
    }
    .icon-dismiss{
        font-size: px2rem(20px);
        color: $color-background;
        margin-right: px2rem(5px);
    }
}
</style>
