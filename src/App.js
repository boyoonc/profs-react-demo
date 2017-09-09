import React, { Component } from 'react';
import Title from './Title';
import UserList from './UserList';
import axios from 'axios';
import User from './User';

class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      user: {

      }
    };
    this.onSelect = this.onSelect.bind(this);
    this.onDeselect = this.onDeselect.bind(this);

  }
  onDeselect(){
    this.setState({ user: {}});
  }
  onSelect(user){
    axios.get(`/api/users/${user.id}`)
      .then( result => this.setState({ user: result.data }));
  }
  componentDidMount(){
    axios.get('/api/users')
      .then(result => this.setState({ users: result.data }))
  }
  render(){
    const { users, user } = this.state;
    const { onSelect, onDeselect } = this;
    return (
      <div>
        <Title title='My App'/>
        {
          user.id ? (
            <User buzz='9' user={ user } foo={ 8*8 } onDeselect={ onDeselect }/>
          ) : (
            <UserList users={ users } onSelect={ onSelect }/>
          )
        }
      </div>
    );
  }
}
/*
const App = ()=> (
  <div>
    <Title title='This is my app'/>
  </div>
);
*/

export default App;
