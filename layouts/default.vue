<template>
  <div class="flex flex-col justify-between min-h-[100vh]">
    <Header />
    <main
      class="bg-gradient-to-br from-emerald-200/70 to-fuchsia-200/70 dark:from-indigo-900 dark:to-slate-900 pt-5 flex-grow"
    >
      <div class="container mx-auto px-4 pt-[80px] pb-10">
        <Nuxt />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
