<template>
  <div class="nav-bar"><!-- navbar不唯一 -->
    <div class="nav-bar-left"><slot name="nav-left"></slot></div>
    <div class="nav-bar-center"><slot name="nav-center"></slot></div>
    <div class="nav-bar-right"><slot name="nav-right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
.nav-bar{
  /* width: 100%; */
  display: flex;
  height: 44px;
  line-height: 44px;
  /* background: chocolate; */
  text-align: center;
  box-align: 0 1px 1px rgba(100,100,100,.1);
}
.nav-bar-left{
  width: 60px;
  /* background: chartreuse; */
}
.nav-bar-center{
  /* display: flex; */
  flex: 1;
  
}
.nav-bar-right{
  /* float: right; */
  width: 60px;
  /* background: chartreuse; */
}
</style>