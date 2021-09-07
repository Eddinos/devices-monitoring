<script setup lang="ts">
import { computed } from 'vue'
import { formatDevicePropertyValue } from '../utils'
import { statusColors } from '../config'
const { status } = defineProps<{ 
    serialNumber: string 
    status: string
    lastSeenAt: string
}>()

const statusColor = computed(() => statusColors.find(color => color.status === status)?.color)
</script>

<template>
    <div class="DeviceCard" :style="{ borderColor: statusColor, boxShadow: `0 0px 4px 0px ${statusColor}` }">
        <span class="DeviceCard__serialNumber">{{ serialNumber }}</span>
        <div class="DeviceCard__status">
            {{status}} 
            <span class="DeviceCard__statusPellet" :style="{backgroundColor: statusColor}"></span>
        </div>
        <div class="DeviceCard__lastSeenAt">last seen at : <span class="DeviceCard__lastSeenAtValue">{{ formatDevicePropertyValue(lastSeenAt) }}</span></div>
    </div>
</template>

<style lang="scss" scoped>
    .DeviceCard {
        padding: 24px;
        border-radius: 18px;
        // box-shadow: 0 0px 4px 0px #272a2e;
        border: 2px solid;
        min-width: 200px;
        transition: all .4s linear;
        font-weight: bold;

        &:hover {
            background-color: #001174;
            color: #e6efff;
        }

        &__status {
            text-align: left;

            &Pellet {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: inline-block;
            }
        }

        &__lastSeenAt {
            text-align: left;

            &Value {
                font-weight: normal;
            }
        }
    }
</style>