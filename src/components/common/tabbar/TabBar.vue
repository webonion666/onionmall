<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
}
</script>

<style>
#tab-bar{
  width: 100%;
  height: 49px;
  background: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0px;
  bottom: 0px;
}
</style>