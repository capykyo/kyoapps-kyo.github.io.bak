<template>
  <div
    class="text-gray-700 dark:text-gray-200 max-w-3xl mx-auto bg-white/40 rounded-lg blur-md shadow py-10 px-14"
  >
    <h2 class="text-left text-lg mb-8">标签列表</h2>
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
            class="text-xl dark:text-gray-600 hover:underline px-2 p-1 rounded transition duration-300 hover:scale-105 hover:shadow"
            :style="`background-color:${getColor(index)}`"
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
        '#FFADAD',
        '#FFD6A5',
        '#FDFFB6',
        '#CAFFBF',
        '#9BF6FF',
        '#A0C4FF',
        '#BDB2FF',
        '#FFC6FF',
      ],
    }
  },
  head() {
    return {
      title: '标签列表',
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
    currIndex(index) {
      const color = this.color
      if (index >= color.length) {
        return index % color.length
      } else return index
    },
    getColor(index) {
      const currIndex = this.currIndex(index)
      return this.color[currIndex]
    },
  },
}
</script>
