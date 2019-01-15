<template>
    <div class="process-bar" ref="processBar" @click="progressClick">
        <div class="bar-inner">
            <div class="process" ref="process"></div>
            <div class="process-btn-wrapper" ref="processBtn"
                @touchstart.prevent = "progressTouchStart"
                @touchmove.prevent = "progressTouchMove"
                @touchend.prevent = "progressTouchEnd"
            >
                <div class="process-btn"></div>
            </div>
        </div>
    </div>
</template>
<script>
const PROCESSWIDTH = 16
import { prefixStyle} from '@/assets/js/dom'
const transform = prefixStyle('transform')
export default {
   props: {
       percent: {
           type: Number,
           default: 0
       }
   },
   created() {
       this.touch = {}
   },
   methods: {
       progressTouchStart(e) {
           this.touch.initiated = true
           this.touch.startX = e.touches[0].pageX
           this.touch.left = this.$refs.process.clientWidth
       },
       progressTouchMove(e) {
           if(!this.touch.initiated){
               return
           }
           const deltaX = e.touches[0].pageX - this.touch.startX
           const offsetWidth  = Math.min(this.$refs.processBar.clientWidth - PROCESSWIDTH , Math.max(0, this.touch.left + deltaX))
           this._offset(offsetWidth)
       },
       progressTouchEnd(e) {
           this.touch.initiated = false
           this._triggerPercent()
       },
       _triggerPercent() {
           const barWidth =  this.$refs.processBar.clientWidth - PROCESSWIDTH
           const percent =  this.$refs.process.clientWidth / barWidth
           this.$emit('percentChange', percent)
       },
       _offset(offsetWidth){
           this.$refs.process.style.width = `${offsetWidth}px`
            this.$refs.processBtn.style[transform] = `translate3d(${offsetWidth}px, 0 ,0)`
       },
       progressClick(e) {
           const rect = this.$refs.processBar.getBoundingClientRect()
           const offsetWidth = e.pageX - rect.left
           this._offset(e.offsetX)
           this._triggerPercent()
       }
   },
   watch: {
       percent(newVal) {
           if(newVal >= 0 && !this.touch.initiated) {
                const barWidth =  this.$refs.processBar.clientWidth - PROCESSWIDTH
                const offsetWidth = newVal * barWidth
                this._offset(offsetWidth)
           }
       }
   }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable';
.process-bar{
    height: px2rem(30px);
    .bar-inner{
        position: relative;
        top: px2rem(13px);
        height: px2rem(4px);
        background: rgba($color: #000000, $alpha: 0.3);
        .process{
            position: absolute;
            height: 100%;
            background: $color-theme;
        }
        .process-btn-wrapper{
            position: absolute;
            left: px2rem(-18px);
            top: px2rem(-13px);
            width: px2rem(30px);
            height: px2rem(30px);
            .process-btn{
                position: relative;
                top: px2rem(7px);
                left: px2rem(17px);
                box-sizing: border-box;
                width: px2rem(16px);
                height: px2rem(16px);
                border: px2rem(3px) solid $color-text;
                border-radius: 50%;
                background: $color-theme; 
            }
        }
    }
}
</style>
