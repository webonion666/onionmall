<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="nav-center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" @probe-type='3' @scroll="showBackTop">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabControlClick='tabControlClick'></tab-control>
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
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentGoods: 'pop',
      isShowBackTop: false,//默认不显示返回顶部
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentGoods].list;
    }
  },
  created(){
    this.getHomeMultidata();//调用methods的getHomeMultidata
    this.getHomeGoods('pop');//多次调用methods的getHomeGoods
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
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
    },
    backTop(){
      console.log('返回');
      // this.$refs.scroll.scroll.scrollTo(0,0);//拿到当前页面的scroll组件后取出data中的scroll对象后再调用
      //参数1和参数2是返回的位置，参数3是时间
      //封装上面的
      this.$refs.scroll.scrollTo(0, 0);
    },
    showBackTop(position){
      console.log(position);
      this.isShowBackTop = -position.y >1000 ? true : false;
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
        console.log(res);
        // this.goods[type].list = res.data.list;//保存时要直接赋值吗？————不可以！
        //直接赋值会替换前面的
        this.goods[type].list.push(...res.data.list);//push(...)可以将数组解析后再插入
        this.goods[type].page ++;
      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  /* height: 100vh;
  overflow: hidden; */
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  /* padding-bottom: 44px; */
}
.tab-control{/* 吸顶功能 */
  position: sticky;
  top: 44px;
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