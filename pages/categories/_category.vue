<template>
  <div>
    <h2
      class="text-left text-xl mb-4 uppercase text-gray-600 max-w-5xl mx-auto px-2"
    >
      笔记归类: {{ $route.params.category }}
    </h2>
    <ArticleList :articles="articlesByCategory" />
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
      .only([
        'title',
        'description',
        'image',
        'slug',
        'published',
        'tags',
        'category',
      ])
      .sortBy('published', 'desc')
      .fetch()
    const articlesByCategory = articles.filter((article) => {
      const articleCategory = article.category.toLowerCase()
      return articleCategory.includes(params.category)
    })
    return {
      articlesByCategory,
    }
  },
  head() {
    return {
      title: `笔记分类 - ${this.captialise(this.$route.params.category)}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/categories/${this.$route.params.category}`,
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
