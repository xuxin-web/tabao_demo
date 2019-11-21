<template>
  <div class="g-tabbar">
    <router-link class="g-tabbar-item" to="/home">
      <van-icon class="icon" name="home-o"></van-icon>
      <span class="title">首页</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/category">
      <van-icon class="icon" name="apps-o"></van-icon>
      <span class="title">分类页</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/cart">
      <van-icon class="icon" name="cart-o"></van-icon>
      <span class="title">购物车</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/personal">
      <van-icon class="icon" name="user-o"></van-icon>
      <span class="title">个人中心</span>
    </router-link>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  name: "CTabbar",
  components: {
    vanIcon: Icon
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.g-tabbar {
  height: 46px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  @include flex(space-between, strech, row);
  z-index: 1;
  background-color: #fff;
  border-top:1px solid $border-color;
  .g-tabbar-item {
    color: $link-color;
    height: 100%;
    width: 100%;
    @include flex(center, center, column);
    font-size: $font-size-base;
    .icon{
      font-size: $icon-font-size-sm;
    }
  }
  .router-link-active {
    color: $link-active-color;
  }
  .title{
    padding-top:5px;
  }
}
</style>
