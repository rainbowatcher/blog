<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  sup: {
    type: [String, Number],
    required: false,
    default: "",
  },
  type: {
    type: String,
    options: ["outline", "primary", "success", "warning", "error", "info"],
    default: "primary",
  },
})
</script>

<template>
  <span
    class="relative inline-block h4 cursor-pointer rounded-2xl px2 py0"
    :class="[`tag-${type}`]"
    @click="$router.push(`/tags/${label.toLowerCase()}`)"
  >
    <span block select-none text-2 font-600 leading-4>{{ label }}</span>
    <sup v-if="sup" absolute right--2 top--2 h4 rounded-full bg-red5 px1.25 text-center leading-4 color-white outline="1px solid [var(--sika-c-page-bg)]">
      <span select-none>{{ sup }}</span>
    </sup>
  </span>
</template>

<style lang="scss">
.sup-dot {
  height: .5rem;
  width: .5rem;
}

html.dark {
  --sika-c-tag-outline: #d4d4d4;
  --sika-c-tag-primary: #0369a1;
  --sika-c-tag-primary-border: #0369a1;
  --sika-c-tag-success: #15803d;
  --sika-c-tag-success-border: #15803d;
  --sika-c-tag-warning: #a16207;
  --sika-c-tag-warning-border: #a16207;
  --sika-c-tag-info: #404040;
  --sika-c-tag-info-border: #525252;
  --sika-c-tag-error: #be123c;
  --sika-c-tag-error-border: #be123c;
}

:root {
  --sika-c-tag-outline: #404040;
  --sika-c-tag-primary: #0EA5E9;
  --sika-c-tag-primary-border: #0EA5E9;
  --sika-c-tag-success: #22C55E;
  --sika-c-tag-success-border: #22C55E;
  --sika-c-tag-warning: #EAB308;
  --sika-c-tag-warning-border: #EAB308;
  --sika-c-tag-info: #fafafa;
  --sika-c-tag-info-border: #e2e8f0;
  --sika-c-tag-error: #F43F5E;
  --sika-c-tag-error-border: #F43F5E;
}

.tag-outline {
  outline: 1px solid var(--sika-c-tag-outline);
  // color: #f0f9ff;
}

.tag-primary {
  background-color: var(--sika-c-tag-primary);
  color: #e0f2fe;
  outline: 1px solid var(--sika-c-tag-primary-border);
}

.tag-success {
  background-color: var(--sika-c-tag-success);
  color: #f0fdf4;
  outline: 1px solid var(--sika-c-tag-success-border);
}

.tag-warning {
  background-color: var(--sika-c-tag-warning);
  color: #fefce8;
  outline: 1px solid var(--sika-c-tag-warning-border);
}

.tag-info {
  background-color: var(--sika-c-tag-info);
  outline: 1px solid var(--sika-c-tag-info-border);
}

.tag-error {
  background-color: var(--sika-c-tag-error);
  color: #ffe4e6;
  outline: 1px solid var(--sika-c-tag-error-border);
}
</style>
