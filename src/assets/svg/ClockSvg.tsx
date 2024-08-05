import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function ClockSvg (props: SvgProps) {
  return (
    <Svg
      width={11}
      height={11}
      fill="none"
      {...props}
    >
      <Path
        fill="#987952"
        d="M5.495.083A5.414 5.414 0 0 0 .084 5.5a5.414 5.414 0 0 0 5.411 5.416A5.42 5.42 0 0 0 10.917 5.5 5.42 5.42 0 0 0 5.495.083Zm2.172 7.583a.54.54 0 0 1-.763 0L5.12 5.884A.542.542 0 0 1 4.96 5.5V3.333c0-.298.244-.542.542-.542.298 0 .541.244.541.542v1.945l1.625 1.625a.54.54 0 0 1 0 .763Z"
      />
    </Svg>
  )
}