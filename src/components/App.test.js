import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  const component = shallow(<App />);
  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
