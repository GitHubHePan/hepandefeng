<template>
  <div class="error-page">
    <div class="error-page-svg">
      <slot />
    </div>
    <router-link to="/">
      <el-button type="primary">回到首页</el-button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-svg {
    width: 4rem;
    margin-bottom: 0.5rem;
  }
}
</style>
