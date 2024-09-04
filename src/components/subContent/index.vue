<script lang="ts" setup>
import { computed } from "vue"
import _ from "lodash-es"

interface chartProps {
  id?: string | null
  title?: string
  subTitle?: string
  isBlockSize?: boolean
  blockName?: string | null
  isError?: boolean
  changeBlockFunin?: () => any
  changeBlockFunout?: (name: string | null) => any
}

const props = withDefaults(defineProps<chartProps>(), {
  id: null,
  title: "",
  subTitle: "",
  isBlockSize: false,
  blockName: null,
  isError: false,
  changeBlockFunin: () => {},
  changeBlockFunout: () => {}
})

console.log(props)

const zoominout = () => {
  props.isBlockSize ? props.changeBlockFunin() : props.changeBlockFunout(props.id)
}

const itemContainer = computed(() => {
  const classes = ["transform-contaioner"]
  if (props.isBlockSize) {
    if (props.blockName === props.id) {
      classes.push("full-item-container")
    } else {
      classes.push("transparent-item-container")
    }
  }
  return classes.join(" ")
})

const title = computed(() => `${props.title}${props.subTitle ? " " + props.subTitle : ""}`)
</script>
<template>
  <div class="item-container">
    <div :class="itemContainer">
      <div class="item-container-header">
        <div class="title-content">
          <span>{{ title }}</span>
          <span @click="zoominout"
            ><el-icon><Rank /></el-icon
          ></span>
        </div>
      </div>
      <div class="item-container-body">
        <slot v-bind="props" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-container {
  width: calc(50% - 0.1rem);
  height: calc(50vh - 0.54rem);

  display: flex;
  border-radius: 0.08rem;
  flex-direction: column;
  .item-container-header {
    border-bottom: 0.01rem solid rgba(255, 255, 255, 0.18);
    height: 0.5rem;
    padding: 0.1rem;
    text-align: left;
    width: 100%;
    line-height: 0.3rem;
    .title-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
      }
    }
  }
  .item-container-body {
    flex: 1;
    height: calc(100% - 0.5rem);
  }
  &:nth-of-type(2n - 1) {
    margin-right: 0.1rem;
  }
  &:nth-of-type(2n) {
    margin-left: 0.1rem;
  }

  .transform-contaioner {
    width: 100%;
    height: 100%;
    transition: opacity ease-out 0.5s;
    background-image: linear-gradient(
      180deg,
      rgba(43, 70, 120, 0.44) 0%,
      rgba(48, 52, 136, 0.63) 39%,
      rgba(15, 44, 88, 0.18) 100%
    );

    &.full-item-container {
      height: calc(100% - 0.2rem);
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    &.transparent-item-container {
      opacity: 0;
      visibility: hidden;
    }
  }
}
</style>
