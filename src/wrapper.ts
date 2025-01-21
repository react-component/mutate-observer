import React from 'react';

class DomWrapper extends React.Component<React.PropsWithChildren> {
  render() {
    return this.props.children;
  }
}

export default DomWrapper;
