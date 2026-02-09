import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: '9kunhe1k',
  dataset: 'production',
  apiVersion: '2024-02-08',
  token: 'skZAcw1fE6hAEJ6VmqtOSJYvXKbRDvRP4wLJy5U84ngmUaieVB7EeXQCm1F53dSFLJMLzgRQUc8TMnfPHcaxP1HCBUxViyiY2nZoxkOf50i6pcOU25fDJxKZQUjoRLzwQk9EtSiLFsJsfeno9kjI82EctAh047b7oqKGlGLEsiY7wdntQOeW',
  useCdn: false,
});

// Mapeamento de nome da faca para arquivo de imagem
const knifeImageMap = {
  'Blue Hunter': 'blue_hunter.webp',
  'Spear Bowie': 'spear_bowie.webp',
  'Flame Chef': 'flame_chef.webp',
  'Amber Chef': 'amber_chef.webp',
};

const imagesDir = path.resolve('./client/public/images/portfolio');

async function uploadImages() {
  console.log('🖼️  Iniciando upload de imagens para o Sanity...\n');

  try {
    // Buscar todas as facas
    const knives = await client.fetch('*[_type == "knife"]');
    console.log(`📋 Encontradas ${knives.length} facas no Sanity\n`);

    for (const knife of knives) {
      const imageFile = knifeImageMap[knife.name];
      if (!imageFile) {
        console.log(`⚠️  Sem imagem mapeada para: ${knife.name}`);
        continue;
      }

      const imagePath = path.join(imagesDir, imageFile);
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  Arquivo não encontrado: ${imagePath}`);
        continue;
      }

      console.log(`📤 Fazendo upload de ${imageFile} para ${knife.name}...`);

      // Upload da imagem
      const imageBuffer = fs.readFileSync(imagePath);
      const imageAsset = await client.assets.upload('image', imageBuffer, {
        filename: imageFile,
        contentType: 'image/webp',
      });

      console.log(`   ✅ Imagem uploaded: ${imageAsset._id}`);

      // Atualizar a faca com a referência da imagem
      await client
        .patch(knife._id)
        .set({
          images: [
            {
              _type: 'image',
              _key: 'main',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id,
              },
            },
          ],
        })
        .commit();

      console.log(`   ✅ ${knife.name} atualizada com imagem\n`);
    }

    console.log('🎉 Upload de imagens concluído!');
  } catch (error) {
    console.error('❌ Erro no upload:', error);
    process.exit(1);
  }
}

uploadImages();
