<template>
  <div>
    <!-- <router-view></router-view> -->
    <tab-bar>
      <tab-bar-item path='/home'>
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-img">
        <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-img-active">
        <div slot="item-text" >首页</div>
      </tab-bar-item>
      <tab-bar-item path="shopcart"> 
        <img src="~assets/img/tabbar/shopcart.svg" alt="" slot="item-img">
        <img src="~assets/img/tabbar/shopcart_active.svg" alt="" slot="item-img-active">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="category">
        <img src="~assets/img/tabbar/category.svg" alt="" slot="item-img">
        <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-img-active">
        <div slot="item-text">目录</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-img">
        <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="item-img-active">
        <div slot="item-text">用户</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
// import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem,
  }
}
</script>

<style>

</style>