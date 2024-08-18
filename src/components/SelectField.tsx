import {
  FormControl,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { FormHeading } from 'components/FormHeading'
import {
  Controller,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { FormControlProp } from 'types/react-hook-form-helper'
import { colorMap } from 'utils/color'

type Props<TFieldValues extends FieldValues> = {
  label?: string
  name: Path<TFieldValues>
  control: FormControlProp<TFieldValues>
  options?: { id: string; name: string }[]
}

export const SelectField = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  options,
}: Props<TFieldValues>) => {
  const theme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          select: {
            paddingBlock: '0.8rem',
            backgroundColor: colorMap.WHITE,
          },
        },
      },
    },
  })
  const { t } = useTranslation()

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
            <Select
              {...field}
              onChange={(e) => {
                field.onChange(
                  e.target.value as PathValue<TFieldValues, Path<TFieldValues>>
                )
              }}
              displayEmpty
            >
              <MenuItem key='' value='' disabled>
                {t('please-select')}
              </MenuItem>
              {options?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </ThemeProvider>
  )
}
