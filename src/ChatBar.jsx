import React, {Component} from 'react';

class ChatBar extends Component {
  pressedEnter(e) {
    if (e.key === 'Enter') {
      this.props.messageSent(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    console.log('Rendering <ChatBar/>');
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={this.props.currentUser.name} />
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={this.pressedEnter.bind(this)} />
      </footer>
    );
  }
}
export default ChatBar;
