<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0,//当前分类的索引
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabControlClick', index);
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 3px;
  }
  .active{
    color: var(--color-tint);
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>