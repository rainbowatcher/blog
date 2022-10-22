<template>
  <header
    class="header" flex="~ flex-1 row nowrap" justify-between
    fixed top-0 w-full p-xl block
  >
    <RouterLink to="/">
      <h1>Polymorph</h1>
    </RouterLink>

    <!-- <svg src="src/public/favicon.svg" /> -->
    <Nav />
  </header>
</template>

<style scoped>
.header {
  -webkit-backdrop-filter: saturate(50%) blur(8px);
  backdrop-filter: saturate(50%) blur(8px);
}
</style>
