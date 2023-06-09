<script lang="ts" setup>

</script>

<template>
  <PageHeader />
  <!-- <div class="h-screen w-full bg-gradient-to-b from-neutral-800 to-neutral-900">
    <div class="mxa max-w-4xl text-center h-full py-8rem">
      <div class="inline-flex items-stretch h-8 lh-8 relative vertical-middle">
        <Dropdown />
        <input type="test" class="border-(sky600 y-1 r-0) bg-transparent h-8 lh-8 w-md focus:outline-none p-0" autocomplete="off" placeholder="type" title="searchInput">
        <button class="lh-4 p0 m0 rounded-r cursor-pointer bg-sky/80 py-1 border-(r-1 y-1 l-0 sky500) px-4" title="search">
          search
        </button>
      </div>
    </div>
  </div> -->
  <main mx-8 py8>
    <slot />
  </main>
  <Footer />
</template>
