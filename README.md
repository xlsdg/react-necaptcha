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
  className:    PropTypes.string,
  captchaId:    PropTypes.string.isRequired,
  mode:         PropTypes.string,
  protocol:     PropTypes.string,
  width:        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lang:         PropTypes.string,
  appendTo:     PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onLoad:       PropTypes.func,
  onError:      PropTypes.func,
  onReady:      PropTypes.func,
  onVerify:     PropTypes.func,
  onClose:      PropTypes.func,
```

[Read More](http://support.dun.163.com/documents/15588062143475712?docId=150442915877015552)

# License

MIT
