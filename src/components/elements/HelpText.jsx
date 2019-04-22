import { Text } from 'rebass'

import styled, { themeGet } from 'util/style'

const HelpText = styled(Text)`
  line-height: 1.4;
  color: ${themeGet('colors.grey.700')};
`

export default HelpText
