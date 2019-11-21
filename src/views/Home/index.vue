<template>
  <div class="home" ref="home">
    <!-- 头部 -->
    <van-nav-bar :fixed="header_fixed" class="home-header">
      <van-icon name="scan" slot="left"></van-icon>
      <van-search
        slot="title"
        v-model="value"
        shape="round"
        class="search-box"
        :background="search_background_color"
        :placeholder="placeholder"
        :disabled="true"
        @click="goToSearch"
      ></van-search>
      <van-icon name="qr" slot="right"></van-icon>
    </van-nav-bar>

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="刷呀刷...">
      <!-- 数据显示 -->
      <van-list class="main-content" v-model="loading" :offset="70" @load="onLoad" ref="list">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(slider,index) in sliders" :key="index">
            <img :src="slider.picUrl" class="van-swipe-item-img" alt />
          </van-swipe-item>
        </van-swipe>
        <!-- 导航 -->
        <my-nav></my-nav>
        <!-- 热卖推荐 -->
        <my-recommend ref="recommend"></my-recommend>
      </van-list>
    </van-pull-refresh>

    <!-- tabbar -->
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Search,
  List,
  Swipe,
  SwipeItem,
  PullRefresh
} from "vant";
import axios from "axios";
import myRecommend from "./recommend";
import myNav from "./nav";
export default {
  data() {
    return {
      isLoading: false,
      header_fixed: true,
      translucent: true,
      search_background_color: "transparent",
      sliders: [],
      loading: false,
      finished: false,
      count: 1
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "热销商品"
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$refs.recommend.updateRecommend();
        this.isLoading = false;
      },500);
    },
    goToSearch() {
      this.$router.push("/search");
    },
    getSliders() {
      axios
        .get("http://www.imooc.com/api/home/slider", { timeout: 3000 })
        .then(data => {
          if (data.data.code === 0) {
            //成功获取到数据时
            this.sliders = data.data.slider;
          } else {
            throw new Error("未获取到数据");
          }
        })
        .catch(err => {
          window.console.log(err);
          this.sliders = [
            { picUrl: require("./img/1.jpg") },
            { picUrl: require("./img/2.jpg") },
            { picUrl: require("./img/3.jpg") },
            { picUrl: require("./img/4.jpg") }
          ];
        });
    },
    onLoad() {
      setTimeout(() => {
        this.$refs.recommend.updateRecommend();
        this.loading = false;
      }, 500);
    }
  },
  created() {
    this.getSliders();
  },
  components: {
    vanNavBar: NavBar,
    vanIcon: Icon,
    vanSearch: Search,
    [PullRefresh.name]: PullRefresh,
    vanList: List,
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem,
    myRecommend,
    myNav
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.home {
  padding-top: 46px;
  padding-bottom: 46px;
  .van-icon {
    font-size: $icon-font-size;
  }
  .search-box {
    background-color: $icon-color-default;
  }
  .van-swipe-item-img {
    width: 100%;
  }
  .home-header {
    // background-color: $header-bgc;
    height: 46px;
    .van-search {
      padding: 5px 12px;
      width: 100%;
    }
  }
  .back-to-top {
    position: fixed;
    bottom: 70px;
    right: 20px;
  }
}
</style>