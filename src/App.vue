<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
    <player/>
  </div>
</template>
<script>
import MHeader from '_c/m-header/m-header'
import Tab from './views/tab/tab'
import Player from '@/views/player/player'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>
