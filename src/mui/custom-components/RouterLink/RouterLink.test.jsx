/*  eslint-disable no-undef */
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { RouterLink } from './RouterLink'
import { Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

describe('RouterLink', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Switch>
          <RouterLink arrowLeft to="/" label="Link text" />
        </Switch>
      </BrowserRouter>
    )
  })
  it('renders', () => {
    // eslint-disable-next-line no-console
    // console.log(wrapper.debug())
    expect(wrapper).not.toBeNull()
  })
  it('renders text in a', () => {
    expect(wrapper).not.toBeNull()
    expect(wrapper.find('a').text()).toEqual('Link text')
  })
})
