import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

export default function ScheduleSvg (props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <G clipPath="url(#a)">
        <Path
          stroke="#808494"
          d="M3.733 0v5.333M12.267 0v5.333M1.6 2.667h12.8a1.066 1.066 0 0 1 1.066 1.066V14.4a1.066 1.066 0 0 1-1.066 1.067H1.6A1.066 1.066 0 0 1 .533 14.4V3.733A1.067 1.067 0 0 1 1.6 2.667Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}