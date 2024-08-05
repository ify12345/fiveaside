import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

export default function GoogleSvg (props: SvgProps) {
  return (
    <Svg
      width={21}
      height={20}
      fill="none"
      {...props}
    >
      <Path
        fill="#FFC107"
        d="M18.676 8.367h-.671v-.035H10.5v3.336h4.713A5.001 5.001 0 0 1 5.497 10 5.003 5.003 0 0 1 10.5 4.997c1.275 0 2.436.481 3.32 1.267l2.358-2.358A8.3 8.3 0 0 0 10.5 1.662a8.338 8.338 0 1 0 8.176 6.705Z"
      />
      <Path
        fill="#FF3D00"
        d="m3.123 6.119 2.74 2.01A5 5 0 0 1 10.5 4.996c1.275 0 2.435.481 3.319 1.267l2.358-2.358A8.3 8.3 0 0 0 10.5 1.662a8.333 8.333 0 0 0-7.377 4.457Z"
      />
      <Path
        fill="#4CAF50"
        d="M10.5 18.338a8.3 8.3 0 0 0 5.59-2.164l-2.581-2.184a4.965 4.965 0 0 1-3.01 1.013 5 5 0 0 1-4.704-3.313l-2.719 2.095a8.332 8.332 0 0 0 7.423 4.553Z"
      />
      <Path
        fill="url(#a)"
        d="M18.676 8.367h-.672v-.035H10.5v3.336h4.712a5.02 5.02 0 0 1-1.704 2.322h.002l2.58 2.183c-.182.166 2.748-2.004 2.748-6.173a8.39 8.39 0 0 0-.162-1.633Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={14.669}
          x2={14.669}
          y1={8.332}
          y2={16.182}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#856445" />
          <Stop offset={1} stopColor="#987952" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}
