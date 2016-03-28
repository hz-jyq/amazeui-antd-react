import React, {Component} from 'react';
import CommentForm from './CommentForm';
import Image from  './Image';
export default  class ListWb extends Component {
    static pieces = [
        {name: "Webpack", link: "http://webpack.github.io/", logo: "./app/images/Webpack.gif"},
        {name: "React", link: "http://facebook.github.io/react/", logo: "./app/images/Babel.png"},
    ];
    render() {
        return (
       /*<div>
                {ListWb.pieces.map(function(v,i){
                    return <span>{v.name}</span>
                })}
            </div>
          <div>
             <h1>
                 {ListWb.pieces.map((v, i) => <div key={i}>{v.name}</div>)}
             </h1>
            </div>*/
            <div>
                <Image image={ListWb.pieces}/>
                <CommentForm/>
            </div>
        )
    }
}
