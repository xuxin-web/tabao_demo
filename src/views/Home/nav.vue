<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item,index) in navs" :key="index">
        <router-link to="" class="nav-link">
          <img :src="item.picUrl" alt="item" class="nav-pic">
          <span>{{item.text}}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navs:[]
    };
  },
  created(){
    this.navs =[
  // 原nav.uve的数据
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-1.png'),
    text: '团购'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-2.png'),
    text: '购物车'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-3.png'),
    text: '优惠券'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-4.png'),
    text: '书籍'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-5.png'),
    text: '航班'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-6.png'),
    text: '美食'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-7.png'),
    text: '饮品'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-8.png'),
    text: '秒杀'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-9.png'),
    text: '拍卖'
  },
  {
    linkUrl: '',
    picUrl: require('./img/nav-item-10.png'),
    text: '手机'
  }
];
  },
  props: {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
$nav-vertial:15px;
a{
  font-size:$font-size-base;
  color:gray;
}
.nav{
  width:100%;
  padding:$nav-vertial 0;
  background: #fff;
  &-list{
    display: flex;
    flex-wrap: wrap;
  }
  &-item{
    flex-basis: 20%;
    margin-bottom:$nav-vertial;
  }
  &-link{
    @include flex(center,center,column)
  }
  &-pic{
    width:60%;
    margin-bottom:8px;
  }
}
</style>