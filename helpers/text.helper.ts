export function normalizeText(text: string): string {
    return text.toLowerCase().replace(/[-\s]/g, '').trim()
}
export function normalizePrice(value: string): string {
    //excludes the number
    const match = value.replace(/,/g, '').match(/\d+(\.\d+)?/)
    return match?.[0] ?? ''
}
