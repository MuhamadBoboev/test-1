import { NewProducts } from '@modules/product/ui/NewProducts'
import { ProductCard } from '@modules/product/ui/ProductCard'
import { RecommendedProducts } from '@modules/product/ui/RecommendedProducts'
import { Products } from '@modules/product/ui/Products'
import { filterSlice, openFilter, closeFilter } from '@modules/product/model/filterSlice'
import { Product } from '@modules/product/ui/Product'
import { SelectedAttributesType } from '@modules/product/ui/ProductInfo'
import { getProducts } from '@modules/product/api/getProducts'
import { getProduct } from '@modules/product/api/getProduct'
import { getSelectedProductAttributes } from '@modules/product/lib/getSelectedProductAttributes'
import { getMaxQuantity } from '@modules/product/lib/getMaxQuantity'
import { getProductPrice } from '@modules/product/lib/getProductPrice'
import { IProduct } from '@modules/product/model/IProduct'
import { parseProductsRequestParams } from '@modules/product/lib/parseProductsRequestParams'
import { ProductsRequestInfoType } from '@modules/product/model/ProductsRequestInfo'

export { NewProducts, RecommendedProducts, ProductCard, Products }
export { filterSlice, openFilter, closeFilter }
export {
  getProducts,
  getSelectedProductAttributes,
  getMaxQuantity,
  getProductPrice,
  parseProductsRequestParams,
  getProduct,
}
export { Product }
export type { SelectedAttributesType, IProduct, ProductsRequestInfoType }