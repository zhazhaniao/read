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
    {//精选页
      path: '/chosen',
      name: 'chosen',
      component: () => import('./views/Chosen.vue')
    },
    {//分类页
      path: '/category',
      name: 'category',
      component: Category
    },
    {//书类列表页 
      path: `/bookshelf`,
      name: 'bookshelf',
      component: () => import('./views/Bookshelf.vue')
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
      component: () => import('./views/Ranking.vue')
    },{//详情列表页 
      path: '/ranking/:id',
     // component: resolve => require(['./views/Bookintroduction'], resolve),
     component: () => import('./views/Rankinglists.vue')
   },
  ],
  linkExactActiveClass: 'active'
})
