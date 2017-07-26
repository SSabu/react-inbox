import React from 'react'
import { shallow, render } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Messages, mapStateToProps, mapDispatchToProps } from './Messages'
import { getMessages } from '../../actions'

describe('Messages', () => {
  it('should render without any props defined', () => {
    const component = shallow(
      <Messages messages={[]} />
    );
    expect(toJson(component)).toMatchSnapshot();
  })

  it('should render with props passed in', () => {
    const component = shallow(
      <Messages messages={[{
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      }]} />
    );
    expect(toJson(component)).toMatchSnapshot();
  })

  


})
