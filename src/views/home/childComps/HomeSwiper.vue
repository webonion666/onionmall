<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, id) in banners" :key="id">
        <a :href="item.link">
          <img :src="item.image" alt="" @load='swiperLoadImage'>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad: false,
    }
  },
  methods:{
    swiperLoadImage(){
      // console.log('!!!');
      if(!this.isLoad){
        this.$emit('swiperLoadImage');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style>

</style>