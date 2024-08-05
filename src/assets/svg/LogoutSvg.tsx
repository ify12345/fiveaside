import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function LogoutSvg(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <Path
        stroke="#E43B3F"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.765 5.2V3.8c0-.371-.149-.727-.414-.99a1.418 1.418 0 0 0-.998-.41H3.412c-.375 0-.734.148-.998.41A1.394 1.394 0 0 0 2 3.8v8.4c0 .371.149.727.413.99.265.263.624.41.999.41h4.94c.375 0 .734-.147 1-.41.264-.263.413-.619.413-.99v-1.4M5.529 8H14m0 0-2.118-2.1M14 8l-2.118 2.1"
      />
    </Svg>
  )
}