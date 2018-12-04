# react-necaptcha

A NECaptcha component for React

## Installation

```
$ npm install react-necaptcha --save
```

## Usage

``` react
import NECaptcha from 'react-necaptcha';

export default () => {
  const onLoad = instance => console.dir(instance);

  return (
    <NECaptcha
      captchaId="your-captchaId"
      onLoad={onLoad}
    />
  );
};
```

## Properties

``` javascript
  captchaId:    React.PropTypes.string.isRequired,
  mode:         React.PropTypes.string,
  protocol:     React.PropTypes.string,
  width:        React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  lang:         React.PropTypes.string,
  appendTo:     React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  onLoad:       React.PropTypes.func,
  onError:      React.PropTypes.func,
  onReady:      React.PropTypes.func,
  onVerify:     React.PropTypes.func,
  onClose:      React.PropTypes.func,
```

[Read More](http://support.dun.163.com/documents/15588062143475712?docId=150442915877015552)

# License

MIT
