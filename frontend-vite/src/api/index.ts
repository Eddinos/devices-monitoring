import { apiBaseUrl } from '../config'

function fetchData (baseUrl : string) : Function {
    if (!baseUrl) {
        throw new Error('baseUrl is required')
    }
    return async function (path : string) : Promise<any> {
        const res = await fetch(baseUrl+path).then(r => r.json())
        if ('detail' in res){
            throw res
        }
        return res
    }
}

export const fetchApi = fetchData(apiBaseUrl) 