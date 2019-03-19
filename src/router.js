import Vue from 'vue'
import Router from 'vue-router'
import Category from './views/Category.vue'
// import Bookintroduction from './views/Bookintroduction.vue'

Vue.use(Router)
 
export default new Router({
  routes: [
    {//分类页
      path: '/category',
      name: 'category',
      component: Category
    },
   
    // {
    //   path: '/bookshelf',
    //   component: resolve => require(['./views/Bookshelf'], resolve),
    //   // meta: {
    //   //   keepAlive: true // 需要被缓存
    //   // }
    // },
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
    {
      path: '/looking/:title',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Looking.vue')
    }
  ],
  linkExactActiveClass: 'active'
})
