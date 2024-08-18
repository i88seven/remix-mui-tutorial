import { ThemeProvider, createTheme } from '@mui/material'
import { Text } from 'components/Text'
import { useTranslation } from 'react-i18next'
import { colorMap } from 'utils/color'

type Props = {
  text: string
}

export const FormHeading: React.FC<Props> = ({ text }) => {
  const theme = createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 3,
            color: colorMap.WHITE,
            backgroundColor: colorMap.BASE_DEEP,
          },
        },
      },
    },
  })
  const { t } = useTranslation()
  return (
    <ThemeProvider theme={theme}>
      <div css={{ display: 'flex', gap: 8 }}>
        <Text
          text={text}
          as='div'
          styles={{ marginBottom: 12 }}
          weight={'BOLD'}
        />
      </div>
    </ThemeProvider>
  )
}
