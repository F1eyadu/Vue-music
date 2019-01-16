<template>
    <div class="singer" ref="singer">
        <list-view :data="singers" @select="select" ref="list"></list-view>
        <router-view/>
    </div>
</template>
<script>
import { getSingers} from '_api/singer'
import { ConvertPinyin} from '@/assets/js/util'
import ListView from '_c/listView/listView'
import { mapMutations} from 'vuex'
import { playlistMixin } from '@/assets/js/mixin'
export default {
    mixins: [playlistMixin],
    data () {
        return {
            singers: []
        }
    },
    created () {
        this._getSingers()
    },
    methods: {
        _getSingers () {
            getSingers().then( res => {
                this.singers = this._normalizeSinger(res)
            })
        },
        _normalizeSinger(list) {
            let map = {}
            list.forEach((item, index) => {
                const key  = ConvertPinyin(item.name).substr(0, 1)
                if(!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push({
                    name: item.name,
                    id: item.id,
                    picUrl: item.picUrl
                })
            })
            let ret = []
            for( let key in map) {
                ret.push(map[key])
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return ret
        },
        select(item) {
            this.$router.push({
                path: `/singer/${item.id}`
            })
            this.setSinger(item)
        },
        handlePlayList(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
    },
    components: {
        ListView
    }
}
</script>
<style lang="scss" scoped>
.singer{
    position: fixed;
    top: px2rem(88px);
    bottom: 0;
    width: 100%;
}
</style>
