import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SearchSvg (props: SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      fill="none"
      {...props}
    >
      <Path
        stroke="#987952"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m28 28-5.8-5.8m3.133-7.533c0 5.89-4.775 10.666-10.666 10.666S4 20.558 4 14.667 8.776 4 14.667 4c5.89 0 10.666 4.776 10.666 10.667Z"
      />
    </Svg>
  )
}