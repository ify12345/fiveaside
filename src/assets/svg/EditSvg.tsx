import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function EditSvg (props: SvgProps) {
  return (
    <Svg
      width={16}
      height={17}
      fill="none"
      {...props}
    >
      <Path
        stroke="#987952"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.4 3.036H3.609A2.275 2.275 0 0 0 1.334 5.31v7.582a2.275 2.275 0 0 0 2.275 2.275h7.582a2.275 2.275 0 0 0 2.274-2.275v-3.79m-8.34 2.274 2.759-.556a.758.758 0 0 0 .386-.207l6.175-6.179a.758.758 0 0 0 0-1.072l-1.308-1.307a.758.758 0 0 0-1.072 0l-6.176 6.18a.758.758 0 0 0-.207.385l-.557 2.756Z"
      />
    </Svg>
  )
}
