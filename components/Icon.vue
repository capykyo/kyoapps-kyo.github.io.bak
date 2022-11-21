<template>
  <component
    :is="iconName"
    :icon-style="iconStyle"
    class="inline-block"
  ></component>
</template>
<script>
export default {
  props: {
    iconStyle: {
      type: String,
      default: 'w-6',
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    iconName() {
      let name = this.name.toLowerCase()
      name = name[0].toUpperCase() + name.substring(1)
      return `Svg${name}`
    },
  },
}
</script>
