<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: 0
  },
  data(){
    return {
      scroll: null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper, {
      // probeType: 3,//不是所有的都需要监听位置，所以动态传入好
      probeType: this.probeType,
      pullUpLoad: true,
      click: true,
    })
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll',position);
    })
    // this.
  },
  methods: {
    scrollTo(x, y, time=300){//把返回顶部封装到这里面来调用————面向组件开发
      this.scroll.scrollTo(x, y, time);
    }
  }
}
</script>

<style>

</style>