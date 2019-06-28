import React, { Component } from 'react'
import { render } from 'react-dom'
import Item from '../../components/Item';
import Hammer from 'react-hammerjs'
import './index.less'
class Index extends Component {

  render() {
    return (
      <div>
        <Hammer onTap={() => { alert(1111) }}>
          <div>tap me</div>
        </Hammer>
        <Item></Item>
      </div>
    )
  }
}

render(<Index></Index>, document.getElementById('app'));