"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        return _this.props.states(_this.state);
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
          return _this.props.states(_this.state);
        });
      }, _this.props.delay);
    };

    _this.onMouseEnterTarget = function () {
      _this.setState({
        isOnSource: false,
        isOnTarget: true,
        isOpen: true
      }, function () {
        return _this.props.states(_this.state);
      });
    };

    _this.onMouseLeaveTarget = function () {
      setTimeout(function () {
        _this.setState(function (prevState) {
          return {
            isOnTarget: false,
            isOpen: !prevState.isOnSource ? false : true
          };
        }, function () {
          return _this.props.states(_this.state);
        });
      }, _this.props.delay);
    };

    _this.onKeyBoardSource = function (e) {
      switch (e.keyCode) {
        case 40:
          _this.setState({
            isOpen: true,
            isOnTarget: true
          }, function () {
            return _this.props.states(_this.state);
          });
          break;
        case 38:
          _this.setState({
            isOpen: false,
            isOnTarget: false
          }, function () {
            return _this.props.states(_this.state);
          });
          break;
        default:
          break;
      }
    };

    _this.state = {
      isOnTarget: false,
      isOnSource: false,
      isOpen: false
    };
    _this.props.states(_this.state);
    return _this;
  }

  _createClass(ReHover, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var ChildrenWithMouseEvent = _react2.default.Children.map(this.props.children, function (child) {
        return child.props.source ? _react2.default.cloneElement(child, {
          onMouseEnter: _this2.onMouseEnterSource,
          onMouseLeave: _this2.onMouseLeaveSource,
          onKeyDown: _this2.onKeyBoardSource,
          role: "source",
          tabIndex: 0,
          "aria-hidden": false
        }) : child.props.destination ? _react2.default.cloneElement(child, {
          onMouseEnter: _this2.onMouseEnterTarget,
          onMouseLeave: _this2.onMouseLeaveTarget,
          role: "destination",
          "aria-hidden": !_this2.state.isOpen
        }) : null;
      });
      return this.state.isOnSource || this.state.isOnTarget ? ChildrenWithMouseEvent.slice(0, 2) : ChildrenWithMouseEvent.splice(ChildrenWithMouseEvent.findIndex(function (elem) {
        return elem.props.source;
      }), 1);
    }
  }]);

  return ReHover;
}(_react.Component);

exports.default = ReHover;


ReHover.defaultProps = {
  delay: 0,
  states: function states() {}
};

ReHover.propTypes = {
  delay: _propTypes2.default.number,
  states: _propTypes2.default.func
};