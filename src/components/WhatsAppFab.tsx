import { siteConfig } from '../lib/data'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { Icon } from './ui/Icon'

export function WhatsAppFab() {
  if (!siteConfig.showWhatsAppFab) return null

  return (
    <a
      href={buildWhatsAppUrl(
        siteConfig.whatsappNumber,
        siteConfig.whatsappDefaultMessage,
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat WhatsApp dengan ${siteConfig.businessName}`}
      className="fixed bottom-[calc(1.25rem_+_env(safe-area-inset-bottom))] right-[calc(1.25rem_+_env(safe-area-inset-right))] z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-105"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
    </a>
  )
}
