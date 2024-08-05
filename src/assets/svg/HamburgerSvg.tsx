/* eslint-disable react/destructuring-assignment */
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function HamburgerSvg (props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke={props.color || "#fff"}
        strokeLinecap="round"
        strokeWidth={2}
        d="M20 18H4m16-6H4m16-6H4"
      />
    </Svg>
  )
}