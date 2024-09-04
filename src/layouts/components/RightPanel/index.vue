<script lang="ts" setup>
import { ref } from "vue"
import { Setting } from "@element-plus/icons-vue"

interface Props {
  buttonTop?: number
}

const props = withDefaults(defineProps<Props>(), {
  buttonTop: 350
})

const buttonTopCss = props.buttonTop / 100 + "rem"
const show = ref(false)
</script>

<template>
  <div class="handle-button" @click="show = true">
    <el-icon>
      <Setting />
    </el-icon>
  </div>
  <el-drawer v-model="show" size="3rem" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  width: 0.48rem;
  height: 0.48rem;
  background-color: var(--HP-rightpanel-button-bg-color);
  position: fixed;
  top: v-bind(buttonTopCss);
  right: 0;
  border-radius: 0.06rem 0 0 0.06rem;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-icon {
    font-size: 0.24rem;
  }
}
</style>
