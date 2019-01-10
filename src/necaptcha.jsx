import React from 'react';

const SCRIPT_ID = 'react-necaptcha';

export default class NECaptcha extends React.Component {
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
    onError: err => {},
  };

  constructor(props) {
    super(props);
    this.dom = null;
    this.state = {
      ins: null,
      script: null,
      elem: null,
    };
  }

  // componentWillMount() {
  //   const that = this;
  //   console.log('componentWillMount', that.props, that.state);
  // }

  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that.init();
  }

  // componentWillReceiveProps(nextProps) {
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

  componentDidUpdate(prevProps, prevState) {
    const that = this;
    // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
    that.init();
  }

  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    that.destroy();
  }

  init = () => {
    const that = this;
    // console.log('_init');

    if (window.initNECaptcha) {
      that.ready();
      return;
    }

    const elem = document.getElementById(SCRIPT_ID);
    if (elem) {
      elem.addEventListener('Im-ready', that.ready.bind(that), false);
      that.setState({
        elem,
      })
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
          // that.ready();
          that.triggerEvent('Im-ready');
        }
      };
    } else {
      ds.onload = () => {
        ds.onload = null;
        // that.ready();
        that.triggerEvent('Im-ready');
      };
    }

    const protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
    ds.src = `${protocol}//cstaticdun.126.net/load.min.js?_t=${new Date().getTime()}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ds, s);

    that.setState({
      script: ds,
    });
  };

  ready = event => {
    const that = this;
    // console.log('_ready');
    const { captchaId, width, lang, onReady, onVerify, onClose, onLoad, onError } = that.props;
    const { ins, elem } = that.state;

    if (!window.initNECaptcha) {
      return;
    }

    if (ins) {
      return;
    }

    if (!that.dom) {
      return;
    }

    const config = {
      captchaId,
      element: that.dom,
      width,
      lang,
      onReady,
      onVerify,
      onClose,
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
      instance => {
        that.setState({
          ins: instance,
        });

        onLoad && onLoad(instance);
      },
      onError
    );

    if (elem) {
      elem.removeEventListener('Im-ready', that.ready.bind(that), false);
    }
  };

  destroy = () => {
    const that = this;
    const { elem } = that.state;

    if (elem) {
      elem.removeEventListener('Im-ready', that.ready.bind(that), false);
    }

    // script.parentNode.removeChild(that.state.script);

    // that.setState({
    //   ins: null,
    //   script: null,
    //   elem: null,
    // });
  };

  triggerEvent = (name) => {
    const elem = document.getElementById(SCRIPT_ID);
    if (!elem) {
      return;
    }

    const e = document.createEvent('Event');
    e.initEvent(name, true, true);
    elem.dispatchEvent(e);
  };

  render() {
    const that = this;
    // console.log('render');
    const { className } = that.props;

    return (
      <div
        className={className}
        ref={e => {
          that.dom = e;
        }}
      />
    );
  }
}
