<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Chicken Music</h1>
        <router-link to="/userCenter" tag="div" class="mine">
            <i class="iconfont icon-mine"></i>
        </router-link>
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
    .mine{
        position: absolute;
        top: 0;
        right: 0;
        .icon-mine{
            display: block;
            padding: px2rem(12px);
            font-size: px2rem(20px);
            color: $color-theme;
        }
    }
}
</style>
