/* eslint-disable react/destructuring-assignment */
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function CloseSvg(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "#987952"}
        d="M13.536 7.172a.5.5 0 1 0-.708-.708l.708.708Zm-7.072 5.656a.5.5 0 1 0 .708.708l-.708-.708Zm6.364.708a.5.5 0 1 0 .708-.708l-.708.708ZM7.172 6.464a.5.5 0 1 0-.708.708l.708-.708ZM18.5 10a8.5 8.5 0 0 1-8.5 8.5v1a9.5 9.5 0 0 0 9.5-9.5h-1ZM10 18.5A8.5 8.5 0 0 1 1.5 10h-1a9.5 9.5 0 0 0 9.5 9.5v-1ZM1.5 10A8.5 8.5 0 0 1 10 1.5v-1A9.5 9.5 0 0 0 .5 10h1ZM10 1.5a8.5 8.5 0 0 1 8.5 8.5h1A9.5 9.5 0 0 0 10 .5v1Zm2.828 4.964L9.646 9.646l.708.708 3.182-3.182-.708-.708ZM9.646 9.646l-3.182 3.182.708.708 3.182-3.182-.708-.708Zm3.89 3.182-3.182-3.182-.708.708 3.182 3.182.708-.708Zm-3.182-3.182L7.172 6.464l-.708.708 3.182 3.182.708-.708Z"
      />
    </Svg>
  )
}