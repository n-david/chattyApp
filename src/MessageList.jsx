import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList/>');
    return (
      <main className='messages'>
        {this.props.messages.map((message, i) => {
          {switch (message.type) {
            case 'incomingMessage':
              return <Message key={message.id} username={message.username} content={message.content} color={message.color} />
            case 'incomingNotification':
              return <Notification key={i} notification={message.content} />
          }}
        })}
      </main>
    );
  }
}
export default MessageList;
