import favicon from './extensions/favicon.ico'
import LogoMenu from './extensions/logo-32x32.png'
import LogoAuth from './extensions/logo-70x70.png'

export default {
  config: {
    head: {
      favicon,
    },
    menu: {
      logo: LogoMenu,
    },
    auth: {
      logo: LogoAuth,
    },
    locales: ['ru'],
    translations: {
      ru: {
        'Auth.form.welcome.title': 'Umbrella API',
        'Auth.form.welcome.subtitle': 'Войдите в аккаунт'
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
