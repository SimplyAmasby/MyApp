/**
 * @format
 */

import 'react-native';
import React from 'react';
import { ProfileForm } from '../src/profile/ProfileForm';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Profile, Units } from '../src/profile/ProfileTypes';

it('renders correctly', () => {

  const initialState: Profile = {
    weight: 0,
    height: 0,
    units: Units.Imperial
  };
  const tree = renderer.create(
    <ProfileForm
      dispatch={() => { }}
      onSave={() => { }}
      profile={initialState} />).toJSON();
  expect(tree).toMatchSnapshot();
});
