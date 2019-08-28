import React from 'react'
import Svg, { G, Rect, Path } from 'react-native-svg'

const CrossIcon = props => (
  <Svg width="55px" height="55px" viewBox="0 0 55 55" {...props}>
    <G
      id="UI-Design"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G id="Community---Main" transform="translate(-37.000000, -515.000000)">
        <G id="Cloudicon" transform="translate(37.000000, 515.000000)">
          <Rect
            id="Icon-BG-Copy-4"
            fill="#B5BBBE"
            x={0}
            y={0}
            width={55}
            height={55}
            rx={27.5}
          />
          <Path
            d="M15.5,26 L40.5,26 C41.3284271,26 42,26.6715729 42,27.5 C42,28.3284271 41.3284271,29 40.5,29 L25.0999868,29 L15.5,29 C14.6715729,29 14,28.3284271 14,27.5 C14,26.6715729 14.6715729,26 15.5,26 Z"
            id="Rectangle"
            fill="#FFFFFF"
            transform="translate(28.000000, 27.500000) rotate(45.000000) translate(-28.000000, -27.500000) "
          />
          <Path
            d="M15.5,26 L40.5,26 C41.3284271,26 42,26.6715729 42,27.5 C42,28.3284271 41.3284271,29 40.5,29 L25.0999868,29 L15.5,29 C14.6715729,29 14,28.3284271 14,27.5 C14,26.6715729 14.6715729,26 15.5,26 Z"
            id="Rectangle"
            fill="#FFFFFF"
            transform="translate(28.000000, 27.500000) rotate(135.000000) translate(-28.000000, -27.500000) "
          />
        </G>
      </G>
    </G>
  </Svg>
)

export default CrossIcon;
