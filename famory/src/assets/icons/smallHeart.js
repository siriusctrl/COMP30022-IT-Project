import React from 'react'
import Svg, { Defs, Rect, G, Use, Path } from 'react-native-svg'

const SmallHeart = props => (
  <Svg width="29px" height="29px" viewBox="0 0 29 29" {...props}>
    <Defs>
      <Rect id="path-1" x={0} y={0} width={21} height={21} rx={10.5} />
    </Defs>
    <G
      id="UI-Design"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G id="Community---Main" transform="translate(-274.000000, -409.000000)">
        <G id="SmallHeart" transform="translate(278.000000, 411.000000)">
          <G id="Icon-BG">
            <Use
              fill="black"
              fillOpacity={1}
              filter="url(#filter-2)"
              xlinkHref="#path-1"
            />
            <Use
              stroke="#F1EFEF"
              strokeWidth={1}
              fill="#FFFFFF"
              fillRule="evenodd"
              xlinkHref="#path-1"
            />
          </G>
          <G id="Heart-Copy" transform="translate(5.000000, 6.000000)">
            <Rect
              id="Rectangle"
              fill="#D8D8D8"
              opacity={0}
              x={0}
              y={0}
              width={11.25}
              height={11.25}
            />
            <Path
              d="M5.625,7.77864563 L8.66705687,4.63119944 C9.11098104,4.1718959 9.11098104,3.39650953 8.66705687,2.937206 C8.26472077,2.52093133 7.6451818,2.52093133 7.24284571,2.937206 L5.625,4.61110052 L4.00715429,2.937206 C3.6048182,2.52093133 2.98527923,2.52093133 2.58294313,2.937206 C2.13901896,3.39650953 2.13901896,4.1718959 2.58294313,4.63119944 L5.625,7.77864563 Z"
              id="Path"
              stroke="#E66969"
              strokeWidth={4.5}
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
)

export default SmallHeart;
