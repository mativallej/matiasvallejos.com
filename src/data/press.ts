export type PressType = "article" | "radio" | "video" | "podcast"

export interface PressItem {
  id: number
  outlet: string
  program?: string
  title: string
  url: string
  date: string
  type: PressType
  language: "es" | "en"
  quote?: string
  product?: string
  logo?: string
}

export const press: PressItem[] = [
  {
    id: 1,
    outlet: "Cadena 3",
    program: "La Argentina Posible",
    title: "Crearon una app que conecta a plomeros y electricistas verificados con vecinos",
    url: "https://www.cadena3.com/noticia/la-argentina-posible/crearon-una-app-que-conecta-a-plomeros-y-electricistas-verificados-con-vecinos_547542",
    date: "2026-05-04",
    type: "article",
    language: "es",
    quote: "Cuando te mudás, no sabés a quién escribir. Necesitás plomería o electricidad y nunca sabés a quién estás metiendo en tu casa.",
    product: "Tegu",
    logo: "/images/cadena-3.png",
  },
  {
    id: 2,
    outlet: "Continental Córdoba",
    title: "Córdoba estrena una plataforma para conectar hogares con profesionales verificados",
    url: "https://www.continentalcba.fm/continentalcba.php?id=2711",
    date: "2026-03-26",
    type: "radio",
    language: "es",
    quote: "Muchos estudiantes, principalmente en Nueva Córdoba, no tienen a quién llamar ni cómo validar a quien entra a su casa.",
    product: "Tegu",
    logo: "/images/continental-cordoba.png",
  },
  {
    id: 3,
    outlet: "El Canciller",
    title: "Matías Vallejos, creador de TEGU: \"Queremos cambiar la industria de servicios\"",
    url: "https://elcanciller.com/tecnologia/matias-vallejos--creador-de-tegu--la-app-para-solucionar-problemas-en-el-hogar---queremos-cambiar-la-industria-de-servicios-_a69c447c79210ee2215dc5db6",
    date: "2026-03-25",
    type: "article",
    language: "es",
    quote: "Queremos cambiar la industria de servicios.",
    product: "Tegu",
    logo: "/images/el-canciller.png",
  },
  {
    id: 4,
    outlet: "YouTube",
    title: "Innovación cordobesa: así funciona TEGU, la app que conecta servicios y empleo",
    url: "https://www.youtube.com/watch?v=jFPcWeCweac",
    date: "2026-03-01",
    type: "video",
    language: "es",
    product: "Tegu",
  },
]
