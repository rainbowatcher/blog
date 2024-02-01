<script lang="ts" setup>
import { TagInfo } from "~/types"

defineProps<{
  tags: TagInfo[]
}>()
</script>

<template>
    <div flex="~ row wrap" mt-4 gap-4 px8 py6>
        <Tag
            label="Show All" type="success" transition-shadow-300 hover="shadow-[2px_1px_8px_2px_rgb(15,23,42,0.3)] dark:shadow-[2px_1px_8px_2px_rgb(100,116,139,.3)]"
            @click="$router.push('/tags')"
        />
        <Tag
            v-for="i in tags" :key="i.name" :label="i.name" :sup="i.pages.length"
            type="info" transition-shadow-300
            hover="shadow-[2px_1px_8px_2px_rgba(0,0,0,0.3)] dark:shadow-[2px_1px_8px_2px_rgba(163,163,163,.3)]"
        />
    </div>
</template>

<style scoped>

</style>
