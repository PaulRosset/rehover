import React, { Component } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = React.createContext({
  states: {
    isOnSource: false,
    isOnTarget: false,
    isOpen: false
  },
  actions: {
    onMouseEnterSource: () => {},
    onMouseLeaveSource: () => {},
    onMouseEnterTarget: () => {},
    onMouseLeaveTarget: () => {},
    onKeyBoardSource: () => {}
  }
});

export const RehoverConsumer = Consumer;

export default class RehoverProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnTarget: false,
      isOnSource: false,
      isOpen: false
    };
    this.props.states(this.state);
  }

  onMouseEnterSource = () => {
    this.setState(
      prevState => ({
        isOpen: true,
        isOnSource: true
      }),
      () => this.props.states(this.state)
    );
  };

  onMouseLeaveSource = () => {
    setTimeout(() => {
      this.setState(
        prevState => ({
          isOnSource: false,
          isOpen: !prevState.isOnTarget ? false : true
        }),
        () => this.props.states(this.state)
      );
    }, this.props.delay);
  };

  onMouseEnterTarget = () => {
    this.setState(
      prevState => ({
        isOnSource: false,
        isOnTarget: true,
        isOpen: true
      }),
      () => this.props.states(this.state)
    );
  };

  onMouseLeaveTarget = () => {
    setTimeout(() => {
      this.setState(
        prevState => ({
          isOnTarget: false,
          isOpen: !prevState.isOnSource ? false : true
        }),
        () => this.props.states(this.state)
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
          () => this.props.states(this.state)
        );
        break;
      case 38:
        this.setState(
          {
            isOpen: false,
            isOnTarget: false
          },
          () => this.props.states(this.state)
        );
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Provider
        value={{
          states: {
            ...this.state
          },
          actions: {
            onMouseEnterSource: this.onMouseEnterSource,
            onMouseLeaveSource: this.onMouseLeaveSource,
            onMouseEnterTarget: this.onMouseEnterTarget,
            onMouseLeaveTarget: this.onMouseLeaveTarget,
            onKeyBoardSource: this.onKeyBoardSource
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

RehoverProvider.defaultProps = {
  delay: 0,
  states: () => {}
};

RehoverProvider.propTypes = {
  delay: PropTypes.number,
  states: PropTypes.func
};
