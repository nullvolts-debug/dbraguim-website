import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9kunhe1k',
  dataset: 'production',
  apiVersion: '2024-02-08',
  token: 'skZAcw1fE6hAEJ6VmqtOSJYvXKbRDvRP4wLJy5U84ngmUaieVB7EeXQCm1F53dSFLJMLzgRQUc8TMnfPHcaxP1HCBUxViyiY2nZoxkOf50i6pcOU25fDJxKZQUjoRLzwQk9EtSiLFsJsfeno9kjI82EctAh047b7oqKGlGLEsiY7wdntQOeW',
  useCdn: false,
});

const knives = [
  {
    _type: 'knife',
    name: 'Blue Hunter',
    category: 'hunting',
    status: 'available',
    description_pt: 'Uma lâmina de caça com presença e acabamento premium, feita para uso real e para durar.',
    description_en: 'A premium hunting knife with strong presence, built for real use and made to last.',
    model: 'Hunter',
    length: '22 cm',
    width: '3,5 cm',
    thickness: '4 mm',
    steel_pt: 'Damasco liga 1095 com 15N20',
    steel_en: 'Damascus liga 1095 com 15N20',
    handle_pt: 'Poplar burl',
    handle_en: 'Poplar burl',
    featured: true,
    order: 1,
  },
  {
    _type: 'knife',
    name: 'Spear Bowie',
    category: 'fighter',
    status: 'available',
    description_pt: 'Inspirada em uma bowie, mas criada com linhas mais modernas e agressiva',
    description_en: 'Inspired by a Bowie, but created with more modern, aggressive lines.',
    model: 'Fighter',
    length: '22 cm',
    width: '3,5 cm',
    thickness: '4 mm',
    steel_pt: 'Damasco liga 1095 com 15N20',
    steel_en: 'Damascus liga 1095 com 15N20',
    handle_pt: 'Maple burl',
    handle_en: 'Maple burl',
    featured: true,
    order: 2,
  },
  {
    _type: 'knife',
    name: 'Flame Chef',
    category: 'chef',
    status: 'commission',
    description_pt: 'Uma chef com um design todo pensado nas chamas, um ferramenta elegante e muito eficiente',
    description_en: "A chef's knife with a design entirely inspired by flames—an elegant and highly efficient tool.",
    model: 'Chef',
    length: '22 cm',
    width: '50 mm',
    thickness: '5 mm',
    steel_pt: 'Damasco liga 1095 com 15N20',
    steel_en: 'Damascus liga 1095 com 15N20',
    handle_pt: 'Box Elder burl',
    handle_en: 'Box Elder burl',
    featured: true,
    order: 3,
  },
  {
    _type: 'knife',
    name: 'Amber Chef',
    category: 'chef',
    status: 'sold',
    description_pt: 'Uma chef com um design todo pensado nas chamas, um ferramenta elegante e muito eficiente',
    description_en: "A chef's knife with a design entirely inspired by flames—an elegant and highly efficient tool.",
    model: 'Chef',
    length: '22 cm',
    width: '50 mm',
    thickness: '5 mm',
    steel_pt: 'Damasco liga 1095 com 15N20',
    steel_en: 'Damascus liga 1095 com 15N20',
    handle_pt: 'Box Elder burl',
    handle_en: 'Box Elder burl',
    featured: false,
    order: 4,
  },
];

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title_pt: 'D.Braguim',
  title_en: 'D.Braguim',
  slogan_pt: 'Tradição Forjada, Emoção Afiada.',
  slogan_en: 'Forged Tradition, Sharpened Emotion.',
  whatsappNumber: '5511991953021',
  instagramHandle: 'd.braguim',
  email: 'contato@dbraguim.com',
  phone: '+55 11 99195-3021',
};

async function migrate() {
  console.log('🚀 Iniciando migração para Sanity...\n');

  try {
    // Criar configurações do site
    console.log('📝 Criando configurações do site...');
    await client.createOrReplace(siteSettings);
    console.log('✅ Configurações criadas\n');

    // Criar facas
    console.log('🔪 Criando facas...');
    for (const knife of knives) {
      const result = await client.create(knife);
      console.log(`✅ ${knife.name} criada (ID: ${result._id})`);
    }

    console.log('\n🎉 Migração concluída com sucesso!');
    console.log('\n📌 Próximos passos:');
    console.log('1. Acesse o Sanity Studio: https://dbraguim.sanity.studio');
    console.log('2. Faça upload das imagens das facas');
    console.log('3. Adicione os vídeos se desejar');
    console.log('4. O site já está configurado para buscar dados do Sanity');
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  }
}

migrate();
