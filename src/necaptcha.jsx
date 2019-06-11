import React from 'react';

const SCRIPT_ID = 'react-necaptcha';

const typeOf = type => object => Object.prototype.toString.call(object) === `[object ${type}]`;

// const isString = typeOf('String');
// const isObject = typeOf('Object');
const isFunction = typeOf('Function');

export default class NECaptcha extends React.PureComponent {
  static defaultProps = {
    className: 'i-necaptcha',
    // captchaId: '',
    // element: '',
    // mode: '',
    // protocol: '',
    width: 'auto',
    lang: 'zh-CN',
    // appendTo: '',
    onReady: instance => {},
    onVerify: () => {},
    onClose: () => {},
    onLoad: instance => {},
    onError: () => {},
  };

  constructor() {
    super(...arguments);

    const that = this;

    that.dom = React.createRef();
    that.instance = null;
    that.script = null;

    // that.state = {};
  }

  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that.create();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const that = this;
  //   // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
  //   const { className, captchaId, mode, protocol, width, lang, appendTo } = that.props;

  //   const isUpdate =
  //     className !== nextProps.className ||
  //     captchaId !== nextProps.captchaId ||
  //     mode !== nextProps.mode ||
  //     protocol !== nextProps.protocol ||
  //     width !== nextProps.width ||
  //     lang !== nextProps.lang ||
  //     appendTo !== nextProps.appendTo;

  //   return isUpdate;
  // }

  componentDidUpdate(prevProps, prevState) {
    const that = this;
    // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
    that.create();
  }

  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    that.destroy();
  }

  create = () => {
    const that = this;
    // console.log('create');
    // const {  } = that.state;

    if (window.initNECaptcha) {
      that.ready();
      return;
    }

    const script = document.getElementById(SCRIPT_ID);
    if (script) {
      if (that.script) {
        return;
      }

      script.addEventListener('Im-ready', that.ready, false);
      that.script = script;
      return;
    }

    const ds = document.createElement('script');
    ds.id = SCRIPT_ID;
    ds.type = 'text/javascript';
    ds.async = true;
    ds.charset = 'utf-8';

    if (ds.readyState) {
      ds.onreadystatechange = () => {
        if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
          ds.onreadystatechange = null;
          that.ready();
          that.triggerEvent('Im-ready');
        }
      };
    } else {
      ds.onload = () => {
        ds.onload = null;
        that.ready();
        that.triggerEvent('Im-ready');
      };
    }

    const protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
    ds.src = `${protocol}//cstaticdun.126.net/load.min.js?_t=${new Date().getTime()}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ds, s);
    that.script = ds;
  };

  ready = event => {
    const that = this;
    // console.log('ready');
    const { captchaId, width, lang, onReady, onVerify, onClose, onLoad, onError } = that.props;
    // const {  } = that.state;

    if (!window.initNECaptcha) {
      return;
    }

    if (that.instance) {
      return;
    }

    if (!that.dom || !that.dom.current) {
      return;
    }

    const config = {
      captchaId,
      element: that.dom.current,
      width,
      lang,
      onReady,
      onVerify,
      onClose,
    };

    if (typeof that.props.mode !== 'undefined') {
      config.mode = that.props.mode;
    }

    if (typeof that.props.protocol !== 'undefined') {
      config.protocol = that.props.protocol;
    }

    if (typeof that.props.appendTo !== 'undefined') {
      config.appendTo = that.props.appendTo;
    }

    window.initNECaptcha(
      config,
      instance => {
        that.instance = instance;

        if (isFunction(onLoad)) {
          onLoad(instance);
        }
      },
      onError
    );

    if (that.script && isFunction(that.script.removeEventListener)) {
      that.script.removeEventListener('Im-ready', that.ready, false);
    }
  };

  destroy = () => {
    const that = this;
    // console.log('destroy');
    // const {  } = that.state;

    if (that.script && isFunction(that.script.removeEventListener)) {
      that.script.removeEventListener('Im-ready', that.ready, false);
      // that.script.parentNode.removeChild(that.script);
    }

    if (that.instance && isFunction(that.instance.destroy)) {
      that.instance.destroy();
    }

    that.instance = null;
    that.script = null;
  };

  triggerEvent = name => {
    const that = this;
    // console.log('triggerEvent');
    // const {  } = that.state;

    if (!that.script || !isFunction(that.script.dispatchEvent)) {
      return;
    }

    const e = document.createEvent('Event');
    e.initEvent(name, true, true);
    that.script.dispatchEvent(e);
  };

  render() {
    const that = this;
    // console.log('render');
    const { className, children } = that.props;

    return (
      <div ref={that.dom} className={className}>
        {children || null}
      </div>
    );
  }
}
