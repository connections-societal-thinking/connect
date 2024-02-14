import './App.css';
import Select from 'react-select'
import React from 'react'

class App extends React.Component {
  // Add constructor
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      userToConnect: {},
      currentUser: {},
      connected: false,
      connectedMessage: '',
      connectErrorMessage: '',
      errorMessage: ''
    };
    this.onClick = this.onClick.bind(this);
  }
  // Define methods
  componentDidMount() {
    const userToConnectId = (new URLSearchParams(document.location.search)).get('user');
    fetch('https://connections-societal-thinking-f49fc4a0c28b.herokuapp.com/users')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const mappedData = data.map((value) => {
          return { value: value._id, label: value.name + (value.organization ? (' - ' + value.organization) : '') }
        });
        const userToConnect = data.find((value) => { return value._id === userToConnectId });
        if(!userToConnect) {
          this.setState({
            loading: false,
            errorMessage: `Couldn't find the person you're trying to connect with. Please try scanning a different QR code.`
          });
        }
        else{
        this.setState({
          users: mappedData,
          loading: false,
          userToConnect: data.find((value) => { return value._id === userToConnectId })
        });
      }
      });

  }

  onClick() {
    console.log(this.state);
    fetch(`https://connections-societal-thinking-f49fc4a0c28b.herokuapp.com/connect?user1=${this.state.userToConnect._id}&user2=${this.state.currentUser.value}`, { method: 'POST' })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            connected: true,
            connectedMessage: `You've successfully connected with ${this.state.userToConnect.name}! Check the map to see your connection. `
          })
        }
        else if (res.status === 409) {
          this.setState({
            connected: true,
            connectedMessage: `You've already connected with ${this.state.userToConnect.name}! Check the map to see your connection. `
          });
        }
        else {
          this.setState({
            connectErrorMessage: `There was an issue connecting you two. Please try again! `
          });
        }
        return res.json();
      });
  }



  // Use render method
  render() {
    return (
      <div className="App">
        {this.state.loading ?
          <></>
          : !this.state.connected ?
            <>
            <p className='prompt'>Hello! In order to connect with {this.state.userToConnect.name}, please choose your name from the list below</p>
            <Select className="dropdown" placeholder='' options={this.state.users} onChange={(option) => { this.setState({ currentUser: option, errorMessage: '' }) }} />
            <button className="button-1" onClick={this.onClick}> Connect </button>
            <p>{this.state.connectErrorMessage}</p>
          </>
          : <p className='prompt'>{this.state.connectedMessage}</p>
          
          }

      </div>
    );
  }
}

export default App;