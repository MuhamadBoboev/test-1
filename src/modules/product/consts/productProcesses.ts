import { IProductProcess } from '@modules/product/model/IProductProcess'


export const productProcesses: IProductProcess[] = [
  {
    key: 'delivery',
    title: 'Доставка',
    content: 'Чтобы обеспечить еще больший комфорт для наших клиентов и убедиться в сохранности купленных товаров, мы осуществляем доставку по городу Душанбе: доставка до Мебельного завода (30 сомони), по городу (50 сомони), в такие районы города, как Зарафшон, Испечак, Сельхоз, ДОК (100 сомони), а также в отдаленные районы города - Корвон, Гипрозем, Кошониен, 9 км и т.д. (150 сомони).',
  },
  {
    key: 'payment',
    title: 'Оплата',
    content: 'Выберите наиболее удобный вариант оплаты товаров: 1) онлайн-оплатой в вашем личном кабинете с помощью карты "Корти миллӣ"; 2) с помощью единого QR-кода (Алиф, Dushanbe City и др. эл кошельки) в нашем шоуруме; 3) наличными при получении товаров в нашем шоуруме.',
  },
  {
    key: 'pickup',
    title: 'Самовывоз',
    content: 'Вы можете оформить свой заказ онлайн и получить товар самостоятельно в нашем шоуруме в любое подходящее для вас время и день.',
  },
]