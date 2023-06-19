<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <CommonLayout title="Tags">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </CommonLayout>
</template>
