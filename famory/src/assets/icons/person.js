import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Person = props => (
  <Svg width="16px" height="16px" viewBox="0 0 16 16" {...props}>
    <G
      id="UI-Design"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      fillOpacity={0.54}
      opacity={0.97}
    >
      <G
        id="Signup"
        transform="translate(-62.000000, -287.000000)"
        fill="#000000"
      >
        <G id="button" transform="translate(31.000000, 188.000000)">
          <G
            id="ic_person_add_black_24px"
            transform="translate(31.000000, 99.000000)"
          >
            <G id="Group">
              <Path
                d="M8,8 C10.21,8 12,6.21 12,4 C12,1.79 10.21,0 8,0 C5.79,0 4,1.79 4,4 C4,6.21 5.79,8 8,8 Z M8,10 C5.33,10 0,11.34 0,14 L0,16 L16,16 L16,14 C16,11.34 10.67,10 8,10 Z"
                id="Shape"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
)

export default Person;