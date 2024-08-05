/* eslint-disable react/destructuring-assignment */
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function PaySvg (props: SvgProps) {
  return (
    <Svg
      width={16}
      height={17}
      fill="none"
      {...props}
    >
      <Path
        stroke={props.color || "#808494"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        d="m8.245 1.934 6 2.4c.234.093.42.373.42.62v2.213c0 .367-.3.667-.666.667h-12a.669.669 0 0 1-.667-.667V4.954c0-.247.187-.527.42-.62l6-2.4a.78.78 0 0 1 .493 0ZM14.665 15.167H1.332v-2c0-.367.3-.667.667-.667h12c.366 0 .666.3.666.667v2ZM2.668 12.5V7.833M5.332 12.5V7.833M8 12.5V7.833M10.668 12.5V7.833M13.334 12.5V7.833M.668 15.166h14.667"
      />
      <Path
        stroke={props.color || "#808494"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        d="M8 6.167a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    </Svg>
  )
}
