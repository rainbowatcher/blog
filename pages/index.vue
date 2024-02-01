<script lang="ts" setup>
import { usePages } from "../src/composables/use-pages"

const pages = usePages()
</script>

<template>
    <HomeLayout>
        <PostList :pages="pages" />
    </HomeLayout>
</template>
