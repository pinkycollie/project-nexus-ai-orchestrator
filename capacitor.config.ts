import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ef6eb312f1a944d882084724d92493fa',
  appName: 'project-nexus-ai-orchestrator',
  webDir: 'dist',
  server: {
    url: 'https://ef6eb312-f1a9-44d8-8208-4724d92493fa.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: true,
      spinnerColor: '#000000'
    }
  }
};

export default config;