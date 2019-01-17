<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input class="box" />
        <i class="icon-dismiss"></i>
    </div>
</template>
<script>
export default {
    
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
        font-size: px2rem(24px);
        color: $color-background;
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
        font-size: px2rem(16px);
        color: $color-background;
    }
}
</style>
