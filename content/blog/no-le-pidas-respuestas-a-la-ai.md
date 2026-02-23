---
title: "No le pidas respuestas a la AI, pedile preguntas"
description: "La diferencia entre usar la AI como un buscador y usarla como un copiloto de pensamiento es una sola cosa: el proceso. Flipped Interaction, Cognitive Verifier e Iterative Refinement."
date: "2026-01-15"
tags: ["ai", "prompt-engineering"]
category: "engineering"
featured: true
twitterUrl: "https://x.com/mativallej_/status/2014743217204285781"
---

La semana pasada me pidieron migrar un Identity Server. Decenas de clientes. Mas de 20 APIs. Cientos de scopes. Un error y se cae todo el ecosistema.

Lo primero que hice fue abrir un chat con la IA. Y lo primero que le pedi fue que no me diera una respuesta.

Le pedi que me hiciera preguntas.

## El problema real

Seamos honestos: la mayoria de las veces que le pedimos algo a la IA, nos devuelve una respuesta que podriamos haber googleado. Y eso no es culpa de la IA — es culpa de como le preguntamos.

La respuesta esta en los patrones de interaccion.

## Los Patrones

Hay muchas practicas, tecnicas, patrones y recursos de prompt engineering que nos pueden ayudar. Hay demasiados recursos y tools, pero hay que saber usarlos. Primero: fundamentos solidos, conocimientos, y despues ejecucion.

Por eso les traigo una serie de patrones que yo utilizo para generar un proceso de valor previo a la ejecucion. Y aca no estoy para contarles sobre "plan mode" o agentes — esto es una capa mas arriba: como estructuramos la conversacion para extraer el maximo valor.

## Patron 1: Flipped Interaction

**Que es?**

En lugar de preguntarle a la IA, le pedimos que nos pregunte a nosotros.

**Por que funciona?**

Porque nosotros no siempre sabemos que informacion es relevante. La IA puede identificar gaps en nuestro conocimiento o planificacion.

**Ejemplo**

En vez de:

```
Yo: Como migro un identity server?
IA: Aqui estan los pasos generales... [respuesta generica]
```

Interaccion invertida:

```
Yo: Necesito migrar un identity server. Antes de darme una solucion,
    haceme preguntas para entender mi situacion.

IA: Perfecto, te hago algunas preguntas:
    - Cuantos clientes y APIs estan afectados?
    - Tenes un ambiente de staging?
    - Cuanto downtime es aceptable?
    - Controlas todos los clientes o hay externos?
    - Que grant types usas?
    - Los tokens son JWT o reference tokens?
    ...
```

**Resultado**

Despues de responder 15 preguntas, la IA tiene contexto suficiente para:

- Hacer un assessment de riesgos personalizado
- Identificar dependencias que yo no habia considerado
- Proponer una estrategia de migracion especifica para mi caso

## Patron 2: Cognitive Verifier

**Que es?**

Le pedimos a la IA que genere consultas o validaciones que nosotros ejecutamos en el mundo real. Luego le devolvemos los resultados para que analice.

**Por que funciona?**

Combina el razonamiento de la IA con datos reales. No estamos pidiendo que invente — estamos pidiendo que nos ayude a verificar.

**Ejemplo**

```
Yo: Necesito saber cuantos recursos estan afectados por la migracion.

IA: Ejecuta estas queries y pasame los resultados:

    SELECT 'Clients' AS Entity, COUNT(*) FROM Clients WHERE ClientId LIKE 'APP.%'
    UNION ALL
    SELECT 'APIs', COUNT(*) FROM ApiResources WHERE Name LIKE 'APP.%'
    UNION ALL
    SELECT 'Scopes', COUNT(*) FROM ApiScopes WHERE Name LIKE 'APP.%';

Yo: [ejecuto y comparto]
    | Entity  | Count |
    |---------|-------|
    | Clients | 60+   |
    | APIs    | 20+   |
    | Scopes  | 150+  |

IA: Con esa cantidad de clientes y scopes, una migracion manual es riesgosa.
    Te recomiendo crear scripts de migracion. Aca esta el assessment...
```

**Resultado**

- Escenario verificado con datos reales
- Analisis de riesgo basado en numeros concretos
- Documentacion que se genera como subproducto

## Patron 3: Iterative Refinement

**Que es?**

Construimos el conocimiento en capas. Empezamos con algo basico y lo vamos refinando en multiples intercambios.

**Por que funciona?**

La informacion compleja no se puede dar toda de una. Este patron permite correcciones y enriquecimiento progresivo.

**Ejemplo**

```
Iteracion 1 - Lista inicial:
Yo: Estas son mis APIs afectadas: [lista]
IA: Recibido. Queres que las categorice por dominio?

Iteracion 2 - Categorizacion:
Yo: Si, agrupalas por ecosistema de negocio.
IA: Propongo esta agrupacion:
    - Ecosistema Pagos (7 APIs)
    - Ecosistema Notificaciones (3 APIs)
    - Ecosistema Core (14 APIs)

Iteracion 3 - Correccion:
Yo: Move API-X de Core a Pagos. Y agrega una categoria "Generales".
IA: Actualizado. Aca esta la tabla corregida...

Iteracion 4 - Enriquecimiento:
Yo: Ahora marca cuales estan en produccion.
IA: Aca esta con el estado de produccion:
    | Ecosistema | Total | En Prod | No Prod |
    |------------|-------|---------|---------|
    | Pagos      | 7     | 7       | 0       |
    | Core       | 13    | 10      | 3       |
    ...
```

**Resultado**

- Documentacion estructurada y validada
- Facil de corregir errores en el camino
- Conocimiento que se construye colaborativamente

## Combinando los Patrones: El Flujo Completo

Asi es como estos patrones trabajan juntos en un proyecto real:

```
Fase 1: Discovery (Flipped Interaction)
IA pregunta -> Vos respondes
Output: Contexto, riesgos, dependencias

        |
        v

Fase 2: Verificacion (Cognitive Verifier)
IA genera queries -> Vos ejecutas -> IA analiza
Output: Inventario verificado, assessment

        |
        v

Fase 3: Refinamiento (Iterative Refinement)
Lista -> Categorizacion -> Correccion -> Enriquecimiento
Output: Documentacion final, plan de accion
```

**Proceso antes que codigo.**

## Lo Que Obtuve Usando Estos Patrones

En mi caso de migracion, despues de aplicar estos patrones obtuve:

- **Risk Assessment** — Matriz de riesgos con niveles (alto/medio/bajo)
- **Inventario Verificado** — Conteos exactos de clients, APIs, scopes, secrets
- **Mapa de Dependencias** — Que API llama a que API
- **Categorizacion** — APIs agrupadas por ecosistema de negocio
- **Plan de Migracion** — Orden de migracion, estrategia, rollback plan
- **Queries Reutilizables** — Scripts SQL para verificar estado pre y post migracion

Todo esto **antes de escribir una sola linea de codigo de migracion**.

## Por que estos patrones?

Existen decenas de patrones documentados en prompt engineering. Elegi estos tres porque:

- Son aplicables a cualquier dominio — no son especificos de codigo
- No requieren tools especiales — funcionan en cualquier chat
- Generan artifacts utiles — documentacion, queries, checklists
- Escalan con la complejidad — sirven para tareas simples y proyectos grandes

No son los unicos, pero son los que me dieron resultados consistentes.

## Protocolo: Probalo en tu proximo proyecto

1. Abri un chat y describi tu problema en una oracion
2. Pedi: _"Antes de darme una solucion, haceme 10 preguntas para entender mi situacion"_
3. Responde cada pregunta
4. Pedi que genere queries o validaciones que puedas ejecutar
5. Ejecutalas y comparti los resultados
6. Itera hasta tener claridad

**Tiempo:** 1-2 horas. **Resultado:** Documentacion, plan, y claridad que te ahorra dias.

## Tips Practicos

**1. Arranca con expectativas claras**

```
"Estoy trabajando en X. Antes de empezar, haceme preguntas
para entender mi situacion."
```

**2. Da feedback estructurado**

```
"Aca estan los resultados en formato tabla:
| Columna1 | Columna2 |
|----------|----------|
| Valor1   | Valor2   |"
```

**3. Pedi outputs incrementales**

```
"Construyamos esto paso a paso. Primero dame el outline,
lo valido y seguimos."
```

**4. Usa la IA como generador de checklists**

```
"Que preguntas deberia responder antes de empezar esta migracion?"
```

**5. Mantene un resumen vivo**

```
"Resumime lo que sabemos hasta ahora antes de continuar."
```

## El contraste

**Sin estos patrones:** Respuestas genericas, documentacion que nunca haces, errores que repetis, horas perdidas.

**Con estos patrones:** Soluciones especificas, documentacion que se genera sola, claridad antes de escribir codigo.

## Conclusion

La diferencia entre usar la IA como un buscador glorificado y usarla como un copiloto de pensamiento es una sola cosa: el proceso.

- **Flipped Interaction** — Vos respondes, la IA pregunta
- **Cognitive Verifier** — Vos verificas, la IA analiza
- **Iterative Refinement** — Vos corregis, la IA estructura

**No es sobre el prompt perfecto. Es sobre como pensas.**

Si te sirvio, compartilo. Si no estas de acuerdo, mejor — hace tu propio research.

*Nota: Los ejemplos estan sanitizados y no representan datos reales de ninguna empresa.*
