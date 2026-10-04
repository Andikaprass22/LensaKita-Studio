import { testimonials } from '../../lib/data'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'
import { StaggerGroup, StaggerItem } from '../ui/Stagger'

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Testimoni"
          title="Cerita dari klien kami"
          description="Kepercayaan klien adalah bagian terbaik dari pekerjaan ini."
        />

        <StaggerGroup
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id} className="h-full">
              <div className="sheen flex h-full flex-col gap-5 rounded-2xl border border-ink-800 bg-ink-900/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/50">
                <Icon name="quote" className="h-7 w-7 text-brand-500/60" />

                <p className="flex-1 text-sm leading-relaxed text-ink-200">
                  {testimonial.quote}
                </p>

                <div
                  className="flex items-center gap-1"
                  aria-label={`Penilaian ${testimonial.rating} dari 5`}
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Icon
                      key={starIndex}
                      name="star"
                      className={`h-4 w-4 ${
                        starIndex < testimonial.rating
                          ? 'text-brand-400'
                          : 'text-ink-700'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 border-t border-ink-800 pt-5">
                  <SmartImage
                    asset={testimonial.avatar}
                    alt={testimonial.avatarAlt}
                    aspect="aspect-square"
                    className="h-12 w-12 shrink-0 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink-50">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-ink-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
