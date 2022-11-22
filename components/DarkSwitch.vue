<template>
  <div id="mode-switch relative z-[9999]" ref="modes">
    <transition name="fade" mode="out-in">
      <component :is="iconName" icon-style="w-6 h-6"></component>
    </transition>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      name: 'sun',
    }
  },
  computed: {
    iconName() {
      let name = this.name.toLowerCase()
      name = name[0].toUpperCase() + name.substring(1)
      return `Svg${name}`
    },
  },
  mounted() {
    this.name = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'sun'
      : 'moon'
    const modeSwitch = this.$refs.modes
    let lock = true
    modeSwitch.addEventListener(
      'pointerdown',
      () => {
        if (!lock) return
        if (this.name === 'sun') {
          this.name = 'moon'
          document.documentElement.className = 'light'
        } else {
          this.name = 'sun'
          document.documentElement.className = 'dark'
        }
        lock = false
        setTimeout(() => {
          lock = true
        }, 1000)
      },
      false
    )
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
