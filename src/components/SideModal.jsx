import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function SideModal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="side-modal-root" role="presentation">
      <button
        type="button"
        className="side-modal-backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="side-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-modal-title"
      >
        <div className="side-modal-head">
          <h2 id="side-modal-title" className="side-modal-title">{title}</h2>
          <button
            type="button"
            className="side-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="side-modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}
