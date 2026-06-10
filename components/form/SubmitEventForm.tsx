'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { categories } from '@/lib/categories'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormTextarea from './FormTextarea'
import SuccessScreen from './SuccessScreen'

const cities = ['Milano', 'Monza', 'Bergamo', 'Lecco', 'Vimercate', 'Busnago']

export default function SubmitEventForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (success) return <SuccessScreen />

  return (
    <form
      className="grid gap-4 rounded-card border border-border bg-bg/60 md:grid-cols-2"
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
      {error && <p role="alert" className="md:col-span-2 flex items-center gap-2 rounded-xl border border-coral/40 bg-coral/10 p-3 text-sm font-bold text-coral"><AlertCircle size={18} /> {error}</p>}
      <FormInput label="Titolo evento*" name="title" required />
      <FormSelect label="Categoria*" name="category" required>
        {categories.filter((cat) => !['stasera', 'weekend'].includes(cat.id)).map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
      </FormSelect>
      <FormInput label="Venue / Nome locale*" name="venue" required />
      <FormSelect label="Citta*" name="city" required>{cities.map((city) => <option key={city}>{city}</option>)}</FormSelect>
      <FormInput label="Indirizzo*" name="address" required />
      <FormInput label="Data*" name="date" type="date" required />
      <FormInput label="Ora inizio*" name="timeStart" type="time" required />
      <FormInput label="Ora fine" name="timeEnd" type="time" />
      <FormSelect label="Prezzo" name="priceType"><option value="free">Gratuito</option><option value="paid">A pagamento</option></FormSelect>
      <FormInput label="Importo EUR" name="priceAmount" type="number" min={0} />
      <div className="md:col-span-2"><FormTextarea label="Descrizione*" name="description" required /></div>
      <FormInput label="Link prenotazione" name="bookingUrl" type="url" />
      <FormInput label="Instagram" name="instagramUrl" />
      <FormInput label="Immagine" name="image" type="file" accept="image/*" />
      <FormInput label="Nome organizzatore*" name="organizer" required />
      <FormInput label="Email*" name="email" type="email" required />
      <button disabled={loading} className="md:col-span-2 min-h-12 rounded-chip bg-lime px-5 py-3 font-black text-black transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? 'Invio...' : 'Invia evento'}
      </button>
    </form>
  )
}
