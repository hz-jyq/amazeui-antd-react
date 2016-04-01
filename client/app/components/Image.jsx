import React, {Component} from 'react';
export default  class Image extends Component {
    render() {
        return (
          <ui>
                    {this.props.image.map((v, i) => <li key={i}><img src={v.logo} alt="微博配图" ></img></li>)}
          </ui>
        )
    }
}
