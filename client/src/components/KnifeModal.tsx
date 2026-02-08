import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface KnifeData {
  name: string;
  category: string;
  status: 'disponivel' | 'vendida' | 'encomenda';
  images: string[];
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

interface KnifeModalProps {
  knife: KnifeData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function KnifeModal({ knife, isOpen, onClose }: KnifeModalProps) {
  const { language, t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !knife) return null;

  const description = language === 'pt' ? knife.description_pt : knife.description_en;
  const steel = language === 'pt' ? knife.steel_pt : knife.steel_en;
  const handle = language === 'pt' ? knife.handle_pt : knife.handle_en;

  const statusLabels = {
    disponivel: language === 'pt' ? 'Disponível' : 'Available',
    vendida: language === 'pt' ? 'Vendida' : 'Sold',
    encomenda: language === 'pt' ? 'Sob Encomenda' : 'Made to Order',
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleVideoClick = () => {
    if (knife.video_mp4) {
      // Abrir modal de vídeo
      const videoModal = document.getElementById('videoModal');
      const video = document.getElementById('videoPlayer') as HTMLVideoElement;
      if (videoModal && video) {
        video.src = knife.video_mp4;
        videoModal.classList.add('active');
        video.play();
      }
    }
  };

  return (
    <>
      <div className="modalOverlay active" onClick={handleOverlayClick}>
        <div className="modal">
          <div className="modal__top">
            <div className="modal__title">
              <h3>{knife.name}</h3>
              <span className={`badge badge--${knife.status}`}>{statusLabels[knife.status]}</span>
            </div>
            <button className="modal__close" type="button" onClick={onClose}>
              {t('modal_close')}
            </button>
          </div>

          <div className="modal__body">
            <div className="modal__media">
              <div className="modal__photo">
                <img
                  src={`/images/portfolio/${knife.images[0]}`}
                  alt={knife.name}
                  loading="lazy"
                />
                {knife.video_mp4 && (
                  <button
                    className="modal__watchVideo"
                    type="button"
                    onClick={handleVideoClick}
                  >
                    {t('modal_watch_video')}
                  </button>
                )}
              </div>

              {knife.video_mp4 && (
                <button className="modal__videoThumb" type="button" onClick={handleVideoClick}>
                  <div className="modal__videoThumbInner">
                    <div
                      className="modal__videoThumbPoster"
                      style={{
                        backgroundImage: `url(${knife.video_poster || `/images/portfolio/${knife.images[0]}`})`,
                      }}
                    ></div>
                    <div className="modal__videoThumbInfo">
                      <h4>{t('modal_watch_video')}</h4>
                      <p>{language === 'pt' ? 'Abre em tela maior' : 'Opens in larger screen'}</p>
                    </div>
                    <div className="modal__videoThumbIcon">▶</div>
                  </div>
                </button>
              )}
            </div>

            <div className="modal__content">
              <p>{description}</p>
              <div className="metaRow">
                <div className="metaItem">
                  <span className="metaLabel">{t('modal_spec_model')}:</span>
                  <span className="metaValue">{knife.modelo}</span>
                </div>
                <div className="metaItem">
                  <span className="metaLabel">{t('modal_spec_length')}:</span>
                  <span className="metaValue">{knife.comprimento}</span>
                </div>
                <div className="metaItem">
                  <span className="metaLabel">{t('modal_spec_width')}:</span>
                  <span className="metaValue">{knife.largura}</span>
                </div>
                <div className="metaItem">
                  <span className="metaLabel">{t('modal_spec_thickness')}:</span>
                  <span className="metaValue">{knife.espessura}</span>
                </div>
                <div className="metaItem">
                  <span className="metaLabel">{t('modal_spec_steel')}:</span>
                  <span className="metaValue">{steel}</span>
                </div>
                <div className="metaItem">
                  <span className="metaLabel">{t('modal_spec_handle')}:</span>
                  <span className="metaValue">{handle}</span>
                </div>
              </div>

              {knife.status === 'disponivel' && (
                <div className="modal__actions">
                  <a
                    href={`https://wa.me/5511991953021?text=${language === 'pt' ? 'Olá! Tenho interesse na faca' : 'Hi! I\'m interested in the knife'} ${knife.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--whatsapp"
                  >
                    {t('portfolio_interest_whatsapp')}
                  </a>
                  <a href="/contato" className="btn btn--secondary">
                    {t('portfolio_interest_email')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <div id="videoModal" className="vModalOverlay">
        <div className="vModal">
          <div className="vModal__top">
            <div className="vModal__title">{knife.name}</div>
            <button
              type="button"
              className="vModal__close"
              onClick={() => {
                const videoModal = document.getElementById('videoModal');
                const video = document.getElementById('videoPlayer') as HTMLVideoElement;
                if (videoModal && video) {
                  videoModal.classList.remove('active');
                  video.pause();
                  video.src = '';
                }
              }}
            >
              {t('modal_close')}
            </button>
          </div>
          <video id="videoPlayer" className="vModal__video" controls playsInline preload="metadata"></video>
        </div>
      </div>
    </>
  );
}
