import classes from './service-product-form.module.scss'
import { Input } from '@shared/ui/Input'
import { IService } from '@modules/service'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@shared/ui/Button'
import { ProductCartState } from '@modules/cart/model/ProductCartState'

interface Props {
  // service and product info
  service: IService
  productId: number
  maxQuantity: number
  productCartId: string
  productCart: ProductCartState

  // form (value, quantity)
  value: number
  setValue: Dispatch<SetStateAction<number>>
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>

  selectService(serviceId: number, serviceQuantity: number, value: number): void

  close(): void
}

function ServiceProductForm({
                              service,
                              close,
                              maxQuantity,
                              value,
                              setValue,
                              quantity,
                              setQuantity,
                              selectService,
                              productCart,
                            }: Props) {

  return (
    <div className={classes.form}>
      <div className={classes.formInput}>
        <Input
          label="Введите количество"
          className={classes.input}
          value={value}
          type="number"
          onChange={(event) => {
            const target = event.target as HTMLInputElement
            setValue(+target.value)
          }}
        />
        <span className={classes.unit}>{service.unit}</span>
      </div>
      <div className={classes.formInput}>
        <Input
          label="Количество товара"
          className={classes.input}
          value={quantity}
          type="number"
          onChange={(event) => {
            const target = event.target as HTMLInputElement
            if (+target.value < 1) {
              setQuantity(1)
            } else if (+target.value > (productCart?.selectedQuantity || 1)) {
              setQuantity(productCart?.selectedQuantity || 1)
            } else {
              setQuantity(+target.value)
            }
          }}
        />
        <span className={classes.unit}>{productCart.product.unit}</span>
      </div>
      <div className={classes.buttons}>
        <Button
          className={classes.cancel}
          theme="primaryOutline"
          buttonSize="large"
          onClick={close}
        >
          Отмена
        </Button>
        <Button
          className={classes.cancel}
          theme="primary"
          buttonSize="large"
          disabled={+(value || 0) < 1 || quantity < 1 || quantity > maxQuantity}
          onClick={() => {
            selectService(service.id, quantity, value)
            setValue(1)
            close()
          }}
        >
          Добавить услугу
        </Button>
      </div>
    </div>
  )
}

export { ServiceProductForm }