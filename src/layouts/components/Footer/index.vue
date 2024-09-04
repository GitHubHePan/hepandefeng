<script lang="ts" setup>
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <footer class="layout-footer">Hepan © 2025-PRESENT {{ VITE_APP_TITLE }}</footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  width: calc(100% - 0.2rem);
  min-height: 0.28rem;
  font-size: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-placeholder);
  position: absolute;
  bottom: 0;
}
</style>
