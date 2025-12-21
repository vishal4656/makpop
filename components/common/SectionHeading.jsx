export default function SectionHeading({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <p className="text-sm font-semibold text-green-900 mb-2 uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-950">
        {title}
      </h2>
    </div>
  )
}
