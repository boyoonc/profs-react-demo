import React from 'react';

const User = ({ user, onDeselect, foo })=> (
  <div>
    <h2 onClick={ onDeselect }>{ user.name } { foo }</h2>
    <ul>
    {
      user.things.map( thing => <li key={ thing.id }>{ thing.name }</li>)
    }
    </ul>
  </div>
);

export default User;
