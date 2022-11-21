<template>
  <span></span>
</template>

<script>
export default {
  props: {
    srcList: {
      type: String,
      default: '',
    },
  },
  beforeMount() {
    if (this.srcList) {
      const src = this.srcList.split(',')
      src.forEach((item) => {
        require(`@/assets/imgs/${item}`)
      })
    }
  },
}
</script>
