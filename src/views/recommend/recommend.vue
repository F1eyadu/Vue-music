<template>
    <div class="recommend">
      <div class="recommend-content">
        <div class="slider-wrapper">
          <!-- <slider> -->
            <div v-for="(item, index) in banners" :key="index">
              <img :src="item.imageUrl"/>
            </div>
          <!-- </slider> -->
        </div>
      </div>
    </div>
</template>
<script>
import { getRecommend } from '_api/recommend'
import Slider from '_c/slider/slider'
export default {
  data () {
    return {
      banners: []
    }
  },
  created () {
    this._getRecomment()
  },
  methods: {
    _getRecomment () {
      getRecommend().then((res) => {
        this.banners = res
      })
    }
  },
  components: {
    Slider
  }
}
</script>
