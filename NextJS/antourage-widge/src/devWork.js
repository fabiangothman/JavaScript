const PARTNER_ID = process.env.DEV_PARTNER_ID;

window._ANTOURAGE_CONFIG = {
  partner_id: PARTNER_ID,
};

window._ANTOURAGE = new EventTarget();

require('./widget');
