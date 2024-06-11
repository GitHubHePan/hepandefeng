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
  width: calc(50% - 10px);
  height: calc(50vh - 80px);

  display: flex;
  border-radius: 8px;
  flex-direction: column;
  .item-container-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    height: 50px;
    padding: 10px;
    text-align: left;
    width: 100%;
    line-height: 30px;
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
    height: calc(100% - 50px);
  }
  &:nth-of-type(2n - 1) {
    margin-right: 10px;
  }
  &:nth-of-type(2n) {
    margin-left: 10px;
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
      // animation: 0.5s ease-in fullscreen-animation;
      // animation-fill-mode: forwards;
      // animation-iteration-count: 1;
      height: calc(100% - 20px);
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    // @keyframes fullscreen-animation {
    //   from {
    //     width: calc(50% - 10px);
    //     height: calc(50vh - 80px);
    //   }
    //   to {
    //     height: calc(100% - 20px);
    //     width: 100%;
    //   }
    //   // 0% {
    //   //   // position: absolute;
    //   //   // top: 0;
    //   //   // left: 0;
    //   //   width: 100px;
    //   // }
    //   // 100% {
    //   //   width: 200px;
    //   // }
    // }
    &.transparent-item-container {
      opacity: 0;
      visibility: hidden;
      // transition: all ease 0.5s;
    }
  }
}
</style>
