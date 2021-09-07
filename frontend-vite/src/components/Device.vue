<script setup lang="ts">
    import CloseButton from './CloseButton.vue'
    import { formatDevicePropertyValue } from '../utils'

    // From the <script setup> documentation : 
    // Currently complex types and type imports from other files are not supported. It is theoretically possible to support type imports in the future.
    interface Device {
        serial_number: string;
        last_seen_at: string;
        status: string;
        connection_type: string;
        mac_wifi: string;
        sim_id: number;
        voltage: number;
        error?: string;
    }

    const props = defineProps<Device>()
</script>

<template>
    <div class="Device">
        <div class="Device__wrapper" v-if="!props.error">
            <router-link :to="{ name: 'home' }">
                <CloseButton class="Device__closeButton" />
            </router-link>
            
            <table class="Device__content">
                <tr class="Device__property" 
                    v-for="(prop, name, index) in props" 
                    :key="index">
                    <td class="Device__propertyKey">
                        <component :is="`h${Math.min(index+1, 3)}`">
                            {{name.replace(/_/g, ' ')}}
                        </component>
                    </td>
                    <td class="Device__propertyValue" 
                        v-if="prop">
                        {{formatDevicePropertyValue(prop)}}
                    </td>
                </tr>
            </table>
        </div>
        <h1 v-else>An error occured while fetching the data : <br/> {{props.error}}</h1>
    </div>
</template>

<style lang="scss" scoped>
    .Device {
        background: rgba(26, 41, 130, 0.95);
        color: rgb(255, 229, 180);

        &__wrapper {
            margin: 3% auto;
            height: 90%;
            width: 90%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__content {
            text-align: left;
            border-spacing: 0;
        }

        &__closeButton {
            position: absolute;
            top: 0;
            right: 0;
        }

        &__property {
            vertical-align: baseline;
            border-bottom: 1px solid #ffe5b4;
            
            &Key,&Value {
                padding: 0 50px;
            }

            &:not(:last-child) {
                .Device__propertyKey,.Device__propertyValue {
                    border-bottom: 1px solid;
                }
            }
        }
    }
</style>