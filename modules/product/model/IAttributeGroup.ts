import { IAttribute } from '@modules/product/model/IAttribute'
import { IProductAttribute } from '@modules/product/model/IProductAttribute'

export interface IAttributeGroup extends IAttribute {
  product_attributes: IProductAttribute[]
}