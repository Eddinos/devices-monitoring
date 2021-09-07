<script setup lang="ts">
    import { fetchApi } from '../api'
    import { apiBaseUrl } from '../config'
    import useDevices from '../composable/useDevices'
    import DeviceCard from './DeviceCard.vue'
    import Intersect from './Intersect.vue'

    let nextPage = ''

    const { devices, getDevices, errorMsg } = useDevices()
    const { next } = await getDevices()
    nextPage = next

    async function getNextPage () {
        if (!nextPage) {
            return;
        }
        const { next, results } = await fetchApi(nextPage.replace(apiBaseUrl, ''))
        nextPage = next
        devices.value = devices.value.concat(results)
    }
</script>

<template>
    <div class="DevicesList" v-if="!errorMsg">
        <ul class="DevicesList__list">
            <li class="DevicesList__item" 
                v-for="(device, index) in devices" 
                :key="index">
                <router-link class="DevicesList__link" 
                            :to="{ name: 'device', params: { ...device } }">
                    <DeviceCard :serial-number="device.serial_number" 
                                :status="device.status" 
                                :last-seen-at="device.last_seen_at"
                                @click="$emit('clickDevice', { e: $event })" />
                </router-link>
            </li>
        </ul>
        <Intersect class="DevicesList__intersect" 
                   @onIntersect="getNextPage" />
    </div>
    <h1 class="DevicesList__error" v-else>
        There was an error while getting the devices list : <br/>
        {{ errorMsg }}
    </h1>
</template>

<style scoped lang="scss">
    .DevicesList {
        position: relative;

        &__list {
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        }

        &__item {
            list-style: none;
            margin: 18px 12px;
            transition: transform .4s ease-in-out;
            will-change: transform;

            &:hover {
                transform: scaleX(1.1) scaleY(1.2);
            }
        }

        &__link {
            text-decoration: none;
            color: unset;
        }

        &__intersect {
            position: absolute;
            top: 90%;
            left: 0;
            height: 10%;
        }

        &__error {
            color: crimson;
        }
    }
</style>