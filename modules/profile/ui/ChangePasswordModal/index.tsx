import { Modal } from '@shared/ui/Modal'
import { ChangePasswordForm } from '@modules/profile/ui/ChangePasswordForm'
import classes from './change-password-modal.module.scss'

interface Props {
  isOpen: boolean

  close(): void
}

function ChangePasswordModal({isOpen, close}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      close={close}
    >
      <h2 className={classes.title}>Изменить пароль</h2>
      <ChangePasswordForm close={close}/>
    </Modal>
  )
}

export { ChangePasswordModal }