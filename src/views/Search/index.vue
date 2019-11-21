<template>
  <div class="search">
    <!-- 头部 -->
    <van-nav-bar
      :fixed="true"
      class="search-header"
      left-arrow
      right-text="搜索"
      @click-left="goHome"
      @click-right="search(value)"
    >
      <van-search
        slot="title"
        v-model="value"
        shape="round"
        @keydown.enter="search(value)"
        class="search-box"
        :placeholder="placeholder"
        :autofocus="true"
        @input="getValue"
      ></van-search>
    </van-nav-bar>
    <main class="main" v-if="!value">
      <!-- 热门搜索页 -->
      <div class="info">
        <h3 class="info-title">热门搜索</h3>
        <ul class="hot info-list">
          <li class="info-item" v-for="(item,i) in hot" :key="i" @click="search(item)">{{item}}</li>
        </ul>
      </div>
    </main>
    <ul class="main" v-else>
      <li class="search-item" v-for="(item,i) in searchList" :key="i" @click="search(item)">{{item[0]}}</li>
    </ul>
  </div>
</template>

<script>
import { Search, NavBar } from "vant";
import { hotUrl } from "./config";
import axios from "axios";
import jsonp from "@/assets/js/jsonp";

export default {
  data() {
    return {
      value: "",
      hot: {},
      searchList: []
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "热卖商品"
    }
  },
  components: {
    vanSearch: Search,
    vanNavBar: NavBar
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    search(value) {
      this.$toast("跳转到结果页"+value);
    },
    getValue() {
      //https://suggest.taobao.com/sug?q=apple&code=utf-8&area=c2c&nick=&sid=null&allback=jaonp5
      const url = "https://suggest.taobao.com/sug";
      const params = {
        q: this.value,
        code: "utf-8",
        area: "c2c",
        nick: "",
        sid: null
      };
      jsonp(url,params,{params:"callback"}).then((data)=>{
        window.console.log(data.result);
        this.searchList = data.result;
      })
    }
  },
  created() {
    axios
      .get(hotUrl, { timeout: 3000 })
      .then(data => {
        this.hot = data.data.hotKeyWord.def;
      })
      .catch(err => {
        window.console.log(err);
        this.hot = {};
      });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.search {
  overflow: hidden;
  .search-header {
    height: 46px;
    .van-search {
      padding: 5px 12px;
      width: 100%;
    }
    .search-box {
      background-color: $icon-color-default;
    }
  }
  .main {
    margin-top: 50px;
    .info {
      padding: 10px;
      background-color: #fff;
      &-title {
        font-size: 16px;
      }
      &-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
      }
      &-item {
        padding: 5px 10px;
        background-color: #eeeeee;
        border-radius: 5px;
        margin: 5px;
      }
    }
    .search-item{
      margin:0 10px;
      padding: 10px 0;
      border-bottom:1px solid rgba(0,0,0,0.1);
    }
  }
}
</style>