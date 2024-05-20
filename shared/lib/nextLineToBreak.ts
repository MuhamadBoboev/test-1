export function nextLineToBreak(text: string): string {
  return text.replaceAll('\n', '<br/>')
}