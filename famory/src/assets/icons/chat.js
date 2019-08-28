import React from 'react'
import Svg, { G, Rect, Path } from 'react-native-svg'

const ChatIcon = props => (
  <Svg width="55px" height="55px" viewBox="0 0 55 55" {...props}>
    <G
      id="UI-Design"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      opacity={0.9}
    >
      <G id="Community---Main" transform="translate(-266.000000, -515.000000)">
        <G id="Chaticon" transform="translate(266.000000, 515.000000)">
          <Rect
            id="Icon-BG-Copy-5"
            fill="#FFC556"
            x={0}
            y={0}
            width={55}
            height={55}
            rx={27.5}
          />
          <Rect
            id="Rectangle"
            fill="#D8D8D8"
            opacity={0}
            x={12.03125}
            y={12.03125}
            width={30.9375}
            height={30.9375}
          />
          <Path
            d="M27.5,14.03125 C20.0614148,14.03125 14.03125,20.0614148 14.03125,27.5 C14.03125,34.9385852 20.0614148,40.96875 27.5,40.96875 C29.3841393,40.96875 31.2104267,40.582832 32.8959582,39.8448848 L33.2794036,39.6770074 L33.6979884,39.6769889 L36.724778,39.6768551 C38.354018,39.6768551 39.674778,38.3560951 39.674778,36.7268381 L39.6748073,33.2840569 L39.8429837,32.9002982 C40.5821644,31.2135754 40.96875,29.385766 40.96875,27.5 C40.96875,20.0614148 34.9385852,14.03125 27.5,14.03125 Z"
            id="Combined-Shape"
            stroke="#FFFFFF"
            strokeWidth={4}
          />
          <Rect
            id="Rectangle"
            stroke="#FFFFFF"
            x={22.328125}
            y={24.90625}
            width={8.28125}
            height={1}
            rx={0.5}
          />
          <Rect
            id="Rectangle-Copy-5"
            stroke="#FFFFFF"
            x={22.328125}
            y={29.546875}
            width={10.34375}
            height={1}
            rx={0.5}
          />
        </G>
      </G>
    </G>
  </Svg>
)

export default ChatIcon;