<template>
  <span :class="`${size} ${color}`"><slot></slot></span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'text-base',
    },
    color: {
      type: String,
      default: 'text-black',
    },
  },
}
</script>
