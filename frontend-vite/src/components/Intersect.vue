<script lang="ts">
    interface IntersectionObserverOptions {
        root?: HTMLElement;
        rootMargin?: string;
        threshold?: number;
    }
</script>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const props = defineProps<{options?: IntersectionObserverOptions}>()
    const emit = defineEmits(['onIntersect'])
    const intersectElt = ref<HTMLElement>()

    onMounted(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                emit('onIntersect', entry)
            }
        }, props.options)

        if (intersectElt.value) {
            observer.observe(intersectElt.value)
        }
    })

</script>

<template>
    <div class="Intersect" ref="intersectElt"></div>
</template>

<style lang="scss" scoped>
    .Intersect {
        width: 100%;
        height: 1px;
    }
</style>