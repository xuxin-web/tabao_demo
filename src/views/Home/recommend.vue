<template>
  <div class="recommend">
    <h3 class="recommend-title">
      <span>热卖推荐</span>
    </h3>
    <ul class="recommend-list">
      <li v-for="(item,index) in recommends" :key="index" class="recommend-item">
        <router-link class="recommend-link" :to="{name:'product',params:{itemId:item.baseinfo.itemId}}">
          <div class="recommend-pic">
            <img class="recommend-img" v-lazy="item.baseinfo.picUrlNew" alt />
          </div>
          <p class="recommend-name">{{item.name.shortName}}</p>
          <p class="recommend-origPrice">
            <del>￥{{item.price.origPrice}}</del>
          </p>
          <p class="recommend-info">
            <span class="recommend-price">
              ￥
              <strong class="recommend-price-num">{{item.price.actPrice}}</strong>
            </span>
            <span class="recommend-count">{{item.remind.soldCount}}人付款</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import jsonp from "@/assets/js/jsonp";
export default {
  data() {
    return {
      recommends: [],
      curPage: 1, //当前页
      totalPage: 1 //已加载页数
    };
  },
  props: {},
  created() {
    this.updateRecommend();
  },
  methods: {
    // 获取数据
    getData(page = 1, psize = 20) {
      if (this.curPage > this.totalPage) {
        return Promise.reject("没有更多");
      }
      const url = "https://ju.taobao.com/json/tg/ajaxGetItemsV2.json";
      const params = {
        page,
        psize,
        type: 0,
        frontCatId: ""
      };
      const options = {
        param: "callback",
        timeout: 10000
      };
      return jsonp(url, params, options)
        .then(res => {
          if (res.code === "200") {
            return res;
          }
          throw new Error("未能获取到数据！！");
        })
        .catch(err => {
          if (err) {
            window.console.log(err);
          }
        })
        .then(res => {
          return new Promise(resolve => {
            resolve(res);
          });
        });
    },
    // 设置数据
    setRecommend(data) {
      this.curPage++;
      this.totalPage = data.totalPage;
      this.recommends = this.recommends.concat(data.itemList);
      //数据更新后刷新滚动条
    },

    // 更新数据
    updateRecommend() {
      this.getData(this.curPage).then(data => {
        this.setRecommend(data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.recommend {
  background-color: $bgc-theme;
  a {
    font-size: 12px;
    color: #686868;
    text-decoration: none;
  }
  &-title {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: $font-size-l;
    @include flex(space-between, center);
    &:after,
    &:before {
      content: "";
      width: 40%;
      height: 1px;
      background-color: #ddd;
    }
  }
  &-list {
    @include flex(space-between, center);
    flex-wrap: wrap;
  }
  &-item {
    width: 48.3%;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 8px;
    border-radius: 7px;
    overflow: hidden;
    &:nth-of-type(even) {
      margin-right: 1%;
    }
    &:nth-of-type(odd) {
      margin-left: 1%;
    }
  }
  &-link {
    display: block;
  }
  &-pic {
    padding-top: 100%;
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
  }
  &-name {
    height: 50px;
    padding: 5px 10px;
    // margin-bottom:8px;
    line-height: 1.5;
    color: black;
    @include multiline-ellipsis(2);
  }
  &-origPrice {
    padding-left: 10px;
    margin-bottom: 7px;
  }
  &-info {
    @extend .recommend-origPrice;
    padding-right: 10px;
    @include flex(space-between, center);
  }
  &-price {
    color: red;
    &-num {
      font-size: 1.5 * $font-size-base;
    }
  }
}
</style>