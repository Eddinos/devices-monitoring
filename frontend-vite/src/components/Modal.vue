<template>
    <transition name="fade" 
                class="Modal">
        <slot></slot>
    </transition>
</template>

<style lang="scss" scoped>
    .Modal {
        position: fixed;
        height: 100vh;
        width: 100vw;
        margin: auto;
        z-index: 1000;
        top: 0;
        left: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease-in-out;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: scale(0);
        will-change: opacity, transform ;
    }
</style>
