import type { EventCategory } from '@/lib/categories'

export interface Event {
  id: string
  slug: string
  title: string
  venue: string
  city: 'Milano' | 'Monza' | 'Bergamo' | 'Lecco' | 'Vimercate' | 'Busnago'
  address: string
  lat: number
  lng: number
  coverUrl: string
  category: EventCategory
  date: string
  timeStart: string
  timeEnd?: string
  priceType: 'free' | 'paid'
  priceAmount?: number
  description: string
  featured: boolean
  hot: boolean
  bookingUrl?: string
  instagramUrl?: string
  tags?: string[]
}

const d = (offset: number) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date.toISOString().slice(0, 10)
}

export const events: Event[] = [
  ['neon-basement', 'Neon Basement', 'Tunnel Club', 'Milano', 'Via Sammartini 30', 45.489, 9.208, 'dj-set', 0, '23:30', 'paid', 16, true, true, 'Night club sotto traccia, bassi profondi, visual sporchi e una line-up che non chiede permesso.', 'photo-1514525253161-7a46d19cd819'],
  ['porta-venezia-spritz', 'Spritz Fuori Scala', 'Nolo Yard', 'Milano', 'Via Varanini 5', 45.492, 9.218, 'aperitivo', 0, '18:30', 'paid', 12, false, false, 'Aperitivo lungo, tavoli stretti, chiacchiere veloci e playlist indie da marciapiede.', 'photo-1551024709-8f23befc6f87'],
  ['vinile-crudo', 'Vinile Crudo', 'Apollo', 'Milano', 'Via Giosue Borsi 9', 45.449, 9.174, 'dj-set', 1, '22:00', 'paid', 10, false, true, 'Solo dischi, luci basse, niente pose. Una sera essenziale per chi resta fino alla fine.', 'photo-1571266028243-d220c9c3a2d2'],
  ['cortile-live', 'Cortile Live', 'Mare Culturale', 'Milano', 'Via Giuseppe Gabetti 15', 45.466, 9.121, 'live', 2, '21:00', 'free', undefined, false, false, 'Tre band giovani in cortile, birrette fredde e palco vicino abbastanza da sentire tutto.', 'photo-1501386761578-eac5c94b800a'],
  ['ramen-notturno', 'Ramen Notturno', 'Casa Ramen', 'Milano', 'Via Porro Lambertenghi 25', 45.488, 9.188, 'food', 3, '20:30', 'paid', 18, false, false, 'Menu corto, brodo serio, tavolo condiviso. Perfetto prima di sparire in zona Isola.', 'photo-1553621042-f6e147245754'],
  ['terrace-hour', 'Terrace Hour', 'Ceresio 7', 'Milano', 'Via Ceresio 7', 45.484, 9.183, 'aperitivo', 4, '19:00', 'paid', 20, false, false, 'Vista alta, cocktail secchi, tramonto lento. Quello che serve quando la settimana pesa.', 'photo-1536935338788-846bb9981813'],
  ['monza-afterglow', 'Afterglow Monza', 'Bloom', 'Monza', 'Via Curiel 39', 45.582, 9.275, 'serata', 1, '22:30', 'paid', 11, false, true, 'Indie dance e facce note, con una sala che diventa piccola appena parte il ritornello.', 'photo-1501281668745-f7f57925c3b4'],
  ['villa-spritz', 'Villa Spritz', 'Derby Bar', 'Monza', 'Via Carlo Alberto 8', 45.584, 9.274, 'aperitivo', 2, '18:00', 'paid', 9, false, false, 'Un giro in centro, bicchieri pieni, piattini onesti e nessuna grande decisione da prendere.', 'photo-1514362545857-3bc16c4c7d1b'],
  ['sound-walk', 'Sound Walk', 'Parco di Monza', 'Monza', 'Viale Mirabellino', 45.609, 9.282, 'esperienze', 5, '16:00', 'free', undefined, false, false, 'Passeggiata sonora guidata tra alberi, registratori e cuffie. Un piano strano, quindi buono.', 'photo-1500530855697-b586d89ba3ee'],
  ['bergamo-dub', 'Bergamo Dub Club', 'Edone', 'Bergamo', 'Via Gemelli 17', 45.705, 9.692, 'dj-set', 0, '22:00', 'paid', 8, false, false, 'Dub, dancehall e bass culture in cortile. Entri presto, resti senza accorgertene.', 'photo-1524368535928-5b5e00ddc76b'],
  ['alta-live', 'Alta Live', 'Ink Club', 'Bergamo', 'Via Carducci 4', 45.694, 9.661, 'live', 6, '21:30', 'paid', 14, false, false, 'Chitarre tese, palco vicino, pubblico caldo. La provincia quando suona forte.', 'photo-1499364615650-ec38552f4f34'],
  ['market-bites', 'Market Bites', 'Piazza Vecchia', 'Bergamo', 'Piazza Vecchia', 45.704, 9.662, 'food', 7, '12:00', 'free', undefined, false, false, 'Assaggi, banchetti, cose buone da mangiare in piedi. Zero formalita.', 'photo-1555939594-58d7cb561ad1'],
  ['lecco-late', 'Lecco Late', 'Circolo Libero', 'Lecco', 'Via Calloni 14', 45.854, 9.397, 'serata', 3, '22:00', 'paid', 7, false, false, 'Serata piccola, lago vicino, cassa dritta. Il piano B che diventa piano A.', 'photo-1516450360452-9312f5e86fc7'],
  ['lake-sketch', 'Lake Sketch', 'Lungolago', 'Lecco', 'Lungolario Isonzo', 45.855, 9.39, 'esperienze', 4, '17:30', 'free', undefined, false, false, 'Sketch walk aperta, matite condivise e finale con birra. Non serve saper disegnare.', 'photo-1500534314209-a25ddb2bd429'],
  ['vimercate-sunset', 'Sunset Piccolo', 'Dada Cafe', 'Vimercate', 'Via Cavour 72', 45.615, 9.369, 'aperitivo', 1, '19:00', 'paid', 10, false, false, 'Aperitivo compatto, buone sedute, musica giusta. Si parte piano.', 'photo-1572116469696-31de0f17cc34'],
  ['garage-vimercate', 'Garage Vimercate', 'Spazio Off', 'Vimercate', 'Via Mazzini 11', 45.611, 9.371, 'serata', 6, '22:30', 'paid', 9, false, false, 'Dancefloor ruvido, luci bianche, flyer brutti apposta. Funziona.', 'photo-1541532713592-79a0317b6b77'],
  ['busnago-bites', 'Bites & Friends', 'Centro Corte', 'Busnago', 'Via Italia 197', 45.616, 9.465, 'food', 2, '19:30', 'paid', 15, false, false, 'Street food, tavoli lunghi e cose croccanti. Una sera facile.', 'photo-1555244162-803834f70033'],
  ['busnago-night', 'Busnago Night Shift', 'Area 8', 'Busnago', 'Via San Rocco 4', 45.619, 9.46, 'serata', 5, '23:00', 'paid', 10, false, false, 'Una festa senza troppa teoria: amici, luci, cassa e via.', 'photo-1506157786151-b8491531f063'],
  ['standup-mi', 'Risate Laterali', 'Santeria Toscana', 'Milano', 'Viale Toscana 31', 45.448, 9.191, 'comedy', 2, '21:15', 'paid', 13, true, true, 'Stand-up secca, tavolini pieni, punchline che arrivano senza avviso.', 'photo-1527224538127-2104bb71c51b'],
  ['secret-show', 'Secret Show', 'Arci Bellezza', 'Milano', 'Via Bellezza 16A', 45.446, 9.196, 'live', 5, '21:45', 'paid', 17, true, false, 'Line-up annunciata all ultimo, energia da poster strappato e finale sudato.', 'photo-1540039155733-5bb30b53aa14']
].map(([slug, title, venue, city, address, lat, lng, category, offset, timeStart, priceType, priceAmount, featured, hot, description, photo], index) => ({
  id: String(index + 1),
  slug,
  title,
  venue,
  city,
  address,
  lat,
  lng,
  category,
  date: d(offset as number),
  timeStart,
  timeEnd: '02:00',
  priceType,
  priceAmount,
  featured,
  hot,
  description,
  coverUrl: `https://images.unsplash.com/${photo}?w=900&q=82&auto=format&fit=crop`,
  bookingUrl: 'https://example.com',
  instagramUrl: 'https://instagram.com',
  tags: ['wevent', String(city).toLowerCase()]
})) as Event[]
