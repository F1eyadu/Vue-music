import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import(/* webpackChunkName: "recommend" */ '@/views/recommend/recommend.vue'),
      children: [
        { 
          path: ':id',
          component: () => import(/* webpackChunkName: "desc" */ '_c/desc/desc.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ '@/views/search/search.vue')
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import(/* webpackChunkName: "singer" */ '@/views/singer/singer.vue'),
      children: [
        {
          path: ':id',
          component: () => import(/* webpackChunkName: "singer-detail" */ '@/views/singer-detail/singer-detail.vue')
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import(/* webpackChunkName: "rank" */ '@/views/rank/rank.vue')
    }
  ]
})
