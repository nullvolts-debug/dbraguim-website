import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.VITE_SANITY_PROJECT_ID || '9kunhe1k';
const dataset = process.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'D.Braguim CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Facas')
              .icon(() => '🔪')
              .child(
                S.documentTypeList('knife')
                  .title('Facas')
                  .filter('_type == "knife"')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Configurações do Site')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
