<template>
  <div class="item">
    <div class="item-input">
      <input type="checkbox" :checked="item.checked" @change="isChecked" />
    </div>
    <router-link :to="{name:'product',params:{itemId:item.itemId}}">
      <img class="item-pic" :src="item.pic" alt />
    </router-link>
    <div class="item-info">
      <p class="item-title">{{item.title}}</p>
      <div class="item-bar">
        <p class="item-price">￥{{item.price}}</p>
        <p class="item-count-bar">
          <a class="item-btn" @click="$emit('sub')">-</a>
          <span class="item-count">{{item.count}}</span>
          <a class="item-btn" @click="$emit('add')">+</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    isChecked(e){
      this.$emit("checked",e.target.checked);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";

.item {
  max-height: 120px;
  background-color: #fff;
  width: 90vw;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  @include flex(space-around, stretch);
  .item-input {
    @include flex(center, center);
  }
  .item-pic {
    width: 100px;
    flex-basis: 30%;
  }
  .item-info {
    flex-basis: 60%;
    @include flex(space-around, stretch, column);
    .item-title {
      @include multiline-ellipsis(2);
      font-size: 14px;
      line-height: 1.5;
      //   height: 40px;
    }
    .item-bar {
      @include flex(space-between, stretch);
      .item-price {
        color: red;
        font-weight: 600;
      }
      .item-count-bar {
        padding-right: 20px;
        .item-btn {
          padding: 0 6px;
          border: 1px solid #aaa;
          &:first-of-type {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          &:last-of-type {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
        }
        .item-count {
          border: 1px solid #aaa;
          border-left-width: 0;
          border-right-width: 0;
          padding: 0 15px;
        }
      }
    }
  }
}
</style>