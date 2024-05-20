'use client'
import classes from './profile-content.module.scss'
import { UserProfile } from '@modules/profile/ui/UserProfile'
import { Orders } from '@modules/order'
import { useWindowSize } from 'usehooks-ts'
import { ProfileContentMobile } from '@modules/profile/ui/ProfileContentMobile'

interface Props {
  openChangePassword(): void
}

function ProfileContent({openChangePassword}: Props) {
  const {width} = useWindowSize()

  if (width <= 970) {
    return <ProfileContentMobile openChangePassword={openChangePassword}/>
  }

  return (
    <div className={classes.content}>
      <Orders/>
      <UserProfile openChangePassword={openChangePassword}/>
    </div>
  )
}

export { ProfileContent }