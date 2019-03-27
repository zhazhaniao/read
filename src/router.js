import Vue from 'vue'
import Router from 'vue-router'
import Category from './views/Category.vue'
// import Bookintroduction from './views/Bookintroduction.vue'

Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/chosen'
    },
    {
      path: '/vip',
      name: 'vip',
      component: () => import('./views/Vip.vue'),
    },
    {//搜索
      path: '/sosuo',
      name: 'sosuo',
      component: () => import('./views/Sosuo.vue'),
    },
    {
      path:'/gorun',
      name:'/gorun',
      component: () => import('./views/Gorun.vue'),
    },
    {//精选页
      path: '/chosen',
      name: 'chosen',
      component: () => import('./views/Chosen.vue'),
      // meta: {
      //   keepAlive: true // 需要被缓存
      // }
    },
    {//分类页
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {//书类列表页 
      path: `/bookshelf`,
      name: 'bookshelf',
      component: () => import('./views/Bookshelf.vue'),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {//详情列表页 
       path: '/book/:id',
      // component: resolve => require(['./views/Bookintroduction'], resolve),
      component: () => import('./views/Bookintroduction.vue')
    },
    {//阅读列表
      path: '/Lookingbook/:title',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Lookingbook.vue')
    },
    {
      path:`/ranking`,
      name:'ranking',
      component: () => import('./views/Ranking.vue'),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },{//详情列表页 
      path: '/ranking/:id',
     // component: resolve => require(['./views/Bookintroduction'], resolve),
     component: () => import('./views/Rankinglists.vue')
   },
  ],
  linkExactActiveClass: 'active'
})
