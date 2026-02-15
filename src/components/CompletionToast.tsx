import { Side } from '../types'

interface CompletionToastProps {
  message: string | null
  side: Side
}

export default function CompletionToast({ message, side }: CompletionToastProps) {
  if (!message) return null

  const toastClass = `completion-toast toast-${side.toLowerCase()}`

  return (
    <div className={toastClass}>
      {message}
    </div>
  )
}
