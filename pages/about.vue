<template>
  <CommonLayout title="About">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </CommonLayout>
</template>
