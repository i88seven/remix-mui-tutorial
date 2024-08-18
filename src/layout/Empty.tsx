import { Grid } from '@mui/material'
import type { ReactNode } from 'react'
import { colorMap } from 'utils/color'

type Props = {
  children: ReactNode
}

export default function Empty({ children }: Props) {
  return (
    <div css={{ height: '100vh', backgroundColor: colorMap.BASE_PALE }}>
      <Grid container css={{ height: '100vh' }}>
        <main
          css={{
            width: '100%',
            margin: 'auto',
            backgroundColor: colorMap.BASE_PALE,
          }}
        >
          {children}
        </main>
      </Grid>
    </div>
  )
}
