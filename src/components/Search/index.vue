<template>
  <!-- 头部 -->
  <van-nav-bar :fixed="true" class="header" left-arrow @click-left="goHome">
    <van-search
      slot="title"
      v-model="value"
      shape="round"
      class="search-box"
      placeholder="搜索更多商品"
      :disabled="true"
      @click="goToSearch"
    ></van-search>
    <van-icon name="ellipsis" slot="right"></van-icon>
  </van-nav-bar>
</template>

<script>
import { NavBar, Search, Icon } from "vant";
export default {
  data() {
    return {
      value:""
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Icon.name]: Icon
  },
  methods:{
    goToSearch(){
      this.$router.push("/search")
    },
    goHome(){
      this.$router.push("/home")
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
    height: 46px;
    .van-search {
      padding: 5px 12px;
      width: 100%;
    }
  }
</style>
