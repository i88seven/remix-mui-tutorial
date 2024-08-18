import CheckIcon from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { Text } from 'components/Text'
import { useCompany } from 'features/company/api/company'
import { useCompanyId } from 'hooks'
import { useState } from 'react'

type Option = {
  id: string
  name: string
  disabled?: boolean
}

type Props = {
  options: Option[]
  onSelect: (value: string) => Promise<void>
}

export const SidebarCompanyMenu: React.FC<Props> = ({ options, onSelect }) => {
  const theme = createTheme({
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 20,
          },
        },
      },
    },
  })
  const { companyId } = useCompanyId()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const company = useCompany({ companyId })

  return (
    <ThemeProvider theme={theme}>
      <ListItemButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget)
        }}
      >
        <ListItemText
          primary={company.data?.name}
          sx={{
            marginBottom: 0,
          }}
        />
        <ListItemIcon>
          <ExpandMoreIcon />
        </ListItemIcon>
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null)
        }}
        MenuListProps={{
          'aria-labelledby': 'company-options',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ marginLeft: 1 }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            onClick={async () => {
              await onSelect(option.id)
            }}
          >
            <div
              css={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                marginBlock: '0.3rem',
              }}
            >
              <Text
                text={option.name}
                weight={option.id === companyId ? 'BOLD' : 'NORMAL'}
              />
              {option.id === companyId && <CheckIcon />}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </ThemeProvider>
  )
}
