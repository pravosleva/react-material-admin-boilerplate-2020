export const getModifiedPhraseForTranslate = (text: string) => {
  return text.toUpperCase().replace(' ', '_')
}
