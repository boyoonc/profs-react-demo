import React from 'react';

/*
const Title = ({ title = 'My Title'})=> (
  <h1>
    { title }
  </h1>
);
*/

const Title = ({ title = 'My Title'})=> {
  return(
    <h1>
      { title }
    </h1>
  );
};

export default Title;
