<template>
  <header class="text-gray-100">
    <div class="fixed top-0 left-0 w-screen z-50">
      <div class="transition duration-1000 py-2" :class="scrollClass">
        <div class="flex justify-between items-center max-w-5xl mx-auto">
          <h1 class="font-bold">
            <nuxt-link
              to="/"
              class="hover:no-underline pl-4 md:pl-0 text-xl flex justify-center items-center"
            >
              <p>{{ siteTitle[0] }}</p>
              <Icon name="star" icon-style="w-4"></Icon>
              <p>{{ siteTitle[1] }}</p>
            </nuxt-link>
          </h1>
          <div
            class="hidden md:flex md:justify-end md:items-center md:flex-wrap md:gap-x-4"
          >
            <Menu></Menu>
            <AppSearchInput />
            <a
              href="/articles/rss.xml"
              target="_blank"
              class="hover:no-underline"
            >
              <SvgRSS />
            </a>
            <a :href="siteGitSrc" target="_blank" class="hover:no-underline">
              <SvgGithub />
            </a>
            <a href="javascript:;" class="hover:no-underline">
              <DarkSwitch class="cursor-pointer"></DarkSwitch
            ></a>
          </div>
          <div class="pr-4 md:hidden" @click="toggle()">
            <icon
              name="xingqiu"
              class="transition hover:scale-105 duration-500 dark:opacity-80"
            ></icon>
          </div>
          <div
            ref="mask"
            class="hidden fixed top-0 right-0 h-screen w-screen bg-black/70 blur-sm z-50 transition duration-500 translate-x-20 mask"
          >
            <div
              class="h-full w-full flex flex-col justify-center items-center gap-y-6"
            >
              <div class="flex gap-x-6">
                <a
                  href="/articles/rss.xml"
                  target="_blank"
                  class="hover:no-underline"
                >
                  <SvgRSS />
                </a>
                <a
                  :href="siteGitSrc"
                  target="_blank"
                  class="hover:no-underline"
                >
                  <SvgGithub />
                </a>
                <a href="javascript:;" class="hover:no-underline">
                  <DarkSwitch class="cursor-pointer"></DarkSwitch
                ></a>
              </div>
              <Menu></Menu>
              <AppSearchInput />
              <p class="px-4 py-2 bg-black rounded" @click="close()">CLOSE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import global from '@/utils/global'
import { scrollHandler, debounce } from '@/utils/eventHandler'

export default {
  data() {
    return {
      scrollTop: null,
      lock: true,
      timer: null,
    }
  },
  computed: {
    siteTitle() {
      return global.siteTitle.split(' ')
    },
    siteGitSrc() {
      return global.githubURL
    },
    scrollClass() {
      return this.scrollTop > 60
        ? 'bg-slate-500/80 dark:bg-slate-900/80 blur-sm'
        : 'bg-slate-500  dark:bg-slate-900'
    },
  },
  mounted() {
    window.addEventListener(
      'scroll',
      debounce(() => {
        this.scrollTop = scrollHandler()
      }),
      false
    )
    const mask = this.$refs.mask
    mask.addEventListener(
      'transitionend',
      () => {
        mask.classList.add('hidden')
        mask.classList.remove('opacity-0')
      },
      false
    )
  },
  methods: {
    toggle() {
      const mask = this.$refs.mask
      mask.classList.remove('hidden')
    },
    close() {
      const mask = this.$refs.mask
      mask.classList.add('opacity-0')
    },
  },
}
</script>
