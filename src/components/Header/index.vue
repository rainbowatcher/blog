<template>
  <header
    class="header" flex="~ flex-1 row nowrap" justify-between
    fixed top-0 w-full p-xl block
  >
    <RouterLink to="/">
      <h1>Polymorph</h1>
    </RouterLink>
    <Nav />
  </header>
</template>

<style scoped>
.header {
  z-index: 99;
  -webkit-backdrop-filter: saturate(50%) blur(8px);
  backdrop-filter: saturate(50%) blur(8px);
}
h1{
  @apply text-2xl;
}
</style>
