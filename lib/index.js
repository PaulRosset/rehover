var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

var ReHover = function (_Component) {
  _inherits(ReHover, _Component);

  function ReHover(props) {
    _classCallCheck(this, ReHover);

    var _this = _possibleConstructorReturn(this, (ReHover.__proto__ || Object.getPrototypeOf(ReHover)).call(this, props));

    _this.onMouseEnterSource = function () {
      _this.setState({
        isOpen: true,
        isOnSource: true
      }, function () {
        return _this.props.states ? _this.props.states(_this.state) : null;
      });
    };

    _this.onMouseLeaveSource = function () {
      setTimeout(function () {
        _this.setState(function (prevState) {
          return {
            isOnSource: false,
            isOpen: !prevState.isOnTarget ? false : true
          };
        }, function () {
          return _this.props.states ? _this.props.states(_this.state) : null;
        });
      }, _this.props.delay);
    };

    _this.onMouseEnterTarget = function () {
      _this.setState({
        isOnSource: false,
        isOnTarget: true,
        isOpen: true
      }, function () {
        return _this.props.states ? _this.props.states(_this.state) : null;
      });
    };

    _this.onMouseLeaveTarget = function () {
      _this.setState(function (prevState) {
        return {
          isOnTarget: false,
          isOpen: !prevState.isOnSource ? false : true
        };
      }, function () {
        return _this.props.states ? _this.props.states(_this.state) : null;
      });
    };

    _this.state = {
      isOnTarget: false,
      isOnSource: false,
      isOpen: false
    };
    _this.props.states ? _this.props.states(_this.state) : null;
    return _this;
  }

  _createClass(ReHover, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var ChildrenWithMouseEvent = React.Children.map(this.props.children, function (child) {
        return child.props.source ? React.cloneElement(child, {
          onMouseEnter: _this2.onMouseEnterSource,
          onMouseLeave: _this2.onMouseLeaveSource,
          isOnSource: _this2.state.isOnSource
        }) : child.props.destination ? React.cloneElement(child, {
          onMouseEnter: _this2.onMouseEnterTarget,
          onMouseLeave: _this2.onMouseLeaveTarget
        }) : null;
      });
      return this.state.isOnSource || this.state.isOnTarget ? ChildrenWithMouseEvent.slice(0, 2) : ChildrenWithMouseEvent.slice(0, 1);
    }
  }]);

  return ReHover;
}(Component);

ReHover.propTypes = {
  delay: PropTypes.number,
  states: PropTypes.func
};

export default ReHover;