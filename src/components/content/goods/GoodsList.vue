<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goodsList" :key="index" :goods-item="item"></goods-list-item>
    <!-- {{goodsList}} -->
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'GoodsList',
  components:{
    GoodsListItem
  },
  props: {
    goodsList: {//获取数据列表
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
 .goods-list{
   display: flex;
   flex-wrap: wrap;/* //不换行 */
   justify-content: space-evenly;/* 均匀放置 */
 }
</style>