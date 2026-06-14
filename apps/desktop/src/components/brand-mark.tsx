import { cn } from '@/lib/utils'

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

// Brand badge: IQQI-AGENT mark, kept as a static public asset for the initial
// branding phase while the Hermes runtime naming remains compatibility-safe.
export function BrandMark({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#0B1020]',
        className
      )}
      {...props}
    >
      <img alt="" className="size-full object-contain" src={assetPath('iqqi-mark.svg')} />
    </span>
  )
}
