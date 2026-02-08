import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import KnifeModal from '@/components/KnifeModal';
import { knivesData, type KnifeData } from '@shared/knivesData';

export default function Portfolio() {
  const { t, language } = useLanguage();
  const [selectedKnife, setSelectedKnife] = useState<KnifeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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
          {/* Filtros */}
          <div className="filters">
            <div className="filter__group">
              <label className="filter__label">
                {language === 'pt' ? 'Categoria' : 'Category'}
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter__select"
              >
                <option value="all">{language === 'pt' ? 'Todas' : 'All'}</option>
                <option value="Caça">{language === 'pt' ? 'Caça' : 'Hunting'}</option>
                <option value="Luta">{language === 'pt' ? 'Luta' : 'Fighter'}</option>
                <option value="Chef">Chef</option>
              </select>
            </div>

            <div className="filter__group">
              <label className="filter__label">
                {language === 'pt' ? 'Status' : 'Status'}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter__select"
              >
                <option value="all">{language === 'pt' ? 'Todos' : 'All'}</option>
                <option value="disponivel">{language === 'pt' ? 'Disponível' : 'Available'}</option>
                <option value="vendida">{language === 'pt' ? 'Vendida' : 'Sold'}</option>
                <option value="encomenda">{language === 'pt' ? 'Sob Encomenda' : 'Made to Order'}</option>
              </select>
            </div>
          </div>

          <div className="grid">
            {knivesData
              .filter((knife) => {
                if (categoryFilter !== 'all' && knife.category !== categoryFilter) return false;
                if (statusFilter !== 'all' && knife.status !== statusFilter) return false;
                return true;
              })
              .map((knife) => (
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
