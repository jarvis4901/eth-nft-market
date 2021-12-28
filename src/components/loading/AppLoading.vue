<template>
  <section class="loading flex justify-center items-center">
    <div class="mock text-white text-xl bold">加载中...</div>
  </section>
</template>

<style>
.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.7;
}
.mask {
  width: 100%;
  height: 100%;
}
.main {
  margin: 200px auto;
  text-align: center;
}
</style>
