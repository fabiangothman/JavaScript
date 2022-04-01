import React from 'react';

const WidgetConfigRenderer = ({ wrapperClassName, config, children }) => {
  return (
    <>
      <style>
        {`
        .${wrapperClassName} {
          --ANTOURAGE--color_widget_border: ${config.color_widget_border};
          --ANTOURAGE--color_widget_ping_border: ${config.color_widget_ping_border};
          --ANTOURAGE--color_overlay_bg: ${config.color_overlay_bg};
          --ANTOURAGE--opacity_overlay: ${config.opacity_overlay};
          --ANTOURAGE--color_cta_bg: ${config.color_cta_bg};
          --ANTOURAGE--color_cta_text: ${config.color_cta_text};
          --ANTOURAGE--color_live: ${config.color_live};
          --ANTOURAGE--color_title_text: ${config.color_title_text};
          --ANTOURAGE--color_title_bg: ${config.color_title_bg};
          --ANTOURAGE--color_name_bg: ${config.color_name_bg};
          --ANTOURAGE--color_name_text: ${config.color_name_text};
          --ANTOURAGE--ms_animation_duration: ${config.ms_animation_duration}ms;
          --ANTOURAGE--widget_size: ${config.widget_size}px;
          --ANTOURAGE--scale_inactive: ${config.scale_inactive};
          --ANTOURAGE--scale_active: ${config.scale_active};
          --ANTOURAGE--scale_ping: ${config.scale_ping};
        }
    `}
      </style>
      {children}
    </>
  );
};

export default WidgetConfigRenderer;
