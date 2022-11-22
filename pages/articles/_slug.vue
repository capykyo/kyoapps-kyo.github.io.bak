<template>
  <div class="flex justify-center md:gap-x-8 max-w-5xl mx-auto">
    <article class="w-max-4xl">
      <div
        class="prose md:prose-lg w-full dark:bg-gray-800 dark:text-gray-200 text-gray-500 bg-white p-5 rounded-xl shadow"
      >
        <nuxt-content :document="article" />
      </div>
    </article>
    <aside class="right-box hidden md:block">
      <div class="sticky top-20">
        <header class="text-white w-full text-xs mb-2">
          <div class="p-5 bg-teal-500 dark:bg-violet-900 rounded-md">
            <p class="mb-2">
              <span class="uppercase">标题:</span>
              <span>{{ article.title }}</span>
            </p>
            <p class="mb-2">
              <span class="uppercase">归属于:</span>
              <nuxt-link
                :to="{
                  name: 'categories-category',
                  params: { category: article.category.toLowerCase() },
                }"
                class="hover:underline"
                >{{ article.category }}</nuxt-link
              >
            </p>
            <div class="flex mb-2">
              <p class="mr-1 uppercase flex-shrink-0">标签:</p>
              <ul class="flex flex-wrap">
                <li v-for="tag in article.tags" :key="tag" class="mr-2">
                  <nuxt-link
                    :to="{
                      name: 'tags-tag',
                      params: { tag: tag.toLowerCase() },
                    }"
                    class="hover:underline"
                  >
                    {{ tag }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <p class="">
              <span class="uppercase">发布于:</span>
              <span>{{ article.published }}</span>
            </p>
          </div>
        </header>
        <nav
          class="mt-6 p-5 bg-white rounded-lg shadow dark:bg-gray-900 dark:text-gray-200"
        >
          <ul>
            <li
              v-for="link of article.toc"
              :key="link.id"
              :class="{
                'py-2 text-lg': link.depth === 2,
                'ml-3 pb-1 text-gray-400 text-base': link.depth === 3,
                'ml-5 pb-1 text-gray-500 text-sm': link.depth === 4,
                'ml-6 pb-1 text-gray-500 text-sm': link.depth === 5,
              }"
            >
              <a
                href="javascript:;"
                class="hover:underline"
                @click="to(link.id)"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </nav>
        <footer class="py-5 mt-5">
          <prev-next :prev="prev" :next="next" />
        </footer>
      </div>
    </aside>
  </div>
</template>

<script>
import global from '@/utils/global'
import getSiteMeta from '@/utils/getSiteMeta'

export default {
  name: 'ArticlePage',
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug', 'published'])
      .sortBy('published', 'desc')
      .surround(params.slug)
      .fetch()
    return {
      article,
      prev,
      next,
    }
  },

  head() {
    return {
      title: this.article.title,
      meta: [
        ...this.meta,
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          property: 'article:tag',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: global.author || '' },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/articles/${this.$route.params.slug}`,
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `${this.$config.baseUrl}/articles/${this.$route.params.slug}`,
        mainImage: this.article.image,
      }
      return getSiteMeta(metaData)
    },
  },
  methods: {
    decode(str) {
      return decodeURIComponent(this.$route.path + '#' + str)
    },
    to(id) {
      const target = document.getElementById(id)
      let timer = null
      if (target !== undefined) {
        timer = setInterval(() => {
          clearInterval(timer)
          target.scrollIntoView({ block: 'center' })
        }, 100)
      }
    },
  },
}
</script>

<style>
hr {
  border-top: 1px solid #ccc;
}
p > code {
  padding: 2px 3px;
  border-radius: 5px;
  background-color: #1f2937;
  color: rgb(255, 183, 0) !important;
}
</style>
