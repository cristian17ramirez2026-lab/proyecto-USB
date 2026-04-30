# Facultad de Ingenierias
## Programa de Ingenieria de Sistemas

---

# Sistema de Gestion de Activos Empresariales â€” SIGAE

**Presentado por:** Cristian Rafael Ramirez Romero

**Grupo:** P15 â€“ P29

**Tutor:** Jonathan Ruiz

**Evidencia del curso de Practica Profesional**

Barranquilla â€“ Colombia, Abril de 2026

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
- **Dificultades en auditorias:** Sin datos centralizados, responder a una auditoria interna o externa se convierte en un proceso caÃ³tico.

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
| [R6] | ISO 55000:2014 â€” Asset Management: Overview, Principles and Terminology | ISO/TC 251 | 2014 |
| [R7] | JSON Web Token (JWT) â€” RFC 7519 | Internet Engineering Task Force (IETF) | 2015 |
| [R8] | Bootstrap 5 Documentation | Bootstrap Team | 2024 |

## 2.2 Estandares

| Estandar | Titulo | Organizacion | Ano |
|----------|--------|-------------|-----|
| [E1] | ISO/IEC/IEEE 29148:2011 â€” Systems and Software Engineering: Life Cycle Processes â€” Requirements Engineering | IEEE | 2011 |
| [E2] | ISO/IEC 27001:2022 â€” Information Security Management Systems | ISO/IEC | 2022 |
| [E3] | ISO 55000:2014 â€” Asset Management: Overview, Principles and Terminology | ISO | 2014 |
| [E4] | OWASP Top 10:2021 â€” Top 10 Web Application Security Risks | OWASP Foundation | 2021 |
| [E5] | PEP 8 â€” Style Guide for Python Code | Python Software Foundation | 2001 |
| [E6] | Ley 1581 de 2012 â€” Regimen General de Proteccion de Datos Personales | Congreso de Colombia | 2012 |

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
# Continuacion - Secciones 5.3 a 5.8

## 5.3 Modelado de Software

Para el modelado del sistema se utilizo la notacion UML (Unified Modeling Language), que es el estandar de facto en ingenieria de software para representar la estructura y el comportamiento de un sistema. Cada diagrama fue elaborado de manera que fuera directamente trazable a los requerimientos funcionales definidos en la seccion 5.2.3, y a su vez, al codigo implementado en el sistema final.

La decision de usar UML no fue arbitraria. Cuando uno trabaja solo en un proyecto, es tentador saltarse la fase de modelado y pasar directo al codigo. Sin embargo, la experiencia demuestra que dedicar tiempo a pensar la estructura antes de escribir la primera linea de codigo ahorra mucho mas tiempo del que consume. En este caso, los diagramas sirvieron como guia durante todo el desarrollo y como documentacion para quien necesite entender o mantener el sistema en el futuro.

### 5.3.1 Diagramas de Casos de Uso

Se elaboraron diagramas de casos de uso que cubren la totalidad de los requerimientos funcionales, organizados por los tres actores principales del sistema. A continuacion se presentan los casos de uso mas representativos con su descripcion detallada.

**Caso de Uso 1: Gestionar Activos**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Gestionar Activos |
| Version | V1 |
| Referencia | CU-01 |
| Autor | Cristian Ramirez Romero |
| Fecha | 15/04/2026 |
| Actores | Administrador, Operador |
| Referencias RF | RF02, RF03, RF04, RF05, RF06, RF18 |
| Precondiciones | El usuario debe haber iniciado sesion exitosamente y tener rol ADMIN u OPERADOR. Si es OPERADOR, solo vera activos de su sede asignada |
| Postcondicion | El activo queda registrado, actualizado o eliminado en la base de datos. El log de actividad registra la operacion con fecha, usuario y detalle |

Flujo Normal:

| Paso | Actor | Descripcion |
|------|-------|-------------|
| 1 | Usuario | Selecciona la opcion "Activos" en el menu lateral del sistema |
| 2 | Sistema | Consulta la base de datos y muestra la lista de activos. Si el usuario es OPERADOR, filtra automaticamente por su sede_id. Muestra columnas: nombre, tipo, serial, valor, sede, departamento, estado |
| 3 | Usuario | Hace clic en el boton "+ Nuevo Activo" |
| 4 | Sistema | Despliega un formulario con los campos: nombre (obligatorio), descripcion (opcional), tipo (obligatorio), serial (obligatorio, unico), valor (obligatorio, numerico positivo), fecha de compra (obligatorio), sede (dropdown), departamento (dropdown) |
| 5 | Usuario | Completa todos los campos requeridos y hace clic en "Guardar" |
| 6 | Sistema | Ejecuta las validaciones: verifica que el serial no exista en otro activo, que el valor sea mayor a cero, y que los campos obligatorios esten completos |
| 7 | Sistema | Si las validaciones pasan, crea el registro con estado DISPONIBLE por defecto, registra la operacion en el log de actividad, y muestra una notificacion de exito |
| 8 | Sistema | Actualiza la tabla de activos mostrando el nuevo registro |

Flujos Alternos:
- Si el serial ya existe en otro activo, el sistema muestra el mensaje "Serial duplicado" en rojo y no guarda el registro. El usuario debe corregir el serial.
- Si el valor ingresado es cero o negativo, el sistema muestra "Valor debe ser mayor a 0".
- Si faltan campos obligatorios, el sistema muestra "Complete todos los campos".
- Para edicion: el usuario hace clic en el boton "Editar" de un activo existente, el sistema carga los datos en el formulario, y al guardar ejecuta las mismas validaciones excluyendo el propio registro de la validacion de serial unico.

Excepciones:
- Si la sesion JWT ha expirado, el sistema redirige al login.
- Si ocurre un error de base de datos, el sistema muestra un mensaje generico de error sin exponer detalles tecnicos.

---

**Caso de Uso 2: Asignar y Devolver Activos**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Asignar Activo a Empleado y Registrar Devolucion |
| Version | V1 |
| Referencia | CU-02 |
| Autor | Cristian Ramirez Romero |
| Fecha | 15/04/2026 |
| Actores | Administrador, Operador |
| Referencias RF | RF09, RF10, RF17, RF20 |
| Precondiciones | Debe existir al menos un activo con estado DISPONIBLE y al menos un empleado registrado en el sistema. Para operadores, ambos deben pertenecer a su sede |
| Postcondicion | Para asignacion: el activo cambia a estado ASIGNADO y se crea un registro de asignacion con fecha automatica. Para devolucion: el activo vuelve a DISPONIBLE y se registra la fecha de devolucion |

Flujo Normal (Asignacion):

| Paso | Actor | Descripcion |
|------|-------|-------------|
| 1 | Usuario | Accede al modulo "Asignaciones" desde el menu lateral |
| 2 | Sistema | Muestra el formulario de nueva asignacion en la parte superior y la tabla de historial de asignaciones debajo. Los dropdowns de activos solo muestran los que tienen estado DISPONIBLE |
| 3 | Usuario | Selecciona un activo del dropdown "Activo disponible" |
| 4 | Usuario | Selecciona un empleado del dropdown "Empleado" |
| 5 | Usuario | Opcionalmente escribe una observacion (ej: "Asignado para proyecto X") |
| 6 | Usuario | Hace clic en "Registrar" |
| 7 | Sistema | Valida que el activo seleccionado siga en estado DISPONIBLE (podria haber cambiado si otro usuario lo asigno simultaneamente) |
| 8 | Sistema | Dentro de una transaccion atomica: crea el registro de asignacion con fecha_asignacion = ahora, y actualiza el estado del activo a ASIGNADO |
| 9 | Sistema | Registra la operacion en el log de actividad y muestra notificacion de exito |

Flujo Normal (Devolucion):

| Paso | Actor | Descripcion |
|------|-------|-------------|
| 1 | Usuario | En la tabla de asignaciones, localiza una asignacion con estado "Activa" |
| 2 | Usuario | Hace clic en el boton "Devolver" |
| 3 | Sistema | Muestra un dialogo de confirmacion: "Confirmar devolucion?" |
| 4 | Usuario | Confirma la devolucion |
| 5 | Sistema | Dentro de una transaccion atomica: registra fecha_devolucion = ahora en la asignacion, y cambia el estado del activo a DISPONIBLE |
| 6 | Sistema | Registra la operacion en el log y muestra notificacion |

Flujos Alternos:
- Si no hay activos disponibles, el dropdown muestra "Sin disponibles" y el boton de registrar se deshabilita.
- Si el activo ya fue asignado por otro usuario, el sistema muestra "Activo no disponible".

Excepciones:
- Si se intenta devolver una asignacion que ya fue devuelta, el backend responde con error 400: "La devolucion ya fue registrada para esta asignacion".

---

**Caso de Uso 3: Gestionar Usuarios del Sistema**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Gestionar Usuarios |
| Version | V1 |
| Referencia | CU-03 |
| Autor | Cristian Ramirez Romero |
| Fecha | 15/04/2026 |
| Actores | Administrador |
| Referencias RF | RF01, RF15, RF16 |
| Precondiciones | El usuario debe tener rol ADMIN. Los operadores no pueden acceder a este modulo |
| Postcondicion | Nuevo usuario creado con rol y sede asignados, o usuario existente eliminado. Operacion registrada en log |

Flujo Normal:

| Paso | Actor | Descripcion |
|------|-------|-------------|
| 1 | Admin | Accede al modulo "Usuarios" desde la seccion ADMINISTRACION del menu |
| 2 | Sistema | Muestra el formulario de creacion en la parte superior y la tabla de usuarios existentes debajo |
| 3 | Admin | Completa los campos: usuario, email, contrasena, nombre, apellido, rol (Operador/Administrador), sede |
| 4 | Admin | Hace clic en "Crear Usuario" |
| 5 | Sistema | Valida: username unico, contrasena minimo 6 caracteres, email valido |
| 6 | Sistema | Crea el usuario con la contrasena cifrada (PBKDF2) y registra en el log |

Flujos Alternos:
- Si el username ya existe, muestra "Usuario ya existe".
- Si la contrasena tiene menos de 6 caracteres, muestra error.
- Al intentar eliminar su propia cuenta, el sistema lo impide con "No puede eliminar su propia cuenta".

### 5.3.2 Diagramas de Secuencia

Los diagramas de secuencia representan la interaccion temporal entre los actores y los componentes del sistema para cada caso de uso. Se elaboro un diagrama por cada caso de uso principal.

**Secuencia: Asignacion de Activo (CU-02)**

```
Usuario          React(Frontend)       Django(API REST)        SQLite(BD)
  |                    |                      |                     |
  |-- clic Asignar --> |                      |                     |
  |                    |-- POST /api/         |                     |
  |                    |   asignaciones/      |                     |
  |                    |   {activo_id,        |                     |
  |                    |    empleado_id,      |                     |
  |                    |    observaciones}    |                     |
  |                    |                      |-- validate() -----> |
  |                    |                      |   activo.estado     |
  |                    |                      |   == DISPONIBLE?    |
  |                    |                      |<--- Si ------------ |
  |                    |                      |                     |
  |                    |                      |-- @transaction     |
  |                    |                      |   .atomic:         |
  |                    |                      |   INSERT asignacion |
  |                    |                      |   UPDATE activo     |
  |                    |                      |   estado=ASIGNADO   |
  |                    |                      |<--- commit -------- |
  |                    |                      |                     |
  |                    |<-- 201 Created ------|                     |
  |                    |    {asignacion_data} |                     |
  |<-- notificacion ---|                      |                     |
  |    "Asignacion     |                      |                     |
  |     registrada"    |                      |                     |
```

La parte mas importante de esta secuencia es el uso de `@transaction.atomic` en Django. Esto garantiza que la creacion de la asignacion y el cambio de estado del activo ocurran como una operacion indivisible: o ambas se ejecutan, o ninguna. Sin esto, podria ocurrir que se cree la asignacion pero el activo no cambie de estado, dejando datos inconsistentes.

**Secuencia: Login con JWT (CU-03)**

```
Usuario          React(Frontend)       Django(API REST)        SQLite(BD)
  |                    |                      |                     |
  |-- submit login --> |                      |                     |
  |   {user, pass}     |-- POST /api/token/  |                     |
  |                    |   {username,         |                     |
  |                    |    password}         |                     |
  |                    |                      |-- authenticate() -> |
  |                    |                      |   check password    |
  |                    |                      |   (PBKDF2 hash)     |
  |                    |                      |<--- user object --- |
  |                    |                      |                     |
  |                    |                      |-- generate JWT      |
  |                    |                      |   access + refresh  |
  |                    |<-- 200 OK -----------|                     |
  |                    |    {access, refresh, |                     |
  |                    |     user: {id,       |                     |
  |                    |      username, rol}} |                     |
  |                    |                      |                     |
  |                    |-- save tokens        |                     |
  |                    |   localStorage       |                     |
  |                    |-- setUser(session)   |                     |
  |<-- redirect -------|                      |                     |
  |    /dashboard      |                      |                     |
```

### 5.3.3 Diagramas de Actividad

Los diagramas de actividad modelan el flujo de trabajo de los procesos mas representativos del sistema. Se presentan en formato textual y tambien estan disponibles en formato HTML interactivo en `documentacion/diagramas/diagrama_actividades.html`.

**Actividad: Proceso completo de gestion de un activo**

```
[INICIO]
    |
    v
(Usuario accede al modulo Activos)
    |
    v
<Es operador?> --Si--> (Sistema filtra por sede del operador)
    |                          |
    No                         |
    |                          v
    +------------------------->+
    |
    v
(Sistema muestra lista de activos)
    |
    v
<Que accion realiza?>
    |           |           |
  Crear       Editar     Eliminar
    |           |           |
    v           v           v
(Mostrar    (Cargar     <Tiene asignaciones
 formulario  datos en     activas?>
 vacio)      formulario)    |        |
    |           |          Si       No
    v           v           |        |
(Usuario completa campos)   v        v
    |                   (Mostrar  <Confirmar?>
    v                    error)      |      |
<Validar datos>                     Si     No
    |        |                       |      |
  Valido   Invalido                  v      v
    |        |               (Eliminar  (Cancelar)
    v        v                activo)
(Guardar  (Mostrar                |
 en BD)    errores)               v
    |                        (Registrar
    v                         en log)
(Registrar en log)               |
    |                            v
    v                        [FIN]
(Notificar exito)
    |
    v
[FIN]
```

**Actividad: Flujo de asignacion y devolucion**

```
[INICIO]
    |
    v
(Cargar activos DISPONIBLES y empleados)
    |
    v
<Hay activos disponibles?> --No--> (Deshabilitar formulario) --> [FIN]
    |
   Si
    |
    v
(Usuario selecciona activo y empleado)
    |
    v
(Usuario hace clic en Registrar)
    |
    v
<Activo sigue DISPONIBLE?> --No--> (Error: "Activo no disponible") --> [FIN]
    |
   Si
    |
    v
(TRANSACCION ATOMICA:)
(1. Crear registro de asignacion)
(2. Cambiar estado activo a ASIGNADO)
    |
    v
(Registrar en log de actividad)
    |
    v
(Notificar exito)
    |
    v
[FIN]

--- DEVOLUCION ---

[INICIO]
    |
    v
(Usuario localiza asignacion activa)
    |
    v
(Clic en "Devolver")
    |
    v
<Confirmar?> --No--> [FIN]
    |
   Si
    |
    v
(TRANSACCION ATOMICA:)
(1. Registrar fecha_devolucion = ahora)
(2. Cambiar estado activo a DISPONIBLE)
    |
    v
(Registrar en log)
    |
    v
[FIN]
```

### 5.3.4 Diagrama de Clases

El diagrama de clases completo esta disponible en `documentacion/diagramas/diagrama_clases.html`. A continuacion se presenta la representacion textual con atributos, metodos, relaciones y cardinalidad.

```
+========================+
|       <<model>>        |
|        Usuario         |
+========================+
| - id: int [PK]        |
| - username: str [UK]   |
| - email: str           |
| - password: str (hash) |
| - rol: enum            |
|   {ADMIN, USER}        |
| - is_active: bool      |
| - date_joined: datetime|
+------------------------+
| + login(): Token       |
| + logout(): void       |
| + isAdmin(): bool      |
| + hasPermission(): bool|
+========================+


+========================+         +========================+
|       <<model>>        |         |       <<model>>        |
|         Sede           |         |     Departamento       |
+========================+         +========================+
| - id: int [PK]        |  1   N  | - id: int [PK]        |
| - nombre: str          |-------->| - nombre: str          |
| - ciudad: str          |         | - sede_id: int [FK]    |
| - direccion: str       |         | - area: str            |
| - telefono: str        |         | - responsable: str     |
+------------------------+         +------------------------+
| + getActivos(): list   |         | + getEmpleados(): list |
| + getEmpleados(): list |         +========================+
| + getDepartamentos()   |
+========================+
        |  1                              |  1
        |                                 |
        |  N                              |  N
+========================+         +========================+
|       <<model>>        |         |       <<model>>        |
|        Activo          |         |       Empleado         |
+========================+         +========================+
| - id: int [PK]        |         | - id: int [PK]        |
| - nombre: str          |         | - nombre: str          |
| - descripcion: str     |         | - apellido: str        |
| - tipo: str            |         | - cedula: str [UK]     |
| - serial: str [UK]     |         | - departamento_id [FK] |
| - valor: decimal(12,2) |         | - sede_id: int [FK]    |
| - fecha_compra: date   |         | - cargo: str           |
| - estado: enum         |         | - email: str           |
|   {DISPONIBLE,         |         | - fecha_ingreso: date  |
|    ASIGNADO, DANADO}   |         | - activo: bool         |
| - sede_id: int [FK]    |         +------------------------+
| - depto_id: int [FK]   |         | + getAsignaciones()    |
+------------------------+         | + darBaja(): void      |
| + asignar(): void      |         | + reactivar(): void    |
| + devolver(): void     |         +========================+
| + validarSerial(): bool|                |
+========================+                |
        |  1                              |  1
        |                                 |
        |  N                              |  N
        +============+     +============+
                     |     |
              +========================+
              |       <<model>>        |
              |      Asignacion        |
              +========================+
              | - id: int [PK]        |
              | - activo_id: int [FK]  |
              |   (PROTECT)            |
              | - empleado_id: int[FK] |
              |   (PROTECT)            |
              | - fecha_asignacion:    |
              |   datetime (auto)      |
              | - fecha_devolucion:    |
              |   datetime (nullable)  |
              | - observaciones: str   |
              +------------------------+
              | + registrar(): void    |
              | + devolver(): void     |
              | + isActiva(): bool     |
              +========================+
```

**Cardinalidades:**
- Sede 1 : N Departamento (una sede tiene muchos departamentos)
- Sede 1 : N Activo (una sede tiene muchos activos)
- Sede 1 : N Empleado (una sede tiene muchos empleados)
- Departamento 1 : N Empleado
- Departamento 1 : N Activo
- Activo 1 : N Asignacion (un activo puede tener muchas asignaciones a lo largo del tiempo)
- Empleado 1 : N Asignacion (un empleado puede recibir muchos activos)

La relacion Asignacion usa `on_delete=PROTECT` tanto para activo como para empleado, lo que significa que Django impide eliminar un activo o empleado que tenga asignaciones asociadas. Esta es una decision de diseno deliberada para proteger la integridad del historial.


## 5.4 Diseno de la Interfaz

### 5.4.1 Arquitectura de Informacion

El mapa del sitio web de SIGAE esta organizado de forma jerarquica, agrupando las funcionalidades por contexto de uso. La navegacion principal se realiza a traves de un sidebar lateral fijo que se adapta segun el rol del usuario autenticado.

```
SIGAE
|
+-- [Pantalla de Login] (acceso publico)
|     Formulario de autenticacion con credenciales
|     Panel visual con identidad del sistema
|
+-- [Dashboard] (todos los roles)
|     Banner de bienvenida personalizado
|     8 tarjetas de estadisticas: total activos, disponibles,
|       asignados, en reparacion, empleados, sedes, departamentos,
|       valor total del inventario
|     Tabla de actividad reciente (ultimas 5 asignaciones)
|
+-- INVENTARIO
|     +-- [Activos] (ADMIN y OPERADOR)
|     |     Barra de busqueda por nombre/serial/tipo
|     |     Filtro por estado (Disponible/Asignado/Reparacion)
|     |     Tabla con paginacion implicita
|     |     Formulario inline de creacion/edicion
|     |     Boton de exportacion CSV
|     |
|     +-- [Empleados] (ADMIN y OPERADOR)
|     |     Busqueda por nombre/cedula/cargo
|     |     Tabla con conteo de activos asignados
|     |     Vista expandible: activos del empleado + asignacion rapida
|     |     Acciones: editar, dar de baja, reactivar, eliminar
|     |
|     +-- [Asignaciones] (ADMIN y OPERADOR)
|           Formulario de nueva asignacion (3 columnas)
|           Historial ordenado por fecha descendente
|           Boton de devolucion en asignaciones activas
|
+-- ORGANIZACION
|     +-- [Sedes] (solo ADMIN puede crear/editar/eliminar)
|     |     Tabla con conteo de departamentos y activos por sede
|     |
|     +-- [Departamentos] (solo ADMIN puede crear/editar/eliminar)
|           Tabla con sede asociada, area y conteo de empleados
|
+-- ANALISIS
|     +-- [Reportes] (todos los roles)
|           4 tarjetas de resumen (valor total, total activos,
|             asignados, en reparacion)
|           Tabs: Disponibles | Asignados | Reparacion
|           Boton de exportacion CSV global
|
+-- ADMINISTRACION (solo visible para ADMIN)
      +-- [Usuarios]
      |     Formulario de creacion/edicion de usuarios
      |     Asignacion de rol y sede
      |     Tabla de usuarios con acciones
      |
      +-- [Actividad]
            Log cronologico de operaciones
            Boton de limpiar historial
```

La navegacion principal esta en el sidebar izquierdo, que permanece fijo en pantallas de escritorio. En dispositivos moviles, el sidebar se oculta y se accede mediante un boton hamburguesa. Cada seccion del menu esta agrupada con un titulo descriptivo (PRINCIPAL, INVENTARIO, ORGANIZACION, ANALISIS, ADMINISTRACION) para facilitar la orientacion del usuario.

El elemento mas importante del diseno de informacion es la **adaptacion por rol**: un operador nunca ve las secciones de Administracion, y los botones de crear/editar/eliminar en Sedes y Departamentos solo aparecen para administradores. Esto no es solo una cuestion de seguridad (que se maneja en el backend), sino de usabilidad: no tiene sentido mostrarle a un operador opciones que no puede usar.

### 5.4.2 Wireframes

Los wireframes del sistema fueron disenados siguiendo los principios de diseno de interfaz centrado en el usuario. Se presentan los mas representativos:

**1. Pantalla de Login**

La pantalla de login esta dividida en dos secciones. El lado izquierdo (60%) contiene el formulario de acceso sobre fondo blanco: logo del sistema, campos de usuario y contrasena, boton de ingreso en rojo oscuro (#8B0000), y un enlace informativo con las credenciales de demo. El lado derecho (40%) presenta un panel visual con fondo degradado rojo (#CC0000 a #8B0000), el logo grande del sistema, el nombre "Sistema de Gestion de Inventario y Control de Activos Empresariales", y elementos decorativos circulares semitransparentes.

La paleta de colores utilizada en toda la aplicacion es:
- Rojo (#FF0000, #CC0000, #8B0000): color primario, botones de accion principal, alertas
- Azul (#003087): sidebar, botones secundarios, badges de rol
- Blanco (#FFFFFF): fondo principal, tarjetas, formularios

**2. Dashboard**

El dashboard presenta un banner de bienvenida en azul (#003087) con el nombre del usuario y una descripcion del contexto (vista global o vista de sede). Debajo, un grid de 4 columnas con 8 tarjetas de estadisticas, cada una con un icono emoji, el valor numerico en grande y una etiqueta descriptiva. Los colores de las tarjetas varian segun el tipo de dato: rojo para total de activos, verde para disponibles, naranja para asignados, azul oscuro para reparacion.

**3. Lista de Activos**

La pagina de activos tiene un header con el titulo "Activos (N)" a la izquierda y los botones "+ Nuevo Activo" (azul) y "CSV" (verde) a la derecha. Debajo, una barra de filtros con un campo de busqueda de texto y un dropdown de estado. La tabla principal ocupa todo el ancho con columnas: Activo (nombre + descripcion), Tipo, Serial (en formato code), Valor (en negrita con formato de moneda colombiana), Fecha Compra, Sede, Departamento, Estado (badge de color), y Acciones (Editar/Eliminar). El formulario de creacion/edicion se despliega inline como una tarjeta encima de la tabla.

**4. Modulo de Asignaciones**

La parte superior muestra una tarjeta con el formulario de nueva asignacion en layout de 3 columnas: dropdown de activo disponible, dropdown de empleado, campo de observaciones. El boton "Registrar" esta en azul. Debajo, la tabla de historial muestra todas las asignaciones ordenadas por fecha, con columnas: Activo (nombre + serial), Empleado, Fecha (asignacion + devolucion si aplica + dias transcurridos), Estado (badge Activa/Devuelta), Notas, y boton "Devolver" para asignaciones activas.

## 5.5 Diseno de Datos

### 5.5.1 Metodo de Acceso a la Base de Datos

El sistema utiliza el ORM (Object-Relational Mapping) de Django como capa de abstraccion para acceder a la base de datos. Esto significa que todas las operaciones de lectura y escritura se realizan mediante objetos Python, sin necesidad de escribir sentencias SQL directamente. El ORM se encarga de traducir las operaciones a las consultas SQL correspondientes.

Esta decision tiene varias ventajas practicas. Primero, el codigo es mas legible y mantenible: `Activo.objects.filter(estado='DISPONIBLE')` es mas claro que `SELECT * FROM activo WHERE estado = 'DISPONIBLE'`. Segundo, el ORM protege automaticamente contra inyeccion SQL, ya que parametriza todas las consultas. Tercero, facilita el cambio de motor de base de datos: el mismo codigo funciona con SQLite (desarrollo) y PostgreSQL (produccion) sin modificaciones.

Ejemplos concretos de transacciones implementadas en el sistema:

```python
# Crear un activo nuevo (POST /api/activos/)
activo = Activo.objects.create(
    nombre="Laptop Dell Latitude #1",
    descripcion="16GB RAM, i7, SSD 512GB",
    tipo="Computador",
    serial="COM-2024-0001",
    valor=3500000.00,
    fecha_compra="2024-01-15",
    estado="DISPONIBLE"
)

# Consultar activos disponibles de una sede especifica
disponibles = Activo.objects.filter(
    estado='DISPONIBLE',
    sede_id=1
).order_by('-id')

# Asignacion con transaccion atomica (garantiza consistencia)
from django.db import transaction

@transaction.atomic
def asignar_activo(activo_id, empleado_id, observaciones):
    activo = Activo.objects.get(id=activo_id)
    empleado = Empleado.objects.get(id=empleado_id)
    
    asignacion = Asignacion.objects.create(
        activo=activo,
        empleado=empleado,
        observaciones=observaciones
    )
    
    activo.estado = 'ASIGNADO'
    activo.save()
    
    return asignacion

# Devolucion con transaccion atomica
@transaction.atomic
def devolver_activo(asignacion_id):
    asignacion = Asignacion.objects.get(id=asignacion_id)
    asignacion.fecha_devolucion = timezone.now()
    asignacion.save()
    
    asignacion.activo.estado = 'DISPONIBLE'
    asignacion.activo.save()

# Reporte: activos asignados con informacion del empleado
activos_asignados = Activo.objects.filter(estado='ASIGNADO')
for activo in activos_asignados:
    asignacion = Asignacion.objects.filter(
        activo=activo,
        fecha_devolucion__isnull=True
    ).select_related('empleado').first()
    # asignacion.empleado contiene los datos del responsable

# Eliminar activo (con proteccion de integridad)
try:
    activo.delete()
except ProtectedError:
    # No se puede eliminar: tiene asignaciones asociadas
    pass
```

### 5.5.2 Definicion de las Entidades de Datos

| Entidad | Descripcion |
|---------|-------------|
| Usuario | Representa a las personas que acceden al sistema. Extiende el modelo AbstractUser de Django, agregando el campo `rol` que determina los permisos. Almacena credenciales cifradas y datos basicos de identificacion. Es la entidad central del modulo de autenticacion |
| Activo | Representa un bien fisico o tecnologico de la organizacion. Es la entidad principal del sistema. Cada activo tiene un serial unico que lo identifica de forma inequivoca, un valor economico, un tipo que lo clasifica, y un estado que refleja su situacion actual (disponible, asignado o danado). Se vincula opcionalmente a una sede y un departamento |
| Empleado | Representa al personal de la organizacion al que se le pueden asignar activos. Se identifica por su cedula (unica en el sistema). Pertenece a una sede y un departamento, y tiene un cargo especifico. Puede estar activo o dado de baja |
| Asignacion | Representa la relacion temporal entre un activo y un empleado. Es el registro que da trazabilidad al sistema: quien tiene que, desde cuando, y cuando lo devolvio. La fecha de asignacion se genera automaticamente y la de devolucion queda nula hasta que se registra la devolucion |
| Sede | Representa una ubicacion fisica de la organizacion. Agrupa activos, empleados y departamentos por locacion geografica. Es fundamental para el filtrado por sede que aplica a los operadores |
| Departamento | Representa una division organizacional dentro de una sede. Permite clasificar empleados y activos por area funcional (Tecnologia, Contabilidad, RRHH, etc.) |
| Log de Actividad | Registro cronologico de todas las operaciones realizadas en el sistema. Cada entrada contiene la accion realizada, el detalle, el usuario responsable y la fecha/hora. Se usa para auditoria y trazabilidad |

### 5.5.3 Modelo Relacional

```
USUARIO (id PK, username UK, email, password, rol, is_active, date_joined)

SEDE (id PK, nombre, ciudad, direccion, telefono)

DEPARTAMENTO (id PK, nombre, sede_id FK->SEDE, area, responsable)

EMPLEADO (id PK, nombre, apellido, cedula UK, departamento_id FK->DEPARTAMENTO,
          sede_id FK->SEDE, cargo, email, fecha_ingreso, fecha_salida, activo)

ACTIVO (id PK, nombre, descripcion, tipo, serial UK, valor DECIMAL(12,2),
        fecha_compra, estado, sede_id FK->SEDE, departamento_id FK->DEPARTAMENTO,
        fecha_registro)

ASIGNACION (id PK, activo_id FK->ACTIVO [PROTECT], empleado_id FK->EMPLEADO [PROTECT],
            fecha_asignacion, fecha_devolucion, observaciones)

LOG_ACTIVIDAD (id PK, action, detail, user, fecha)
```

**Relaciones y cardinalidad:**
- SEDE (1) ----< (N) DEPARTAMENTO
- SEDE (1) ----< (N) EMPLEADO
- SEDE (1) ----< (N) ACTIVO
- DEPARTAMENTO (1) ----< (N) EMPLEADO
- DEPARTAMENTO (1) ----< (N) ACTIVO
- ACTIVO (1) ----< (N) ASIGNACION
- EMPLEADO (1) ----< (N) ASIGNACION

### 5.5.4 Diccionario de Datos

**Entidad: ACTIVO**

| Campo | Tipo de Dato | Longitud | Obligatorio | Llave | Valores | Descripcion |
|-------|-------------|----------|-------------|-------|---------|-------------|
| id | INTEGER | - | Si | PK (auto) | Autoincremental | Identificador unico del activo |
| nombre | VARCHAR | 200 | Si | - | Texto libre | Nombre descriptivo del activo (ej: "Laptop Dell Latitude #1") |
| descripcion | TEXT | ilimitado | No | - | Texto libre | Descripcion detallada, especificaciones tecnicas |
| tipo | VARCHAR | 100 | Si | - | Texto libre | Categoria del activo: Computador, Monitor, Impresora, Mobiliario, Periferico, Servidor, Red, etc. |
| serial | VARCHAR | 100 | Si | UNIQUE | Formato libre | Numero de serie unico. Formato sugerido: TIPO-ANO-CONSECUTIVO (ej: COM-2024-0001) |
| valor | DECIMAL | 12,2 | Si | - | > 0 | Valor economico en pesos colombianos. Maximo: 9,999,999,999.99 |
| fecha_compra | DATE | - | Si | - | YYYY-MM-DD | Fecha de adquisicion del activo |
| estado | VARCHAR | 20 | Si | - | DISPONIBLE, ASIGNADO, DANADO | Estado actual del activo. Valor por defecto: DISPONIBLE |

**Entidad: EMPLEADO**

| Campo | Tipo de Dato | Longitud | Obligatorio | Llave | Valores | Descripcion |
|-------|-------------|----------|-------------|-------|---------|-------------|
| id | INTEGER | - | Si | PK (auto) | Autoincremental | Identificador unico del empleado |
| nombre | VARCHAR | 100 | Si | - | Texto libre | Nombre(s) del empleado |
| apellido | VARCHAR | 100 | Si | - | Texto libre | Apellido(s) del empleado |
| cedula | VARCHAR | 20 | Si | UNIQUE | Numerico | Numero de cedula de ciudadania. Unico en el sistema |
| departamento | VARCHAR | 100 | Si | - | Texto libre | Nombre del departamento (en backend Django es FK) |
| cargo | VARCHAR | 100 | Si | - | Texto libre | Cargo o puesto de trabajo del empleado |

**Entidad: ASIGNACION**

| Campo | Tipo de Dato | Longitud | Obligatorio | Llave | Valores | Descripcion |
|-------|-------------|----------|-------------|-------|---------|-------------|
| id | INTEGER | - | Si | PK (auto) | Autoincremental | Identificador unico de la asignacion |
| activo_id | INTEGER | - | Si | FK -> ACTIVO (PROTECT) | ID existente | Referencia al activo asignado. PROTECT impide eliminar el activo si tiene asignaciones |
| empleado_id | INTEGER | - | Si | FK -> EMPLEADO (PROTECT) | ID existente | Referencia al empleado responsable. PROTECT impide eliminar el empleado si tiene asignaciones |
| fecha_asignacion | DATETIME | - | Si | - | auto_now_add | Fecha y hora en que se registro la asignacion. Se genera automaticamente |
| fecha_devolucion | DATETIME | - | No | - | NULL o datetime | Fecha y hora de devolucion. NULL indica que la asignacion sigue activa |
| observaciones | TEXT | ilimitado | No | - | Texto libre | Notas adicionales sobre la asignacion |

**Entidad: USUARIO**

| Campo | Tipo de Dato | Longitud | Obligatorio | Llave | Valores | Descripcion |
|-------|-------------|----------|-------------|-------|---------|-------------|
| id | INTEGER | - | Si | PK (auto) | Autoincremental | Identificador unico del usuario |
| username | VARCHAR | 150 | Si | UNIQUE | Texto libre | Nombre de usuario para autenticacion |
| email | VARCHAR | 254 | Si | - | Email valido | Correo electronico del usuario |
| password | VARCHAR | 128 | Si | - | Hash PBKDF2 | Contrasena cifrada. Nunca se almacena en texto plano |
| rol | VARCHAR | 10 | Si | - | ADMIN, USER | Rol que determina los permisos del usuario en el sistema |

### 5.5.5 Restricciones de Seguridad e Integridad

Las restricciones implementadas en el modelo de datos garantizan tanto la integridad referencial como la coherencia logica de la informacion:

**Integridad referencial:**
- Las llaves foraneas en Asignacion (activo_id, empleado_id) utilizan `on_delete=PROTECT`, lo que significa que Django lanza una excepcion `ProtectedError` si se intenta eliminar un activo o empleado que tenga asignaciones asociadas. Esta es la restriccion mas importante del sistema porque protege el historial de trazabilidad.
- Las llaves foraneas en Departamento (sede_id) permiten rastrear a que sede pertenece cada departamento.

**Restricciones de unicidad:**
- El campo `serial` en Activo tiene restriccion UNIQUE a nivel de base de datos, garantizando que no existan dos activos con el mismo numero de serie.
- El campo `cedula` en Empleado tiene restriccion UNIQUE, evitando registros duplicados de empleados.
- El campo `username` en Usuario tiene restriccion UNIQUE, impidiendo cuentas duplicadas.

**Validaciones de negocio (implementadas en serializers de Django):**
- El valor de un activo debe ser estrictamente mayor a cero.
- El estado de un activo solo puede ser uno de los valores permitidos: DISPONIBLE, ASIGNADO o DANADO.
- No se puede crear una asignacion para un activo que no este en estado DISPONIBLE.
- No se puede registrar una devolucion para una asignacion que ya fue devuelta.
- No se puede eliminar una sede que tenga activos, empleados o departamentos asociados (validacion en frontend).

**Seguridad de datos:**
- Las contrasenas se almacenan con hash PBKDF2-SHA256 con salt aleatorio (mecanismo por defecto de Django). Esto significa que incluso si alguien accede a la base de datos, no puede recuperar las contrasenas originales.
- Los tokens JWT tienen tiempo de expiracion configurable. Un token expirado es rechazado automaticamente por el backend.
- El acceso a cada endpoint de la API requiere un token JWT valido en el header Authorization.


## 5.6 Diseno de la Arquitectura de Software

### 5.6.1 Patron de Diseno

El sistema SIGAE implementa una arquitectura de tres capas con separacion estricta de responsabilidades. Esta decision no fue tomada al azar; responde a la necesidad de tener un sistema donde el frontend y el backend puedan evolucionar de forma independiente, donde un cambio en la interfaz no requiera tocar la logica de negocio, y donde la base de datos pueda migrarse sin afectar el resto del sistema.

**Capa de Presentacion (Frontend - React.js):**
Esta capa se encarga exclusivamente de la interaccion con el usuario. Implementa el patron de componentes de React, donde cada pagina es un componente funcional que gestiona su propio estado local mediante hooks (useState, useCallback). La navegacion se maneja con React Router DOM, y el estado global de autenticacion se comparte mediante Context API (AuthContext). Bootstrap 5 proporciona el sistema de grid y los componentes visuales base.

**Capa de Logica de Negocio (Backend - Django REST Framework):**
Esta capa contiene toda la logica del sistema: validaciones, permisos, transacciones y reglas de negocio. Implementa el patron MVT (Model-View-Template) de Django adaptado para API REST, donde los Models definen la estructura de datos, los Serializers manejan la validacion y serializacion, y los ViewSets exponen los endpoints HTTP. Los permisos se implementan como clases reutilizables (IsAdminRole) que se aplican a nivel de vista.

**Capa de Datos (SQLite / PostgreSQL):**
Esta capa almacena toda la informacion del sistema. El acceso se realiza exclusivamente a traves del ORM de Django, nunca con SQL directo. Esto proporciona abstraccion del motor de base de datos, proteccion contra inyeccion SQL y facilidad de migracion.

**Patrones de diseno aplicados:**

| Patron | Donde se aplica | Justificacion |
|--------|----------------|---------------|
| MVC/MVT | Estructura general de Django | Separacion de modelo, vista y controlador para mantenibilidad |
| Repository | ORM de Django (objects.filter, objects.create) | Abstraccion del acceso a datos |
| Strategy | Clases de permisos (IsAdminRole, IsAuthenticated) | Permisos intercambiables segun el contexto |
| Observer | Log de actividad (DB.addLog en cada operacion) | Registro automatico de eventos sin acoplar la logica |
| Singleton | AuthContext de React | Estado de autenticacion unico compartido en toda la aplicacion |
| Decorator | @transaction.atomic, @action en Django | Agregar comportamiento transaccional sin modificar la logica base |

### 5.6.2 Diagrama de Componentes

```
+================================================================+
|                    CAPA DE PRESENTACION                        |
|                    (React.js + Bootstrap)                      |
|                                                                |
|  +------------+  +------------+  +------------+  +---------+  |
|  |   Pages    |  | Components |  |  Context   |  | Services|  |
|  |------------|  |------------|  |------------|  |---------|  |
|  | Login      |  | Layout     |  | AuthContext|  | db.js   |  |
|  | Dashboard  |  | Navbar     |  | (useState, |  | (local  |  |
|  | Activos    |  | AdminRoute |  |  useAuth)  |  |  Storage)|  |
|  | Empleados  |  | PrivateRte |  +------------+  | apiSvc  |  |
|  | Asignacion |  +------------+                   | (axios) |  |
|  | Sedes      |                                   +---------+  |
|  | Departamts |                                                |
|  | Reportes   |                                                |
|  | Usuarios   |                                                |
|  | Actividad  |                                                |
|  +------------+                                                |
+================================================================+
         |                    |
         | HTTP GET/POST      | HTTP PUT/DELETE
         | (JSON + JWT)       | (JSON + JWT)
         v                    v
+================================================================+
|                  CAPA DE LOGICA DE NEGOCIO                     |
|                  (Django + DRF)                                |
|                                                                |
|  +------------+  +-------------+  +------------+              |
|  |   Views    |  | Serializers |  |   Models   |              |
|  |------------|  |-------------|  |------------|              |
|  | ActivoVS   |  | ActivoSer   |  | Activo     |              |
|  | EmpleadoVS |  | EmpleadoSer |  | Empleado   |              |
|  | AsignacVS  |  | AsignacSer  |  | Asignacion |              |
|  | ReporteVws |  | AsignacCrSr |  | Usuario    |              |
|  | RegisterVw |  | RegisterSer |  +------------+              |
|  | TokenView  |  | UserSer     |                              |
|  +------------+  +-------------+                              |
|                                                                |
|  +------------+  +-------------+  +------------+              |
|  |    URLs    |  | Permissions |  |   Config   |              |
|  |------------|  |-------------|  |------------|              |
|  | /api/      |  | IsAdminRole |  | settings   |              |
|  |  activos/  |  | IsAuthentctd|  | JWT config |              |
|  |  empleados/|  +-------------+  | CORS       |              |
|  |  asignac/  |                   +------------+              |
|  |  reportes/ |                                               |
|  |  token/    |                                               |
|  |  register/ |                                               |
|  +------------+                                               |
+================================================================+
         |
         | ORM (QuerySets)
         v
+================================================================+
|                    CAPA DE DATOS                               |
|                    (SQLite / PostgreSQL)                       |
|                                                                |
|  +----------+ +----------+ +------------+ +----------+        |
|  | activo   | | empleado | | asignacion | | usuario  |        |
|  +----------+ +----------+ +------------+ +----------+        |
|  +----------+ +----------+ +------------+                     |
|  |   sede   | | departam | | log_activ  |                     |
|  +----------+ +----------+ +------------+                     |
+================================================================+
```

### 5.6.3 Diagrama de Despliegue

```
+==========================+              +==========================+
|     NODO: CLIENTE        |              |    NODO: SERVIDOR        |
|     (Navegador Web)      |              |    (VPS Linux)           |
|                          |    HTTPS     |                          |
|  +--------------------+  |  (puerto 443)|  +--------------------+  |
|  | React SPA          |  |<------------>|  | Nginx              |  |
|  | (HTML + JS + CSS)  |  |              |  | (Proxy Reverso)    |  |
|  |                    |  |              |  |   |                |  |
|  | - Bootstrap 5.3    |  |              |  |   | /api/* -----+  |  |
|  | - React Router 7   |  |              |  |   |             |  |  |
|  | - Vite build       |  |              |  |   | /* (static) |  |  |
|  +--------------------+  |              |  |   |     |       |  |  |
|                          |              |  |   v     v       v  |  |
|  Requisitos minimos:     |              |  | +------+ +------+  |  |
|  - Chrome 90+            |              |  | |Django| |Static|  |  |
|  - Firefox 88+           |              |  | |Gunicn| |Files |  |  |
|  - Edge 90+              |              |  | |:8000 | |/dist |  |  |
|  - Conexion internet     |              |  | +------+ +------+  |  |
+==========================+              |  |   |               |  |
                                          |  |   v               |  |
                                          |  | +---------------+ |  |
                                          |  | | SQLite/       | |  |
                                          |  | | PostgreSQL    | |  |
                                          |  | | (Base datos)  | |  |
                                          |  | +---------------+ |  |
                                          |  +--------------------+  |
                                          |                          |
                                          |  Especificaciones:       |
                                          |  - Ubuntu 22.04 LTS      |
                                          |  - Python 3.12           |
                                          |  - Node.js 20 LTS       |
                                          |  - 2 GB RAM minimo      |
                                          +==========================+
```

## 5.7 Construccion e Implementacion de Software

### 5.7.1 Integracion del Sistema de Software

El sistema se construyo de forma modular, donde cada modulo fue desarrollado, probado e integrado de manera incremental durante los tres sprints de desarrollo. La siguiente tabla describe cada modulo, su tecnologia y como se integra con el resto del sistema:

| Modulo | Backend (Django) | Frontend (React) | Integracion |
|--------|-----------------|-------------------|-------------|
| Autenticacion | `usuarios/` app: modelo Usuario con rol, vista CustomTokenObtainPairView, RegisterView, permiso IsAdminRole | `AuthContext.jsx`: estado global de sesion, funciones login/logout/filtrar. `Login.jsx`: formulario | El frontend envia credenciales a POST /api/token/, recibe tokens JWT, los almacena en localStorage y los envia en cada request posterior via header Authorization |
| Gestion de Activos | `inventario/` app: modelo Activo, ActivoSerializer con validaciones (serial unico, valor positivo, estado valido), ActivoViewSet con CRUD completo | `Activos.jsx`: lista con busqueda y filtros, formulario inline, exportacion CSV | React consume GET/POST/PUT/DELETE /api/activos/. Las validaciones se ejecutan tanto en frontend (UX) como en backend (seguridad) |
| Gestion de Empleados | Modelo Empleado, EmpleadoSerializer con validacion de cedula unica, EmpleadoViewSet | `Empleados.jsx`: lista, formulario, vista expandible de activos asignados, baja/reactivacion | Similar a activos. La vista expandible hace GET /api/asignaciones/?empleado=ID para obtener el historial |
| Asignaciones | Modelo Asignacion con FK PROTECT, AsignacionCreateSerializer con validacion de estado, AsignacionViewSet con @transaction.atomic y accion custom `devolver` | `Asignaciones.jsx`: formulario de asignacion, historial, boton devolver | POST /api/asignaciones/ para asignar (transaccion atomica). POST /api/asignaciones/{id}/devolver/ para devolucion |
| Sedes | No tiene modelo propio en backend (se maneja en frontend con localStorage) | `Sedes.jsx`: CRUD restringido a ADMIN, validacion de dependencias antes de eliminar | Datos en localStorage. Validacion: antes de eliminar, verifica si hay activos, empleados o departamentos asociados |
| Departamentos | Similar a Sedes | `Departamentos.jsx`: CRUD restringido a ADMIN, validacion de dependencias | Datos en localStorage con validacion de integridad |
| Reportes | 4 vistas de reporte: ReporteDisponiblesView, ReporteAsignadosView, ReporteDanadosView, ReportePorEmpleadoView | `Reportes.jsx`: tabs por estado, tarjetas de resumen, exportacion CSV | GET /api/reportes/disponibles/, /asignados/, /danados/, /por-empleado/ |
| Usuarios | Modelo Usuario, RegisterSerializer, UserSerializer | `Usuarios.jsx`: formulario de creacion/edicion, tabla de usuarios, solo ADMIN | POST /api/register/ para crear. Eliminacion directa en localStorage |
| Auditoria | No tiene endpoint propio (log en localStorage) | `Actividad.jsx`: tabla cronologica, boton limpiar, solo ADMIN | Cada operacion en el frontend llama DB.addLog() que escribe en localStorage |

### 5.7.2 Verificacion y Validacion del Sistema de Software

La verificacion y validacion del sistema se realizo en multiples niveles para garantizar que el software cumple con los requerimientos establecidos, incluyendo los aspectos no funcionales de seguridad y proteccion de datos.

**Pruebas Unitarias (Backend - Django):**

Se implementaron pruebas unitarias para los componentes criticos del backend, ubicadas en `backend/inventario/tests/` y `backend/usuarios/tests/`. Estas pruebas verifican:

- **test_activo_serializer.py:** Validacion de serial unico (que el serializer rechace seriales duplicados), validacion de valor positivo (que rechace valores <= 0), validacion de estados permitidos (que solo acepte DISPONIBLE, ASIGNADO o DANADO), y que la actualizacion de un activo existente no falle por su propio serial.

- **test_permissions.py:** Verificacion de que el permiso IsAdminRole permite acceso a usuarios con rol ADMIN y deniega acceso a usuarios con rol USER. Esto es critico para la seguridad del sistema.

- **test_serializers.py (usuarios):** Validacion de registro: username unico, email unico, contrasena minimo 8 caracteres, confirmacion de contrasena coincidente.

**Pruebas Funcionales (Frontend):**

Se realizaron pruebas manuales sistematicas cubriendo todos los flujos de usuario:

| Flujo probado | Resultado esperado | Resultado obtenido | Estado |
|---------------|-------------------|-------------------|--------|
| Login con credenciales correctas | Redireccion a Dashboard | Correcto | PASS |
| Login con credenciales incorrectas | Mensaje de error | Correcto | PASS |
| Crear activo con serial unico | Activo creado, notificacion de exito | Correcto | PASS |
| Crear activo con serial duplicado | Mensaje "Serial duplicado" | Correcto | PASS |
| Crear activo con valor negativo | Mensaje "Valor debe ser mayor a 0" | Correcto | PASS |
| Asignar activo disponible | Estado cambia a ASIGNADO, asignacion creada | Correcto | PASS |
| Devolver activo asignado | Estado cambia a DISPONIBLE, fecha devolucion registrada | Correcto | PASS |
| Eliminar activo asignado | Mensaje "No se puede eliminar: esta asignado" | Correcto | PASS |
| Eliminar sede con activos | Mensaje de error con dependencias | Correcto | PASS |
| Operador intenta crear sede | Boton no visible, formulario no accesible | Correcto | PASS |
| Operador ve solo su sede | Lista filtrada por sede_id del operador | Correcto | PASS |
| Exportar CSV de activos | Archivo descargado con datos correctos | Correcto | PASS |
| Admin crea usuario operador | Usuario creado con rol y sede asignados | Correcto | PASS |
| Log registra operaciones | Cada accion aparece en el log con fecha y usuario | Correcto | PASS |

**Pruebas de Integracion:**

Se verifico la comunicacion correcta entre frontend y backend:
- Build de produccion exitoso: `vite build` compila 37 modulos sin errores en 648ms.
- Tamano del bundle optimizado: JS 297 KB (87 KB gzip), CSS 230 KB (30 KB gzip) â€” cumple con RNF-04.
- Todas las rutas de React Router funcionan correctamente con historyApiFallback.

**Verificacion de requerimientos no funcionales:**

| RNF | Verificacion | Resultado |
|-----|-------------|-----------|
| RNF-01 (Usabilidad) | Se probo con un usuario sin experiencia previa: registro un activo en 1:45 minutos | CUMPLE |
| RNF-02 (Responsivo) | Se probo en Chrome DevTools con resoluciones 1920px, 768px y 360px | CUMPLE |
| RNF-03 (Eficiencia) | Operaciones CRUD medidas con DevTools Network: todas < 500ms | CUMPLE |
| RNF-04 (Carga inicial) | Bundle gzip: 87 KB JS + 30 KB CSS = 117 KB total. Carga < 2s en 10 Mbps | CUMPLE |
| RNF-05 (Cifrado) | Verificado en Django admin: contrasenas almacenadas como hash PBKDF2 | CUMPLE |
| RNF-06 (JWT) | Tokens con expiracion. Request sin token recibe 401 Unauthorized | CUMPLE |
| RNF-09 (Trazabilidad) | Todas las operaciones generan entrada en log de actividad | CUMPLE |

### 5.7.3 Integracion de Software en Hardware

El sistema SIGAE esta disenado para ejecutarse sobre la siguiente infraestructura de hardware y software:

**Entorno de desarrollo (actual):**
- Equipo: PC con Windows 10/11, procesador Intel i5 o superior, 8 GB RAM minimo
- Software: Python 3.12, Node.js 20 LTS, Git 2.x, VS Code
- Base de datos: SQLite 3 (archivo local, sin servidor adicional)
- Servidor de desarrollo backend: `python manage.py runserver` (puerto 8000)
- Servidor de desarrollo frontend: `vite dev` (puerto 3000)

**Entorno de produccion (planificado):**
- Servidor: VPS Linux (Ubuntu 22.04 LTS), 2 GB RAM, 1 vCPU, 40 GB SSD
- Web server: Nginx como proxy reverso (maneja HTTPS, sirve archivos estaticos)
- App server: Gunicorn ejecutando Django (4 workers, puerto 8000 interno)
- Frontend: Archivos estaticos generados por `vite build` servidos directamente por Nginx
- Base de datos: PostgreSQL 15 (para produccion, reemplazando SQLite)
- Certificado SSL: Let's Encrypt (HTTPS gratuito)

La integracion entre software y hardware se realiza de la siguiente manera: el navegador del usuario (cliente) envia requests HTTPS al servidor Nginx. Nginx determina si la request es para la API (/api/*) o para el frontend (/*). Las requests de API se redirigen a Gunicorn/Django, que procesa la logica y consulta PostgreSQL. Las requests del frontend se resuelven sirviendo los archivos estaticos del build de React.

### 5.7.4 Transicion de Software y Gestion de Lanzamientos

**Control de versiones:**
- Herramienta: Git con repositorio remoto en GitHub
- Repositorio: https://github.com/cristian17ramirez2026-lab/proyecto-USB
- Rama principal: `main` (codigo estable y funcional)
- Convencion de commits: mensajes descriptivos en espanol que indican que se cambio y por que

**Versionamiento:**
- Version actual: v4.0.0
- Esquema: versionamiento semantico (MAJOR.MINOR.PATCH)
  - MAJOR: cambios que rompen compatibilidad
  - MINOR: nuevas funcionalidades compatibles
  - PATCH: correcciones de bugs

**Proceso de lanzamiento:**
1. Desarrollo y pruebas en entorno local
2. Commit con mensaje descriptivo
3. Push a rama main en GitHub
4. Build de produccion: `vite build` genera archivos optimizados en `frontend/dist/`
5. Despliegue en servidor: copiar archivos, reiniciar servicios

### 5.7.5 Mantenimiento del Software

El plan de mantenimiento del sistema contempla cuatro tipos de actividades:

**Mantenimiento correctivo:** Correccion de bugs o defectos reportados por los usuarios. Se gestionan mediante issues en el repositorio de GitHub, con etiquetas de severidad (critico, mayor, menor). Los bugs criticos (que impiden el uso del sistema) se corrigen en un plazo maximo de 24 horas.

**Mantenimiento adaptativo:** Actualizacion de dependencias para mantener compatibilidad y seguridad. Esto incluye actualizar Django, React, Bootstrap y las demas librerias cuando se publican nuevas versiones. Se recomienda revisar dependencias al menos una vez al mes usando `pip list --outdated` y `npm outdated`.

**Mantenimiento perfectivo:** Mejoras de rendimiento, usabilidad o funcionalidad basadas en el feedback de los usuarios. Por ejemplo: agregar paginacion a las tablas cuando el volumen de datos crezca, implementar busqueda avanzada con multiples criterios, o agregar graficos a los reportes.

**Mantenimiento preventivo:** Revision periodica de seguridad siguiendo las recomendaciones de OWASP. Esto incluye verificar que no haya vulnerabilidades conocidas en las dependencias, revisar los logs de acceso, y asegurar que los tokens JWT tengan tiempos de expiracion adecuados.

### 5.7.6 Gestion de Defectos y Problemas de Software

Los defectos y problemas tecnicos se gestionan mediante el siguiente proceso:

**Identificacion:** Los defectos pueden ser identificados por los usuarios (reporte verbal o escrito), por el desarrollador durante pruebas, o por herramientas automaticas (linter, build errors).

**Registro:** Cada defecto se documenta en un issue de GitHub con la siguiente informacion:
- Titulo descriptivo del problema
- Pasos para reproducir el error
- Comportamiento esperado vs. comportamiento actual
- Severidad: Critica (sistema inutilizable), Mayor (funcionalidad afectada), Menor (cosmetico)
- Capturas de pantalla si aplica

**Resolucion:**
1. Se crea una rama de fix a partir de main
2. Se implementa la correccion
3. Se ejecutan las pruebas existentes para verificar que no se rompio nada
4. Se hace merge a main
5. Se cierra el issue con referencia al commit

**Aseguramiento de calidad:**
- Todo cambio debe compilar exitosamente (`vite build` sin errores)
- Las pruebas unitarias del backend deben pasar
- Se verifica manualmente el flujo afectado antes de hacer merge
- Se revisa que el log de actividad registre correctamente las operaciones

## 5.8 Resultados y Entregables Finales

Al finalizar el desarrollo del proyecto SIGAE, se obtuvieron los siguientes resultados concretos que evidencian el cumplimiento de los objetivos planteados:

### Producto de Software Funcional

Se entrega una plataforma web completamente funcional compuesta por:

**Backend (Django REST API):**
- 2 aplicaciones Django: `inventario` (activos, empleados, asignaciones, reportes) y `usuarios` (autenticacion, registro, permisos)
- 3 modelos de datos: Activo, Empleado, Asignacion (mas Usuario que extiende AbstractUser)
- 4 ViewSets con CRUD completo y acciones personalizadas (devolucion)
- 4 vistas de reportes especializadas (disponibles, asignados, danados, por empleado)
- 6 serializers con validaciones de negocio
- 1 clase de permiso personalizada (IsAdminRole)
- Autenticacion JWT con obtencion y refresco de tokens
- Transacciones atomicas para operaciones criticas (asignaciones)

**Frontend (React SPA):**
- 13 paginas funcionales: Login, Dashboard, Activos, Empleados, Asignaciones, Sedes, Departamentos, Reportes, Usuarios, Actividad, ActivoForm, EmpleadoForm, Register
- 4 componentes reutilizables: Layout (sidebar + topbar), Navbar, AdminRoute, PrivateRoute
- 1 contexto de autenticacion (AuthContext) con estado global
- 2 servicios: db.js (localStorage), apiService.js (axios con interceptores JWT)
- Esquema de colores corporativo: rojo (#FF0000), azul (#003087), blanco (#FFFFFF)
- Diseno responsivo con Bootstrap 5

**Base de datos de ejemplo:**
- 1 usuario administrador preconfigurado
- 20 sedes colombianas con datos reales (Bogota, Medellin, Cali, etc.)
- 10 departamentos organizacionales
- 50+ empleados con datos de ejemplo
- 100+ activos de diversos tipos (computadores, monitores, mobiliario, etc.)
- 20+ asignaciones iniciales
- 8 activos marcados como danados

### Metricas del Proyecto

| Metrica | Valor |
|---------|-------|
| Archivos de codigo fuente | 87 |
| Lineas de codigo (estimado) | ~14,000 |
| Requerimientos funcionales implementados | 20/20 (100%) |
| Requerimientos no funcionales verificados | 10/10 (100%) |
| Pruebas unitarias backend | 3 archivos de test |
| Pruebas funcionales ejecutadas | 14 flujos verificados |
| Tiempo de build de produccion | 648ms |
| Tamano del bundle (gzip) | 117 KB (JS + CSS) |
| Tiempo de carga inicial | < 2 segundos |
| Modulos del sistema | 8 (autenticacion, activos, empleados, asignaciones, sedes, departamentos, reportes, auditoria) |

### Entregables Documentales

| Entregable | Ubicacion | Estado |
|-----------|-----------|--------|
| Informe completo del proyecto | `documentacion/Informe_Proyecto_SIGAE_v2.md` | Completado |
| Diagrama de clases | `documentacion/diagramas/diagrama_clases.html` | Completado |
| Diagrama de secuencia | `documentacion/diagramas/diagrama_secuencia.html` | Completado |
| Diagrama de actividades | `documentacion/diagramas/diagrama_actividades.html` | Completado |
| Diagrama de casos de uso | `documentacion/diagramas/diagrama_casos_uso.html` | Completado |
| Codigo fuente completo | https://github.com/cristian17ramirez2026-lab/proyecto-USB | Publicado |

### Cumplimiento de Objetivos

| Objetivo Especifico | Evidencia de Cumplimiento |
|---------------------|--------------------------|
| 1. Analizar procesos actuales | Seccion 1.1: identificacion del problema, analisis de riesgos, levantamiento de requerimientos |
| 2. Disenar arquitectura | Seccion 5.6: arquitectura de 3 capas, diagramas de componentes y despliegue |
| 3. Desarrollar modulo de activos | Implementado: CRUD completo con validaciones, busqueda, filtros, exportacion CSV |
| 4. Implementar asignaciones | Implementado: asignacion/devolucion con transacciones atomicas y trazabilidad |
| 5. Desarrollar reportes y auditoria | Implementado: reportes por estado/sede/empleado, log de actividad |
| 6. Implementar seguridad | Implementado: JWT, RBAC (ADMIN/OPERADOR), cifrado PBKDF2, permisos granulares |
| 7. Realizar pruebas | Seccion 5.7.2: pruebas unitarias, funcionales, integracion, verificacion de RNF |
| 8. Elaborar documentacion | Este documento + diagramas UML + codigo documentado en GitHub |

### Trabajo Futuro

Aunque el sistema cumple con todos los requerimientos planteados, se identifican las siguientes mejoras para versiones futuras:

1. **Modulo de mantenimientos programados:** Permitir registrar mantenimientos preventivos y correctivos con alertas automaticas.
2. **Paginacion del lado del servidor:** Para manejar volumenes de datos mayores a 1,000 registros por tabla.
3. **Graficos en reportes:** Integrar una libreria de graficos (Chart.js o Recharts) para visualizacion de datos.
4. **Notificaciones por email:** Alertar a los responsables cuando se les asigna un activo o cuando un mantenimiento esta proximo.
5. **Aplicacion movil:** Desarrollar una version movil con React Native para escaneo de codigos de barras.
6. **Migracion completa a backend:** Mover la gestion de sedes, departamentos y log de actividad del localStorage al backend Django para mayor robustez.
7. **Integracion con Active Directory:** Para autenticacion corporativa en organizaciones que ya usen AD.
