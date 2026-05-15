export type Verdict = "must-read" | "worth-it" | "skim" | "skip"

export interface Book {
  id: number
  title: string
  author: string
  note: string
  category: string
  rating: number
  year: string
  destacado: boolean
  /** What you actually changed/applied after reading. The opinionated core. */
  takeaway?: string
  /** Honest verdict on whether it's worth a reader's time. */
  verdict?: Verdict
  /** One line from the book worth pulling. */
  quote?: string
  /** Which of your products/decisions this influenced. */
  appliedTo?: string
}

export const verdictLabels: Record<Verdict, string> = {
  "must-read": "Must read",
  "worth-it": "Worth it",
  "skim": "Skim",
  "skip": "Skip",
}

export const verdictColors: Record<Verdict, { fg: string; bg: string }> = {
  "must-read": { fg: "#FB923C", bg: "rgba(251,146,60,0.15)" },
  "worth-it": { fg: "#A3B86C", bg: "rgba(163,184,108,0.15)" },
  "skim": { fg: "#A8A29E", bg: "rgba(168,162,158,0.10)" },
  "skip": { fg: "#78716C", bg: "rgba(120,113,108,0.10)" },
}

export function getVerdict(book: Book): Verdict {
  if (book.verdict) return book.verdict
  if (book.rating >= 5 && book.destacado) return "must-read"
  if (book.rating >= 5) return "worth-it"
  if (book.rating >= 4) return "worth-it"
  if (book.rating >= 3) return "skim"
  return "skip"
}

export const books: Book[] = [
  {
    id: 1,
    title: "12 reglas para vivir",
    author: "Jordan Peterson",
    note: "Doce principios practicos para encontrar orden y proposito en medio del caos. Guia sobre responsabilidad personal y sentido de vida.",
    category: "life",
    rating: 5,
    year: "2022",
    destacado: false,
  },
  {
    id: 2,
    title: "El monje que vendio su Ferrari",
    author: "Robin Sharma",
    note: "Fabula de un abogado que encuentra sabiduria en el Himalaya. Lecciones sobre proposito, disciplina y vida plena.",
    category: "life",
    rating: 5,

    year: "2022",
    destacado: false,
  },
  {
    id: 3,
    title: "El obstaculo es el camino",
    author: "Ryan Holiday",
    note: "Filosofia estoica aplicada: cada obstaculo es una oportunidad disfrazada. Holiday muestra como convertir adversidades en ventajas.",
    category: "life",
    rating: 5,
    year: "2022",
    destacado: true,
  },
  {
    id: 4,
    title: "Las meditaciones",
    author: "Marco Aurelio",
    note: "Diario personal del emperador romano con reflexiones estoicas sobre el deber, la virtud y la transitoriedad de la vida.",
    category: "life",
    rating: 5,
    year: "2025",
    destacado: true,
  },
  {
    id: 5,
    title: "Los 5 arrepentimientos antes de morir",
    author: "Bronnie Ware",
    note: "Los cinco arrepentimientos mas comunes al final de la vida: no vivir autenticamente, trabajar demasiado, no expresar sentimientos, perder amistades y no permitirse ser feliz.",
    category: "life",
    rating: 5,
    year: "2021",
    destacado: false,
  },
  {
    id: 6,
    title: "Un pequeno paso puede cambiar tu vida",
    author: "Robert Maurer",
    note: "El metodo Kaizen: lograr grandes cambios a traves de pasos increiblemente pequenos. Pequenas acciones consistentes vencen la resistencia al cambio.",
    category: "life",
    rating: 5,
    year: "2023",
    destacado: false,
  },
  {
    id: 7,
    title: "El Principito",
    author: "Antoine de Saint Exupery",
    note: "El principito viaja a traves de planetas descubriendo valores universales. Una fabula sobre lo esencial que es invisible a los ojos.",
    category: "life",
    rating: 5,
    year: "2024",
    destacado: false,
  },
  {
    id: 8,
    title: "El hombre en busca de sentido",
    author: "Viktor Frankl",
    note: "Encontrar sentido en las circunstancias mas extremas. Frankl desarrolla la logoterapia desde su experiencia en campos de concentracion.",
    category: "life",
    rating: 5,
    year: "2025",
    destacado: true,
  },
  {
    id: 9,
    title: "El club de las 5 am",
    author: "Robin Sharma",
    note: "Filosofia, habitos y desarrollo personal en el contexto de una manana milagrosa determinada por el poder compuesto de nuestros habitos y decisiones.",
    category: "life",
    rating: 5,
    year: "2022",
    destacado: false,
  },
  {
    id: 10,
    title: "El poder de los habitos",
    author: "Charles Duhigg",
    note: "La ciencia detras de los habitos: el bucle de senal, rutina y recompensa. Entender como funcionan es el primer paso para transformarlos.",
    category: "life",
    rating: 4,
    year: "2022",
    destacado: false,
  },
  {
    id: 11,
    title: "Frankenstein",
    author: "Mary Shelley",
    note: "Los limites de la ciencia, la responsabilidad del creador y la naturaleza de lo monstruoso. Pionera de la ciencia ficcion.",
    category: "life",
    rating: 4,
    year: "2021",
    destacado: false,
  },
  {
    id: 12,
    title: "Tiende tu cama",
    author: "William H. McRaven",
    note: "Diez lecciones de vida del entrenamiento de los Navy SEALs. Empezar el dia con una tarea simple completada genera impulso para desafios mayores.",
    category: "life",
    rating: 4,
    year: "2022",
    destacado: false,
  },
  {
    id: 13,
    title: "Tus zonas erroneas",
    author: "Wayne Dyer",
    note: "Guia para identificar y eliminar pensamientos autodestructivos. Tomar control de las emociones y liberarse de la aprobacion externa.",
    category: "life",
    rating: 4,
    year: "2023",
    destacado: false,
  },
  {
    id: 14,
    title: "Ama tu Soledad",
    author: "Borja Vilaseca",
    note: "Un camino hacia el despertar interior a traves de la soledad. Mirar hacia adentro para descubrir quien eres y construir libertad interior.",
    category: "life",
    rating: 4,

    year: "2025",
    destacado: false,
  },
  {
    id: 15,
    title: "El sutil arte de que todo te importe un carajo",
    author: "Mark Manson",
    note: "Contracorriente de la positividad toxica. Elegir conscientemente que nos importa y encontrar significado a traves de valores autenticos.",
    category: "life",
    rating: 3,
    year: "2022",
    destacado: false,
  },
  {
    id: 16,
    title: "The Importance of Being Earnest",
    author: "Oscar Wilde",
    note: "Comedia teatral que satiriza la hipocresia victoriana. Wilde usa el ingenio y el absurdo para cuestionar la seriedad de las trivialidades.",
    category: "life",
    rating: 3,
    year: "2021",
    destacado: false,
  },
  {
    id: 17,
    title: "Vivir la vida con sentido",
    author: "Victor Kuppers",
    note: "El valor de una persona es la suma de sus conocimientos y habilidades, multiplicados por su actitud. Vivir con entusiasmo y proposito.",
    category: "life",
    rating: 3,
    year: "2024",
    destacado: false,
  },
  {
    id: 18,
    title: "Despertando al gigante interior",
    author: "Anthony Robbins",
    note: "Guia practica para tomar el control de tu vida emocional, fisica y financiera. Estrategias para despertar el potencial ilimitado que llevas dentro.",
    category: "life",
    rating: 3,
    year: "2025",
    destacado: false,
  },
  {
    id: 19,
    title: "La via rapida del millonario",
    author: "MJ DeMarco",
    note: "Critica el camino lento hacia la riqueza y propone la via rapida: crear sistemas de negocio escalables que generen ingresos desvinculados del tiempo.",
    category: "business",
    rating: 5,
    year: "2021",
    destacado: false,
  },
  {
    id: 20,
    title: "Vendes o vendes",
    author: "Grant Cardone",
    note: "Todo en la vida es una venta. Dominar las ventas es esencial no solo en los negocios sino en cada interaccion: convencer, negociar y persuadir.",
    category: "business",
    rating: 5,
    year: "2023",
    destacado: false,
  },
  {
    id: 21,
    title: "Como ganar amigos e influir en las personas",
    author: "Dale Carnegie",
    note: "Tecnicas y principios para mejorar las relaciones humanas, liderar equipos y aumentar tu influencia. Vender es entender al otro.",
    category: "business",
    rating: 5,
    year: "2023",
    destacado: true,
  },
  {
    id: 22,
    title: "Lean Startup",
    author: "Eric Ries",
    note: "La primera metodologia disruptiva para emprendedores. Validaciones de mercado reales, lejos de la burocracia y cerca del producto real.",
    category: "business",
    rating: 5,
    year: "2025",
    destacado: true,
  },
  {
    id: 23,
    title: "From Zero to One",
    author: "Peter Thiel",
    note: "Para emprendedores que quieren ir de cero a uno. La tecnologia como forma de transformar industrias y generar nuevo valor.",
    category: "business",
    rating: 5,
    year: "2025",
    destacado: true,
  },
  {
    id: 24,
    title: "El arte de empezar",
    author: "Guy Kawasaki",
    note: "Guia practica de emprendimiento: desde encontrar el sentido de tu proyecto, hacer pitching, posicionarte, reclutar y construir una marca.",
    category: "business",
    rating: 5,

    year: "2025",
    destacado: false,
  },
  {
    id: 25,
    title: "La bolsa o la vida",
    author: "Vicki Robin",
    note: "Transforma tu relacion con el dinero. Calcular el costo real de cada gasto en horas de vida y construir independencia financiera alineada con tus valores.",
    category: "business",
    rating: 4,
    year: "2022",
    destacado: false,
  },
  {
    id: 26,
    title: "La vaca purpura",
    author: "Seth Godin",
    note: "En un mundo saturado de productos, solo lo extraordinario destaca. Ser notable es la unica estrategia de marketing que funciona.",
    category: "business",
    rating: 4,
    year: "2023",
    destacado: false,
  },
  {
    id: 27,
    title: "Disenando la propuesta de valor",
    author: "Alexander Osterwalder",
    note: "Herramienta practica para disenar productos que los clientes realmente quieren. Mapear el perfil del cliente y alinear la propuesta de valor con sus necesidades.",
    category: "product",
    rating: 4,
    year: "2024",
    destacado: false,
  },
  {
    id: 28,
    title: "Disenando el modelo de negocio",
    author: "Alexander Osterwalder",
    note: "El Business Model Canvas: nueve bloques para visualizar, disenar y reinventar modelos de negocio. Lenguaje comun para hablar de estrategia.",
    category: "product",
    rating: 4,
    year: "2024",
    destacado: false,
  },
  {
    id: 29,
    title: "Inquebrantables",
    author: "Daniel Habif",
    note: "Manifiesto sobre forjar caracter y resistir la adversidad sin perder la esencia. Disciplina, fe y conviccion como pilares para no quebrarse.",
    category: "life",
    rating: 5,
    year: "2023",
    destacado: false,
  },
  {
    id: 30,
    title: "Organizate con eficacia",
    author: "David Allen",
    note: "El metodo GTD (Getting Things Done): sacar todo de la cabeza a un sistema confiable para liberar atencion y enfocarte en lo que realmente importa.",
    category: "business",
    rating: 3,
    year: "2023",
    destacado: false,
  },
  {
    id: 31,
    title: "Educar en el asombro",
    author: "Catherine L'Ecuyer",
    note: "Recuperar el asombro como motor del aprendizaje en la infancia. Critica al exceso de estimulos y defensa del ritmo natural del nino.",
    category: "life",
    rating: 3,
    year: "2024",
    destacado: false,
  },
  {
    id: 32,
    title: "365 dias estoico",
    author: "Ryan Holiday",
    note: "Una meditacion estoica para cada dia del ano. Util como recordatorio diario, aunque demasiado fragmentado para profundizar en las ideas.",
    category: "life",
    rating: 2,
    year: "2024",
    destacado: false,
  },
]

export const bookCategories = [
  { key: "all", label: "All" },
  { key: "product", label: "Product" },
  { key: "design", label: "Design" },
  { key: "business", label: "Business" },
  { key: "life", label: "Life" },
]
