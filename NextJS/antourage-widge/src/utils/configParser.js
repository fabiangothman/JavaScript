const DEFAULT_CONFIG = {
  color_widget_border: '#17DDAB',
  color_widget_ping_border: '#FB3F39',
  color_overlay_bg: '#000000',
  opacity_overlay: 0.4,
  color_cta_bg: '#FB3F39',
  color_cta_text: '#FFFFFF',
  color_live: '#FB3F39',
  color_title_text: '#080808',
  color_title_bg: '#FFFFFF',
  color_name_bg: '#8D48FF',
  color_name_text: '#FFFFFF',
  ms_ping_every: 60000,
  ms_ping_duration: 1500,
  widget_hidden: false,
};

const STATIC_CONFIG = {
  widget_size_desktop: 320,
  widget_size_mobile: 240,
  scale_inactive: 0.4,
  scale_active: 1,
  scale_ping: 0.7,
  ms_animation_duration: 300,
};

const configParser = (apiConfig = {}, jsConfig = {}) => {
  let config = { ...DEFAULT_CONFIG };

  const configKeys = Object.keys(DEFAULT_CONFIG);

  configKeys.forEach((key) => {
    if (jsConfig[key]) {
      config[key] = jsConfig[key];
    } else if (apiConfig[key]) {
      config[key] = apiConfig[key];
    }
  });

  config = {
    ...config,
    ...STATIC_CONFIG,
  };

  return config;
};

export default configParser;
