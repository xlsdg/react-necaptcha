'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = _interopDefault(require('react'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

var NECaptcha =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(NECaptcha, _React$Component);

    function NECaptcha(props) {
      var _this;

      _classCallCheck(this, NECaptcha);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NECaptcha).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'init', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this)); // console.log('_init');

        var id = 'react-necaptcha';

        if (window.initNECaptcha) {
          that.ready();
          return;
        }

        if (document.getElementById(id)) {
          return;
        }

        var ds = document.createElement('script');
        ds.id = id;
        ds.type = 'text/javascript'; // ds.async = true;

        ds.charset = 'utf-8';

        if (ds.readyState) {
          ds.onreadystatechange = function() {
            if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
              ds.onreadystatechange = null;
              that.ready();
            }
          };
        } else {
          ds.onload = function() {
            ds.onload = null;
            that.ready();
          };
        }

        var protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
        ds.src = ''.concat(protocol, '//cstaticdun.126.net/load.min.js?_t=').concat(new Date().getTime());
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ds, s);
        that.setState({
          script: ds,
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'ready', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this)); // console.log('_ready');

        var _that$props = that.props,
          captchaId = _that$props.captchaId,
          width = _that$props.width,
          lang = _that$props.lang,
          onReady = _that$props.onReady,
          onVerify = _that$props.onVerify,
          onClose = _that$props.onClose,
          onLoad = _that$props.onLoad,
          onError = _that$props.onError;
        var ins = that.state.ins;

        if (!window.initNECaptcha) {
          return;
        }

        if (ins) {
          return;
        }

        if (!that.dom) {
          return;
        }

        var config = {
          captchaId: captchaId,
          element: that.dom,
          width: width,
          lang: lang,
          onReady: onReady,
          onVerify: onVerify,
          onClose: onClose,
        };

        if (that.props.mode) {
          config.mode = that.props.mode;
        }

        if (that.props.protocol) {
          config.protocol = that.props.protocol;
        }

        if (that.props.appendTo) {
          config.appendTo = that.props.appendTo;
        }

        window.initNECaptcha(
          config,
          function(instance) {
            that.setState({
              ins: instance,
            });
            onLoad && onLoad(instance);
          },
          onError
        );
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'destroy', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this)); // that.state.script.parentNode.removeChild(that.state.script);

        that.setState({
          ins: null,
          script: null,
        });
      });

      _this.dom = null;
      _this.state = {
        ins: null,
        script: null,
      };
      return _this;
    } // componentWillMount() {
    //   const that = this;
    //   console.log('componentWillMount', that.props, that.state);
    // }

    _createClass(NECaptcha, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var that = this; // console.log('componentDidMount', that.props, that.state);

          that.init();
        }, // componentWillReceiveProps(nextProps) {
        //   const that = this;
        //   console.log('componentWillReceiveProps', that.props, nextProps);
        // }
        // shouldComponentUpdate(nextProps, nextState) {
        //   const that = this;
        //   // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
        //   return nextProps.captchaId !== that.props.captchaId;
        // }
        // componentWillUpdate(nextProps, nextState) {
        //   const that = this;
        //   console.log('componentWillUpdate', that.props, nextProps, that.state, nextState);
        // }
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
          var that = this; // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);

          that.init();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var that = this; // console.log('componentWillUnmount', that.props, that.state);

          that.destroy();
        },
      },
      {
        key: 'render',
        value: function render() {
          var that = this; // console.log('render');

          var className = that.props.className;
          return React.createElement('div', {
            className: className,
            ref: function ref(e) {
              that.dom = e;
            },
          });
        },
      },
    ]);

    return NECaptcha;
  })(React.Component);

_defineProperty(NECaptcha, 'defaultProps', {
  className: 'i-necaptcha',
  // captchaId: '',
  // element: '',
  // mode: '',
  // protocol: '',
  width: 'auto',
  lang: 'zh-CN',
  // appendTo: '',
  onReady: function onReady(instance) {},
  onVerify: function onVerify() {},
  onClose: function onClose() {},
  onLoad: function onLoad(instance) {},
  onError: function onError(err) {},
});

module.exports = NECaptcha;
