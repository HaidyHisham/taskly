import  { useEffect } from 'react';
import { createPortal } from 'react-dom';

 interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
const Modal = ({ children, isOpen, onClose, className }: IProps) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleCloseModal);

    return () => {
      document.removeEventListener('keydown', handleCloseModal);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const targetNode = document.getElementById('modal-root') || document.body;

  return createPortal(
    <section
      className="fixed inset-s-0 inset-e-0 top-0 bottom-0 z-1000 h-screen bg-slate-dark/20 flex items-center justify-center backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={`overflow-y-auto scroll flex flex-col ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>,
    targetNode
  );
}
export default Modal;