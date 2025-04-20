
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitcommit.app',
  appName: 'FitCommit',
  webDir: 'dist',
  server: {
    url: 'https://665782f6-3962-4153-8df2-9ab0a2549747.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
