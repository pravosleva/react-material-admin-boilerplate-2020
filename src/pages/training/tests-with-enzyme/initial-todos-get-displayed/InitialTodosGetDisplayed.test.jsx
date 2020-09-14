/*  eslint-disable no-undef */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import InitialTodosGetDisplayed from './InitialTodosGetDisplayed'

Enzyme.configure({ adapter: new Adapter() })

describe('InitialTodosGetDisplayedst', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <div>
        <p>text</p>
      </div>
    )
  })
  it('renders', () => {
    // eslint-disable-next-line no-console
    // console.log(wrapper.debug())
    expect(wrapper).not.toBeNull()
  })
  it('renders text in p', () => {
    expect(wrapper).not.toBeNull()
    expect(wrapper.find('p').text()).toEqual('text')
  })
})
