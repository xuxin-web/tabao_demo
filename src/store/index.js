import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts: [
      {
        "itemId": 595486368653,
        "count": 2,
        "price": 19.9,
        "pic": "//img.alicdn.com/imgextra/i4/2690231046/O1CN01bTjpTT1Jb6r8wfvsF_!!2-item_pic.png",
        "title": "蓝漂42卷本色卫生纸家用实惠装卷纸厕纸卷筒纸整箱批手纸特价纸巾",
        "checked": false
      },
      {
        "itemId": 555029267038,
        "count": 1, "price": 31.8,
        "pic": "//img.alicdn.com/imgextra/i2/3344917959/O1CN0177hrNt28fGrLkYlYO_!!3344917959.jpg",
        "title": "蓝月亮洗衣液家庭促销组合装香味持久薰衣草整箱批护理家用实惠装", 
        "checked": true
      }]
  },
  mutations: {
    addItem(state, item) {  //添加商品
      state.carts.push(item);
    },
    setItem(state, [i, item]) {  //更改商品，接受一个数组，第一参数是位置，第二个是商品
      // window.console.log(i,item);
      for (let key in item) {
        state.carts[i][key] = item[key];
      }
    },
    delItem(state) {   // 删除选中的商品
      state.carts = state.carts.filter(item=>{
        return !item.checked;  
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
