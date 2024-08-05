import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function AddressSvg(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <Path
        stroke="#808494"
        d="M8 14.4s5.01-4.452 5.01-7.791a5.009 5.009 0 0 0-10.018 0c0 3.339 5.009 7.791 5.009 7.791Z"
      />
      <Path
        stroke="#808494"
        d="M9.601 6.4a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0Z"
      />
    </Svg>
  )
}