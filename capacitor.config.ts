import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.nani.relevamiento',
  appName: 'Relevamiento Visual',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: "#191919",
      showSpinner: false,
      androidSpinnerStyle: "samll",
      iosSpinnerStyle: "small",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
