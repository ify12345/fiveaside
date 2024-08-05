import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function BackIconSvg (props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <Path
        fill="#987952"
        d="M10.68 14.097a.5.5 0 0 0 .768-.64l-.768.64ZM7.75 9.8l-.385-.32a.5.5 0 0 0 0 .64l.384-.32Zm3.698-3.658a.5.5 0 1 0-.768-.64l.768.64Zm0 7.315L8.134 9.479l-.769.64 3.315 3.978.768-.64ZM8.134 10.12l3.314-3.978-.768-.64L7.365 9.48l.769.64ZM10 1.5a8.5 8.5 0 0 1 8.5 8.5h1A9.5 9.5 0 0 0 10 .5v1Zm8.5 8.5a8.5 8.5 0 0 1-8.5 8.5v1a9.5 9.5 0 0 0 9.5-9.5h-1ZM10 18.5A8.5 8.5 0 0 1 1.5 10h-1a9.5 9.5 0 0 0 9.5 9.5v-1ZM1.5 10A8.5 8.5 0 0 1 10 1.5v-1A9.5 9.5 0 0 0 .5 10h1Z"
      />
    </Svg>
  )
}