import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function BrandSvg (props: SvgProps) {
  return (
    <Svg
      width={16}
      height={17}
      fill="none"
      {...props}
    >
      <Path
        stroke="gray"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 3.5h-11A.5.5 0 0 0 2 4v9a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5Z"
      />
      <Path
        stroke="gray"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2 11 3.144-3.144a.5.5 0 0 1 .712 0l2.788 2.788a.5.5 0 0 0 .712 0l1.288-1.288a.5.5 0 0 1 .712 0L14 12"
      />
      <Path
        fill="gray"
        d="M9.75 7.375a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z"
      />
    </Svg>
  )
}
