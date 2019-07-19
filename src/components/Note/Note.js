import React from 'react';

var marked = require('marked')

const note = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p dangerouslySetInnerHTML={{__html: marked(props.content)}}></p>
    </div>
  );
}

export default note;