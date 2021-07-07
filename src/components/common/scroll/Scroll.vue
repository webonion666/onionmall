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
    probeType: 0,
    pullUpLoad: {
      type: Boolean,
      default:false,
    }
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
      pullUpLoad: this.pullUpLoad,
      click: true,
    })
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll',position);
    })
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');
      this.$emit('pullingUp');
    })
  },
  methods: {
    scrollTo(x, y, time=300){//把返回顶部封装到这里面来调用————面向组件开发
      this.scroll && this.scroll.scrollTo(x, y, time);//调用前先判断是否创建了scroll
      // this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
      // this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll && this.scroll.refresh();
      console.log('--------');
      // this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll? this.scroll.y : 0;
    }
  }
}
</script>

<style>

</style>