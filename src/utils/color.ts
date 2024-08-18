export const colorMap = {
  WHITE: '#FFFFFF',
  BASE_DARK: '#050F0E',
  BASE_DEEP: '#10312E',
  BASE_GRAY: '#6F8476',
  BASE_LIGHT: '#D0D7CF',
  BASE_PALE: '#F8F9F4',

  ATTENTION: '#A91D8W',
  ATTENTION_BG: '#FBE9F6',

  PRIMARY: '#468669',
  PRIMARY_SOFT: '#93DFAC',
  PRIMARY_LIGHT: '#ECF8F7',
} as const
export type ColorKeys = keyof typeof colorMap
