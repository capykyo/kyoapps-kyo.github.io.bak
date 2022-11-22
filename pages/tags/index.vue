<template>
  <div
    class="text-gray-700 dark:text-gray-200 max-w-3xl mx-auto bg-white/40 rounded-lg blur-md shadow py-10 px-14"
  >
    <h2 class="text-left text-lg mb-8">标签列表页</h2>
    <div
      v-for="[index, item] of alphabetList.entries()"
      :key="item"
      class="flex justify-between mb-20"
    >
      <div class="w-24 text-3xl uppercase">
        {{ item }}
      </div>
      <ul class="flex justify-between flex-wrap gap-y-4 items-center max-w-lg">
        <li
          v-for="tag of tagMap.get(item)"
          :key="tag"
          class="text-center mr-2 ml-2 last:mr-0 first:ml-0"
        >
          <nuxt-link
            :to="{ name: 'tags-tag', params: { tag: tag.toLowerCase() } }"
            class="text-xl hover:underline px-2 p-1 rounded"
            :class="setColor(index)"
            >{{ tag }}</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pinyin from 'pinyin'
export default {
  name: 'TagListPage',
  async asyncData({ $content }) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }
    const articles = await $content('articles').only(['tags']).fetch()
    const tags = articles.flatMap((article) => article.tags).filter(onlyUnique)
    return {
      tags,
    }
  },
  data() {
    return {
      color: [
        'rose',
        'red',
        'orange',
        'amber',
        'emerald',
        'teal',
        'cyan',
        'blue',
        'purple',
        'fuchsia',
        'slate',
        'stone',
        'zinc',
      ],
    }
  },
  head() {
    return {
      title: 'Article Tags - Learning Laravel and VueJS',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/tags`,
        },
      ],
    }
  },
  computed: {
    tagMap() {
      const tagMap = new Map()
      const data = this.tags
      data.forEach((item) => {
        const firstChar = pinyin(item)[0][0][0].toLowerCase()
        if (
          tagMap.get(firstChar) === undefined ||
          tagMap.get(firstChar) === null
        ) {
          tagMap.set(firstChar, [])
          tagMap.get(firstChar).push(item)
        } else {
          tagMap.get(firstChar).push(item)
        }
      })
      return tagMap
    },
    alphabetList() {
      const arr = []
      this.tagMap.forEach((item, key) => {
        arr.push(key)
      })
      arr.sort((a, b) => {
        if (a < b) return -1
        else return 1
      })
      return arr
    },
  },
  methods: {
    setColor(index) {
      const name = this.color[index]
      const number = (parseInt(Math.random() * 4) + 3) * 100
      return `bg-${name}-${number}`
    },
  },
}
</script>
