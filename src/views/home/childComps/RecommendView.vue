<template>
  <div class="recommend">
    <div v-for="(item,id) in recommend" :key="id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommend: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .recommend{
    display:flex;
    width: 100%;
    text-align: center;
    padding: 15px 0 30px;
    font-size: 12px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>