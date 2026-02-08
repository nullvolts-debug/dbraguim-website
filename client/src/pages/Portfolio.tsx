import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import KnifeModal from '@/components/KnifeModal';
import { knivesData, type KnifeData } from '@shared/knivesData';

export default function Portfolio() {
  const { t, language } = useLanguage();
  const [selectedKnife, setSelectedKnife] = useState<KnifeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKnifeClick = (knife: KnifeData) => {
    setSelectedKnife(knife);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedKnife(null), 300);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="page__title">{t('nav_portfolio')}</h1>
          <p className="page__subtitle">
            {language === 'pt'
              ? 'Explore as peças artesanais criadas com tradição e inovação.'
              : 'Explore handcrafted pieces created with tradition and innovation.'}
          </p>

          <div className="grid">
            {knivesData.map((knife) => (
              <div
                key={knife.name}
                className="card"
                onClick={() => handleKnifeClick(knife)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card__media">
                  <img
                    src={`/images/portfolio/${knife.images[0]}`}
                    alt={knife.name}
                    loading="lazy"
                  />
                </div>
                <div className="card__content">
                  <div className="card__header">
                    <h3 className="card__title">{knife.name}</h3>
                    <span className={`badge badge--${knife.status}`}>
                      {knife.status === 'disponivel'
                        ? language === 'pt'
                          ? 'Disponível'
                          : 'Available'
                        : knife.status === 'vendida'
                        ? language === 'pt'
                          ? 'Vendida'
                          : 'Sold'
                        : language === 'pt'
                        ? 'Sob Encomenda'
                        : 'Made to Order'}
                    </span>
                  </div>
                  <p className="card__excerpt">
                    {language === 'pt' ? knife.description_pt : knife.description_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KnifeModal knife={selectedKnife} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
