import React from 'react'
import { shallow, render } from 'enzyme'
import { Message, mapStateToProps } from './Message'
import { toggleStarred, toggleSelected } from '../../actions'
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'

describe('Message', () => {
  const props = {
  message: {
    read: true,
    id: 1,
    labels: [],
    selected: true,
    starred: false,
    key: 1,
    subject: ''
    }
  }

  const props2 = {
    message: {
      read: false,
      id: 1,
      labels: [],
      selected: false,
      starred: false,
      key: 1,
      subject: ''
      }
  }

  it('should render without any props defined', () => {
    const component = shallow(
      <Message
        { ...props }
       />
    );
    expect( component.find('div').length ).toEqual(8)
  })

  it('should have class selected when message is selected', () => {
    const component = shallow(
      <Message
        { ...props }
      />
    );

    expect( component.find('.message').hasClass('selected')).toEqual(true);
  })

  it ('should have class read when message is read', () => {
    const component = shallow(
      <Message
        {...props}
      />
    );
    expect(component.find('.message').hasClass('read')).toEqual(true)
  })

  it('should have class unread when message is unread', () => {
    const component = shallow(
      <Message
        {...props2}
      />
    );
    expect(component.find('.message').hasClass('read')).toEqual(false)
  })

  it('should have class unstarred when message is unstarred', () => {
    const component = shallow(
      <Message
        {...props2}
      />
    );
    expect(component.find('.message').hasClass('starred')).toEqual(false)
  })








})
