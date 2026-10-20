import { createRouter, createWebHashHistory } from 'vue-router'
import TodoList from './views/TodoList.vue'
import TodoDetail from './views/TodoDetail.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: TodoList },
    { path: '/todos/:id', component: TodoDetail },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
