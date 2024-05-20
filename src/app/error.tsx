'use client'
import { Error500Page } from '@shared/ui/Error500Page'
import { useEffect } from 'react'

function Error() {
  useEffect(() => {
    if (window.document) {
      window.document.title = 'Произошла ошибка | PRO Mebel'
    }
  }, [])

  return <Error500Page/>
}

export default Error