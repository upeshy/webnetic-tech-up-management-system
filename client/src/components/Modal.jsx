/**
 * Modal Component
 * Reusable modal dialog
 */

import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, title, children, onClose, footer }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-dark">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-dark transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">{children}</div>

          {/* Footer */}
          {footer && <div className="border-t p-6 flex gap-3 justify-end">{footer}</div>}
        </div>
      </div>
    </>
  );
};

export default Modal;