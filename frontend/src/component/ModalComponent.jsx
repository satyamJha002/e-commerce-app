import { XIcon } from "lucide-react";
import React from "react";

const ModalComponent = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
  showCloseButton = true,
  size = "md",
  className = "",
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose?.();
    }
  };

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onclose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.addEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-backdrop" onClick={handleBackdropClick} />

      {/* Modal Container */}
      <div className={`modal-box ${size ? `modal-${size}` : ""} ${className}`}>
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between mb-4">
              {title && <h3 className="font-bold text-lg">{title}</h3>}
            </div>
            {/* {showCloseButton && (
              <button
                onClick={onclose}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <XIcon />
              </button>
            )} */}
          </div>
        )}

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default ModalComponent;
