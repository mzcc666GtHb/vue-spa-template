import Vue from 'vue'
import Router from 'vue-router'
import Film from '@/components/Film'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Film',
      component: Film
    }
  ]
})
