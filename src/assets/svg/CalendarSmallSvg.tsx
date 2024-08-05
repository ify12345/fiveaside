import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function CalendarSmallSvg (props: SvgProps) {
  return (
    <Svg
      width={11}
      height={11}
      fill="none"
      {...props}
    >
      <Path
        fill="#987952"
        d="M9.292 1.167H8.75V.084H7.667v1.083H3.333V.084H2.25v1.083h-.542c-.6 0-1.078.488-1.078 1.083L.625 9.834a1.083 1.083 0 0 0 1.083 1.083h7.584c.595 0 1.083-.487 1.083-1.083V2.25c0-.595-.488-1.083-1.083-1.083Zm0 8.667H1.708V4.417h7.584v5.417Zm-5.417-3.25H2.792V5.5h1.083v1.084Zm2.167 0H4.958V5.5h1.084v1.084Zm2.166 0H7.125V5.5h1.083v1.084ZM3.875 8.75H2.792V7.667h1.083V8.75Zm2.167 0H4.958V7.667h1.084V8.75Zm2.166 0H7.125V7.667h1.083V8.75Z"
      />
    </Svg>
  )
}