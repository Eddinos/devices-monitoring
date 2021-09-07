import { ref, Ref } from 'vue'
import { getDeviceEndpoint, devicesPath } from '../config'
import { fetchApi } from '../api'

export interface Device {
    serial_number: string;
    last_seen_at: string;
    status: string;
    connection_type: string;
    mac_wifi: string;
    sim_id: number;
    voltage: number;
}

const devices = ref<Device[]>([])
const errorMsg = ref<string>('')

export default function useDevices() : {getDevices: Function, getDevice: Function, devices: Ref<Device[]>, errorMsg: Ref<string>} {
    async function getDevices () {
        try { 
            const res = await fetchApi(devicesPath)
            devices.value = res.results as Device[]
            return res
        } catch (err: any) {
            errorMsg.value = err.detail[0].msg
            return false
        }
        
    }

    async function getDevice (vid: string) {
        try { 
            return await fetchApi(getDeviceEndpoint(vid))
        } catch (err: any) {
            errorMsg.value = err.detail[0].msg
            return false
        }
        
    }

    return { 
        getDevice, 
        getDevices,
        devices,
        errorMsg
    }
}