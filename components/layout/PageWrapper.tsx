export default function PageWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <main className={`mx-auto max-w-7xl px-4 pb-28 pt-6 md:px-6 md:pb-16 md:pt-10 ${className}`}>{children}</main>
}
