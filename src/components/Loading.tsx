import { CircularProgress } from '@mui/material'

type Props = {
  size?: string | number
  marginTop?: string | number
}

export const Loading: React.FC<Props> = ({
  size = '5rem',
  marginTop = '2.5rem',
}) => {
  return (
    <div style={{ textAlign: 'center', marginTop }}>
      <CircularProgress size={size} />
    </div>
  )
}
