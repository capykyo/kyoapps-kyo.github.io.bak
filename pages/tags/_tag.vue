<template>
  <div>
    <h2
      class="text-left text-xl mb-4 px-2 text-gray-500 dark:text-gray-300 max-w-5xl mx-auto"
    >
      标签: {{ $route.params.tag }}
    </h2>
    <ArticleList :articles="articlesByTag" />
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'

export default {
  name: 'TagPage',
  components: {
    ArticleList,
  },
  async asyncData({ $content, params }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'image', 'slug', 'published', 'tags'])
      .sortBy('published', 'desc')
      .fetch()
    const articlesByTag = articles.filter((article) => {
      const articleTags = article.tags.map((x) => x.toLowerCase())
      return articleTags.includes(params.tag)
    })
    return {
      articlesByTag,
    }
  },
  head() {
    return {
      title: `标签 - ${this.captialise(this.$route.params.tag)}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/tags/${this.$route.params.tag}`,
        },
      ],
    }
  },
  methods: {
    captialise(text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
  },
}
</script>
