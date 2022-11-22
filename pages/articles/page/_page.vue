<template>
  <div>
    <div class="flex justify-between max-w-5xl mx-auto mb-4">
      <p class="text-base text-gray-500">笔记 - {{ allArticles.length }} 篇</p>
      <AppSearchInput />
    </div>
    <ArticleList :articles="paginatedArticles" :total="allArticles.length" />
  </div>
</template>

<script>
import getContent from '@/utils/getContent'
import ArticleList from '@/components/ArticleList'

export default {
  name: 'ArticleListPage',
  components: {
    ArticleList,
  },
  async asyncData({ $content, app, params, error }) {
    const content = await getContent($content, params, error)
    return {
      allArticles: content.allArticles,
      paginatedArticles: content.paginatedArticles,
    }
  },
  head() {
    return {
      title: `笔记页 ${this.$route.params.page}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/articles/page/${this.$route.params.page}`,
        },
      ],
    }
  },
}
</script>
