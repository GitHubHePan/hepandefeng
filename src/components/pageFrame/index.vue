<script lang="ts" setup>
import { computed, ref } from "vue"
import _ from "lodash-es"

interface pageProps {
  defisblock?: boolean
  defBlockName?: string | null
  componentList: any
}

const props = withDefaults(defineProps<pageProps>(), {
  defisblock: false,
  defBlockName: null,
  componentList: []
})

const isBlockSize = ref(props.defisblock ?? false)
const blockName = ref(props.defBlockName ?? null)

const changeBlockFunin = () => {
  isBlockSize.value = !isBlockSize.value
  blockName.value = null
}

const changeBlockFunout = (name: string) => {
  isBlockSize.value = !isBlockSize.value
  blockName.value = name
}

const layoutClasses = computed(() => {
  const classes = ["main-subpage-content"]
  if (isBlockSize.value) {
    classes.push("fullscreen-container")
  }
  return classes.join(" ")
})
</script>
<template>
  <div class="subpage">
    <div :class="layoutClasses">
      <template v-for="(item, index) in componentList" :key="index">
        <component
          :is="item.renderCompoment"
          :id="item.id"
          :blockName="blockName"
          :isBlockSize="isBlockSize"
          :changeBlockFunin="changeBlockFunin"
          :changeBlockFunout="changeBlockFunout"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subpage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main-subpage-content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &.fullscreen-container {
      position: relative;
    }
  }
}
</style>
