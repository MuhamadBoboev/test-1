'use client'
import classes from './profile-content-mobile.module.scss'
import { useState } from 'react'
import clsx from 'clsx'
import { UserProfile } from '@modules/profile/ui/UserProfile'
import { Orders } from '@modules/order'

interface Props {
  openChangePassword(): void
}

function ProfileContentMobile({openChangePassword}: Props) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile')

  const selectTab = (key: typeof activeTab) => () => setActiveTab(key)

  return (
    <div className={classes.content}>
      <ul className={classes.list}>
        <li className={classes.item}>
          <button
            className={clsx(
              classes.button,
              activeTab === 'profile' && classes.active
            )}
            onClick={selectTab('profile')}
          >
            Профиль
          </button>
        </li>
        <li className={classes.item}>
          <button
            className={clsx(
              classes.button,
              activeTab === 'orders' && classes.active
            )}
            onClick={selectTab('orders')}
          >
            Заказы
          </button>
        </li>
      </ul>
      <div className={classes.tabContent}>
        {activeTab === 'profile' && <UserProfile openChangePassword={openChangePassword}/>}
        {activeTab === 'orders' && <Orders/>}
      </div>
    </div>
  )
}

export { ProfileContentMobile }