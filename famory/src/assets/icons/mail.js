import React from 'react'
import Svg, { G, Polygon, Path } from 'react-native-svg'

const Mail = props => (
  <Svg width="17px" height="12px" viewBox="0 0 17 12" {...props}>
    <G
      id="UI-Design"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      opacity={0.97}
    >
      <G id="Login" transform="translate(-62.000000, -288.000000)">
        <G id="button" transform="translate(31.000000, 188.000000)">
          <G id="icon-mail" transform="translate(30.000000, 97.000000)">
            <Polygon
              id="bounds"
              transform="translate(10.000000, 9.000000) scale(1, -1) translate(-10.000000, -9.000000) "
              points="20 0 0 0 0 18 20 18"
            />
            <Path
              d="M16.1111111,15 L2.77777778,15 C1.86111111,15 1.11111111,14.325 1.11111111,13.5 L1.11111111,4.5 C1.11111111,3.675 1.86111111,3 2.77777778,3 L16.1111111,3 C17.0277778,3 17.7777778,3.675 17.7777778,4.5 L17.7777778,13.5 C17.7777778,14.325 17.0277778,15 16.1111111,15 L16.1111111,15 Z M16.1111111,12 L9.44444444,8.25 L2.77777778,12 L2.77777778,13.5 L9.44444444,9.75 L16.1111111,13.5 L16.1111111,12 L16.1111111,12 Z"
              id="Shape"
              fill="#000000"
              opacity={0.539999962}
              transform="translate(9.444444, 9.000000) scale(1, -1) translate(-9.444444, -9.000000) "
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
)

export default Mail;
