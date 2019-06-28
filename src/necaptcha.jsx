import React from 'react';

const SCRIPT_ID = 'react-necaptcha';

const typeOf = type => object => Object.prototype.toString.call(object) === `[object ${type}]`;

// const isString = typeOf('String');
// const isObject = typeOf('Object');
const isFunction = typeOf('Function');

function NewCustomEvent(type, params = { bubbles: false, cancelable: false, detail: null }) {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, !!params.bubbles, !!params.cancelable, params.detail || {});
  return event;
}

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
    // const {  } = that.props;
    // const {  } = that.state;
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
    // const {  } = that.props;
    // const {  } = that.state;
    that.create();
  }

  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    // const {  } = that.props;
    // const {  } = that.state;
    that.destroy();
  }

  create = () => {
    const that = this;
    // console.log('create');
    // const {  } = that.props;
    // const {  } = that.state;

    if (window.initNECaptcha) {
      return that.ready();
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
          that.triggerEvent('Im-ready');
        }
      };
    } else {
      ds.onload = () => {
        ds.onload = null;
        that.triggerEvent('Im-ready');
      };
    }

    const protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
    ds.src = `${protocol}//cstaticdun.126.net/load.min.js?_t=${new Date().getTime()}`;

    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ds, s);

    ds.addEventListener('Im-ready', that.ready, false);
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
  };

  destroy = () => {
    const that = this;
    // console.log('destroy');
    // const {  } = that.props;
    // const {  } = that.state;

    if (that.script && isFunction(that.script.removeEventListener)) {
      that.script.removeEventListener('Im-ready', that.ready, false);
      // that.script.parentNode.removeChild(that.script);
      that.script = null;
    }

    if (that.instance && isFunction(that.instance.destroy)) {
      that.instance.destroy();
      that.instance = null;
    }
  };

  triggerEvent = type => {
    const that = this;
    // console.log('triggerEvent');
    // const {  } = that.props;
    // const {  } = that.state;

    if (!that.script || !isFunction(that.script.dispatchEvent)) {
      return;
    }

    const event = isFunction(window.CustomEvent)
      ? new window.CustomEvent(type, {
          detail: null,
          bubbles: false,
          cancelable: false,
          // composed: false,
        })
      : NewCustomEvent(type, {
          detail: null,
          bubbles: false,
          cancelable: false,
          // composed: false,
        });

    that.script.dispatchEvent(event);
  };

  render() {
    const that = this;
    // console.log('render');
    const { className, children } = that.props;
    // const {  } = that.state;

    return (
      <div ref={that.dom} className={className}>
        {children || null}
      </div>
    );
  }
}
