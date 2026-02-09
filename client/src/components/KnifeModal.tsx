import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface KnifeData {
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

interface KnifeModalProps {
  knife: KnifeData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function KnifeModal({ knife, isOpen, onClose }: KnifeModalProps) {
  const { language, t } = useLanguage();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const contactMutation = trpc.contact.submit.useMutation();

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

  // Usar fullImages (alta resolução) se disponível, senão images
  const modalImage = knife.fullImages?.[0] || knife.images[0] || '';

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
                  src={modalImage}
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

              {/* Seção I'm Interested - Sempre visível */}
              <div className="modal__interest">
                <h4 className="modal__interestTitle">
                  {language === 'pt' ? "TENHO INTERESSE" : "I'M INTERESTED"}
                </h4>
                <p className="modal__interestText">
                  {language === 'pt'
                    ? 'Se tem interesse em uma peça como essa, clique abaixo.'
                    : "If you're interested in a piece like this, click below."}
                </p>

                {!showEmailForm ? (
                  <div className="modal__actions">
                    <a
                      href={`https://wa.me/5511991953021?text=${language === 'pt' ? 'Olá! Tenho interesse na faca' : 'Hi! I\'m interested in the knife'} ${knife.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--whatsapp"
                    >
                      {t('portfolio_interest_whatsapp')}
                    </a>
                    <button
                      className="btn btn--secondary"
                      onClick={() => setShowEmailForm(true)}
                    >
                      {t('portfolio_interest_email')}
                    </button>
                  </div>
                ) : (
                  <form
                    className="modal__emailForm"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      setSubmitStatus('idle');

                      try {
                        // Enviar via tRPC/Resend
                        await contactMutation.mutateAsync({
                          name: formData.name,
                          email: formData.email,
                          message: language === 'pt'
                            ? `Me interessei pela faca ${knife.name}, gostaria de mais informações.`
                            : `I'm interested in the ${knife.name} knife, I would like more information.`,
                        });

                        setSubmitStatus('success');
                        toast.success(language === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
                        
                        setTimeout(() => {
                          setShowEmailForm(false);
                          setFormData({ name: '', email: '' });
                          setSubmitStatus('idle');
                        }, 2000);
                      } catch (error) {
                        setSubmitStatus('error');
                        toast.error(language === 'pt' ? 'Erro ao enviar mensagem. Tente novamente.' : 'Error sending message. Please try again.');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'pt' ? 'Seu nome completo' : 'Your full name'}
                      style={{
                        width: '100%',
                        background: 'var(--dark)',
                        border: '1px solid var(--line)',
                        color: '#fff',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        fontSize: '0.95rem',
                        marginBottom: '12px',
                      }}
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      style={{
                        width: '100%',
                        background: 'var(--dark)',
                        border: '1px solid var(--line)',
                        color: '#fff',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        fontSize: '0.95rem',
                        marginBottom: '12px',
                      }}
                    />

                    <input type="hidden" name="subject" value={language === 'pt' ? 'Me interessei por uma D.Braguim' : 'Interested in a D.Braguim knife'} />
                    <input type="hidden" name="message" value={language === 'pt' ? `Me interessei pela faca ${knife.name}, gostaria de mais informações.` : `I'm interested in the ${knife.name} knife, I would like more information.`} />

                    <div className="modal__formActions">
                      <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={() => {
                          setShowEmailForm(false);
                          setFormData({ name: '', email: '' });
                          setSubmitStatus('idle');
                        }}
                      >
                        {language === 'pt' ? 'Cancelar' : 'Cancel'}
                      </button>
                      <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                        {isSubmitting
                          ? language === 'pt'
                            ? 'Enviando...'
                            : 'Sending...'
                          : language === 'pt'
                          ? 'Enviar'
                          : 'Send'}
                      </button>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="form__success">
                        {language === 'pt'
                          ? 'Mensagem enviada com sucesso!'
                          : 'Message sent successfully!'}
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="form__error">
                        {language === 'pt'
                          ? 'Erro ao enviar. Tente novamente.'
                          : 'Error sending. Please try again.'}
                      </div>
                    )}
                  </form>
                )}
              </div>
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
