export interface ProductsFilterRequest {
  category_id?: number[]
  subcategory_id?: number[]
  provider_id?: number[]
  product_type?: string
  search?: string
}