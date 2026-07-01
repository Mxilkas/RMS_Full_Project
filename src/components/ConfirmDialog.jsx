import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onCancel}>
      <div className="confirm-dialog" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button close-button" type="button" onClick={onCancel} aria-label="Close dialog">
          <X size={18} />
        </button>
        <span className="confirm-icon"><AlertTriangle size={28} /></span>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="button button-light" type="button" onClick={onCancel}>Cancel</button>
          <button className="button button-danger" type="button" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
