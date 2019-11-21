<template>
  <div class="cart">
    <header class="header">
      <div class="title">
        <h3>购物车</h3>
        <p @click="changeTitle">{{title_btn}}</p>
      </div>
    </header>

    <div class="null" v-if="!$store.state.carts.length">
      <img class="null-img" src="./null.png" alt="购物车空空如也" />
    </div>
    <div class="container" v-else>
      <my-item
        v-for="(item,i) in $store.state.carts"
        :key="i"
        :item="item"
        @add="add(i)"
        @sub="sub(i)"
        @checked="checked($event,i)"
      ></my-item>
    </div>

    <!-- 结算  -->
    <div class="total-bar">
      <label>
        <input type="checkbox" v-model="total_checked" />
        全选
      </label>
      <div class="del-bar" v-if="title_btn=='完成'">
        <button class="del btn" @click="del">删除</button>
      </div>
      <div class="settle-bar" v-else>
        <div>
          <span>合计:</span>
          <span class="total">￥{{this.totalValue}}</span>
        </div>
        <button class="settle btn" @click="settle">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import myItem from "./item";
import { accAdd, accMul } from "@/assets/js/accuracy.js";
export default {
  data() {
    return {
      title_btn: "管理"
    };
  },
  props: {},
  methods: {
    add(i) {
      //加一
      this.$store.commit("setItem", [
        i,
        { count: this.$store.state.carts[i].count + 1 }
      ]);
    },
    sub(i) {
      //减一
      let count = this.$store.state.carts[i].count - 1;
      if (count > 0) {
        this.$store.commit("setItem", [i, { count }]);
      }
    },
    changeTitle() {
      if (this.title_btn === "管理") {
        this.title_btn = "完成";
      } else {
        this.title_btn = "管理";
      }
    },
    checked(isChecked, i) {
      this.$store.commit("setItem", [i, { checked: isChecked }]);
    },
    settle() {
      if (
        this.$store.state.carts.some(item => {
          return item.checked;
        })
      ) {
        let status = window.confirm("确认购买？");
        if (status) {
          // this.$store.commit("de")
          this.$store.commit("delItem");
          this.$toast("购买成功");
        } else {
          this.$toast("已取消购买");
        }
      } else {
        this.$toast("您没有选中任何商品");
      }
    },
    del() {
      if (
        this.$store.state.carts.some(item => {
          return item.checked;
        })
      ) {
        let status = window.confirm("确认删除？");
        if (status) {
          this.$store.commit("delItem");
          this.$toast("删除成功");
        } else {
          this.$toast("用户已取消操作");
        }
      }
      else{
        this.$toast("您没有选中任何商品");
      }
    }
  },
  components: {
    myItem
  },
  computed: {
    total_checked: {
      get() {
        return this.$store.state.carts.every(item => {
          return item.checked;
        });
      },
      set(isChecked) {
        //监听全选按钮
        const len = this.$store.state.carts.length;
        for (let i = 0; i < len; i++) {
          this.$store.commit("setItem", [i, { checked: isChecked }]);
        }
      }
    },
    totalValue() {
      return this.$store.state.carts
        .filter(item => {
          return item.checked;
        })
        .reduce((pass, item) => {
          return accAdd(accMul(item.count, item.price), pass);
        }, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.cart {
  background-color: #ebedf0;
  .header {
    min-height: 100px;
    background-color: #19b5fe;
    margin-bottom: -40px;
    .title {
      color: white;
      padding: 10px;
      padding-top: 20px;
      font-weight: 600;
      overflow: hidden;
      @include flex(space-between, center);
    }
  }
  .container {
    min-height: 100vh;
  }
  .null {
    .null-img {
      display: block;
      width: 100%;
    }
  }
  .total-bar {
    position: fixed;
    z-index: 20;
    width: 100%;
    bottom: 46px;
    border-top: 1px solid #ebedf0;
    background-color: #fff;
    @include flex(space-between, center);
    padding: 10px;
    label {
      color: #333;
    }
    .total {
      font-size: 12px;
      font-weight: 600;
      color: red;
      letter-spacing: 1;
    }
    .del-abr,
    .settle-bar {
      @include flex(space-between, center);
    }
    .btn {
      background-color: #1989fa;
      color: white;
      outline: none;
      border: none;
      margin-left: 20px;
      padding: 5px 10px;
      border-radius: 15px/50%;
      &.del {
        background-color: #ff0036;
      }
    }
  }
}
</style>