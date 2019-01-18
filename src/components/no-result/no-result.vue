<template>
    <div class="no-result">
        <div class="no-result-icon"></div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
.no-result{
    text-align: center;
    .no-result-icon{
        width: px2rem(86px);
        height: px2rem(90px);
        margin: 0 auto;
        @include bg-image('no-result');
        background-size: px2rem(86px) px2rem(90px);
    }
    .no-result-text{
        margin: px2rem(30px);
        font-size: $font-size-medium;
        color: $color-text-d;
    }
}
</style>
