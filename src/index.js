import React, { Component } from "react";
import PropTypes from "prop-types";

class Hover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnTarget: false,
      isOnSource: false,
      isOpen: false
    };
  }

  onMouseEnterSource = () => {
    this.setState({
      isOpen: true,
      isOnSource: true
    });
  };

  onMouseLeaveSource = () => {
    setTimeout(() => {
      this.setState({
        isOnSource: false
      });
    }, this.props.delay);
  };

  onMouseEnterTarget = () => {
    this.setState({
      isOnTarget: true
    });
  };

  onMouseLeaveTarget = () => {
    this.setState({
      isOnTarget: false,
      isOpen: false
    });
  };

  render() {
    const ChildrenWithMouseEvent = React.Children.map(
      this.props.children,
      child => {
        return child.props.source
          ? React.cloneElement(child, {
              onMouseEnter: this.onMouseEnterSource,
              onMouseLeave: this.onMouseLeaveSource
            })
          : child.props.destination
            ? React.cloneElement(child, {
                onMouseEnter: this.onMouseEnterTarget,
                onMouseLeave: this.onMouseLeaveTarget
              })
            : null;
      }
    );
    return (
      <div>
        {this.state.isOnSource || this.state.isOnTarget
          ? ChildrenWithMouseEvent.slice(0, 2)
          : ChildrenWithMouseEvent.slice(0, 1)}
      </div>
    );
  }
}

Hover.propTypes = {
  delay: PropTypes.number
};

export default Hover;
