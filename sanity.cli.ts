import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.VITE_SANITY_PROJECT_ID || '9kunhe1k';
const dataset = process.env.VITE_SANITY_DATASET || 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
});
