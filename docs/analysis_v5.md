# Análisis crítico v5 — vs. 11 referentes

Comparativa contra:

- carlosazaustre.es
- paisanos.io
- rauno.me
- pheralb.dev
- barbaritalara.com
- leerob.com
- tmalamud.com
- craftz.dog
- taniarascia.com
- delba.dev
- braydoncoyer.dev

---

## Comparación de posicionamiento por sitio

| Sitio | Vende | Estrategia |
|---|---|---|
| **leerob** | Credibilidad como engineer @ Vercel + content | Lista limpia work + writing, newsletter prominente |
| **carlosazaustre** | Courses + podcast + comunidad | Hero gigante con highlight + newsletter dominante |
| **rauno** | Craft como designer @ Vercel | Pure minimalism, type masivo, círculo amarillo |
| **pheralb / delba** | Dev for-hire / projects | Compact, dev-focused |
| **braydoncoyer** | Personal brand + content | Bento + bookshelf + uses + sponsors |
| **paisanos** | Agency/services | Dashboard bento dark con results cards |
| **tmalamud / craftz / tania** | Personal sites | Mix de hobbies + escritura + side projects |
| **vos (mativallejos)** | **Founder + Product Engineer** | **Bento dashboard estilo paisanos + minimalism estilo rauno + densidad estilo braydon** |

**Tu híbrido es correcto** para tu posición: no sos pure designer (rauno), no sos employee de Vercel (leerob), no vendés cursos (carlos). Sos founder activo construyendo + sub-marca personal. **El bento dense + signature element + build-in-public es el formato adecuado.**

---

## 🎯 Producto — qué vende tu site hoy

**Position claro**: Product Engineer + Co-Founder Tegu en LatAm, con shipping velocity demostrable y multi-proyecto.

**Funnel implícito**:

1. Visitor llega → ve foto + nombre + tribe ("founders técnicos LatAm")
2. Entra a proof: Tegu numbers + Docta Valley + open source + press
3. Build-in-public signals: build logs + ship status flotante
4. Conversion: Contact → email

**Falla del funnel**: el visitor no sabe **qué pedirte** una vez que decide contactarte. "Open for: collabs · ideas · investor convos" es genérico. Falta el "How I work" (deferred en docs).

---

## 🔧 Tecnología — qué está bien, qué mejorar

**Stack sólido**: Next.js 16 + next-intl + Tailwind + framer-motion + shadcn. Nada que cambiar estructuralmente.

**Deuda técnica detectada**:

| Item | Severidad | Acción |
|---|---|---|
| `images.unoptimized: true` en next.config | Media | Optimizar para Lighthouse — ahora cargás imágenes raw |
| Pre-existing framer-motion `ease: string` typing errors (todo el código) | Baja | Cast a `Easing` cuando refactor |
| `typescript.ignoreBuildErrors: true` | Media | Ocultando deuda. Habría que arreglar progresivamente |
| Faltan SEO meta tags (OG, Twitter) | Alta | Para que el site comparta bien en redes |
| No `sitemap.xml` | Baja | Bueno tener para SEO |
| `archive/` submodule embebido | Baja | Ya está, no afecta producción |

---

## 🔴 Inconsistencias visuales restantes (post-cleanup)

Mostly clean ahora. Lo que QUEDA:

1. **Make It card** — sigue siendo el outlier en tono. El resto del bento muestra data/proofs (numbers, logos, photo). Make It es filosofía abstracta. **Considerar reemplazarla** con algo concreto (featured open source repo, currently exploring, latest book).

2. **Hero pesado vs. resto liviano** — hero es bento denso, el resto del site son rows simples. La transición Hero → Now (terminal) → Products (cards) → ... varía mucho de densidad. **No es un problema crítico** pero es algo que un visitor nota.

3. **Footer sin personalidad** — actualmente footer + ship status floating. Falta un peak-end con voz tuya (la frase de Footer.quote es genérica).

---

## 🟠 Tegu-overload — status update

**Después del bio rewrite:**

| Mención | Necesario? |
|---|---|
| Bio (mencionado entre 3) | ✅ balanceado ahora |
| Results card | ✅ es la métrica principal |
| Press marquee | ✅ legítimo (es real) |
| Build logs | ✅ legítimo (estás shippando) |
| Products (Tegu como primera card) | ✅ es tu proyecto principal |
| Press section | ✅ legítimo |
| Ship gallery | ⚠️ podría rotar a otros logros |
| ShipStatus floating | ⚠️ apunta a Tegu por default |

**Sigue siendo Tegu-heavy pero ahora justificado**. La diversificación está en el bio + Docta Valley card + Open Source section + ai-expense-tracker prominente. Score de overload: bajó de 9 a 6 — **resuelto al 70%**.

---

## ❌ Lo que falta vs. referentes

| Sección | Referentes que la tienen | BE leverage | Status |
|---|---|---|---|
| **Newsletter signup** | leerob, carlos, braydon, delba, tania | Mere exposure + commitment | Skipped |
| **Manifesto / POV** | rauno (subtle), carlos | Identity + Unity | Deferred a docs |
| **How I work / Services** | paisanos (agency style) | Choice architecture | Deferred a docs |
| **Testimonials** | leerob (subtle), paisanos | Social proof | Deferred a docs |
| **/uses page** | leerob, braydon, craftz, tania | Mere exposure / authority | ✅ Embebido en /about |
| **Guestbook** | leerob | Social currency | Skip — bajo tráfico |
| **Speaking/Talks** | carlos, braydon | Authority | Skipped |
| **Photography/personal** | craftz, tania | Liking | N/A para tu marca |

---

## 🎯 Recomendaciones nuevas (post-iteración)

### Esta semana (alto ROI, bajo esfuerzo)

1. **OG / Twitter meta tags** — agregar a `app/[locale]/layout.tsx`. Sin esto, cuando alguien comparte tu site en X/LinkedIn se ve roto. Es tu signature element invisible.

2. **Reemplazar Make It card** con algo concreto — opciones:
   - **Featured open source** (AI Expense Tracker — 59★, 118K views) → diversifica off-Tegu
   - **Currently exploring** (1 línea sobre lo que estás aprendiendo) → curiosity gap
   - **Quote del último press feature** ("Cuando te mudás, no sabés a quién escribir...") → social proof + concreto

3. **Footer voz personal** — la quote actual "I don't write code. I build products." es OK pero podría ser una invitación más cálida tipo "Made from Córdoba 🇦🇷 — say hi".

### Próximas dos semanas (medio esfuerzo)

4. **Implementar Manifesto block** (ya en docs) — story arc + identity + unity en 3 líneas
5. **Implementar How I work** (ya en docs) — fix el funnel "qué te pido"

### Cuando tengas data

6. **Testimonials** (ya en docs) — necesita 3 quotes reales tuyas

### No hacer (resistir)

- ❌ Newsletter (a menos que vayas a escribir consistente — sin contenido nuevo, es infraestructura sin uso)
- ❌ Más secciones — el site ya está completo a nivel de información

---

## 📊 Score honesto v5

**8.8 / 10**

Subiste de 8/10 (v4) por:

- ✅ Cards normalizadas
- ✅ CTA hierarchy clara
- ✅ Tegu-overload mitigado en el bio
- ✅ Build logs interactivo (purple cow)
- ✅ ShipStatus story-mode (signature element)
- ✅ Books con verdicts
- ✅ Press marquee monocrome

Para subir a 9.5+:

1. Implementar lo deferred (Manifesto + How I work)
2. Reemplazar Make It con algo concreto
3. SEO meta tags
4. Footer con voz personal

Para 9.8+:

- Testimonials reales
- Refactor de SEO + image optimization

Para 10/10:

- Consistente cadencia de blog/build-log que mantenga el site "vivo"
- Tegu lanzando cada mes con métricas que se actualicen

**El sitio compite a nivel de leerob/braydon en estructura. Lo que falta es CONTENIDO que se sostenga en el tiempo, no más features.**
