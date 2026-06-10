'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { categories } from '@/lib/categories'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormTextarea from './FormTextarea'
import SuccessScreen from './SuccessScreen'

const cities = ['Milano', 'Monza', 'Bergamo', 'Lecco', 'Vimercate', 'Busnago']

function FormSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-2 md:gap-5">
      <div className="md:col-span-2 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-lime">{eyebrow}</p>
          <h2 className="mt-1 font-display text-2xl font-black leading-none">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  )
}

export default function SubmitEventForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (success) return <SuccessScreen />

  return (
    <form
      className="relative space-y-7 pb-4"
      onSubmit={(event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (!form.checkValidity()) {
          setError('Compila i campi obbligatori.')
          form.reportValidity()
          return
        }
        setError('')
        setLoading(true)
        setTimeout(() => {
          const data = new FormData(form)
          localStorage.setItem('wevent_submit_demo', JSON.stringify(Object.fromEntries(data)))
          setLoading(false)
          setSuccess(true)
        }, 1200)
      }}
    >
      {error && <p role="alert" className="flex items-center gap-2 rounded-[18px] border border-coral/35 bg-coral/10 p-4 text-sm font-bold text-coral"><AlertCircle size={18} /> {error}</p>}

      <FormSection eyebrow="01" title="Che cosa succede">
        <FormInput label="Titolo evento*" name="title" required />
        <FormSelect label="Categoria*" name="category" required>
          {categories.filter((cat) => !['stasera', 'weekend'].includes(cat.id)).map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
        </FormSelect>
        <div className="md:col-span-2"><FormTextarea label="Descrizione*" name="description" required /></div>
      </FormSection>

      <FormSection eyebrow="02" title="Dove e quando">
        <FormInput label="Venue / Nome locale*" name="venue" required />
        <FormSelect label="Città*" name="city" required>{cities.map((city) => <option key={city}>{city}</option>)}</FormSelect>
        <FormInput label="Indirizzo*" name="address" required />
        <FormInput label="Data*" name="date" type="date" required />
        <FormInput label="Ora inizio*" name="timeStart" type="time" required />
        <FormInput label="Ora fine" name="timeEnd" type="time" />
      </FormSection>

      <FormSection eyebrow="03" title="Link e contatti">
        <FormSelect label="Prezzo" name="priceType"><option value="free">Gratuito</option><option value="paid">A pagamento</option></FormSelect>
        <FormInput label="Importo EUR" name="priceAmount" type="number" min={0} />
        <FormInput label="Link prenotazione" name="bookingUrl" type="url" />
        <FormInput label="Instagram" name="instagramUrl" />
        <FormInput label="Immagine" name="image" type="file" accept="image/*" />
        <FormInput label="Nome organizzatore*" name="organizer" required />
        <FormInput label="Email*" name="email" type="email" required />
      </FormSection>

      <div className="sticky bottom-[74px] z-20 -mx-4 border-t border-white/10 bg-bg/90 px-4 py-3 backdrop-blur-xl md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0">
        <button disabled={loading} className="min-h-[54px] w-full rounded-chip bg-lime px-5 py-3 font-black text-black shadow-lime transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-50 md:max-w-sm">
          {loading ? 'Invio...' : 'Invia evento'}
        </button>
      </div>
    </form>
  )
}
