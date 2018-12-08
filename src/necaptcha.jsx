import React from 'react';

export default class NECaptcha extends React.Component {
  static defaultProps = {
    // captchaId: '',
    // element: '',
    // mode: '',
    // protocol: '',
    width: 'auto',
    lang: 'zh-CN',
    // appendTo: '',
    onLoad: instance => {},
    onError: err => {},
    onReady: instance => {},
    onVerify: () => {},
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    this.dom = null;
    this.state = {
      ins: null,
      script: null,
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

  shouldComponentUpdate(nextProps, nextState) {
    const that = this;
    // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
    return nextProps.captchaId !== that.props.captchaId;
  }

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

    const ds = document.createElement('script');
    ds.type = 'text/javascript';
    ds.async = true;
    ds.charset = 'utf-8';

    if (ds.readyState) {
      ds.onreadystatechange = () => {
        if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
          ds.onreadystatechange = null;
          that.ready();
        }
      };
    } else {
      ds.onload = () => {
        ds.onload = null;
        that.ready();
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

  ready = () => {
    const that = this;
    // console.log('_ready');
    const { captchaId, width, lang, onLoad, onError } = that.props;
    const { ins } = that.state;

    if (!window.initNECaptcha) {
      return;
    }

    if (ins) {
      that.load(ins);
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
    };

    if (that.props.protocol) {
      config.protocol = that.props.protocol;
    }

    if (that.props.mode) {
      config.mode = that.props.mode;
    }

    if (that.props.appendTo) {
      config.appendTo = that.props.appendTo;
    }

    window.initNECaptcha(
      config,
      instance => {
        that.load(instance);

        that.setState({
          ins: instance,
        });

        onLoad && onLoad(instance);
      },
      onError
    );
  };

  load = ins => {
    const that = this;
    // console.log('_load');
    const { onReady, onVerify, onClose } = that.props;

    ins.onReady(onReady);
    ins.onVerify(onVerify);
    ins.onClose(onClose);
  };

  destroy = () => {
    const that = this;
    // that.state.script.parentNode.removeChild(that.state.script);
    that.setState({
      ins: null,
      script: null,
    });
  };

  render() {
    const that = this;
    // console.log('render');
    const { captchaId } = that.props;

    return (
      <div
        key={captchaId}
        className="i-necaptcha"
        ref={e => {
          that.dom = e;
        }}
      />
    );
  }
}
