import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

export default function BrandingImageSvg (props: SvgProps) {
  return (
  <Svg
    width={201}
    height={209}
    fill="none"
    {...props}
  >
    <Path
      fill="#FAF5ED"
      d="M169.182 156.863H13.775c-7.472 0-13.529-6.058-13.529-13.53V14.453C.246 6.981 6.303.923 13.775.923h155.407c7.472 0 13.529 6.058 13.529 13.53v128.88c0 7.472-6.057 13.53-13.529 13.53Z"
    />
    <Path
      fill="#FAF5ED"
      d="M156.512 144.151H26.443c-6.254 0-11.324-5.07-11.324-11.323V24.96c0-6.254 5.07-11.323 11.324-11.323h130.069c6.253 0 11.323 5.07 11.323 11.323v107.868c0 6.253-5.07 11.323-11.323 11.323Z"
    />
    <Path
      fill="url(#a)"
      d="M100.533 144.151H26.446c-6.255 0-11.327-5.068-11.327-11.323v-17.683l18.797-22.848c6.204-7.546 17.752-7.546 23.96 0l11.703 14.229 30.954 37.625Z"
    />
    <Path
      fill="url(#b)"
      d="M167.837 104.394v28.434c0 6.255-5.073 11.323-11.328 11.323H38.623l30.955-37.625L107.605 60.3c6.204-7.543 17.755-7.543 23.959 0l36.273 44.094Z"
    />
    <Path
      fill="#FAAD14"
      d="M54.682 24.924c8.868 0 16.058 7.189 16.058 16.057 0 8.868-7.19 16.057-16.058 16.057-8.868 0-16.057-7.189-16.057-16.057 0-8.868 7.19-16.057 16.057-16.057Z"
    />
    <Path
      stroke="url(#c)"
      strokeLinecap="round"
      strokeWidth={4.309}
      d="M57.188 169.731v6.372"
    />
    <Path
      stroke="url(#d)"
      strokeLinecap="round"
      strokeWidth={4.309}
      d="M153.908 199.627V206"
    />
    <Path
      stroke="url(#e)"
      strokeLinecap="round"
      strokeWidth={5.54}
      d="M22.895 201.166v1.316"
    />
    <Path
      stroke="#F2E5FB"
      strokeLinecap="round"
      strokeWidth={4.309}
      d="M198.754 117.633v1.316"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={57.826}
        x2={57.826}
        y1={86.637}
        y2={144.151}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E2E2E2" stopOpacity={0.85} />
        <Stop offset={1} stopColor="#A09281" stopOpacity={0.94} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={103.23}
        x2={103.23}
        y1={54.643}
        y2={144.151}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E2E2E2" stopOpacity={0.85} />
        <Stop offset={1} stopColor="#A09281" stopOpacity={0.94} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={57.688}
        x2={57.688}
        y1={169.731}
        y2={176.103}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E2E2E2" stopOpacity={0.85} />
        <Stop offset={1} stopColor="#A09281" stopOpacity={0.94} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={154.408}
        x2={154.408}
        y1={199.627}
        y2={206}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E2E2E2" stopOpacity={0.85} />
        <Stop offset={1} stopColor="#A09281" stopOpacity={0.94} />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={23.395}
        x2={23.395}
        y1={201.166}
        y2={202.482}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E2E2E2" stopOpacity={0.85} />
        <Stop offset={1} stopColor="#A09281" stopOpacity={0.94} />
      </LinearGradient>
    </Defs>
  </Svg>
)
}
