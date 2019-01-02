<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="banners.length">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(slide, index) in banners" :key="index">
              <img @onload="loadImg" :src="slide.imageUrl"/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.coverImgUrl"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="'作者: ' + item.creator.nickname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading />
      </div>
    </scroll>
  </div>
</template>
<script>
import { getRecommend, getDiscLists } from '_api/recommend'
import Scroll from '_c/scroll/scroll'
import Loading from '_c/loading/loading'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      banners: [],
      discList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: true
      }
    }
  },
  created () {
    this._getRecomment()
    this._getDiscList()
  },
  methods: {
    _getRecomment () {
      getRecommend().then(res => {
        this.banners = res
      })
    },
    _getDiscList () {
      getDiscLists().then(res => {
        this.discList = res
      })
    },
    loadImg () {
      if (!this.checkLoaded) {
        this.checkLoaded = true
        this.$refs.scroll.refresh()
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    Scroll,
    Loading
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
.recommend{
  position: fixed;
  width: 100%;
  top: px2rem(88px);
  bottom: 0;
  .recommend-content{
    height: 100%;
    overflow: hidden;
    .slider-wrapper{
      min-height: 1px;
      position: relative;
      img{
        width: 100%;
        display: block;
      }
      .swiper-pagination{
        position: absolute;
        left: 0;
        right: 0;
        bottom: px2rem(12px);
      }
    }
    .recommend-list{
      .list-title{
        height: px2rem(65px);
        line-height: px2rem(65px);
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme
      }
      .item{
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 px2rem(20px) px2rem(20px) px2rem(20px);
        .icon {
          flex: 0 0 px2rem(60px);
          width: px2rem(60px);
          padding-right: px2rem(20px);
        }
        .text{
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: px2rem(20px);
          overflow: hidden;
          font-size: $font-size-medium;
          .name{
            margin-bottom: px2rem(10px);
            color: $color-text;
          }
          .desc{
            color: $color-text-d;
          }
        }
      }
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>
