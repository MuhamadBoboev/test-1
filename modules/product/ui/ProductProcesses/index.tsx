'use client'
import classes from './product-processes.module.scss'
import { useState } from 'react'
import { ProductProcessesTabsType } from '@modules/product/model/IProductProcess'
import { productProcesses } from '@modules/product/consts/productProcesses'
import clsx from 'clsx'


function ProductProcesses() {
  const [activeTab, setActiveTab] = useState<ProductProcessesTabsType>('delivery')

  const tabContent = productProcesses.find(({key}) => activeTab === key)?.content || null

  return (
    <div className={classes.proccesses}>
      <header className={classes.header}>
        <ul className={classes.list}>
          {productProcesses.map(({key, title}) => (
            <li key={key} className={classes.item}>
              <button
                className={clsx(
                  classes.tab,
                  activeTab === key && classes.active
                )}
                onClick={() => {
                  setActiveTab(key)
                }}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </header>
      <p className={classes.description}>{tabContent}</p>
    </div>
  )
}

export { ProductProcesses }