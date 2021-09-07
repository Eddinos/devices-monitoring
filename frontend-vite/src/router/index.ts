import Home from '../components/Home.vue'
import Device from '../components/Device.vue'
import useDevices from '../composable/useDevices'
import { RouteLocationNormalized } from 'vue-router'

const routes = [{ 
    path: '/',
    name: 'home',
    component: Home,
    children: [{
        name: 'device',
        path: 'device/:serial_number',
        component: Device,
        props (route: RouteLocationNormalized) {
            return castNumberParams(route.params)
        },
        meta: {
            modal: true
        },
        async beforeEnter (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) {
            const serialNumber = to.params.serial_number;
            if (typeof serialNumber === 'string' && serialNumber && (!from || Object.keys(to.params).length < 2)) {
                const { getDevice, errorMsg } = useDevices()
                const deviceId = serialNumber.replace('device_', '')
                const deviceData = await getDevice(deviceId)
                if (!deviceData) {
                    to.params = { error: errorMsg.value, ...to.params }
                    next()
                }
                to.params = { ...deviceData, ...to.params }
            }
            next()
        }
    }]
}]

function castNumberParams (params : { [key: string]: any }) : { [key: string]: any } {
    const castParams = { ...params }
    for (const param in castParams) {
        const numberParam = Number(castParams[param])
        if (numberParam) {
            castParams[param] = numberParam
        }
    }

    return castParams
}

export default routes