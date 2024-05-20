import classes from './file-uploader.module.scss'
import { Dispatch, HTMLAttributes, SetStateAction, useId, useState } from 'react'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLInputElement> {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
  label: string
  groupClassName?: string
}

function FileUploader({groupClassName, label, file, setFile, onChange, ...props}: Props) {
  const [name, setName] = useState(file ? file.name : 'Файл не выбран')
  const id = useId()

  return (
    <div className={clsx(classes.fileUploader, groupClassName)}>
      <label htmlFor={id} className={classes.label}>{label}</label>
      <div className={classes.group}>
        <input
          id={id}
          type="file"
          className={classes.input}
          onChange={(event) => {
            if (onChange) {
              onChange(event)
            }
            if (event.target.files && event.target.files[0]) {
              setFile(event.target.files[0])
              setName(event.target.files[0].name || 'Файл не выбран')
            }
          }}
          {...props}
        />
        <button className={classes.button}>
          Загрузить файл
        </button>
        <span className={classes.title}>{name}</span>
      </div>
    </div>
  )
}

export { FileUploader }