<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <div><img src="../../assets/img/tabbar/home.svg" alt=""></div>
    <div>首页</div> -->
    <div v-if="isActive"><slot name="item-img-active"></slot></div>
    <div v-else><slot name="item-img"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>

</template>

<script>
export default {
  name: 'TabBarItem',
  props:{
    path: {
      type: String,
      dafault: '/home'
    },
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive? {color: this.activeColor} : {};
    }
  },
  methods: {
    itemClick(){
      // this.isActive = !this.isActive;
      this.$router.replace(this.path);
    }
  }
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
  /* border: royalblue 1px solid; */
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
  vertical-align: middle;
  margin-top: 3px;
  /* margin-bottom: -3px; */
  /* display: flex; */
}
</style>