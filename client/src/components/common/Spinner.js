import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block',"background":"rgba(0,0,0,0)" }}
        alt="Loading..."
      />
    </div>
  );
};
