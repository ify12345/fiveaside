import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function RocketSvg (props: SvgProps) {
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
        d="m16 20-4-4m4 4a29.805 29.805 0 0 0 5.334-2.666M16.001 20v6.667s4.04-.734 5.333-2.667c1.44-2.16 0-6.666 0-6.666M12.001 16a29.332 29.332 0 0 1 2.666-5.267 17.173 17.173 0 0 1 14.667-8.066c0 3.627-1.04 10-8 14.666M12.001 16H5.334s.733-4.04 2.667-5.333c2.16-1.44 6.666 0 6.666 0M6.001 22c-2 1.68-2.667 6.667-2.667 6.667S8.321 28 10.001 26c.946-1.12.933-2.84-.12-3.88A2.907 2.907 0 0 0 6 22Z"
      />
    </Svg>
  )
}