<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SwiperItem'
}
</script>

<style>
  .slide{
    width: 100%;
    flex-shrink: 0;/* 根据容器宽度显示大小 */
  }
  .slide img{
    width: 100%;
  }
</style>