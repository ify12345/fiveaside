import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function BellSvg(props: SvgProps) {
    return (
    <Svg
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <Path
        stroke="#987952"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.222 13.394A2.845 2.845 0 0 0 7.999 14c.683 0 1.306-.23 1.778-.606m-6.773-1.94c-.28 0-.438-.441-.268-.686.395-.57.776-1.405.776-2.41l.016-1.457C3.528 4.194 5.53 2 7.999 2c2.506 0 4.538 2.227 4.538 4.973l-.017 1.385c0 1.012.368 1.852.746 2.421.164.246.007.675-.271.675h-9.99Z"
      />
    </Svg>
  )
}
