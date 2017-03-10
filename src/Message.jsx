import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log('Rendering <Message/>');
    const imgURL = /https?.*.(jpg|png|gif)/gi.exec(this.props.content);
    return (
      <div className='message'>
        <span className='message-username' style={{color: this.props.color}}>{this.props.username}</span>
        <span className='message-content'>
        {this.props.content.replace(/https?.*.(jpg|png|gif)/gi, '')}
        <div>{imgURL ? <img className='image' src={imgURL[0]} /> : null}</div>
        </span>
      </div>
    );
  }
}
export default Message;
