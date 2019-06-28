import React, { Component } from 'react'
import { render } from 'react-dom'
class User extends Component {

  render() {
    return (
      <div>
        <div>hello user</div>
      </div>
    )
  }
}

render(<User></User>, document.getElementById('app'));