import { useLanguage } from '@/contexts/LanguageContext';

interface KnifeCardProps {
  knife: {
    _id: string;
    name: string;
    category: 'hunting' | 'fighter' | 'chef';
    status: 'available' | 'sold' | 'commission';
    images: Array<{ asset: { _ref: string } }>;
    description_pt: string;
    description_en: string;
  };
  onClick?: () => void;
}

export function KnifeCard({ knife, onClick }: KnifeCardProps) {
  const { language, t } = useLanguage();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'badge--available';
      case 'sold':
        return 'badge--sold';
      case 'commission':
        return 'badge--commission';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return t('portfolio_filter_status_available');
      case 'sold':
        return t('portfolio_filter_status_sold');
      case 'commission':
        return t('portfolio_filter_status_commission');
      default:
        return status;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'hunting':
        return t('portfolio_filter_category_hunting');
      case 'fighter':
        return t('portfolio_filter_category_fighter');
      case 'chef':
        return t('portfolio_filter_category_chef');
      default:
        return category;
    }
  };

  const imageRef = knife.images[0]?.asset?._ref || 'placeholder.webp';
  const imageSrc = `/images/portfolio/${imageRef}`;

  const description = language === 'en' ? knife.description_en : knife.description_pt;

  return (
    <div className="card" onClick={onClick}>
      <img src={imageSrc} alt={knife.name} className="card__image" />
      <div className="card__content">
        <h3 className="card__title">{knife.name}</h3>
        <div className="card__meta">
          <span className={`badge ${getStatusBadgeClass(knife.status)}`}>{getStatusLabel(knife.status)}</span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#ccc', border: '1px solid rgba(255,255,255,0.2)' }}>
            {getCategoryLabel(knife.category)}
          </span>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '8px', lineHeight: '1.5' }}>{description}</p>
      </div>
    </div>
  );
}
