import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.VITE_SANITY_PROJECT_ID || '9kunhe1k';
const dataset = process.env.VITE_SANITY_DATASET || 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'dbraguim',
  deployment: {
    appId: 'jg6f68zqasge699b7sef4jh9',
  },
});
