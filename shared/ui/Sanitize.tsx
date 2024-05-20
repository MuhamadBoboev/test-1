import HTMLReactParser from 'html-react-parser'
import sanitize from 'sanitize-html'

interface Props {
  text: string
  allowedTags?: string[]
}

const tags = ['p', 'span', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'h5', 'h6']

function Sanitize({text, allowedTags = tags}: Props) {
  const clean = sanitize(text, {
    allowedTags: sanitize.defaults.allowedTags.concat(allowedTags)
  })
  return HTMLReactParser(clean || '')
}

export { Sanitize }