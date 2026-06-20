import { useEffect } from 'react';
import { Overlay, ModalPanel, ModalHeader, ModalBody, ModalFooter, CloseButton } from './modal.styles.jsx';

function Modal({ isOpen, onClose, title, children, footer, wide = false }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
            <ModalPanel $wide={wide} onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2>{title}</h2>
                    <CloseButton onClick={onClose} aria-label="Fechar">&times;</CloseButton>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                {footer && <ModalFooter>{footer}</ModalFooter>}
            </ModalPanel>
        </Overlay>
    );
}

export default Modal;
