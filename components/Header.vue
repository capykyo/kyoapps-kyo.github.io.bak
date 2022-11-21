<template>
  <header class="text-gray-100">
    <div class="fixed top-0 left-0 w-screen z-50">
      <div class="transition duration-1000 py-2" :class="scrollClass">
        <div class="flex justify-between items-center max-w-5xl mx-auto">
          <h1 class="font-bold">
            <nuxt-link
              to="/"
              class="hover:no-underline pl-4 md:pl-0 text-xl flex flex-col md:flex-row justify-center items-center"
            >
              <p>{{ siteTitle[0] }}</p>
              <Icon name="star" icon-style="w-4"></Icon>
              <p>{{ siteTitle[1] }}</p>
            </nuxt-link>
          </h1>
          <div class="flex items-start justify-end md:items-center flex-wrap">
            <a href="javascript:;" class="hover:no-underline mx-2">
              <DarkSwitch class="cursor-pointer"></DarkSwitch
            ></a>
            <a
              href="/articles/rss.xml"
              target="_blank"
              class="hover:no-underline mx-2"
            >
              <SvgRSS />
            </a>
            <a
              :href="siteGitSrc"
              target="_blank"
              class="hover:no-underline mx-2"
            >
              <SvgGithub />
            </a>
            <AppSearchInput />
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
  },
}
</script>
