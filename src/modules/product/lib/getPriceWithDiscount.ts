// Получить цену со скидкой
import { getDiscountPrice } from '@modules/product/lib/getDiscountPrice'

export function getPriceWithDiscount(price: number, discount?: number) {
  if (!discount) {
    return price
  }
  return +(price - getDiscountPrice(price, discount)).toFixed(2)
}