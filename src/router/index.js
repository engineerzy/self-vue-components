import Vue from 'vue'
import Router from 'vue-router'

const routes = [
  {
    meta: {
      title: '学习中心',
    },
    name: 'study-center',
    path: '/',
    component: () => import('@/pages/study-center')
  }
]

const router = new Router({
  routes,
  scrollBehavior (to, from, posi) {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
Vue.use(Router)

export default router