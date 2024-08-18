import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { FormHeading } from 'components/FormHeading'
import { Text } from 'components/Text'
import { t } from 'i18next'
import { useState } from 'react'
import { Controller, type FieldValues, type Path } from 'react-hook-form'
import type { FormControlProp } from 'types/react-hook-form-helper'
import { colorMap } from 'utils/color'

type Props<TFieldValues extends FieldValues> = {
  label?: string
  name: Path<TFieldValues>
  control: FormControlProp<TFieldValues>
}

export const PasswordField = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
}: Props<TFieldValues>) => {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            paddingBlock: '0.8rem',
            backgroundColor: colorMap.WHITE,
          },
        },
      },
    },
  })
  const [isRevealPassword, setIsRevealPassword] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      {label && <FormHeading text={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl
            fullWidth
            css={{ marginBottom: '1.5rem' }}
            error={!!fieldState.error}
          >
            <Text
              text={t('authentication.warning-password')}
              as='span'
              color='BASE_GRAY'
              styles={{ marginBottom: 8 }}
            />
            <div css={{ width: '100%', display: 'flex', gap: 8 }}>
              <OutlinedInput
                autoComplete='current-password'
                type={isRevealPassword ? 'text' : 'password'}
                inputProps={{
                  'aria-label': name,
                }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setIsRevealPassword(!isRevealPassword)}
                      edge='end'
                      tabIndex={-1}
                    >
                      {isRevealPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                {...field}
                css={{ width: 'inherit' }}
              />
            </div>
          </FormControl>
        )}
      />
    </ThemeProvider>
  )
}
