import classes from './attribute.module.scss'
import { IProductAttribute } from '@modules/product/model/IProductAttribute'
import clsx from 'clsx'

interface Props {
  name: string
  attributes: IProductAttribute[]
  selectedAttributeId: number

  selectAttribute(attributeId: number, productAttributeId: number): void
}

function Attribute({name, attributes, selectedAttributeId, selectAttribute}: Props) {
  return (
    <div className={classes.attribute}>
      <p className={classes.name}>{name}</p>
      <ul className={classes.list}>
        {attributes.map(({id, value, quantity, attribute}) => (
          <li key={id} className={classes.item}>
            <button
              className={clsx(
                classes.button,
                selectedAttributeId === id && classes.selected,
                quantity < 1 && classes.disabled
              )}
              onClick={() => {
                if (quantity > 1) {
                  selectAttribute(attribute.id, id)
                }
              }}
            >
              {value}&nbsp;{attribute.unit}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Attribute }