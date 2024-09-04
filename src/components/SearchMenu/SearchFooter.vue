<script lang="ts" setup>
import { useDevice } from "@/hooks/useDevice"

interface Props {
  total: number
}

const props = defineProps<Props>()

const { isMobile } = useDevice()
</script>

<template>
  <div class="search-footer">
    <template v-if="!isMobile">
      <span class="search-footer-item">
        <SvgIcon name="keyboard-enter" />
        <span>确认</span>
      </span>
      <span class="search-footer-item">
        <SvgIcon name="keyboard-up" />
        <SvgIcon name="keyboard-down" />
        <span>切换</span>
      </span>
      <span class="search-footer-item">
        <SvgIcon name="keyboard-esc" />
        <span>关闭</span>
      </span>
    </template>
    <span class="search-footer-total">共 {{ props.total }} 项</span>
  </div>
</template>

<style lang="scss" scoped>
.search-footer {
  display: flex;
  color: var(--el-text-color-secondary);
  font-size: 0.14rem;
  &-item {
    display: flex;
    align-items: center;
    margin-right: 0.12rem;
    .svg-icon {
      margin-right: 0.05rem;
      padding: 0.02rem;
      font-size: 0.2rem;
      background-color: var(--el-fill-color);
    }
  }
  &-total {
    margin: 0 0 0 auto;
  }
}
</style>
