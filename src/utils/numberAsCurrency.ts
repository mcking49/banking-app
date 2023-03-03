const currency = new Intl.NumberFormat('en-AU', { currency: 'AUD', style: 'currency' })

export const numberAsCurrency = (value: number) => {
  return currency.format(value)
}
