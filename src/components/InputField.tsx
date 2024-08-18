import {
  FormControl,
  OutlinedInput,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { FormHeading } from 'components/FormHeading'
import { Controller, type FieldValues, type Path } from 'react-hook-form'
import type { FormControlProp } from 'types/react-hook-form-helper'
import { colorMap } from 'utils/color'

type Props<TFieldValues extends FieldValues> = {
  label?: string
  name: Path<TFieldValues>
  placeholder?: string
  control: FormControlProp<TFieldValues>
}

export const InputField = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
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
            <div css={{ width: '100%', display: 'flex', gap: 8 }}>
              <OutlinedInput
                placeholder={placeholder}
                inputProps={{
                  'aria-label': name,
                }}
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
