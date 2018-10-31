import Vue from 'vue'
import Router from 'vue-router'
import ga from 'vue-ga'
// import VueAnalytics from 'vue-analytics'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import UserCenter from 'components/user-center/user-center'

Vue.use(Router)


var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/user',
      name: 'UserCenter',
      component: UserCenter
    }
  ]
})

ga(router, 'UA-105074-24')
export default router