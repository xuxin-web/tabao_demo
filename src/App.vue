<template>
  <div id="app" class="g-container">
      <router-view />
    <keep-alive>
      <base-tabbar></base-tabbar>
    </keep-alive>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
  components: {
    baseTabbar: Tabbar
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  max-width: 750px;
  margin: 0 auto;
  position: relative;
}
</style>
