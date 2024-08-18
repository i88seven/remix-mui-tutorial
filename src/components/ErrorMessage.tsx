import { Text } from 'components/Text'
import { colorMap } from 'utils/color'

type Props = {
  text: string
}

export const ErrorMessage: React.FC<Props> = ({ text }) => {
  return (
    <div css={{ padding: '12px 24px', backgroundColor: colorMap.ATTENTION_BG }}>
      <Text text={text} color='ATTENTION' size='CAPTION' weight='BOLD' />
    </div>
  )
}
