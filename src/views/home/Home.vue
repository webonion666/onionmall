<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="nav-center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabControlClick='tabControlClick' ref="tabControlFixed" v-show="isShowTabControl"></tab-control><!--  -->
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="showBackTop" :pull-up-load='true'  @pullingUp="loadMore"><!--  -->
      <home-swiper :banners="banners" @swiperLoadImage="swiperLoadImage"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabControlClick='tabControlClick' ref="tabControl"></tab-control><!-- class="tab-control" -->
      <goods-list :goods-list="showGoods" ></goods-list>
    </scroll>
    <back-top class="back-top" @click.native='backTop' v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name: 'Home',
  components: {    
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
  },
  data(){
    return {
      // result: null//只用一个变量保存有点乱
      banners:[],//轮播图
      recommend: [],//推荐
      goods: {//商品
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentGoods: 'pop',
      isShowBackTop: false,//默认不显示返回顶部
      tabControlOffset: 0,//tabcontrol的页面高度监听
      isShowTabControl: false,//吸顶
      lastScrollY: 0,//记录离开前的滚动位置
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentGoods].list;
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.lastScrollY,0);
    this.$refs.scroll.refresh();
  },
  deactivated(){
    this.lastScrollY = this.$refs.scroll.getScrollY();
  },
  created(){
    this.getHomeMultidata();//调用methods的getHomeMultidata
    this.getHomeGoods('pop');//多次调用methods的getHomeGoods
    this.getHomeGoods('new');
    this.getHomeGoods('sell'); 
  },
  mounted(){
    /**
     * 图片加载完成事件监听、更新滑动窗口高度
     */
    const refresh = debounce(this.$refs.scroll.refresh, 100);//传递refreshh，不用调用
    this.$bus.$on('loadImage', () => {
    // this.$refs.scroll.refresh();//这种更新方式短时间内调用太多次了
      refresh();//闭包，不会被销毁
    })

  },
  methods: {
    /**
     * 获取offsettop
     */
    swiperLoadImage(){
      //所有的组件都会有一个$el，用于获取组件中的元素
      this.tabControlOffset = this.$refs.tabControl.$el.offsetTop;//坚挺的是滚动的tabcontrol的高度
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    /**
     * 事件响应函数
     */
    tabControlClick(index){
      switch(index){
        case 0:
          this.currentGoods = 'pop';
          break;
        case 1:
          this.currentGoods = 'new';
          break;
        case 2:
          this.currentGoods = 'sell';
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlFixed.currentIndex = index;
    },
    backTop(){
      // this.$refs.scroll.scroll.scrollTo(0,0);//拿到当前页面的scroll组件后取出data中的scroll对象后再调用
      //参数1和参数2是返回的位置，参数3是时间
      //封装上面的
      this.$refs.scroll.scrollTo(0, 0);
    },
    showBackTop(position){
      //返回顶部
      this.isShowBackTop = -position.y >1000 ? true : false;
      //tabcontrol吸顶功能
      this.isShowTabControl = this.tabControlOffset < -position.y ? true : false;
    },
    loadMore(){
      this.getHomeGoods(this.currentGoods);
      // this.$refs.scroll.finishPullUp();
      //better-scroll是在页面数据请求前就创建的，预留的滑动窗口和实际图片高度不一致，需要请求数据后再刷新一次，保证每次都能再拿到30条数据
      // this.$refs.scroll.scroll.refresh();
    },
    /**
     * 数据请求
     */
    getHomeMultidata(){//在这里面请求数据
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;//res会被回收所以要保存起来
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;//请求的数据是当前页面的下一页
      getHomeGoods(type,page).then(res => {
        // this.goods[type].list = res.data.list;//保存时要直接赋值吗？————不可以！
        //直接赋值会替换前面的
        this.goods[type].list.push(...res.data.list);//push(...)可以将数组解析后再插入
        this.goods[type].page ++;
        //完成加载后
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  /* height: 100vh;
  overflow: hidden; */
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* 使用原生滚动时防止nav跟着滚动 *//* 浮动定位会脱离文档流 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;*/
  z-index: 9; 
  /* padding-bottom: 44px; */
}
/* 吸顶功能 */
.tab-control{
  /* position: sticky;
  top: 44px; *//* 使用原生滚动时适用 */
  position: relative;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden; 
}
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>