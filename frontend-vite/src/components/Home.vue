<script setup lang="ts">
import { reactive } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './HelloWorld.vue'
import DevicesList from './DevicesList.vue'
import Modal from './Modal.vue'
const mousePos = reactive({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
})

function setTransformOrigin ({ e }: { e: MouseEvent }) {
    mousePos.x = e.clientX
    mousePos.y = e.clientY
}
</script>

<template>
    <div class="Home__appbar">
        <h1>DEVICES MONITORING</h1>
    </div>
    <router-view v-slot="{ Component }">
      <Modal :style="{ transformOrigin: `${mousePos.x}px ${mousePos.y}px` }">
        <component :is="Component" />
      </Modal>
    </router-view>
    <suspense>
        <template #default>
            <DevicesList class="Home__devicesList" 
                         @clickDevice="setTransformOrigin" />
        </template>
        <template #fallback>
        <div>
            Loading...
        </div>
        </template>
    </suspense>
    <DevicesList />
</template>

<style lang="scss" scoped>
    .Home {

        &__appbar {
            background-color: #001174;
            padding: 24px calc(2% + 12px);
            color: #eee;
            text-align: left;
        }

        &__devicesList {
            padding: 0 2%;
        }
    }
</style>