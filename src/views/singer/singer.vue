<template>
    <div class="singer">

    </div>
</template>
<script>
import { getSingers} from '_api/singer'
import { ConvertPinyin} from '@/assets/js/util'
export default {
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
                console.log(res)
                let data = ConvertPinyin('小明').substr(0, 1)
                console.log(data)
            })
        }
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
