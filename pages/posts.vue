<template>
  <PostLayout>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </PostLayout>
</template>
