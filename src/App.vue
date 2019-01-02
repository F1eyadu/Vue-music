<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import MHeader from '_c/m-header/m-header'
import Tab from './views/tab/tab'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>
