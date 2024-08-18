import { Link as MuiLink } from '@mui/material'
import type { ReactNode } from 'react'
import { type ColorKeys, colorMap } from 'utils/color'

type Props = {
  text: ReactNode
  onClick?: () => void
  color?: ColorKeys
  underline?: 'none' | 'hover' | 'always'
}

export const Link: React.FC<Props> = ({
  text,
  onClick,
  color = 'PRIMARY',
  underline = 'none',
}) => {
  return (
    <MuiLink
      underline={underline}
      onClick={
        onClick
          ? () => {
              onClick()
            }
          : undefined
      }
      css={{
        color: colorMap[color],
      }}
    >
      {text}
    </MuiLink>
  )
}
