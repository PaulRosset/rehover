import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ReHover extends Component {
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
    setTimeout(() => {
      this.setState(
        prevState => ({
          isOnTarget: false,
          isOpen: !prevState.isOnSource ? false : true
        }),
        () => (this.props.states ? this.props.states(this.state) : null)
      );
    }, this.props.delay);
  };

  onKeyBoardSource = e => {
    switch (e.keyCode) {
      case 40:
        this.setState(
          {
            isOpen: true,
            isOnTarget: true
          },
          () => (this.props.states ? this.props.states(this.state) : null)
        );
        break;
      case 38:
        this.setState(
          {
            isOpen: false,
            isOnTarget: false
          },
          () => (this.props.states ? this.props.states(this.state) : null)
        );
        break;
      default:
        break;
    }
  };

  render() {
    const ChildrenWithMouseEvent = React.Children.map(
      this.props.children,
      child => {
        return child.props.source
          ? React.cloneElement(child, {
              onMouseEnter: this.onMouseEnterSource,
              onMouseLeave: this.onMouseLeaveSource,
              onKeyDown: this.onKeyBoardSource,
              role: "source",
              tabIndex: 0,
              "aria-hidden": false
            })
          : child.props.destination
            ? React.cloneElement(child, {
                onMouseEnter: this.onMouseEnterTarget,
                onMouseLeave: this.onMouseLeaveTarget,
                role: "destination",
                "aria-hidden": !this.state.isOpen
              })
            : null;
      }
    );
    return this.state.isOnSource || this.state.isOnTarget
      ? ChildrenWithMouseEvent.slice(0, 2)
      : ChildrenWithMouseEvent.splice(
          ChildrenWithMouseEvent.findIndex(elem => elem.props.source),
          1
        );
  }
}

ReHover.propTypes = {
  delay: PropTypes.number,
  states: PropTypes.func
};
