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
  /** When true, only the logo is shown (in the marquee). Item is hidden from the press list. */
  logoOnly?: boolean
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
    logo: "/images/press/cadena-3.webp",
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
    logo: "/images/press/continental-cordoba.webp",
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
    logo: "/images/press/el-canciller.webp",
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
  {
    id: 5,
    outlet: "Canal 10",
    title: "Tegu en Canal 10",
    url: "https://www.serviciosrtv.com.ar/",
    date: "2026-03-15",
    type: "video",
    language: "es",
    product: "Tegu",
    logo: "/images/press/canal-10.webp",
    logoOnly: true,
  },
  {
    id: 6,
    outlet: "iProUP",
    title: "El Uber de los servicios: así funciona la app para contratar desde fletes hasta plomeros",
    url: "https://www.iproup.com/economia-digital/66215-el-uber-de-los-servicios-asi-funciona-la-app-para-contratar-desde-fletes-hasta-plomeros",
    date: "2026-03-20",
    type: "article",
    language: "es",
    product: "Tegu",
    logo: "/images/press/iproup.webp",
  },
  {
    id: 7,
    outlet: "Perfil",
    title: "Tegu, la app cordobesa que conecta plomeros y electricistas verificados con vecinos que no saben a quién llamar",
    url: "https://www.perfil.com/noticias/cordoba/tegu-la-app-cordobesa-que-conecta-plomeros-y-electricistas-verificados-con-vecinos-que-no-saben-a-quien-llamar.phtml",
    date: "2026-03-22",
    type: "article",
    language: "es",
    product: "Tegu",
    logo: "/images/press/perfil.webp",
  },
]
