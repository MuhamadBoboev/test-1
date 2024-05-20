import classes from './attributes.module.scss'
import { IProductAttribute } from '@modules/product/model/IProductAttribute'
import { getSortedAttributesByGroup } from '@modules/product/lib/getSortedAttributesByGroup'
import { Attribute } from '@modules/product/ui/Attribute'

interface Props {
  attributes: IProductAttribute[]
  selectedAttributes: { [key: string]: number }

  selectAttribute(attributeId: number, productAttributeId: number): void
}

function Attributes({attributes, selectedAttributes, selectAttribute}: Props) {
  const sortedAttributes = getSortedAttributesByGroup(attributes)

  return (
    <div className={classes.attributes}>
      <ul className={classes.list}>
        {sortedAttributes.map(({id, name, product_attributes}) => (
          <Attribute
            key={id}
            name={name}
            attributes={product_attributes}
            selectedAttributeId={selectedAttributes[id]}
            selectAttribute={selectAttribute}
          />
        ))}
      </ul>
    </div>
  )
}

export { Attributes }