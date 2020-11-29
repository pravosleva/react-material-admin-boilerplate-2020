export const getModifiedPhraseForTranslate = (text: string): string => {
  return text.toUpperCase().replace(' ', '_')
}
