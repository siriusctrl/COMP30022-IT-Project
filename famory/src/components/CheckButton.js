import React from 'react'
import Svg, { G, Rect, Polygon } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

const CheckButton = props => (
  <Svg width="31px" height="26px" viewBox="0 0 31 26" {...props}>
    <G
      id="UI-Design"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G id="Edit-Profile" transform="translate(-315.000000, -32.000000)">
        <G
          id="Icons-/-Navigation-24px-/-Grey-/-Check"
          transform="translate(318.312923, 31.000000)"
        >
          <G id="Check">
            <Rect id="Bounds" x={0} y={0} width={24} height={24} />
            <Polygon
              id="Shape"
              fill="#FFFFFF"
              points="8.9999939 16.2 4.7999939 12 3.3999939 13.4 8.9999939 19 20.9999939 7 19.5999939 5.6"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
)

export default CheckButton;
