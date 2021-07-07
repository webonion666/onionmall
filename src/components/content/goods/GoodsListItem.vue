<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="loadImage">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="goods-price">{{goodsItem.price}}</span>
      <span class="goods-fav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {//获取数据中的对象
      type: Object,
      default(){
        return null
      }
    }
  },
  methods: {
    loadImage(){
      console.log('loadImage');
      this.$bus.$emit('loadImage');
    }
  }
}
</script>

<style>
  .goods-item{
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    overflow: hidden;
    text-align: center;
    /* margin: 3px 0 8px; */
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;/* 不换行 */
    margin-bottom: 3px;
  }
  .goods-info .goods-price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .goods-fav{
    position: relative;
  }
  .goods-info .goods-fav::before{
    content: '';/* ::before一定要加这个！！！ */
    position: absolute;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>