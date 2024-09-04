<script lang="ts" setup>
interface Props {
  closeEyes: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="owl" :class="{ 'owl-password': props.closeEyes }">
    <div class="hand-down-left" />
    <div class="hand-down-right" />
    <div class="hand-up-left" />
    <div class="hand-up-right" />
    <div class="close-eyes" />
  </div>
</template>

<style lang="scss" scoped>
@mixin backgroundImage($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100%;
}

.owl {
  position: relative;
  width: 1.2rem;
  height: 0.95rem;
  transform: translateY(12%);
  @include backgroundImage("@/assets/login/face.png");
  .hand-down-left,
  .hand-down-right {
    z-index: 2;
    position: absolute;
    width: 0.45rem;
    height: 0.25rem;
    transition: transform 0.2s linear;
  }
  .hand-down-left {
    bottom: 3px;
    left: -0.35rem;
    @include backgroundImage("@/assets/login/hand-down-left.png");
  }
  .hand-down-right {
    bottom: 3px;
    right: -0.4rem;
    @include backgroundImage("@/assets/login/hand-down-right.png");
  }
  .hand-up-left,
  .hand-up-right {
    z-index: 3;
    position: absolute;
    width: 0.5rem;
    height: 0.4rem;
    opacity: 0;
    transition: opacity 0.1s linear 0.1s;
  }
  .hand-up-left {
    bottom: 0.12rem;
    left: -0.05rem;
    @include backgroundImage("@/assets/login/hand-up-left.png");
  }
  .hand-up-right {
    bottom: 0.12rem;
    right: 0.05rem;
    @include backgroundImage("@/assets/login/hand-up-right.png");
  }
  .close-eyes {
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.1s linear 0.1s;
    @include backgroundImage("@/assets/login/close-eyes.png");
  }
}

.owl-password {
  .hand-down-left {
    transform: translateX(0.3rem) scale(0) translateY(-0.1rem);
  }
  .hand-down-right {
    transform: translateX(-0.4rem) scale(0) translateY(-0.1rem);
  }
  .hand-up-left,
  .hand-up-right,
  .close-eyes {
    opacity: 1;
  }
}
</style>
