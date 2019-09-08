import Empty from "./Empty";
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Empty />', () => {
  it('has no child', () => {
    const tree = renderer.create(<Empty />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});