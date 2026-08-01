import { useState, useEffect, useCallback } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { api } from '../../services/api'
import { useToast } from '../../context/ToastContext'
import StarRating from './StarRating'

export default function ReviewWidget({ target, itemId, itemName, size = 'text-[0.9rem]' }) {
  const showToast = useToast()
  const [summary, setSummary] = useState({ average: 0, count: 0 })
  const [modalOpen, setModalOpen] = useState(false)

  const load = useCallback(async () => {
    try {
      const data = await api.getReviews(target, itemId)
      setSummary({ average: data.average || 0, count: data.count || 0 })
    } catch {
      setSummary({ average: 0, count: 0 })
    }
  }, [target, itemId])

  useEffect(() => {
    load()
  }, [load])

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group flex items-center gap-1.5 bg-transparent border-none p-0 cursor-pointer"
        aria-label={`View and rate ${itemName}`}
      >
        <StarRating value={summary.average} size={size} />
        <span className="text-[0.7rem] text-text-muted group-hover:text-gold transition-colors">
          ({summary.count})
        </span>
      </button>

      {modalOpen && (
        <ReviewModal
          target={target}
          itemId={itemId}
          itemName={itemName}
          onClose={() => setModalOpen(false)}
          onSubmitted={() => { load(); showToast('Thank you for your review!') }}
          showToast={showToast}
        />
      )}
    </>
  )
}

function ReviewModal({ target, itemId, itemName, onClose, onSubmitted, showToast }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!rating) {
      showToast('Please select a star rating before submitting.')
      return
    }
    setSubmitting(true)
    try {
      await api.createReview({ target, itemId, rating, comment })
      onSubmitted()
      onClose()
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[440px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h3 className="font-serif text-[1.4rem]">Rate &amp; Review</h3>
            <p className="text-[0.85rem] text-text-muted mt-1">{itemName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors cursor-pointer bg-transparent"
            aria-label="Close"
          >
            <FaXmark className="text-sm" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="bg-card rounded-xl p-5 flex flex-col items-center gap-3">
            <span className="text-[0.75rem] font-bold text-text-muted uppercase tracking-wide">Your Rating</span>
            <StarRating value={rating} onChange={setRating} size="text-[2.2rem]" />
            <span className="text-[0.8rem] text-text-muted">
              {rating ? `${rating} / 5 stars` : 'Click a star to rate'}
            </span>
          </div>

          <div>
            <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">
              Review (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              maxLength={500}
              rows={4}
              className="w-full p-3 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-dark-green text-white font-bold py-3 px-6 rounded-lg text-[0.85rem] cursor-pointer hover:bg-dark-green-hover transition-colors border-0 disabled:opacity-50"
          >
            {submitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
          </button>
        </form>
      </div>
    </div>
  )
}
