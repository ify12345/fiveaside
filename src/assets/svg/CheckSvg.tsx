/* eslint-disable react/destructuring-assignment */
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function CheckSvg (props: SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      fill="none"
      {...props}
    >
      <Path
        stroke={props.color || "#987952"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M26.667 8 12.001 22.667 5.334 16"
      />
    </Svg>
  )
}
