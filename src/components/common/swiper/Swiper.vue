<template>
  <div id="my-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator" >
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div class="indi-item" v-for="(item,index) in slideCount" :key="index" :class="{active:index === currentIndex-1}">
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {//一些动态可更改的参数
    interval: {//切换时间
      type: Number,
      default: 1000
    },
    animDuration: {//动画时间
      type: Number,
      default: 300
    },
    moveRatio: {//需切换页面的拖动比例
      type: Number,
      default: 0.3
    },
    showIndicator: {//是否显示页面标识条
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      slideCount: 0,//图片元素个数
      currentIndex: 1,//当前索引index
      totalWidth: 0,//swiper的宽度
      swiperStyle: {},//swiper的样式（主要是位置
      scrolling: false,//是否正在滚动
    }
  },
  mounted: function(){//页面加载完成后
    setTimeout(() => {
      //1.操作DOM，在前后添加slide
      this.handleDom();
      //2.开启定时器
      this.startTimer();
    }, 2000)
  },
  methods:{
    /**
     * 初始化操作
     */
    handleDom(){
      //1.获取要操作的元素，swiperitem下的slide
      let swiperEl = document.querySelector('.swiper');
      let sliderEls = swiperEl.getElementsByClassName('slide');
      //2.保存图片个数
      this.slideCount = sliderEls.length;
      // console.log(this.slideCount);
      //3.图片个数大于1，在前后添加一个slide
      if(this.slideCount > 1){
        let cloneFirst = sliderEls[0].cloneNode(true);
        let cloneLast = sliderEls[this.slideCount - 1].cloneNode(true);

        swiperEl.insertBefore(cloneLast, sliderEls[0]);//头插入
        swiperEl.appendChild(cloneFirst);//尾插入
        // this.slideCount = sliderEls.length;//不用重新保存
        // console.log(this.slideCount);
        //获取图片的宽度--计算位置时使用
        this.totalWidth = swiperEl.offsetWidth;
        // console.log(this.totalWidth);
        //保存滑动图片的style--更改位置使用
        this.swiperStyle = swiperEl.style;
      }
      //更正当前显示第一页（显示为最后一页了）
      this.setTransform(-this.totalWidth);
    },
    /**
     * 定时器处理
     */
    startTimer(){
      this.playTimer = window.setInterval(() => {
        this.currentIndex ++; 
        // this.scrollContent(-this.totalWidth * this.currentIndex);
        this.scrollContent();
        // this.next();
        // this.previous();
      }, this.interval)
    },
    stopTimer(){
      window.clearInterval(this.playTimer);
    },
    /**
     * 图片滚动
     */
    // scrollContent: function(currentPosition){
    scrollContent: function(){
      //1.设置正在滚动，不可拖动
      this.scrolling = true;

      //3.判断滚动到的位置
      this.checkPosition()
      this.setTransform(-this.currentIndex * this.totalWidth);
      
      //2.开始滚动动画
      this.swiperStyle.transition = 'transform' + this.animDuration + 'ms';
      // this.setTransform(currentPosition);
      
      //滚动完成
      this.scrolling = false;
    },
    /**
     * 检验滚动位置（超出）
     */
    checkPosition(){
      if(this.currentIndex >=this.slideCount + 1){
        this.currentIndex = 1;
        // this.setTransform(-this.currentIndex * this.totalWidth);
      }else if(this.currentIndex <= 0){
        this.currentIndex = this.slideCount;
      }
    },
    /**
     * 设置滚动位置————考虑兼容性
     */
    setTransform(position){
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },
    /**
     * 拖动事件处理
     */
    touchStart(e){
      //1.正在滚动不可以拖动
      if(this.scrolling) return;
      //2.停止定时器
      this.stopTimer();
      //3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },
    touchMove(e){
      //1.计算拖动距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      //2.设置当前的位置
      this.setTransform(moveDistance);
    },
    touchEnd(e){
      //1.获取移动的距离
      let currentMove = Math.abs(this.distance);
      //2.判断最终的位置
      if(this.distance === 0){
        return;
      } else if(this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {//大右移
        this.currentIndex --;
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {//大左移
        this.currentIndex ++;
      }
      //3.重新修改位置
      this.scrollContent();

      //4.重启定时器
      this.startTimer();

    },
    /**
     * 控制图片切换上、下一个
     */
    previous(){
      this.changeItem(-1)
    },
    next(){
      this.changeItem(1);;
    },
    changeItem(num){//num为1是下一张，-1时上一张
    //1.移除定时器
      this.stopTimer();
    //2.修改index和图片位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);
    //3.重启定时器
      this.startTimer();
    }
  }
}
</script>

<style>
  #my-swiper{
    overflow: hidden;
    position: relative;
  }
  .swiper{
    display: flex;
  }
  .indicator{
    display: flex;
    justify-content: center;
    width: 100%;
    /* background-color: rgba(100,100,100,.3); */
    position: absolute;
    bottom: 8px;
  }
  .indi-item{
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 5px;
  }
  .indi-item.active {
    background-color: rgba(212,62,46,1);
  }
</style>