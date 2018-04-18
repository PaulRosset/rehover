"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RehoverConsumer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React$createContext = _react2.default.createContext({
  states: {
    isOnSource: false,
    isOnTarget: false,
    isOpen: false
  },
  actions: {
    onMouseEnterSource: function onMouseEnterSource() {},
    onMouseLeaveSource: function onMouseLeaveSource() {},
    onMouseEnterTarget: function onMouseEnterTarget() {},
    onMouseLeaveTarget: function onMouseLeaveTarget() {},
    onKeyBoardSource: function onKeyBoardSource() {}
  }
}),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var RehoverConsumer = exports.RehoverConsumer = Consumer;

var RehoverProvider = function (_Component) {
  _inherits(RehoverProvider, _Component);

  function RehoverProvider(props) {
    _classCallCheck(this, RehoverProvider);

    var _this = _possibleConstructorReturn(this, (RehoverProvider.__proto__ || Object.getPrototypeOf(RehoverProvider)).call(this, props));

    _this.onMouseEnterSource = function () {
      _this.setState(function (prevState) {
        return {
          isOpen: true,
          isOnSource: true
        };
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
      _this.setState(function (prevState) {
        return {
          isOnSource: false,
          isOnTarget: true,
          isOpen: true
        };
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

  _createClass(RehoverProvider, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        Provider,
        {
          value: {
            states: Object.assign({}, this.state),
            actions: {
              onMouseEnterSource: this.onMouseEnterSource,
              onMouseLeaveSource: this.onMouseLeaveSource,
              onMouseEnterTarget: this.onMouseEnterTarget,
              onMouseLeaveTarget: this.onMouseLeaveTarget,
              onKeyBoardSource: this.onKeyBoardSource
            }
          }
        },
        this.props.children
      );
    }
  }]);

  return RehoverProvider;
}(_react.Component);

exports.default = RehoverProvider;


RehoverProvider.defaultProps = {
  delay: 0,
  states: function states() {}
};

RehoverProvider.propTypes = {
  delay: _propTypes2.default.number,
  states: _propTypes2.default.func
};