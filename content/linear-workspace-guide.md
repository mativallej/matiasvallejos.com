# Guia del Workspace de Linear

Documentacion interna para el equipo sobre como usamos Linear para gestionar producto, distribucion y operaciones.

---

## Equipo

| Nombre             | Rol                        | Asignacion principal              |
|--------------------|----------------------------|-----------------------------------|
| Matias Vallejos    | Product / Growth           | Producto, distribucion, estrategia |
| Ezequiel Obreque   | Ops / Supply               | Operaciones, supply, validacion   |
| Lucas Segurola     | Tech / Product             | Desarrollo, producto, integraciones |

---

## Labels

Las labels se usan para categorizar cada issue por **area** y **tipo de trabajo**.

### Por area

| Label           | Descripcion                                                        |
|-----------------|--------------------------------------------------------------------|
| `Product`       | Cambios en el producto (app, UX, features, EULA, etc.)             |
| `Distribution`  | Adquisicion de usuarios, marketing, canales, partnerships           |
| `Ops`           | Operaciones internas, procesos, documentacion, soporte              |
| `Validation`    | Experimentos y tests para validar hipotesis antes de escalar        |

### Por tipo

| Label           | Descripcion                                                        |
|-----------------|--------------------------------------------------------------------|
| `Improvement`   | Mejora sobre algo que ya existe                                     |
| `Experiment`    | Test con fecha de inicio/fin y criterio de exito definido           |
| `Bug`           | Algo que no funciona como deberia                                   |
| `Feature`       | Funcionalidad nueva que no existia                                  |

### Por stakeholder

| Label           | Descripcion                                                        |
|-----------------|--------------------------------------------------------------------|
| `Pros`          | Relacionado con proveedores / supply side                           |
| `Users`         | Relacionado con usuarios finales / demand side                      |

Un issue puede tener **multiples labels**. Ejemplo: una tarea de crear un playbook para proveedores seria `Distribution` + `Improvement` + `Pros`.

---

## Estados (Workflow)

Cada issue pasa por estos estados:

| Estado         | Significado                                                      |
|----------------|------------------------------------------------------------------|
| `Backlog`      | Idea o tarea registrada, sin prioridad asignada todavia           |
| `Todo`         | Priorizada y lista para ser tomada                                |
| `In Progress`  | Alguien esta trabajando activamente en esto                       |
| `In Review`    | Terminado, esperando revision o feedback del equipo               |
| `Done`         | Completado y validado                                             |
| `Cancelled`    | Descartado (se mantiene para historial, no se borra)              |

**Regla**: mover el issue a `In Progress` apenas empezas a trabajar. No dejar issues en `In Progress` si no estas activamente en eso.

---

## Proyectos

Los proyectos agrupan issues relacionados bajo un objetivo comun con fecha de inicio y fin.

| Proyecto                            | Objetivo                                                    | Timeline sugerido |
|-------------------------------------|-------------------------------------------------------------|-------------------|
| Setup Canales de Distribucion       | Tener canales de adquisicion activos (email, WhatsApp, etc.)| 2-4 semanas       |
| Validacion Supply (primeros 5-12)   | Onboardear y testear con los primeros proveedores           | 2-3 semanas       |
| Legal y Compliance                  | EULA, terminos, disclaimers al dia                          | 1-2 semanas       |
| Playbooks Operativos               | Documentar procesos clave de captacion y resolucion         | Ongoing           |

Los proyectos tienen una **barra de progreso** automatica basada en los issues completados. Usala para trackear avance sin necesidad de reuniones de status.

---

## Timelines y Ciclos

- **Ciclos semanales**: cada lunes se define que entra al ciclo de la semana. Si no se completa, vuelve al backlog o se mueve al siguiente ciclo.
- **Due dates**: usar en issues criticos o con dependencias externas. No poner due date en todo, solo donde importa.
- **Proyectos con fecha de fin**: los proyectos de validacion y setup tienen deadline. Si el proyecto se extiende, revisar en equipo si el scope cambio o si hay un blocker.

---

## Asignaciones

- **Cada issue tiene un solo owner**. Si hay colaboracion, el owner coordina.
- **Asignar al crear**: no dejar issues sin asignar en `Todo` o `In Progress`.
- **Reasignar esta bien**: si alguien esta bloqueado o tiene mas capacidad, mover el issue.

### Distribucion inicial sugerida

| Persona          | Foco                                                           |
|------------------|----------------------------------------------------------------|
| Matias           | Distribucion, estrategia de ventas, Google Workspace, WhatsApp |
| Ezequiel         | Documentacion supply, onboarding proveedores, ops              |
| Lucas            | Producto, features, integraciones tecnicas, bugs               |

Esto es flexible. Lo importante es que cada issue tenga un responsable claro.

---

## Buenas practicas

1. **Titulo claro**: que se entienda que hay que hacer sin abrir el issue. Ejemplo: "Configurar Google Workspace para email marketing", no "Email".
2. **Descripcion corta**: contexto minimo necesario + criterio de exito si aplica.
3. **Labels siempre**: al menos una label de area y una de tipo.
4. **No duplicar**: antes de crear, buscar si ya existe algo similar.
5. **Comentar progreso**: si un issue lleva mas de 2 dias, dejar un comentario con el estado actual.
6. **Cerrar lo que no se va a hacer**: mejor cancelar que dejar issues zombies en el backlog.
