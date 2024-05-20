'use client'
import classes from './footer-top.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'
import { FooterSocials } from '@widgets/Footer/ui/FooterSocials'
import { useState } from 'react'

function FooterTop() {
  const [footerAcardion,setFooterAcardion]=useState(false)
  return (
    <div className={classes.top}>
      <div className={classes.left}>
        <Image
          className={classes.logo}
          src="/assets/img/logo.svg"
          alt="PRO MEBEL"
          width={190}
          height={62}
        />
        <div className={classes.group}>
          <div className={classes.address}>
            <h3 className={classes.title}>Наш адрес</h3>
            <Link
              href="https://yandex.ru/maps/-/CDQ5v2zK"
              className={classes.link}
              target="_blank"
            >
              г. Душанбе, ул. Карин Манн, 130
            </Link>
          </div>
          <div className={classes.address}>
            <h3 className={classes.title}>Номера телефонов:</h3>
            <ul className={classes.list}>
              <li className={classes.item}>
                <a href="tel:+992487018887" className={classes.link}>
                  <HandySvg
                    src="/assets/icons/call-small.svg"
                    width={16}
                    height={16}
                  />
                  +992 487 01 88 87
                </a>
              </li>
              <li className={classes.item}>
                <a href="tel:+992487028887" className={classes.link}>
                  <HandySvg
                    src="/assets/icons/call-small.svg"
                    width={16}
                    height={16}
                  />
                  +992 487 02 88 87
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.address}>
          <h3 className={classes.title}>Email:</h3>
          <ul className={classes.list}>
            <li className={classes.item}>
              <a href="mailto:info@promebel.tj" className={classes.link}>
                <HandySvg
                  src="/assets/icons/email.svg"
                  width={16}
                  height={16}
                />
                info@promebel.tj
              </a>
            </li>
          </ul>
        </div>
        {/* <div className={clsx(classes.col3, classes.contacts)}>
          <h3 className={classes.title}>Контакты</h3>


          <div className={classes.mobileSocials}>
            <FooterSocials />
          </div>
        </div> */}
      </div>
      <div className={classes.right}>
        <div className={classes.col1}>
          <h3 className={classes.title}>О нас</h3>
          <ul className={classes.list}>
            <li className={classes.item}>
              <Link href="/about" className={classes.link}>
                О компании
              </Link>
            </li>
            <li className={classes.item}>
              <Link href="/delivery" className={classes.link}>
                Доставка
              </Link>
            </li>
            <li className={classes.item}>
              <Link href="/contacts" className={classes.link}>
                Контакты
              </Link>
            </li>
            <li className={classes.item}>
              <Link href="/specialists" className={classes.link}>
                Промебель комьюнити
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.col2}>
          <h3 className={classes.title}>Меню</h3>
          <ul className={classes.list}>
            <li className={classes.item}>
              <Link href="/about" className={classes.link}>
                О компании
              </Link>
            </li>
            <li className={classes.item}>
              <Link href="/delivery" className={classes.link}>
                Доставка
              </Link>
            </li>
            <li className={classes.item}>
              <Link href="/contacts" className={classes.link}>
                Контакты
              </Link>
            </li>
            <li className={classes.item}>
              <Link href="/specialists" className={classes.link}>
                Промебель комьюнити
              </Link>
            </li>
            <li className={classes.item}>
              <Link target="_blank" href="/providers" className={classes.link}>
                Поставщики
              </Link>
            </li>
            <li className={classes.item}>
              <Link target="_blank" href="/services" className={classes.link}>
                Наши усулги
              </Link>
            </li>
            <li className={classes.item}>
              <Link target="_blank" href="/vacancies" className={classes.link}>
                Вакансии
              </Link>
            </li>
            <li className={classes.item}>
              <Link
                target="_blank"
                href="https://promebelstudio.tj"
                className={classes.link}
              >
                Промебель студия
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.col3}>
          <div className={classes.desktopSocials}>
            <FooterSocials />
          </div>
        </div>
      </div>
    </div>
  )
}

export { FooterTop }
