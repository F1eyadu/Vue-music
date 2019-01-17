<template>
    <div class="suggest">
        <ul class="suggest-list">
            <li class="suggest-item">
                <div class="icon">
                    <i></i>
                </div>
                <div class="name">
                    <p class="text no-wrap"></p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { searchSuggest} from '_api/search'
export default {
    props: {
        query: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            page: 0,
            songs: []
        }
    },
    methods: {
        _search() {
            searchSuggest(this.query, this.page).then( res => {
                this.songs = res
            })
        }
    },
    watch: {
        query(newVal) {
            this._search()
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
@import '@/assets/scss/mixin';
.suggest{
    height: 100%;
    overflow: hidden;
    .suggest-list{
        padding: 0 px2rem(30px);
        .suggest-item{
            display: flex;
            align-items: center;
            padding-bottom: px2rem(20px);
        }
        .icon{
            flex: 0 0 px2rem(30px);
            width: px2rem(30px);
            [class^="icon-"] {
                font-size: px2rem(14px);
                color: $color-text-d
            }
        }
        .name{
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-d;
            overflow: hidden;
        }
    }
    .no-result-wrapper{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
