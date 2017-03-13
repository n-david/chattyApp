import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log('Rendering <ChatBar/>');
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={this.props.currentUser.name} onKeyPress={this.props.changeUser.bind(this)} />
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={this.props.addMessage.bind(this)} />
      </footer>
    );
  }
}
export default ChatBar;
