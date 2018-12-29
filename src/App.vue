<template>
  <div id="app">
    <m-header />
    <tab />
    <router-view/>
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
