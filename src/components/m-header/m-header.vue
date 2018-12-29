<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Chicken Music</h1>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
.m-header{
    position: relative;
    height: px2rem(44px);
    text-align: center;
    color: $color-theme;
    font-size: 0;
    .icon{
        display: inline-block;
        vertical-align: top;
        margin-top: px2rem(6px);
        width: px2rem(30px);
        height: px2rem(32px);
        @include bg-image('logo');
        background-size: px2rem(30px) px2rem(32px);
    }
    .text{
        display: inline-block;
        vertical-align: top;
        line-height: px2rem(44px);
        font-size: $font-size-large
    }
}
</style>
