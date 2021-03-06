'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _Photo = require('./Photo');

var _Photo2 = _interopRequireDefault(_Photo);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Gallery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      containerWidth: 0
    }, _this.handleClick = function (event, _ref2, extra) {
      var index = _ref2.index;
      var _this$props = _this.props,
          photos = _this$props.photos,
          onClick = _this$props.onClick;

      onClick(event, _extends({
        index: index,
        photo: photos[index],
        previous: photos[index - 1] || null,
        next: photos[index + 1] || null
      }, extra));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Gallery, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.observer = new _resizeObserverPolyfill2.default(function (entries) {
        // only do something if width changes
        var newWidth = entries[0].contentRect.width;
        if (_this2.state.containerWidth !== newWidth) {
          _this2.setState({ containerWidth: Math.floor(newWidth) });
        }
      });
      this.observer.observe(this._gallery);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.observer.disconnect();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var containerWidth = this.state.containerWidth;
      // no containerWidth until after first render with refs, skip calculations and render nothing
      if (!containerWidth) return _react2.default.createElement('div', { ref: function ref(c) {
          return _this3._gallery = c;
        } });
      var _props$ImageComponent = this.props.ImageComponent,
          ImageComponent = _props$ImageComponent === undefined ? _Photo2.default : _props$ImageComponent;
      // subtract 1 pixel because the browser may round up a pixel

      var _props = this.props,
          margin = _props.margin,
          onClick = _props.onClick,
          direction = _props.direction;
      var columns = this.props.columns;

      // set default breakpoints if user doesn't specify columns prop

      if (columns === undefined) {
        columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
      }
      var photos = this.props.photos;
      var width = containerWidth - 1;
      var galleryStyle = void 0,
          thumbs = void 0;

      if (direction === 'row') {
        galleryStyle = { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' };
        thumbs = (0, _utils.computeSizes)({ width: width, columns: columns, margin: margin, photos: photos });
      }
      if (direction === 'column') {
        galleryStyle = { position: 'relative' };
        thumbs = (0, _utils.computeSizesColumns)({ width: width, columns: columns, margin: margin, photos: photos });
        galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;
      }
      return _react2.default.createElement(
        'div',
        { className: 'react-photo-gallery--gallery' },
        _react2.default.createElement(
          'div',
          { ref: function ref(c) {
              return _this3._gallery = c;
            }, style: galleryStyle },
          thumbs.map(function (photo, index) {
            var left = photo.left,
                top = photo.top,
                containerHeight = photo.containerHeight,
                rest = _objectWithoutProperties(photo, ['left', 'top', 'containerHeight']);

            return _react2.default.createElement(ImageComponent, {
              key: photo.key || photo.src,
              margin: margin,
              index: index,
              photo: rest,
              direction: direction,
              left: left,
              top: top,
              onClick: onClick ? _this3.handleClick : null
            });
          })
        )
      );
    }
  }]);

  return Gallery;
}(_react2.default.Component);

Gallery.propTypes = {
  photos: _propTypes2.default.arrayOf(_Photo.photoPropType).isRequired,
  direction: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  columns: _propTypes2.default.number,
  margin: _propTypes2.default.number,
  ImageComponent: _propTypes2.default.func
};

Gallery.defaultProps = {
  margin: 2,
  direction: 'row'
};

exports.default = Gallery;