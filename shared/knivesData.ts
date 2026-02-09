export interface KnifeData {
  name: string;
  category: string;
  status: 'disponivel' | 'vendida' | 'encomenda';
  images: string[];
  fullImages?: string[];
  video_mp4?: string;
  video_poster?: string;
  description_pt: string;
  description_en: string;
  modelo: string;
  comprimento: string;
  largura: string;
  espessura: string;
  steel_pt: string;
  steel_en: string;
  handle_pt: string;
  handle_en: string;
}

export const knivesData: KnifeData[] = [
  {
    name: "Blue Hunter",
    category: "Caça",
    status: "disponivel",
    images: ["blue_hunter.webp"],
    video_mp4: "/videos/pieces/blue_hunter.mp4",
    video_poster: "/images/portfolio/blue_hunter.webp",
    description_pt: "Uma lâmina de caça com presença e acabamento premium, feita para uso real e para durar.",
    description_en: "A premium hunting knife with strong presence, built for real use and made to last.",
    modelo: "Hunter",
    comprimento: "22 cm",
    largura: "3,5 cm",
    espessura: "4 mm",
    steel_pt: "Damasco liga 1095 com 15N20",
    steel_en: "Damascus liga 1095 com 15N20",
    handle_pt: "Poplar burl",
    handle_en: "Poplar burl"
  },
  {
    name: "Spear Bowie",
    category: "Luta",
    status: "disponivel",
    images: ["spear_bowie.webp"],
    video_mp4: "/videos/pieces/blue_hunter.mp4",
    video_poster: "/images/portfolio/spear_bowie.webp",
    description_pt: "Inspirada em uma bowie, mas criada com linhas mais modernas e agressiva",
    description_en: "Inspired by a Bowie, but created with more modern, aggressive lines.",
    modelo: "Fighter",
    comprimento: "22 cm",
    largura: "3,5 cm",
    espessura: "4 mm",
    steel_pt: "Damasco liga 1095 com 15N20",
    steel_en: "Damascus liga 1095 com 15N20",
    handle_pt: "Maple burl",
    handle_en: "Maple burl"
  },
  {
    name: "Flame Chef",
    category: "Chef",
    status: "encomenda",
    images: ["flame_chef.webp"],
    video_mp4: "/videos/pieces/blue_hunter.mp4",
    video_poster: "/images/portfolio/flame_chef.webp",
    description_pt: "Uma chef com um design todo pensado nas chamas, um ferramenta elegante e muito eficiente",
    description_en: "A chef's knife with a design entirely inspired by flames—an elegant and highly efficient tool.",
    modelo: "Chef",
    comprimento: "22 cm",
    largura: "50 mm",
    espessura: "5 mm",
    steel_pt: "Damasco liga 1095 com 15N20",
    steel_en: "Damascus liga 1095 com 15N20",
    handle_pt: "Box Elder burl",
    handle_en: "Box Elder burl"
  },
  {
    name: "Amber Chef",
    category: "Chef",
    status: "vendida",
    images: ["amber_chef.webp"],
    video_mp4: "/videos/pieces/blue_hunter.mp4",
    video_poster: "/images/portfolio/amber_chef.webp",
    description_pt: "Uma chef com um design todo pensado nas chamas, um ferramenta elegante e muito eficiente",
    description_en: "A chef's knife with a design entirely inspired by flames—an elegant and highly efficient tool.",
    modelo: "Chef",
    comprimento: "22 cm",
    largura: "50 mm",
    espessura: "5 mm",
    steel_pt: "Damasco liga 1095 com 15N20",
    steel_en: "Damascus liga 1095 com 15N20",
    handle_pt: "Box Elder burl",
    handle_en: "Box Elder burl"
  }
];
