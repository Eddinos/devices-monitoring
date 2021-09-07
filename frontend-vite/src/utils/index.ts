export function formatDevicePropertyValue (value: string | number) {
    if (!value) return ''
    if (typeof value === 'string' && Date.parse(value)) {
        return new Date(value).toLocaleString()
    }
    const numberValue = typeof value === 'string' ? Number.parseFloat(value) : value
    if (numberValue && !Number.isInteger(numberValue)) {
        return numberValue.toFixed(2)
    }

    return value
}