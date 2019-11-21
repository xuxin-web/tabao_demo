<template>
  <div class="personal">
    <header class="header">
      <div>
        <img class="avatar" src="./user.jpg" alt />
        <p>萌将跳动</p>
      </div>
    </header>
    <div class="user">
      <van-row class="user-links">
        <van-col span="6">
          <van-icon name="pending-payment" />待付款
        </van-col>
        <van-col span="6">
          <van-icon name="records" />待接单
        </van-col>
        <van-col span="6">
          <van-icon name="tosend" />待发货
        </van-col>
        <van-col span="6">
          <van-icon name="logistics" />已发货
        </van-col>
      </van-row>

      <van-cell-group class="user-group">
        <van-cell icon="records" title="全部订单" is-link />
      </van-cell-group>

      <van-cell-group>
        <van-cell icon="points" title="我的积分" is-link />
        <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
        <van-cell icon="gift-o" title="我收到的礼物" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from "vant";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
};
</script>

<style lang="scss" scoped>
.personal {
  background-color: #eee;
  height: 100vh;
  overflow: hidden;
}
.header {
  background-color: #19b5fe;
  min-height: 180px;
  margin-bottom: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:16px;
  font-weight: 600;
  color:white;
  .avatar {
    width: 50px;
    border-radius: 50%;
  }
}
.user {
  width: 80vw;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  min-height: 100vh;
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>