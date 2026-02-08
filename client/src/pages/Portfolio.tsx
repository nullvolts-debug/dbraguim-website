import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { KnifeCard } from '@/components/KnifeCard';

export default function Portfolio() {
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'hunting' | 'fighter' | 'chef'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold' | 'commission'>('all');

  const { data: knives, isLoading } = trpc.sanity.getKnives.useQuery({
    category: categoryFilter,
    status: statusFilter,
  });

  return (
    <section className="section">
      <div className="container">
        <h1>{t('nav_portfolio')}</h1>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)', fontSize: '0.9rem' }}>
              {t('portfolio_filter_label_category')}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              <option value="all">{t('portfolio_filter_category_all')}</option>
              <option value="hunting">{t('portfolio_filter_category_hunting')}</option>
              <option value="fighter">{t('portfolio_filter_category_fighter')}</option>
              <option value="chef">{t('portfolio_filter_category_chef')}</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)', fontSize: '0.9rem' }}>
              {t('portfolio_filter_label_status')}
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              <option value="all">{t('portfolio_filter_status_all')}</option>
              <option value="available">{t('portfolio_filter_status_available')}</option>
              <option value="sold">{t('portfolio_filter_status_sold')}</option>
              <option value="commission">{t('portfolio_filter_status_commission')}</option>
            </select>
          </div>
        </div>

        {/* Grid de facas */}
        {isLoading ? (
          <div style={{ color: 'var(--muted)' }}>Carregando...</div>
        ) : (
          <div className="grid">
            {knives?.map((knife) => (
              <KnifeCard key={knife._id} knife={knife} />
            ))}
          </div>
        )}

        {!isLoading && knives?.length === 0 && (
          <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px 0' }}>
            Nenhuma faca encontrada com os filtros selecionados.
          </div>
        )}
      </div>
    </section>
  );
}
