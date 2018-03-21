var _jsxFileName = "src/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

var Hover = function (_Component) {
  _inherits(Hover, _Component);

  function Hover(props) {
    _classCallCheck(this, Hover);

    var _this = _possibleConstructorReturn(this, (Hover.__proto__ || Object.getPrototypeOf(Hover)).call(this, props));

    _this.onMouseEnterSource = function () {
      _this.setState({
        isOpen: true,
        isOnSource: true
      });
    };

    _this.onMouseLeaveSource = function () {
      setTimeout(function () {
        _this.setState({
          isOnSource: false
        });
      }, _this.props.delay);
    };

    _this.onMouseEnterTarget = function () {
      _this.setState({
        isOnTarget: true
      });
    };

    _this.onMouseLeaveTarget = function () {
      _this.setState({
        isOnTarget: false,
        isOpen: false
      });
    };

    _this.state = {
      isOnTarget: false,
      isOnSource: false,
      isOpen: false
    };
    return _this;
  }

  _createClass(Hover, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var ChildrenWithMouseEvent = React.Children.map(this.props.children, function (child) {
        return child.props.source ? React.cloneElement(child, {
          onMouseEnter: _this2.onMouseEnterSource,
          onMouseLeave: _this2.onMouseLeaveSource
        }) : child.props.destination ? React.cloneElement(child, {
          onMouseEnter: _this2.onMouseEnterTarget,
          onMouseLeave: _this2.onMouseLeaveTarget
        }) : null;
      });
      return React.createElement(
        "div",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          },
          __self: this
        },
        this.state.isOnSource || this.state.isOnTarget ? ChildrenWithMouseEvent.slice(0, 2) : ChildrenWithMouseEvent.slice(0, 1)
      );
    }
  }]);

  return Hover;
}(Component);

Hover.propTypes = {
  delay: PropTypes.number
};

export default Hover;