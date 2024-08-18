import MenuIcon from '@mui/icons-material/Menu'
import { Link } from '@mui/material'
import { Text } from 'components/Text'
import { useMediaQuery } from 'hooks'
import { useDrawerContext } from 'providers'
import type { ReactNode } from 'react'
import { type ColorKeys, colorMap } from 'utils/color'

type Props = {
  children?: ReactNode
  title?: string
  backgroundColor?: ColorKeys
}

export const TitleBox: React.FC<Props> = ({
  children,
  title,
  backgroundColor = 'WHITE',
}) => {
  const { isSp } = useMediaQuery()
  const { setOpen } = useDrawerContext()

  return (
    <div
      css={{
        display: 'flex',
        paddingTop: 16,
        paddingBottom: 13,
        backgroundColor: colorMap[backgroundColor],
        borderBottom:
          backgroundColor === 'WHITE' ? `1px solid ${colorMap.BASE_LIGHT}` : '',
      }}
    >
      {isSp && (
        <Link
          css={{ marginTop: 4, marginLeft: 16, color: colorMap.BASE_DEEP }}
          underline='none'
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </Link>
      )}
      {children ?? (
        <div
          css={{
            width: '100%',
            textAlign: 'center',
            paddingRight: isSp ? 24 : 0,
          }}
        >
          {title ? (
            <Text text={title} as='div' size='TITLE' weight='BOLD' />
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  )
}
