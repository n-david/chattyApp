import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous', color: ''},
      messages: [],
      userCount: 0
    };
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = () => {
      console.log('Connected to server');
    }
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messages = this.state.messages.concat(data);
      switch (data.type) {
        case 'incomingMessage':
          this.setState({messages});
          break;
        case 'incomingNotification':
          this.setState({messages});
          break;
        case 'incomingUserChange':
          this.setState({userCount: data.count});
          break;
        case 'setColor':
          const currentUser = {name: this.state.currentUser.name, color: data.color};
          this.setState({currentUser});
          break;
        default:
          throw new Error('Unkown event type ' + data.type)
      }
    }
  }

  addMessage(content) {
    if (content.key === 'Enter') {
      const messageData = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: content.target.value,
        color: this.state.currentUser.color
      }
      this.socket.send(JSON.stringify(messageData));
      content.target.value = '';
    }
  }

  changeUser(content) {
    if (content.key === 'Enter') {
      const userData = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} changed their name to ${content.target.value}.`
      }
      const currentUser = {name: content.target.value, color: this.state.currentUser.color};
      this.setState({currentUser});
      this.socket.send(JSON.stringify(userData));
    }
  }

  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <span className='navbar-users'>{this.state.userCount} {this.state.userCount > 1 ? 'users' : 'user'} online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage.bind(this)} changeUser={this.changeUser.bind(this)} />
      </div>
    );
  }
}
export default App;
