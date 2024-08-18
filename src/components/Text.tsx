import type { Interpolation, Theme } from '@emotion/react'
import { type ColorKeys, colorMap } from 'utils/color'

const FontSize = {
  HEADLINE: '1.5rem', // 24px
  TITLE: '1.38rem', // 22px
  SUBHEADER: '1.25rem', // 20px
  BODY: '1rem', // 16px
  CAPTION: '0.88rem', // 14px
  MINI_CAPTION: '0.75rem', // 12px
}
export type FontSize = keyof typeof FontSize

const FontWeight = {
  NORMAL: 'normal',
  BOLD: 'bold',
}
type FontWeight = keyof typeof FontWeight

type Props = {
  text: string
  as?: React.ElementType
  styles?: Interpolation<Theme>
  size?: FontSize
  weight?: FontWeight
  color?: ColorKeys
  width?: number
}

export const Text: React.FC<Props> = ({
  text,
  as: CustomTag = 'span',
  styles,
  size = 'BODY',
  weight = 'NORMAL',
  color = 'BASE_DEEP',
  width,
}) => {
  return (
    <CustomTag
      css={[
        styles,
        {
          color: colorMap[color],
          fontSize: FontSize[size],
          fontWeight: FontWeight[weight],
          width: width,
        },
      ]}
    >
      {text}
    </CustomTag>
  )
}
