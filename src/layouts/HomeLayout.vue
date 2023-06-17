<script lang="ts" setup>

</script>

<template>
  <PageHeader />
  <div class="h-[var(--sika-h-post-header)] w-full bg-[url(/img/home-bg/4.jpg)] bg-cover bg-center bg-no-repeat">
    <div class="ma h-full max-w-4xl py-8rem text-center">
      <div class="relative h-8 inline-flex items-stretch bg-neutral8/80 vertical-middle lh-8">
        <Dropdown />
        <input type="test" class="h-8 max-w-md border-(y-1 r-0 sky600) bg-transparent p-0 lh-8 focus:outline-none" autocomplete="off" placeholder="type" title="searchInput">
        <button class="m0 cursor-pointer border-(y-1 l-0 r-1 sky500) rounded-r bg-sky/80 p0 px-4 py-1 lh-4" title="search">
          search
        </button>
      </div>
    </div>
  </div>
  <main>
    <slot />
  </main>
  <Footer />
</template>
