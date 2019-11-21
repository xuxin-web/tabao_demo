<template>
  <div class="product">
    <!-- 头部 -->
    <header class="header">
      <base-search></base-search>
    </header>
    <div v-if="!this.data.item" class="main loading">
       <van-loading vertical>加载中...</van-loading>
    </div>
    <!-- 商品详情 -->
    <section v-else class="main">
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item,i) in images" :key="i">
          <img v-lazy="item" alt class="swipe-img" />
        </van-swipe-item>
      </van-swipe>

      <div class="price-info">
        <div class="left">
          <p class="top">
            <span>聚划算价</span>
            <span class="sellCount">{{sellCount}}已售</span>
          </p>
          <p class="bottom">
            <span class="priceContainer">
              <span class="money">￥</span>
              <span class="price">{{price}}</span>
            </span>
            <del>
              <span class="money">￥</span>
              <span class="originPrice">{{originPrice}}</span>
            </del>
          </p>
        </div>
        <div class="right">聚划算</div>
      </div>

      <div class="title-info">
        <p>{{title}}</p>
      </div>

      <div class="info">
        <span class="info-left">发货</span>
        <div class="info-right">
          <span>四川成都</span>
          <span>快递包邮</span>
        </div>
      </div>

      <div class="info">
        <span class="info-left">参数</span>
        <div class="info-right">
          <span>品牌</span>
          <span>型号</span>
        </div>
      </div>

      <div class="services info">
        <span class="info-left">保障</span>
        <div class="info-right">
          <span v-for="(item,i) in services" :key="i">{{item}}</span>
        </div>
      </div>
    </section>
    <van-goods-action>
      <van-goods-action-icon @click="goToCart" icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button color="#be99ff" type="warning" @click="addCart" text="加入购物车" />
      <van-goods-action-button color="#7232dd" type="danger" @click="buyIt" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import baseSearch from "@/components/Search";
import jsonp from "@/assets/js/jsonp";
import {
  Loading,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from "vant";
export default {
  data() {
    return {
      data: {},
      images: [], //图片
      sellCount: 0, //已售数量
      originPrice: 0, //历史价格
      price: 0, //当前价格
      title: "", //标题
      services: ["急速退款", "赠报价险"] //保障
    };
  },
  components: {
    baseSearch,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Loading.name]: Loading
  },
  created() {
    this.getData();
  },
  methods: {
    goToCart(){
      this.$router.push("/cart");
    },
    getData() {
      let url =
        `https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/` +
        `?data=%7B"itemNumId"%3A"${this.$route.params.itemId}"%2C"fromJhsH5"%3A"1"%7D`;
      const params = {};
      const options = {
        param: "callback",
        timeout: 10000
      };
      jsonp(url, params, options).then(data => {
          this.images = data.data.item.images;
          this.data = JSON.parse(data.data.apiStack[0].value);
          this.sellCount = this.data.item.sellCount;
          // window.console.log(this.data.price);
          if(this.data.price.extraPrices){
            this.originPrice = this.data.price.extraPrices[0].priceText;
          }else{
            this.originPrice = 49.9;
          }
          this.price = parseFloat(this.data.price.price.priceText)
          this.title = this.data.item.title;
      });
    },
    addCart() {
      let itemId = this.$route.params.itemId;
      let index = this.$store.state.carts.findIndex(item => {
        return item.itemId == itemId;
      });
      if (index>-1) {
        //如果商品已存在，添加数量
        this.$store.commit("setItem", [
          index,
          { count: this.$store.state.carts[index].count + 1 }
        ]);
        this.$toast("添加购物车成功");
      } else {
        //否则添加商品
        this.$store.commit("addItem", {
          itemId,
          count: 1,
          price: this.price,
          pic: this.images[0],
          title: this.title,
          checked: false
        });
        this.$toast("添加购物车成功");
      }
    },
    buyIt() {
      this.$toast("购买成功");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.product {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  position: relative;
  z-index: 10;
  img {
    display: block;
  }
  .main {
    width: 100%;
    padding-top: 46px;
    padding-bottom: 60px;
    background-color: #e5e5e5;
    &.loading{
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
    .swipe-img {
      width: 100%;
      height: 100vw;
    }
    .price-info {
      background-color: $link-active-color;
      color: white;
      padding: 10px;
      @include flex(space-between, center);
      .left {
        @include flex(space-between, flex-start, column);
        .top {
          font-size: 14px;
          padding-bottom: 10px;
          .sellCount {
            margin-left: 10px;
            font-size: 12px;
            background-color: rgba(0, 0, 0, 0.4);
            padding: 2px 10px;
            border-radius: 10px/50%;
          }
        }
        .bottom {
          .priceContainer {
            background-color: white;
            color: $link-active-color;
            padding: 4px 20px;
            border-radius: 15px/50%;
            margin-right: 20px;
          }
          .price {
            font-size: 22px;
          }
        }
      }
      .right {
        border: 1px solid #fff;
        padding: 0 5px;
      }
    }
    .title-info {
      font-size: 14px;
      background-color: #fff;
      padding: 10px;
      line-height: 1.5;
      font-weight: 600;
    }
    .info {
      margin-top: 10px;
      background-color: #fff;
      @include flex(space-between, center);
      flex-wrap: nowrap;
      font-size: 12px;
      padding: 10px;
      .info-left {
        color: gray;
        flex: 2;
      }
      .info-right {
        flex: 10;
        span {
          padding: 5px;
        }
      }
    }
  }
}
</style>
