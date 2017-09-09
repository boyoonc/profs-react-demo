import React from 'react';

const UserList = ({ users, onSelect })=> {
  return (
    <ul>
      {
        users.map( user => <li onClick={ ()=> { onSelect( user ) }} key={ user.id }>{ user.name }</li>)
      }
    </ul>
  );
};

export default UserList;
