<template>
  <div class="category">
    <!-- 头部 -->
    <van-nav-bar class="header" left-arrow title="商品分类" @click-left="goBack">
      <van-icon name="ellipsis" slot="right"></van-icon>
    </van-nav-bar>

    <main class="main">
      <div class="side-bar">
        <ul>
          <li
            v-for="(item,i) in items"
            :key="i"
            class="side-item"
            :class="{active:activeId==item.id}"
            @click="clickNav(item.id)"
          >{{item.text}}</li>
        </ul>
      </div>
      <div class="content-bar">
        <div v-if="!content.banner" class="loading">
          <van-loading>加载中...</van-loading>
        </div>
        <div v-else>
          <a v-if="content.banner.picUrl" :href="content.banner.linkUrl" class="banner-link">
            <img class="banner-img" v-lazy="content.banner.picUrl" />
          </a>
          <div class="section" v-for="(section, index) in content.data" :key="index">
            <h4 class="section-title">{{section.name}}</h4>
            <ul class="section-list">
              <li class="section-item" v-for="(item, i) in section.itemList" :key="i">
                <router-link to="search" class="section-link">
                  <p class="section-pic" v-if="item.picUrl">
                    <img v-lazy="item.picUrl" alt class="section-img" />
                  </p>
                  <p class="section-name">{{item.name}}</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { NavBar, Icon, Loading } from "vant";
import { categorytexts, url } from "./config";
import axios from "axios";
export default {
  data() {
    return {
      activeId: "", //激活的id
      items: [],
      content: {},
      cancel:{}
    };
  },
  props: {},
  components: {
    vanNavBar: NavBar,
    vanIcon: Icon,
    vanLoading: Loading
  },
  methods: {
    goBack() {
      //返回首页
      this.$router.push("/home");
    },
    getContent() {
      // 获取列表数据
      this.content = {};
      this.cancel.func && this.cancel.func("取消了上一次请求");
      let _this = this;
      axios
        .get(url + this.activeId, {
          cancelToken: new axios.CancelToken(function executor(c) {
            _this.cancel.func = c;
          })
        })
        .then(data => {
          this.content = data.data.content;
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    clickNav(id) {
      // 点击列表时更换id
      this.activeId = id;
    }
  },
  created() {
    this.items = categorytexts;
    this.clickNav("WQR2006");
  },
  watch: {
    activeId: function() {
      //id更改时发送ajax请求
      this.getContent();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";

.category {
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20 !important;
    background-color: #fff;
  }
  .main {
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    z-index: 10;
    padding-top: 46px;
    @include flex();
    width: 100%;
    .side-bar {
      flex-basis: 90px;
      flex-grow: 0;
      height: 100vh;
      padding-bottom: 46px;
      overflow-y: scroll;
      .side-item {
        padding: 8px;
        font-size: 14px;
        background-color: #fafafa;
        border: 3px solid transparent;

        &.active {
          background-color: #fff;
          font-weight: 500;
          border-left-color: $link-active-color;
        }
      }
    }
    .content-bar {
      height: 100vh;
      overflow-y: scroll;
      flex: 1;
      position: relative;
      padding-bottom: 46px;

      .loading {
        width: 150px;
        height: 100px;
        background-color: rgba(0, 0, 0, 0);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -50px;
        margin-left: -75px;
        border-radius: 10px;
        @include flex(center, center);
      }
      .banner-link {
        display: block;
        width: 100%;
        overflow: hidden;
        .banner-img {
          width: 100%;
        }
      }
      .section {
        padding: 5px;
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 0;
        }

        &-title {
          height: 28px;
          line-height: 28px;
          color: #080808;
          font-size: $font-size-base + 2;
          font-weight: bold;
        }

        &-list {
          display: flex;
          flex-wrap: wrap;
          background-color: #fff;
          padding: 10px 10px 0;
        }

        &-item {
          width: (100% / 3);
        }

        &-link {
          display: block;
        }

        &-pic {
          position: relative;
          width: 80%;
          padding-bottom: 80%;
          margin: 0 auto;
        }

        &-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        &-name {
          height: 36px;
          line-height: 36px;
          font-size: $font-size-base;
          color: black;
          text-align: center;
          @include ellipsis();
        }
      }
    }
  }
}
</style>