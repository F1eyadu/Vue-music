<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(item, index)" v-for="(item, index) in songs" :key="index" class="item">
                <div class="rank" v-if="rank">
                    <span :class="getRank(index)">{{getRankText(index)}}</span>
                </div>
                <div class="content">
                    <h2 class="name no-wrap">{{item.name}}</h2>
                    <p class="desc no-wrap">{{getDesc(item)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        songs: {
            type: Array,
            default: []
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getDesc(song) {
            return `${song.singer} - ${song.album}`
        },
        selectItem (item, index) {
            this.$emit('select', item, index)
        },
        getRank(index) {
            if(index <= 2) {
                return `icon icon${index}`
            }else{
                return `text`
            }
        },
        getRankText(index) {
            if(index > 2) {
                return index + 1
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
.song-list{
    .item{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: px2rem(64px);
        font-size: $font-size-medium;
        .rank{
            flex: 0 0 px2rem(25px);
            width: px2rem(25px);
            margin-right: px2rem(30px);
            text-align: center;
            .icon{
                display: inline-block;
                width: px2rem(25px);
                height: px2rem(24px);
                background-size: px2rem(25px) px2rem(24px);
                &.icon0{
                    @include bg-image('first');
                }
                &.icon1{
                    @include bg-image('second');
                }
                &.icon2{
                    @include bg-image('third');
                }
            }
            .text{
                color: $color-theme;
                font-size: $font-size-large 
            }
        }
        .content{
            flex: 1;
            line-height: px2rem(20px);
            overflow: hidden;
            .name{
                color: $color-text
            }
            .desc{
                margin-top: px2rem(4px);
                color: $color-text-d
            }
        }
    }
}
</style>
