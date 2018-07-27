import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import TodoList from '@/components/TodoList'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/todolist',
      name: 'TodoList',
      component: TodoList
    }
  ]
})
