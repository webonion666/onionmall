import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Home = () => import('../views/home/Home');
const ShopCart = () => import('../views/shopcart/ShopCart');
const Profile = () => import('../views/profile/Profile');
const Category = () => import('../views/category/Category');

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/category',
    component: Category
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router;