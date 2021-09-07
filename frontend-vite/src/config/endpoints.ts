const apiBaseUrl = 'http://localhost:8010'
const devicesPath = '/devices' 
const devicePath = '/device/{vid}'
const getDeviceEndpoint = (vid: string) => devicePath.replace('{vid}', vid)

export {
    apiBaseUrl,
    devicesPath,
    getDeviceEndpoint
}