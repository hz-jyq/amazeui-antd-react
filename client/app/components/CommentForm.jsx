import React, {Component} from 'react';

export default  class CommentForm extends Component {
    render() {
        return <div className="comment-form" >
            <div className="ow-left">
                <img src="./app/images/Babel.png" alt="头像" className="little-head" />
            </div>
            <div className="ow-right" >
                <textarea name="name" rows="8" cols="40" className="comment-box"></textarea>
                <input className="comment-btn" type="submit" value="评论"/>
            </div>
        </div>;
    }
}