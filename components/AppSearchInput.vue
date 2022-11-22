<script>
export default {
  data() {
    return {
      searchQuery: '',
      articles: [],
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content('articles')
        .limit(6)
        .search(searchQuery)
        .fetch()
    },
  },
  mounted: function () {
    document.documentElement.addEventListener(
      'pointerdown',
      (e) => {
        if (!['ul', 'li', 'a'].includes(e.target.tagName.toLowerCase())) {
          this.articles = []
          this.searchQuery = ''
        }
      },
      false
    )
  },
}
</script>

<template>
  <div class="relative" @click.stop>
    <input
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="搜索笔记"
      class="w-[200px] h-[20px] rounded pl-4 shadow pr-2 text-gray-500 dark:text-gray-500 dark:bg-gray-300 text-sm outline-none mb-1"
    />
    <ul
      v-if="articles.length"
      class="absolute top-7 left-0 w-[200px] rounded-b-xl blur-md shadow p-2 bg-black/80 text-white"
    >
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink
          :to="{ name: 'articles-slug', params: { slug: article.slug } }"
          class="inline-block w-full"
        >
          {{ article.title.slice(0, 15) }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
