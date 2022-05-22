module.exports = ({ env }) => {
  return [
    'strapi::errors',
    'strapi::security',
    // 'strapi::cors',
    {
      name: 'strapi::cors',
      config: {
        origin: env('CORS_ALLOWED', '*').split(',')
      }
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
}
