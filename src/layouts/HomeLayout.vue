<script lang="ts" setup>

</script>

<template>
  <PageHeader />
  <div class="h-[var(--sika-h-post-header)] w-full bg-[url(/img/home-bg/4.jpg)] bg-cover bg-no-repeat bg-center">
    <div class="ma max-w-4xl text-center h-full py-8rem ">
      <div class="inline-flex items-stretch h-8 lh-8 relative vertical-middle bg-neutral8/80">
        <Dropdown />
        <input type="test" class="border-(sky600 y-1 r-0) bg-transparent h-8 lh-8 max-w-md focus:outline-none p-0" autocomplete="off" placeholder="type" title="searchInput">
        <button class="lh-4 p0 m0 rounded-r cursor-pointer bg-sky/80 py-1 border-(r-1 y-1 l-0 sky500) px-4" title="search">
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
