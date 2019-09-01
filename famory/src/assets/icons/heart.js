import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const Heart = props => (
  <Svg width="65px" height="65px" viewBox="0 0 65 65" {...props}>
    <G
      id="UI-Design"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G id="Community---Main" transform="translate(-145.000000, -483.000000)">
        <G id="Hearticon" transform="translate(145.000000, 483.000000)">
          <Rect
            id="Icon-BG"
            fill="#E66969"
            x={0}
            y={0}
            width={65}
            height={65}
            rx={32.5}
          />
          <G id="Heart-Copy" transform="translate(14.218750, 14.218750)">
            <G id="ico-/-24-/-actions-/-heart">
              <Path
                d="M33.9166667,13.1041667 C33.9166667,8.42125223 30.1204144,4.625 25.4375,4.625 C22.788765,4.70753428 20.2862283,5.85870118 18.5,7.81625 C16.7137717,5.85870118 14.211235,4.70753428 11.5625,4.625 C6.87958556,4.625 3.08333333,8.42125223 3.08333333,13.1041667 C3.08333333,19.1475 10.40625,25.8229167 13.875,29.2916667 L17.39,32.8066667 C17.6066309,33.0235676 17.9005301,33.1458333 18.2070833,33.1458333 L18.7929167,33.1458333 C19.0994699,33.1458333 19.3933691,33.0235676 19.61,32.8066667 L23.125,29.2916667 C26.59375,25.8229167 33.9166667,19.1475 33.9166667,13.1041667 Z"
                id="Icon-color"
              />
            </G>
            <Path
              d="M18.28125,32.9248565 L31.9878483,18.7434054 C35.4207172,15.1916078 35.4207172,9.40570989 31.9878483,5.85391229 C28.5919466,2.34036257 23.1152368,2.34036257 19.7193351,5.85391229 L18.28125,7.34181853 L16.8431649,5.85391229 C13.4472632,2.34036257 7.97055345,2.34036257 4.5746517,5.85391229 C1.14178277,9.40570989 1.14178277,15.1916078 4.5746517,18.7434054 L18.28125,32.9248565 Z"
              id="Path"
              stroke="#FFFFFF"
              strokeWidth={4}
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
)

export default Heart;