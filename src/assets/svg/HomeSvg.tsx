import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function HomeSvg (props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <Path
        stroke="#808494"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.333 6.333 8.916 2.15a1.333 1.333 0 0 0-1.834 0L2.666 6.333V14h3.667v-2.667a1.667 1.667 0 1 1 3.333 0V14h3.667V6.333Z"
      />
    </Svg>
  )
}