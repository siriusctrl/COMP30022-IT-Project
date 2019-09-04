const constants = {
  IS_ENV_DEVELOPMENT: __DEV__,
  IS_DEBUG_MODE_ENABLED: Boolean(window.navigator.userAgent)
};

export default constants;