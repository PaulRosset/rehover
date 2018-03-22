import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class ReHover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnTarget: false,
      isOnSource: false,
      isOpen: false
    };
    this.props.states ? this.props.states(this.state) : null;
  }

  onMouseEnterSource = () => {
    this.setState(
      {
        isOpen: true,
        isOnSource: true
      },
      () => (this.props.states ? this.props.states(this.state) : null)
    );
  };

  onMouseLeaveSource = () => {
    setTimeout(() => {
      this.setState(
        prevState => ({
          isOnSource: false,
          isOpen: !prevState.isOnTarget ? false : true
        }),
        () => (this.props.states ? this.props.states(this.state) : null)
      );
    }, this.props.delay);
  };

  onMouseEnterTarget = () => {
    this.setState(
      {
        isOnSource: false,
        isOnTarget: true,
        isOpen: true
      },
      () => (this.props.states ? this.props.states(this.state) : null)
    );
  };

  onMouseLeaveTarget = () => {
    this.setState(
      prevState => ({
        isOnTarget: false,
        isOpen: !prevState.isOnSource ? false : true
      }),
      () => (this.props.states ? this.props.states(this.state) : null)
    );
  };

  render() {
    const ChildrenWithMouseEvent = React.Children.map(
      this.props.children,
      child => {
        return child.props.source
          ? React.cloneElement(child, {
              onMouseEnter: this.onMouseEnterSource,
              onMouseLeave: this.onMouseLeaveSource,
              isOnSource: this.state.isOnSource
            })
          : child.props.destination
            ? React.cloneElement(child, {
                onMouseEnter: this.onMouseEnterTarget,
                onMouseLeave: this.onMouseLeaveTarget
              })
            : null;
      }
    );
    return this.state.isOnSource || this.state.isOnTarget
      ? ChildrenWithMouseEvent.slice(0, 2)
      : ChildrenWithMouseEvent.slice(0, 1);
  }
}

ReHover.propTypes = {
  delay: PropTypes.number,
  states: PropTypes.func
};

export default ReHover;
