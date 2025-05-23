import { ElementType, Fragment, ReactNode } from "react"

interface Props {
  condition: boolean
  renderItem: () => ReactNode
  renderElse?: () => ReactNode
  wrapper?: ElementType
}

export default function If({
  condition,
  renderItem,
  renderElse = () => null,
  wrapper: Wrapper = Fragment,
}: Props) {
  return <Wrapper>{condition ? renderItem() : renderElse()}</Wrapper>
}
