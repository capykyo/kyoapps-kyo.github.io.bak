<template>
  <div
    class="text-gray-700 dark:text-gray-200 max-w-3xl mx-auto bg-white/40 rounded-lg blur-md shadow py-10 px-14"
  >
    <h2 class="text-left text-lg mb-8">笔记本 {{ categories.length }} 本</h2>
    <ul class="w-full">
      <li
        v-for="category of categories"
        :key="category"
        class="mr-2 ml-2 last:mr-0 first:ml-0"
      >
        <nuxt-link
          :to="{
            name: 'categories-category',
            params: { category: category.toLowerCase() },
          }"
          class="text-xl hover:underline px-2 p-1 rounded"
          >{{ category }}</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryListPage',
  async asyncData({ $content }) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }
    const articles = await $content('articles').only(['category']).fetch()
    const categories = articles
      .flatMap((article) => article.category)
      .filter(onlyUnique)
    return {
      categories,
    }
  },
  head() {
    return {
      title: '笔记本',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/categorys`,
        },
      ],
    }
  },
}
</script>
