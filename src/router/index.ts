import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ConfigurationPage from '../views/ConfigurationPage.vue';
import NotificationPage from '../views/History.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/configuration',
    name: 'Configuration',
    component: ConfigurationPage,
  },
  {
    path: '/notifications',
    name: 'NotificationHistory',
    component: NotificationPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
