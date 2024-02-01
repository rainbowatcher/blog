<template>
    <div>
        <div v-if="$slots.header">
            <slot name="header" />
        </div>
        <div style="">
            <slot name="default" />
        </div>
    </div>
</template>
