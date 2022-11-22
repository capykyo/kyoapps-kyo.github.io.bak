<template>
  <div>
    <ul
      class="flex flex-col md:flex-row items-center gap-x-0 gap-y-4 md:gap-y-0 md:gap-x-4 text-gray-300"
    >
      <li class="hover:underline hover:text-sky-300 transition duration-500">
        <nuxt-link to="/categories">笔记本列表</nuxt-link>
      </li>
      <li class="hover:underline hover:text-sky-300 transition duration-500">
        <nuxt-link to="/tags">标签归纳</nuxt-link>
      </li>
      <li class="hover:underline hover:text-sky-300 transition duration-500">
        <nuxt-link to="/articles">笔记列表</nuxt-link>
      </li>
    </ul>
  </div>
</template>
