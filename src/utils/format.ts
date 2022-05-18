const priceFormatter = Intl.NumberFormat('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

export function formatPrice(price: number): string {
    if (price >= 0) return `CHF ${priceFormatter.format(price)}`
    else return `- CHF ${priceFormatter.format(price)}`
}

const minuteFormatter = Intl.NumberFormat('en', {
    minimumIntegerDigits: 2,
})
export function formatHours(hoursDecimal: number): string {
    const hours = Math.floor(hoursDecimal)
    const minutes = Math.round((hoursDecimal - hours) * 60)
    return `${hours}:${minuteFormatter.format(minutes)} h`
}
