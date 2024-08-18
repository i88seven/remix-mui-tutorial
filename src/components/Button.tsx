import type { Interpolation, Theme } from '@emotion/react'
import { LoadingButton } from '@mui/lab'
import { Button as MuiButton, ThemeProvider, createTheme } from '@mui/material'
import type { FC, MouseEventHandler, ReactNode } from 'react'
import { colorMap } from 'utils/color'

type Props = {
  label: string
  variant?: 'text' | 'outlined' | 'contained'
  type?: 'submit' | undefined
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
  startIcon?: ReactNode
  endIcon?: ReactNode
  disabled?: boolean
  loading?: boolean
  size?: 'mini' | 'small' | 'medium' | 'large'
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  styles?: Interpolation<Theme>
}

export const Button: FC<Props> = ({
  label,
  variant,
  type,
  color,
  startIcon,
  endIcon,
  disabled,
  loading,
  size = 'medium',
  onClick,
  styles,
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: colorMap.PRIMARY,
      },
      info: {
        main: colorMap.BASE_DEEP,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          sizeSmall: {
            fontSize: size === 'mini' ? '0.5rem' : '0.75rem',
            borderRadius: 4,
            padding:
              size === 'mini'
                ? 'calc(0.5rem - 1px) 0.5rem'
                : '0.63rem 1rem 0.5rem',
            lineHeight: size === 'mini' ? 1 : 'inherit',
            minWidth: size === 'mini' ? 'unset' : 'inherit',
          },
          sizeMedium: {
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: 8,
            padding: '0.75rem 2rem 0.63rem',
            lineHeight: '1.45rem',
          },
          sizeLarge: {
            fontSize: '1.38rem',
            fontWeight: 'bold',
            borderRadius: 8,
            padding: '0.75rem 2.5rem 0.63rem',
            lineHeight: '2rem',
          },
          iconSizeMedium: {
            marginTop: label === '' ? 0 : -4,
            '& > *:first-of-type': {
              fontSize: size === 'large' ? '1.5rem' : '1rem',
            },
          },
          outlinedInherit: {
            color: colorMap.BASE_GRAY,
          },
          outlined: {
            backgroundColor: colorMap.WHITE,
            ':hover': {
              backgroundColor: colorMap.BASE_LIGHT,
            },
          },
          startIcon: {
            marginTop: size === 'mini' ? -2 : 0,
            marginLeft: label === '' ? 0 : -2,
            marginRight: label === '' ? 0 : '0.5rem',
            '& > *:first-of-type': {
              fontSize: size === 'mini' ? '0.5rem' : 'inherit',
            },
          },
          containedPrimary: {
            ':disabled': {
              color: colorMap.WHITE,
              backgroundColor: disabled ? colorMap.PRIMARY_SOFT : 'inherit',
            },
          },
          outlinedPrimary: {
            ':hover': {
              backgroundColor: colorMap.PRIMARY_LIGHT,
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            width: size === 'mini' ? '0.5rem' : 'inherit',
            lineHeight: 'initial',
          },
        },
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      {loading === undefined ? (
        <MuiButton
          variant={variant}
          type={type}
          color={color}
          startIcon={startIcon}
          endIcon={endIcon}
          size={size === 'mini' ? 'small' : size}
          onClick={onClick}
          disabled={disabled}
          css={[styles]}
        >
          {label}
        </MuiButton>
      ) : (
        <LoadingButton
          variant={variant}
          type={type}
          color={color}
          startIcon={startIcon}
          endIcon={endIcon}
          size={size === 'mini' ? 'small' : size}
          onClick={onClick}
          disabled={disabled}
          loading={loading}
          css={[styles]}
        >
          {label}
        </LoadingButton>
      )}
    </ThemeProvider>
  )
}
