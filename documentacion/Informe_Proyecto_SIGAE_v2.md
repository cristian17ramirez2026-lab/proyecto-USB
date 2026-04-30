# Facultad de Ingenierias
## Programa de Ingenieria de Sistemas

---

# Sistema de Gestion de Activos Empresariales — SIGAE

**Presentado por:** Cristian Rafael Ramirez Romero

**Grupo:** P15 – P29

**Tutor:** Jonathan Ruiz

**Evidencia del curso de Practica Profesional**

Barranquilla – Colombia, Abril de 2026

---

## Historial de Cambios

| Revision | Fecha | Item | Descripcion del cambio | Responsable |
|----------|-------|------|------------------------|-------------|
| 1.0 | 20/03/2026 | Documento | Elaboracion inicial del resumen del proyecto, incluyendo problema, objetivos, alcance, cronograma y presupuesto | Cristian Ramirez Romero |
| 2.0 | 30/04/2026 | Documento completo | Desarrollo integral de todas las secciones: analisis, diseno, modelado, construccion, pruebas, aspectos eticos y conclusiones | Cristian Ramirez Romero |

---

# 1. Proyecto de Producto de Software

El presente proyecto corresponde al diseno y desarrollo de SIGAE (Sistema de Gestion de Activos Empresariales), una solucion tecnologica orientada a optimizar la administracion, el control y la trazabilidad de los activos fisicos y tecnologicos dentro de una organizacion.

La idea de este proyecto nacio al observar de primera mano como muchas empresas medianas siguen llevando el control de sus equipos, mobiliario y recursos tecnologicos en hojas de calculo o incluso en cuadernos fisicos. Esto genera todo tipo de problemas: se pierden equipos, nadie sabe quien tiene asignado que laptop, los mantenimientos se olvidan y cuando llega una auditoria interna, armar un reporte confiable se vuelve una tarea de dias.

SIGAE busca resolver eso. Es una plataforma web que centraliza toda la informacion de los activos de la empresa en un solo lugar, con control de acceso por roles, trazabilidad completa de asignaciones y devoluciones, y generacion de reportes en tiempo real. Se desarrollo usando tecnologias modernas: Django y Django REST Framework en el backend, React.js con Bootstrap en el frontend, y SQLite como base de datos para el entorno de desarrollo.

## 1.1 Identificacion y Contexto del Problema

Uno de los desafios mas recurrentes en las organizaciones medianas y grandes tiene que ver con la administracion ineficiente de sus activos empresariales. En muchos casos, el control de estos recursos se sigue haciendo con procesos manuales, registros fisicos, hojas de calculo o sistemas aislados que no garantizan ni la integridad ni la disponibilidad de la informacion.

He podido constatar esta situacion en diferentes contextos. Por ejemplo, en una empresa con 20 sedes distribuidas en distintas ciudades de Colombia, cada sede lleva su propio inventario de forma independiente. Cuando la gerencia necesita saber cuantos computadores hay en total, o cuantos estan danados, tiene que pedir la informacion a cada sede por separado, consolidarla manualmente y rezar para que los datos esten actualizados. Esto no solo es ineficiente, sino que genera riesgos financieros reales: activos que se pierden sin que nadie se de cuenta, equipos que se deterioran por falta de mantenimiento preventivo, y duplicidad de compras porque no se sabe que ya se tiene.

Desde una perspectiva estrategica, la adecuada gestion de activos no solo impacta la eficiencia operativa, sino tambien la sostenibilidad financiera de la organizacion. Permite maximizar la vida util de los bienes, reducir costos por perdidas o deterioro, y mejorar la planificacion presupuestal.

En este contexto, surge la necesidad de implementar una solucion tecnologica que integre en una sola plataforma todos los procesos relacionados con la gestion de activos empresariales.

### 1.1.1 Analisis de Riesgo

El analisis de riesgos es una fase que no se puede saltar en ningun proyecto de software serio. Permite identificar de manera anticipada los posibles eventos o factores que puedan afectar el desarrollo, la implementacion y la puesta en marcha del sistema. Sin este analisis, uno termina apagando incendios en lugar de prevenirlos.

Para este proyecto, se realizo una identificacion sistematica de riesgos considerando factores tecnicos, operativos y de infraestructura, seguida de una estimacion cuantitativa de probabilidad e impacto.

#### 1.1.1.1 Identificacion de Riesgos

| Codigo | Riesgo identificado | Descripcion |
|--------|---------------------|-------------|
| R1 | Complejidad de la arquitectura frontend-backend separada | El sistema integra Django como API REST y React como SPA independiente, lo que puede generar dificultades en la comunicacion entre servicios, manejo de CORS y sincronizacion de estados |
| R2 | Dependencia del entorno de desarrollo local | El funcionamiento del sistema depende de la correcta configuracion de Node.js, Python, pip y npm, por lo que errores en la configuracion pueden bloquear el avance |
| R3 | Curva de aprendizaje con Django REST Framework | Aunque Django es un framework maduro, el uso de serializers, viewsets, permisos personalizados y JWT requiere un periodo de adaptacion que puede impactar los tiempos |
| R4 | Integracion de autenticacion JWT entre frontend y backend | Pueden presentarse fallos en la implementacion del flujo de tokens: obtencion, refresco, expiracion y manejo de sesiones en React |
| R5 | Perdida o inconsistencia de datos durante el desarrollo | Durante las migraciones de Django, cambios en modelos o pruebas destructivas, existe riesgo de perder datos de ejemplo o generar inconsistencias |

#### 1.1.1.2 Estimacion de Riesgos

| ID | Riesgo | Probabilidad (1-5) | Impacto (1-5) | Nivel (PxI) | Estrategia de Mitigacion |
|----|--------|---------------------|---------------|-------------|--------------------------|
| R1 | Arquitectura frontend-backend separada | 3 | 4 | 12 | Definir contratos de API claros desde el inicio. Usar Postman para probar endpoints antes de integrar con React. Configurar CORS correctamente desde el primer dia |
| R2 | Dependencia del entorno local | 2 | 3 | 6 | Documentar paso a paso la configuracion del entorno. Mantener un archivo requirements.txt y package.json actualizados. Usar .gitignore para evitar subir archivos innecesarios |
| R3 | Curva de aprendizaje DRF | 3 | 3 | 9 | Dedicar la primera semana a estudiar la documentacion oficial de DRF. Empezar con endpoints simples (CRUD basico) antes de implementar logica compleja como asignaciones |
| R4 | Integracion JWT | 3 | 4 | 12 | Implementar la autenticacion como primer modulo del backend. Usar la libreria djangorestframework-simplejwt que ya maneja el flujo completo. Probar con Postman antes de integrar |
| R5 | Perdida de datos | 2 | 5 | 10 | Usar Git para versionar todo el codigo. Crear datos de ejemplo mediante un script de inicializacion (DB.init) que se pueda ejecutar en cualquier momento. Nunca modificar migraciones ya aplicadas |

**Resultado del analisis:** Los riesgos R1 y R4 presentan el nivel mas alto (12), lo cual tiene sentido porque la comunicacion entre frontend y backend es el punto mas critico de cualquier arquitectura separada. El riesgo R5 tambien es significativo por su alto impacto (5), aunque su probabilidad es baja gracias al uso de Git. Los riesgos R2 y R3 se mantienen en nivel medio y se mitigan con documentacion y estudio previo.

### 1.1.2 Identificacion del Problema

El problema central puede resumirse asi: las organizaciones no tienen una forma eficiente, centralizada y segura de saber que activos tienen, donde estan, quien los tiene y en que estado se encuentran.

Esta problematica se manifiesta concretamente en:

- **Desconocimiento del inventario real:** No se sabe con certeza cuantos activos hay disponibles en cada sede.
- **Falta de trazabilidad:** No existe un historial de quien tuvo cada equipo, cuando se asigno y cuando se devolvio.
- **Omision de mantenimientos:** Sin un sistema que alerte, los mantenimientos preventivos simplemente se olvidan.
- **Perdida de bienes:** Equipos que desaparecen sin que nadie pueda rastrear al ultimo responsable.
- **Reportes tardios e imprecisos:** Generar un informe de inventario toma dias de trabajo manual y el resultado no es confiable.
- **Dificultades en auditorias:** Sin datos centralizados, responder a una auditoria interna o externa se convierte en un proceso caótico.

La pregunta de investigacion que guia este proyecto es:

> Como desarrollar un sistema de gestion de activos empresariales que permita optimizar el control, seguimiento y trazabilidad de los recursos organizacionales mediante una plataforma web centralizada, segura y escalable?

## 1.2 Proposito, Alcance y Objetivo del Proyecto

### 1.2.1 Proposito

El proposito de este proyecto es disenar, desarrollar e implementar un sistema web llamado SIGAE que permita a una organizacion administrar de forma centralizada todos sus activos fisicos y tecnologicos.

No se trata simplemente de hacer un CRUD bonito. La idea es construir una herramienta que realmente resuelva problemas del dia a dia: que el jefe de TI pueda saber en 10 segundos cuantos laptops disponibles hay en la sede de Medellin, que el operador de Cali pueda registrar una asignacion sin llamar a Bogota, y que el gerente pueda generar un reporte consolidado de todo el inventario con un clic.

El proyecto llega hasta la implementacion de un producto de software funcional, seguro y escalable, accesible desde cualquier navegador web.

### 1.2.2 Alcance

El alcance comprende el analisis, diseno, desarrollo, implementacion y validacion de la plataforma SIGAE. Especificamente:

**Lo que SI incluye:**
- Modulo de autenticacion con JWT y control de acceso por roles (ADMIN / OPERADOR)
- Modulo de gestion de activos: registro, edicion, consulta, clasificacion, busqueda y filtrado
- Modulo de gestion de empleados: CRUD completo con baja y reactivacion
- Modulo de asignaciones: asignar activos a empleados, registrar devoluciones, historial completo
- Modulo de organizacion: gestion de sedes (20 sedes colombianas) y departamentos (10 departamentos)
- Modulo de reportes: por estado, por sede, por empleado, con exportacion CSV
- Modulo de administracion: gestion de usuarios y log de actividad (solo ADMIN)
- Documentacion tecnica y funcional completa

**Lo que NO incluye:**
- Modulos de nomina, contabilidad o facturacion
- Integracion con sistemas ERP externos
- Aplicacion movil nativa
- Gestion documental avanzada
- Modulo de mantenimientos programados (queda como trabajo futuro)

**Resultados esperados:**

| Resultado | Descripcion |
|-----------|-------------|
| Sistema web funcional | Plataforma accesible desde navegador con todas las funcionalidades descritas |
| Modulo de autenticacion | Control de acceso mediante JWT, roles y permisos diferenciados |
| Modulo de gestion de activos | CRUD completo con validaciones de serial unico, estados y valores |
| Modulo de asignaciones | Asignacion y devolucion con trazabilidad de fechas y responsables |
| Modulo de reportes | Informes por estado, sede y empleado con exportacion CSV |
| Base de datos | Modelo relacional normalizado con integridad referencial |
| Documentacion | Manual tecnico, manual de usuario, informe del proyecto |
| Repositorio | Codigo fuente versionado en GitHub |

### 1.2.3 Objetivo General

Desarrollar e implementar un sistema web integral para la gestion de activos empresariales, denominado SIGAE, que permita optimizar el control, la administracion, el seguimiento y la trazabilidad del ciclo de vida de los recursos fisicos y tecnologicos de una organizacion, mediante una plataforma centralizada, segura, escalable y orientada a mejorar la eficiencia operativa y la toma de decisiones administrativas.

#### 1.2.3.1 Objetivos Especificos

1. **Analizar los procesos actuales de gestion de activos:** Identificar y documentar los procesos administrativos utilizados actualmente para el control de activos, reconociendo falencias y oportunidades de mejora que sirvan como base para el diseno del sistema.

2. **Disenar la arquitectura funcional y tecnica del sistema:** Definir la estructura logica y tecnologica del software, incluyendo la arquitectura de tres capas (presentacion, logica de negocio, datos), el modelo de base de datos, los modulos funcionales y los mecanismos de seguridad.

3. **Desarrollar el modulo de gestion de activos:** Implementar las funcionalidades de registro, consulta, actualizacion, clasificacion y eliminacion de activos con validaciones de integridad (serial unico, valor positivo, proteccion contra eliminacion de activos asignados).

4. **Implementar el modulo de asignacion y seguimiento:** Desarrollar el flujo completo de asignacion de activos a empleados y registro de devoluciones, con control de estados automatico y trazabilidad de fechas.

5. **Desarrollar el modulo de reportes y auditoria:** Construir un sistema de reportes por estado, sede y empleado con exportacion CSV, y un log de actividad que registre todas las operaciones del sistema.

6. **Implementar el sistema de seguridad y control de acceso:** Configurar autenticacion JWT, roles diferenciados (ADMIN/OPERADOR) y permisos granulares que restrinjan operaciones segun el perfil del usuario.

7. **Realizar pruebas y validacion del sistema:** Ejecutar pruebas unitarias en el backend (serializers, permisos), pruebas funcionales en el frontend y pruebas de integracion entre ambas capas.

8. **Elaborar la documentacion tecnica y funcional:** Documentar la arquitectura, el modelo de datos, los endpoints de la API, los manuales de usuario y la guia de instalacion.

## 1.3 Suposiciones y Restricciones

### 1.3.1 Suposiciones

Para el desarrollo de SIGAE se establecieron los siguientes supuestos, que es importante dejar claros porque condicionan muchas decisiones de diseno:

En primer lugar, se asume que la organizacion beneficiaria esta dispuesta a proporcionar informacion sobre su estructura organizacional: cuantas sedes tiene, como se organizan los departamentos, que tipos de activos manejan y como es el flujo actual de asignaciones. Sin esta informacion, el diseno del sistema seria generico y poco util.

Se supone tambien que los usuarios finales tendran acceso a equipos con conexion a internet y navegadores web actualizados (Chrome, Firefox, Edge en sus versiones recientes). Esto es razonable dado que el sistema esta pensado para entornos corporativos donde estos recursos son estandar.

Desde la perspectiva tecnica, se asume la disponibilidad de un entorno de desarrollo estable con las siguientes herramientas:

- Python 3.12+ con pip para el backend
- Node.js 20+ con npm para el frontend
- Git para control de versiones
- Un editor de codigo (VS Code o similar)

Se parte del supuesto de que el cronograma de 16 semanas de practica profesional sera suficiente para completar todas las fases del proyecto, siempre y cuando no haya cambios significativos en el alcance.

Finalmente, el proyecto se enfoca exclusivamente en la gestion de activos empresariales. Quedan fuera del alcance modulos de nomina, contabilidad general, facturacion electronica, gestion documental avanzada e integracion con ERP externos.

### 1.3.2 Restricciones

**Restriccion de tiempo:** El proyecto debe completarse en 16 semanas, incluyendo analisis, diseno, desarrollo, pruebas y documentacion. Esto obliga a priorizar funcionalidades y dejar algunas mejoras como trabajo futuro.

**Restriccion de presupuesto:** El presupuesto total estimado es de $980.000 COP, lo cual limita las opciones de infraestructura a servicios gratuitos o de bajo costo (SQLite en desarrollo, hosting VPS basico para produccion).

**Restriccion de equipo:** El desarrollo es individual, lo que significa que una sola persona asume todos los roles (analista, disenador, desarrollador, tester, documentador). Esto requiere una gestion del tiempo muy disciplinada.

**Restriccion tecnologica:** Se utiliza el stack Django + React, lo cual es una decision firme que no cambiara durante el proyecto. Cualquier funcionalidad debe ser implementable con estas tecnologias.

## 1.4 Entregables del Proyecto

| Item | Entregable | Descripcion |
|------|-----------|-------------|
| 1 | Documento de requerimientos | Especificacion de 20 requerimientos funcionales y 10 no funcionales |
| 2 | Documento de analisis y diseno | Arquitectura del sistema, diagramas UML, modelo de datos |
| 3 | Modelo de base de datos | Diagrama entidad-relacion, diccionario de datos, modelo relacional |
| 4 | Codigo fuente del backend | API REST con Django: modelos, serializers, views, URLs, permisos, autenticacion JWT |
| 5 | Codigo fuente del frontend | SPA con React: 13 paginas, 4 componentes, contexto de autenticacion, servicios |
| 6 | Base de datos implementada | SQLite con datos de ejemplo: 20 sedes, 10 departamentos, 50+ empleados, 100+ activos |
| 7 | Modulo de autenticacion | Login con JWT, roles ADMIN/OPERADOR, filtrado por sede |
| 8 | Modulo de gestion de activos | CRUD con validaciones, busqueda, filtros, exportacion CSV |
| 9 | Modulo de asignaciones | Asignacion, devolucion, historial, cambio automatico de estados |
| 10 | Modulo de reportes | Reportes por estado, sede, empleado con tabs y acordeones |
| 11 | Manual de usuario | Guia funcional con capturas de pantalla |
| 12 | Manual tecnico | Documentacion de instalacion, configuracion, estructura del codigo |
| 13 | Informe final | Este documento |

## 1.5 Cronograma y Resumen del Presupuesto

### 1.5.1 Cronograma

| Fase | Semanas | Periodo | Actividades principales |
|------|---------|---------|------------------------|
| Analisis | 1-2 | Mar 2026 | Levantamiento de requerimientos, identificacion de actores, definicion de alcance, analisis de riesgos |
| Diseno | 3-4 | Mar 2026 | Arquitectura del sistema, modelo de datos, diagramas UML, diseno de interfaces |
| Sprint 1: Backend base | 5-7 | Abr 2026 | Modelos Django, API REST, autenticacion JWT, permisos, serializers con validaciones |
| Sprint 2: Frontend base | 8-10 | Abr 2026 | Login, Dashboard, CRUD de Activos y Empleados, Layout con sidebar |
| Sprint 3: Funcionalidades avanzadas | 11-13 | May 2026 | Asignaciones, Sedes, Departamentos, Reportes, Usuarios, Log de actividad |
| Pruebas y correccion | 14-15 | May 2026 | Pruebas unitarias, funcionales, correccion de permisos, validacion de dependencias |
| Documentacion y entrega | 16 | Jun 2026 | Informe final, manuales, despliegue en GitHub, sustentacion |

### 1.5.2 Presupuesto

| Concepto | Valor (COP) |
|----------|-------------|
| Servicio de internet (4 meses) | $320.000 |
| Energia electrica (4 meses) | $160.000 |
| Hosting VPS / servidor | $200.000 |
| Dominio web | $80.000 |
| Papeleria e impresion | $70.000 |
| Gastos de sustentacion e imprevistos | $150.000 |
| **TOTAL ESTIMADO** | **$980.000** |


---

# 2. Documentos de Referencia

## 2.1 Referencias

| Referencia | Titulo | Autor | Ano |
|------------|--------|-------|-----|
| [R1] | Django Documentation (v5.x) | Django Software Foundation | 2024 |
| [R2] | Django REST Framework Documentation | Tom Christie et al. | 2024 |
| [R3] | React Documentation (v19) | Meta Platforms, Inc. | 2024 |
| [R4] | Ingenieria del Software: Un Enfoque Practico (8va ed.) | Roger S. Pressman, Bruce R. Maxim | 2014 |
| [R5] | Clean Code: A Handbook of Agile Software Craftsmanship | Robert C. Martin | 2008 |
| [R6] | ISO 55000:2014 — Asset Management: Overview, Principles and Terminology | ISO/TC 251 | 2014 |
| [R7] | JSON Web Token (JWT) — RFC 7519 | Internet Engineering Task Force (IETF) | 2015 |
| [R8] | Bootstrap 5 Documentation | Bootstrap Team | 2024 |

## 2.2 Estandares

| Estandar | Titulo | Organizacion | Ano |
|----------|--------|-------------|-----|
| [E1] | ISO/IEC/IEEE 29148:2011 — Systems and Software Engineering: Life Cycle Processes — Requirements Engineering | IEEE | 2011 |
| [E2] | ISO/IEC 27001:2022 — Information Security Management Systems | ISO/IEC | 2022 |
| [E3] | ISO 55000:2014 — Asset Management: Overview, Principles and Terminology | ISO | 2014 |
| [E4] | OWASP Top 10:2021 — Top 10 Web Application Security Risks | OWASP Foundation | 2021 |
| [E5] | PEP 8 — Style Guide for Python Code | Python Software Foundation | 2001 |
| [E6] | Ley 1581 de 2012 — Regimen General de Proteccion de Datos Personales | Congreso de Colombia | 2012 |

---

# 3. Definiciones y Acronimos

## 3.1 Definiciones

| Termino | Definicion | Referencia |
|---------|-----------|------------|
| Activo empresarial | Bien fisico o tecnologico de propiedad de la organizacion que posee valor economico y es utilizado en sus operaciones. Incluye computadores, monitores, mobiliario, equipos de red, entre otros | [R6] |
| Asignacion | Acto formal de vincular un activo a un empleado responsable, registrando la fecha, las observaciones y estableciendo una relacion de custodia temporal | Definicion propia |
| Trazabilidad | Capacidad de reconstruir el historial completo de un activo: todos sus movimientos, responsables, cambios de estado y fechas asociadas | [R6] |
| API REST | Interfaz de programacion de aplicaciones basada en el protocolo HTTP que permite la comunicacion entre sistemas mediante operaciones estandarizadas (GET, POST, PUT, DELETE) sobre recursos identificados por URLs | [R2] |
| SPA (Single Page Application) | Aplicacion web que carga una unica pagina HTML y actualiza dinamicamente su contenido sin recargar la pagina completa, mejorando la experiencia del usuario | [R3] |
| ORM (Object-Relational Mapping) | Tecnica de programacion que permite interactuar con la base de datos relacional utilizando objetos del lenguaje de programacion en lugar de sentencias SQL directas | [R1] |
| JWT (JSON Web Token) | Estandar abierto (RFC 7519) que define un formato compacto y autocontenido para transmitir informacion de forma segura entre partes como un objeto JSON firmado digitalmente | [R7] |
| Sede | Ubicacion fisica de la organizacion donde operan empleados y se encuentran activos. Cada sede tiene su propia direccion, ciudad y telefono de contacto | Definicion propia |

## 3.2 Acronimos

| Acronimo | Significado |
|----------|------------|
| SIGAE | Sistema de Gestion de Activos Empresariales |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| JWT | JSON Web Token |
| RBAC | Role-Based Access Control |
| CRUD | Create, Read, Update, Delete |
| SPA | Single Page Application |
| DRF | Django REST Framework |
| MVT | Model-View-Template |
| ORM | Object-Relational Mapping |
| CSV | Comma-Separated Values |
| UML | Unified Modeling Language |
| FK | Foreign Key (Llave Foranea) |
| PK | Primary Key (Llave Primaria) |
| CORS | Cross-Origin Resource Sharing |

---

# 4. Resumen del Trabajo Requerido

El trabajo requerido para este proyecto abarca el ciclo completo de desarrollo de software: desde el levantamiento de requerimientos hasta el despliegue y documentacion del sistema.

El esfuerzo principal se concentra en tres grandes bloques. El primero es el backend, que implica disenar el modelo de datos, implementar la API REST con Django, configurar la autenticacion JWT y desarrollar la logica de negocio (validaciones, permisos, transacciones atomicas para asignaciones). El segundo bloque es el frontend, que requiere construir una SPA completa en React con 13 paginas funcionales, un sistema de navegacion por roles, formularios con validacion en tiempo real y exportacion de reportes. El tercer bloque es la documentacion, que incluye este informe, los diagramas UML, el diccionario de datos y los manuales.

Las principales suposiciones que condicionan el esfuerzo son: desarrollo individual (una persona para todos los roles), plazo de 16 semanas, y uso exclusivo del stack Django + React. Las restricciones mas relevantes son el tiempo limitado y la necesidad de priorizar funcionalidades core sobre funcionalidades deseables.

El criterio de satisfaccion es claro: el sistema debe permitir a un administrador gestionar activos, empleados, sedes y departamentos de forma centralizada, y a un operador realizar asignaciones y devoluciones dentro de su sede, todo con trazabilidad completa y exportacion de reportes.

## 4.1 Organizacion y Control del Proyecto

| Nombre y Apellidos | Rol en el Proyecto | Responsabilidades |
|--------------------|-------------------|-------------------|
| Cristian Rafael Ramirez Romero | Desarrollador Full-Stack y Lider del Proyecto | Levantamiento de requerimientos, diseno de arquitectura, modelado de datos, desarrollo del backend (Django REST API), desarrollo del frontend (React SPA), implementacion de seguridad (JWT, RBAC), ejecucion de pruebas, documentacion tecnica y funcional, despliegue en GitHub |
| Jonathan Ruiz | Tutor Academico | Supervision del proceso metodologico, revision de avances semanales, retroalimentacion tecnica sobre decisiones de diseno, validacion de entregables, evaluacion final del proyecto |

---

# 5. Proceso de Desarrollo de Software

## 5.1 Entorno del Proceso de Software

Para este proyecto se selecciono un **modelo de desarrollo iterativo incremental** con elementos de la metodologia **Scrum** adaptada para desarrollo individual. La eleccion de este modelo se justifica por varias razones practicas:

Primero, el proyecto tiene un alcance bien definido pero con multiples modulos que pueden desarrollarse de forma independiente (activos, empleados, asignaciones, reportes, etc.). Esto se presta naturalmente para un enfoque incremental donde cada sprint entrega un modulo funcional.

Segundo, al ser un desarrollo individual, no tiene sentido aplicar Scrum de forma ortodoxa con daily standups o sprint reviews formales. Lo que si se adopta es la filosofia de sprints con duracion fija (3 semanas), backlog priorizado y entregables funcionales al final de cada iteracion.

Tercero, el modelo iterativo permite incorporar retroalimentacion del tutor al final de cada sprint, ajustando prioridades si es necesario sin replantear todo el proyecto.

**Fases del proceso:**

| Fase | Actividades | Entregable |
|------|------------|-----------|
| Analisis (Sem 1-2) | Identificacion de actores, levantamiento de requerimientos funcionales y no funcionales, analisis de riesgos | Documento de requerimientos |
| Diseno (Sem 3-4) | Arquitectura de 3 capas, modelo relacional, diagramas UML, diseno de interfaces | Documento de diseno |
| Sprint 1 (Sem 5-7) | Backend: modelos, serializers, views, URLs, JWT, permisos | API REST funcional |
| Sprint 2 (Sem 8-10) | Frontend: Login, Dashboard, Activos, Empleados, Layout | SPA con modulos base |
| Sprint 3 (Sem 11-13) | Asignaciones, Sedes, Departamentos, Reportes, Usuarios, Actividad | Sistema completo |
| Pruebas (Sem 14-15) | Unitarias, funcionales, integracion, correccion de bugs | Sistema validado |
| Entrega (Sem 16) | Documentacion final, despliegue, sustentacion | Proyecto completo |

**Herramientas tecnologicas:**

| Categoria | Herramienta | Version | Proposito |
|-----------|------------|---------|-----------|
| Lenguaje backend | Python | 3.12+ | Logica de negocio, API |
| Framework backend | Django | 5.x | Estructura MVT, ORM, admin |
| API REST | Django REST Framework | 3.x | Serializers, viewsets, permisos |
| Autenticacion | djangorestframework-simplejwt | 5.x | Tokens JWT |
| Lenguaje frontend | JavaScript (ES6+) | - | Logica de interfaz |
| Framework frontend | React | 19.2 | Componentes, estado, routing |
| Build tool | Vite | 8.0 | Compilacion y hot reload |
| CSS Framework | Bootstrap | 5.3 | Estilos responsivos |
| Routing | React Router DOM | 7.x | Navegacion SPA |
| Base de datos | SQLite | 3.x | Almacenamiento (desarrollo) |
| Control de versiones | Git + GitHub | 2.x | Versionamiento y respaldo |
| IDE | VS Code / Kiro | - | Edicion de codigo |

## 5.2 Analisis de Software

### 5.2.1 Definicion de Roles o Actores

| Nombre del Rol | Descripcion |
|----------------|-------------|
| Administrador (ADMIN) | Es el responsable general de la organizacion o del area de TI. Necesita tener visibilidad completa sobre todos los activos de todas las sedes, poder crear la estructura organizacional (sedes, departamentos), gestionar usuarios del sistema y acceder a reportes consolidados. En el contexto del problema, es la persona que hoy tiene que llamar a cada sede para armar un inventario y que necesita una herramienta que le de esa informacion en tiempo real |
| Operador (OPERADOR) | Es el personal de cada sede encargado del control de activos a nivel local. Necesita poder registrar activos nuevos que llegan a su sede, asignarlos a empleados, registrar devoluciones y consultar el inventario de su sede. No deberia poder modificar la estructura organizacional ni ver datos de otras sedes. En el contexto del problema, es quien hoy lleva el control en una hoja de Excel local |
| Sistema | Representa los procesos automaticos que el software ejecuta sin intervencion humana: validacion de datos al guardar (serial unico, valor positivo), cambio automatico de estado al asignar/devolver un activo, registro de operaciones en el log de actividad, y proteccion de integridad referencial al intentar eliminar registros con dependencias |

### 5.2.2 Analisis de Requerimientos de Software

La tecnica principal utilizada para la recoleccion de requerimientos fue el **analisis de procesos existentes**. Esto consistio en:

1. **Observacion directa** de como se lleva actualmente el control de activos en organizaciones similares: hojas de calculo compartidas, formatos fisicos de prestamo, correos electronicos para solicitar equipos.

2. **Entrevistas informales** con personal administrativo y de TI para entender sus frustraciones con el proceso actual y sus expectativas de un sistema digital.

3. **Revision de documentacion** existente: formatos de inventario, actas de entrega de equipos, reportes de auditoria.

4. **Benchmarking** de sistemas similares en el mercado (GLPI, Snipe-IT, AssetTiger) para identificar funcionalidades estandar y buenas practicas.

A partir de este analisis, se identificaron 20 requerimientos funcionales y 10 no funcionales que se detallan a continuacion.

### 5.2.3 Requerimientos Funcionales

Los requerimientos se redactan como historias de usuario siguiendo el formato recomendado por la norma ISO/IEC/IEEE 29148:

| Ref | Requerimiento |
|-----|--------------|
| RF01 | Yo como usuario del sistema deseo iniciar sesion con mi nombre de usuario y contrasena para acceder a las funcionalidades segun mi rol asignado |
| RF02 | Yo como Administrador deseo registrar nuevos activos ingresando nombre, descripcion, tipo, serial, valor, fecha de compra, sede y departamento para mantener el inventario actualizado |
| RF03 | Yo como Administrador deseo editar la informacion de cualquier activo existente para corregir datos erroneos o actualizar su estado actual |
| RF04 | Yo como Administrador deseo eliminar activos que no esten actualmente asignados a ningun empleado para depurar registros obsoletos del inventario |
| RF05 | Yo como Operador deseo buscar activos por nombre, numero de serial o tipo para localizar rapidamente un recurso especifico dentro del inventario |
| RF06 | Yo como Operador deseo filtrar la lista de activos por estado (Disponible, Asignado, En reparacion) para conocer la disponibilidad real de recursos |
| RF07 | Yo como Administrador deseo registrar empleados con sus datos personales (nombre, apellido, cedula), sede, departamento y cargo para vincularlos al sistema de asignaciones |
| RF08 | Yo como Administrador deseo dar de baja a un empleado que ya no pertenece a la organizacion, y poder reactivarlo si regresa, para mantener el directorio actualizado |
| RF09 | Yo como Operador deseo asignar un activo con estado Disponible a un empleado de mi sede, registrando observaciones opcionales, para formalizar el prestamo del recurso |
| RF10 | Yo como Operador deseo registrar la devolucion de un activo previamente asignado para que vuelva a estar disponible en el inventario |
| RF11 | Yo como Administrador deseo crear, editar y eliminar sedes con su nombre, ciudad, direccion y telefono para definir la estructura geografica de la organizacion |
| RF12 | Yo como Administrador deseo crear, editar y eliminar departamentos vinculados a una sede para clasificar las areas funcionales de la organizacion |
| RF13 | Yo como Administrador deseo generar reportes de activos clasificados por estado (disponibles, asignados, en reparacion) para tener una vision clara del inventario |
| RF14 | Yo como Operador deseo exportar los datos de activos en formato CSV para poder analizarlos en herramientas externas como Excel |
| RF15 | Yo como Administrador deseo crear nuevos usuarios del sistema asignandoles un rol (Admin u Operador) y una sede especifica para controlar quien accede a que informacion |
| RF16 | Yo como Administrador deseo consultar el log de actividad del sistema para auditar que operaciones se han realizado, por quien y cuando |
| RF17 | Yo como Operador deseo que el sistema me muestre unicamente los activos y empleados de mi sede asignada para trabajar solo con informacion relevante a mi contexto |
| RF18 | Yo como Sistema debo validar que el numero de serial sea unico al crear o editar un activo para evitar registros duplicados en el inventario |
| RF19 | Yo como Sistema debo impedir la eliminacion de sedes que tengan activos, empleados o departamentos asociados para mantener la integridad referencial de los datos |
| RF20 | Yo como Sistema debo registrar automaticamente cada operacion relevante (creacion, edicion, eliminacion, asignacion, devolucion) en el log de actividad para garantizar la trazabilidad |

### 5.2.4 Requerimientos No Funcionales

| Ref | Tipo | Descripcion |
|-----|------|-------------|
| RNF-01 | Usabilidad | La interfaz del sistema debe ser intuitiva y no requerir capacitacion formal para su uso basico. Un usuario nuevo debe poder registrar un activo en menos de 2 minutos siguiendo el flujo natural de la interfaz |
| RNF-02 | Usabilidad | El sistema debe ser completamente responsivo, adaptandose correctamente a pantallas de escritorio (1920px), tablets (768px) y dispositivos moviles (360px) sin perdida de funcionalidad |
| RNF-03 | Eficiencia | El tiempo de respuesta de cualquier operacion CRUD (crear, leer, actualizar, eliminar) no debe superar los 2 segundos en condiciones normales de uso |
| RNF-04 | Eficiencia | La carga inicial de la aplicacion (SPA) no debe superar los 5 segundos en una conexion de 10 Mbps. El bundle de produccion debe estar optimizado y no superar los 500 KB comprimido |
| RNF-05 | Seguridad | Las contrasenas de los usuarios deben almacenarse cifradas utilizando el algoritmo PBKDF2 con SHA-256 y un salt aleatorio, que es el mecanismo por defecto de Django |
| RNF-06 | Seguridad | El acceso a todos los endpoints de la API debe estar protegido mediante tokens JWT con tiempo de expiracion configurable. Los tokens expirados deben ser rechazados automaticamente |
| RNF-07 | Etica | El sistema debe recopilar unicamente los datos personales estrictamente necesarios para la gestion de activos (nombre, cedula, email, cargo). No se recopilaran datos sensibles como genero, religion, afiliacion politica o informacion medica |
| RNF-08 | Etica | Los datos de los empleados deben ser tratados conforme a los principios de la Ley 1581 de 2012 de Proteccion de Datos Personales de Colombia, garantizando confidencialidad, finalidad y acceso restringido |
| RNF-09 | Regulatorio | El sistema debe cumplir con los principios de la Ley 1273 de 2009 sobre proteccion de la informacion y los datos, implementando controles de acceso, cifrado y registro de actividades |
| RNF-10 | Regulatorio | Todas las operaciones sobre activos deben ser trazables y auditables, generando registros con fecha, usuario responsable y tipo de operacion, conforme a las buenas practicas de control interno |