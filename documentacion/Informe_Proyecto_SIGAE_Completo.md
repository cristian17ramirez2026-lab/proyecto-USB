# Facultad de Ingenierias - Programa de Ingenieria de Sistemas

## Sistema de Gestion de Activos Empresariales - SIGAE

**Presentado por:** Cristian Rafael Ramirez Romero
**Grupo:** P15 - P29
**Tutor:** Jonathan Ruiz
**Barranquilla - Colombia, Abril 2026**

---

## Historial de Cambios

| Revision | Fecha | Item | Descripcion | Responsable |
|----------|-------|------|-------------|-------------|
| 1.0 | 20/03/2026 | Documento | Elaboracion inicial del resumen del proyecto | Cristian Ramirez Romero |
| 2.0 | 28/04/2026 | Documento | Documentacion completa: analisis, diseno, desarrollo, pruebas | Cristian Ramirez Romero |

---

## Tabla de Contenido

1. [Proyecto de Producto de Software](#1-proyecto-de-producto-de-software)
2. [Documentos de Referencia](#2-documentos-de-referencia)
3. [Definiciones y Acronimos](#3-definiciones-y-acronimos)
4. [Resumen del Trabajo Requerido](#4-resumen-del-trabajo-requerido)
5. [Proceso de Desarrollo de Software](#5-proceso-de-desarrollo-de-software)
6. [Aspectos Eticos](#6-aspectos-eticos)
7. [Conclusiones](#7-conclusiones)
8. [Anexos](#anexos)

---

## 1. Proyecto de Producto de Software

El presente documento describe el desarrollo del Sistema de Gestion de Activos Empresariales (SIGAE), una plataforma web disenada para optimizar el control, seguimiento y administracion de los activos fisicos y tecnologicos de una organizacion. SIGAE permite registrar activos, gestionar empleados, realizar asignaciones y devoluciones, administrar sedes y departamentos, generar reportes detallados y mantener un registro completo de actividad del sistema.

El sistema esta construido con una arquitectura moderna de dos capas: un backend API REST desarrollado con Django REST Framework y autenticacion JWT, y un frontend SPA (Single Page Application) desarrollado con React 19, Vite y Bootstrap 5. Esta separacion permite escalabilidad, mantenimiento independiente y una experiencia de usuario fluida y responsiva.

### 1.1 Identificacion y Contexto del Problema

La gestion de activos empresariales es un proceso critico para cualquier organizacion que posea bienes fisicos y tecnologicos. En muchas empresas colombianas, este proceso se realiza de manera manual o con herramientas inadecuadas como hojas de calculo, lo que genera problemas de trazabilidad, perdida de informacion, duplicidad de registros y dificultad para generar reportes oportunos.

La ausencia de un sistema centralizado dificulta conocer en tiempo real el estado de los activos, a quien estan asignados, en que sede se encuentran y cual es su historial de movimientos. Esto impacta directamente en la toma de decisiones, la planificacion de compras y el cumplimiento de auditorias internas.

#### 1.1.1 Analisis de riesgo

| ID | Riesgo | Probabilidad | Impacto | Estrategia de Mitigacion |
|----|--------|-------------|---------|--------------------------|
| R1 | Perdida de datos por fallas en la base de datos | Media | Alto | Implementar respaldos periodicos de la base de datos SQLite. Migracion a PostgreSQL en produccion con backups automatizados. |
| R2 | Acceso no autorizado a informacion sensible | Media | Alto | Implementar autenticacion JWT con tokens de expiracion corta, control de acceso basado en roles (ADMIN/OPERADOR) y hash seguro de contrasenas con PBKDF2. |
| R3 | Incompatibilidad entre versiones de dependencias | Baja | Medio | Fijar versiones en requirements.txt y package.json. Usar entornos virtuales (venv) para Python y node_modules aislados para Node.js. |
| R4 | Retrasos en el cronograma de desarrollo | Media | Medio | Aplicar metodologia agil con sprints de 2 semanas. Priorizar funcionalidades criticas (CRUD de activos, asignaciones) en los primeros sprints. |
| R5 | Errores en la logica de negocio (asignaciones, estados) | Media | Alto | Implementar pruebas unitarias para serializers y permisos. Validar reglas de negocio tanto en backend (serializers) como en frontend (formularios). Usar transacciones atomicas en operaciones criticas. |

#### 1.1.2 Identificacion del problema

El problema central identificado es la falta de un sistema informatico que permita gestionar de manera eficiente los activos empresariales de una organizacion con multiples sedes en Colombia. Las principales deficiencias detectadas son:

1. **Registro manual de activos:** Los activos se registran en hojas de calculo sin validacion de datos, lo que genera duplicidad de seriales y registros incompletos.
2. **Falta de trazabilidad:** No existe un mecanismo para rastrear el historial de asignaciones y devoluciones de cada activo.
3. **Ausencia de control por sedes:** Las organizaciones con multiples sedes no pueden gestionar sus activos de forma centralizada ni generar reportes consolidados.
4. **Gestion de empleados desvinculada:** La informacion de empleados no esta relacionada con los activos que tienen asignados, dificultando las auditorias.
5. **Reportes limitados:** La generacion de reportes por estado, sede o empleado requiere procesamiento manual de datos.

### 1.2 Proposito, Alcance y Objetivo

**Proposito:** Desarrollar una plataforma web que permita la gestion integral de activos empresariales, incluyendo el registro, asignacion, devolucion, seguimiento y generacion de reportes de los bienes de una organizacion.

**Alcance:** El sistema SIGAE cubre los siguientes modulos funcionales:
- Autenticacion y control de acceso basado en roles (ADMIN y OPERADOR)
- Gestion de activos (CRUD completo con validaciones de serial unico y estados)
- Gestion de empleados (CRUD con validacion de cedula unica)
- Gestion de asignaciones y devoluciones de activos
- Gestion de sedes (20 sedes colombianas preconfiguradas)
- Gestion de departamentos (10 departamentos organizacionales)
- Generacion de reportes por estado, sede y empleado con exportacion a CSV
- Dashboard con estadisticas generales
- Registro de actividad del sistema (log de acciones)
- Gestion de usuarios del sistema

**Objetivos:**
1. Disenar e implementar una API REST con Django REST Framework que exponga endpoints para la gestion de activos, empleados, asignaciones y reportes.
2. Desarrollar una interfaz de usuario SPA con React 19 que consuma la API y ofrezca una experiencia de usuario intuitiva y responsiva.
3. Implementar un sistema de autenticacion seguro basado en JWT con control de acceso por roles.
4. Garantizar la integridad de los datos mediante validaciones en backend y frontend, restricciones de base de datos y transacciones atomicas.
5. Proveer datos de prueba realistas con sedes colombianas, empleados y activos para facilitar la validacion funcional.

### 1.3 Suposiciones y Restricciones

**Suposiciones:**
- Los usuarios del sistema cuentan con acceso a un navegador web moderno (Chrome, Firefox, Edge).
- La organizacion cuenta con conectividad a internet para acceder al sistema.
- Los datos de activos, empleados y sedes son proporcionados por la organizacion.
- El administrador del sistema es responsable de la creacion de cuentas de usuario.

**Restricciones:**
- El sistema se desarrolla como proyecto academico con un unico desarrollador.
- El tiempo de desarrollo esta limitado al periodo academico (aproximadamente 8 semanas).
- La base de datos de desarrollo es SQLite; para produccion se recomienda PostgreSQL.
- El frontend utiliza localStorage como base de datos simulada para demostracion, manteniendo la misma estructura de datos que el backend.
- El presupuesto es limitado a herramientas de software libre y gratuitas.

### 1.4 Entregables del proyecto

| No. | Entregable | Descripcion | Fecha |
|-----|-----------|-------------|-------|
| 1 | Documento de requerimientos | Especificacion de requerimientos funcionales y no funcionales | 25/03/2026 |
| 2 | Diagramas UML | Casos de uso, secuencia, actividades, clases | 01/04/2026 |
| 3 | Backend API REST | API Django REST Framework con modelos, serializers, views y autenticacion JWT | 10/04/2026 |
| 4 | Frontend SPA | Aplicacion React con todas las paginas, componentes y servicios | 18/04/2026 |
| 5 | Pruebas unitarias | Tests para serializers, permisos y logica de negocio | 22/04/2026 |
| 6 | Documentacion tecnica | Informe completo del proyecto, guion de sustentacion | 28/04/2026 |
| 7 | Version HTML standalone | Sistema funcional en HTML/CSS/JS puro para demostracion offline | 28/04/2026 |

### 1.5 Cronograma y Presupuesto

| Fase | Actividad | Duracion | Inicio | Fin |
|------|-----------|----------|--------|-----|
| 1 | Analisis de requerimientos y diseno | 2 semanas | 10/03/2026 | 23/03/2026 |
| 2 | Diseno de base de datos y arquitectura | 1 semana | 24/03/2026 | 30/03/2026 |
| 3 | Desarrollo del backend (API REST) | 2 semanas | 31/03/2026 | 13/04/2026 |
| 4 | Desarrollo del frontend (React SPA) | 2 semanas | 07/04/2026 | 20/04/2026 |
| 5 | Pruebas e integracion | 1 semana | 21/04/2026 | 27/04/2026 |
| 6 | Documentacion y entrega final | 1 semana | 21/04/2026 | 28/04/2026 |

**Presupuesto:**

| Recurso | Costo |
|---------|-------|
| Python 3.12 | Gratuito (Open Source) |
| Django / DRF / SimpleJWT | Gratuito (Open Source) |
| React / Vite / Bootstrap | Gratuito (Open Source) |
| VS Code | Gratuito |
| Git / GitHub | Gratuito |
| SQLite | Gratuito (incluido en Python) |
| Hosting desarrollo (localhost) | Sin costo |
| **Total** | **$0 COP** |

---

## 2. Documentos de Referencia

### 2.1 Referencias

| Ref | Titulo | Autor / Organizacion | Ano |
|-----|--------|---------------------|-----|
| [R1] | Django Documentation | Django Software Foundation | 2024 |
| [R2] | React Documentation | Meta Platforms, Inc. | 2024 |
| [R3] | Django REST Framework Documentation | Tom Christie | 2024 |
| [R4] | Bootstrap 5 Documentation | Bootstrap Team | 2024 |
| [R5] | Vite Documentation | Evan You | 2024 |
| [R6] | Simple JWT Documentation | David Sanders | 2024 |
| [R7] | Ingenieria del Software - Un enfoque practico (8va edicion) | Roger S. Pressman | 2014 |

### 2.2 Estandares

| Ref | Estandar | Descripcion |
|-----|----------|-------------|
| [E1] | ISO/IEC/IEEE 29148:2011 | Ingenieria de Requerimientos - Procesos del ciclo de vida |
| [E2] | ISO/IEC 25010:2011 | Modelo de calidad del producto de software |
| [E3] | UML 2.5 | Unified Modeling Language Specification, OMG, 2015 |

---

## 3. Definiciones y Acronimos

### 3.1 Definiciones

| Termino | Definicion |
|---------|-----------|
| Activo empresarial | Bien fisico o tecnologico propiedad de la organizacion, como computadores, monitores, mobiliario, equipos de red, entre otros |
| Asignacion | Proceso formal de entrega de un activo a un empleado, registrando fecha, responsable y observaciones |
| Devolucion | Proceso de retorno de un activo previamente asignado, que cambia su estado de ASIGNADO a DISPONIBLE |
| Trazabilidad | Capacidad de rastrear el historial completo de movimientos y asignaciones de un activo a lo largo del tiempo |
| API REST | Interfaz de programacion de aplicaciones basada en el protocolo HTTP que utiliza los metodos GET, POST, PUT y DELETE para operaciones CRUD |
| JWT | Mecanismo de autenticacion basado en tokens firmados digitalmente que contienen informacion del usuario y tienen tiempo de expiracion |
| SPA | Aplicacion de pagina unica que carga una sola pagina HTML y actualiza dinamicamente el contenido sin recargar el navegador |
| ORM | Mapeo objeto-relacional, tecnica que permite interactuar con la base de datos usando objetos del lenguaje de programacion en lugar de SQL directo |

### 3.2 Acronimos

| Acronimo | Significado |
|----------|------------|
| SIGAE | Sistema de Gestion de Activos Empresariales |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| JWT | JSON Web Token |
| CRUD | Create, Read, Update, Delete |
| SPA | Single Page Application |
| ORM | Object-Relational Mapping |
| MVC | Model-View-Controller |
| MVT | Model-View-Template |
| CSS | Cascading Style Sheets |
| HTML | HyperText Markup Language |
| SQL | Structured Query Language |
| HTTP | HyperText Transfer Protocol |
| URL | Uniform Resource Locator |
| UML | Unified Modeling Language |
| FK | Foreign Key (Clave Foranea) |
| PK | Primary Key (Clave Primaria) |
| COP | Peso Colombiano |

---

## 4. Resumen del Trabajo Requerido

El proyecto SIGAE requiere el desarrollo de una plataforma web completa para la gestion de activos empresariales, compuesta por dos capas principales: un backend API REST construido con Django REST Framework que expone endpoints para la gestion de activos, empleados, asignaciones y reportes, con autenticacion JWT mediante SimpleJWT; y un frontend SPA desarrollado con React 19, Vite 8 y Bootstrap 5 que consume la API y ofrece una interfaz de usuario moderna y responsiva.

El sistema gestiona las siguientes entidades principales: activos (con estados DISPONIBLE, ASIGNADO y DANADO), empleados (con cedula unica), asignaciones (relacion activo-empleado con fechas y observaciones), sedes (20 ubicaciones colombianas), departamentos (10 unidades organizacionales), usuarios (con roles ADMIN y OPERADOR) y registros de actividad.

El desarrollo sigue una metodologia agil con sprints iterativos de 2 semanas, priorizando las funcionalidades criticas en los primeros sprints. Se incluyen datos de prueba realistas con sedes de ciudades colombianas, 50+ empleados y 100+ activos para facilitar la validacion funcional del sistema.

### 4.1 Organizacion y Control del proyecto

| Nombre | Rol | Responsabilidades |
|--------|-----|-------------------|
| Cristian Rafael Ramirez Romero | Desarrollador Full Stack / Lider del Proyecto | Analisis de requerimientos, diseno de arquitectura, desarrollo del backend (Django REST Framework), desarrollo del frontend (React), diseno de base de datos, implementacion de pruebas unitarias, documentacion tecnica |
| Jonathan Ruiz | Tutor Academico | Supervision del proceso de desarrollo, revision de entregables, orientacion metodologica y tecnica del proyecto |

---


## 5. Proceso de Desarrollo de Software

### 5.1 Entorno del Proceso de Software

El desarrollo del sistema SIGAE se realizo siguiendo una metodologia agil basada en Scrum, con iteraciones (sprints) de 2 semanas. Cada sprint incluyo las fases de planificacion, desarrollo, pruebas y revision, permitiendo entregas incrementales y retroalimentacion continua.

**Herramientas de desarrollo:**

| Herramienta | Version | Uso |
|-------------|---------|-----|
| Python | 3.12+ | Lenguaje de programacion del backend |
| Django | 4.2+ (< 6.0) | Framework web para el backend |
| Django REST Framework | 3.14+ (< 4.0) | Construccion de la API REST |
| djangorestframework-simplejwt | 5.3+ (< 6.0) | Autenticacion basada en tokens JWT |
| django-cors-headers | 4.3+ (< 5.0) | Manejo de CORS para comunicacion frontend-backend |
| React | 19.2.5 | Libreria para la interfaz de usuario |
| Vite | 8.0.9 | Herramienta de build y servidor de desarrollo |
| Bootstrap | 5.3.8 | Framework CSS para estilos responsivos |
| React Router DOM | 7.14.2 | Enrutamiento del SPA |
| Axios | 1.15.2 | Cliente HTTP para consumo de API |
| React Bootstrap | 2.10.10 | Componentes Bootstrap para React |
| SQLite | 3.x | Base de datos de desarrollo |
| Git / GitHub | - | Control de versiones y repositorio remoto |
| Visual Studio Code | - | Editor de codigo |
| Node.js | 20+ | Entorno de ejecucion para herramientas frontend |

**Estructura de sprints:**

| Sprint | Duracion | Entregables |
|--------|----------|-------------|
| Sprint 1 | Semanas 1-2 | Analisis de requerimientos, diseno de base de datos, configuracion del proyecto Django y React |
| Sprint 2 | Semanas 3-4 | Modelos de datos, serializers, API de activos y empleados, autenticacion JWT |
| Sprint 3 | Semanas 5-6 | API de asignaciones y reportes, frontend de Login, Dashboard, Activos, Empleados |
| Sprint 4 | Semanas 7-8 | Frontend de Asignaciones, Sedes, Departamentos, Reportes, Usuarios, Actividad. Pruebas, documentacion |

### 5.2 Analisis de Software

#### 5.2.1 Definicion de Roles o Actores

| Rol | Descripcion | Permisos |
|-----|-------------|----------|
| Administrador (ADMIN) | Responsable de la gestion completa del sistema. Tiene acceso total a todos los modulos incluyendo gestion de usuarios, sedes, departamentos, activos, empleados, asignaciones, reportes y registro de actividad. Puede eliminar activos y empleados (con validacion de dependencias). | Acceso total a todos los modulos. CRUD completo en todas las entidades. Gestion de usuarios y roles. Eliminacion de registros con validacion. |
| Operador (OPERADOR) | Personal encargado de la gestion operativa de activos y empleados dentro de su sede asignada. Puede crear y editar activos y empleados, registrar asignaciones y devoluciones, consultar reportes, pero no puede gestionar sedes, departamentos, usuarios ni eliminar registros criticos. | Crear y editar activos y empleados. Registrar asignaciones y devoluciones. Consultar reportes. Sin acceso a gestion de usuarios, sedes ni departamentos. |

#### 5.2.2 Analisis de Requerimientos

Los requerimientos del sistema fueron recopilados mediante el analisis de problematicas comunes en la gestion de activos empresariales en organizaciones colombianas con multiples sedes. Se revisaron soluciones existentes en el mercado y se identificaron las necesidades funcionales clave a traves de la metodologia de historias de usuario.

El proceso de analisis incluyo:
1. **Identificacion de stakeholders:** Administradores de TI, personal operativo, gerencia.
2. **Definicion de procesos de negocio:** Registro de activos, asignacion a empleados, devolucion, generacion de reportes, control de inventario por sede.
3. **Priorizacion de funcionalidades:** Se utilizo la tecnica MoSCoW (Must have, Should have, Could have, Won't have) para priorizar los requerimientos.
4. **Validacion:** Los requerimientos fueron validados contra los procesos de negocio identificados y las restricciones del proyecto academico.

#### 5.2.3 Requerimientos Funcionales

| Ref | Modulo | Historia de Usuario | Criterio de Aceptacion |
|-----|--------|--------------------|-----------------------|
| RF01 | Autenticacion | Yo como usuario del sistema deseo iniciar sesion con mi nombre de usuario y contrasena para acceder a las funcionalidades del sistema. | El sistema valida las credenciales y permite o deniega el acceso. Se muestra mensaje de error si las credenciales son incorrectas. |
| RF02 | Autenticacion | Yo como usuario autenticado deseo que mi sesion sea gestionada mediante tokens JWT con refresh token para mantener mi sesion activa de forma segura. | El sistema emite un access token y un refresh token al iniciar sesion. El access token tiene expiracion configurable. El refresh token permite obtener nuevos access tokens. |
| RF03 | Activos | Yo como operador deseo registrar nuevos activos con nombre, tipo, serial, valor y fecha de compra para mantener actualizado el inventario de la organizacion. | El formulario valida que el serial sea unico, el valor sea positivo y todos los campos obligatorios esten completos. El activo se crea con estado DISPONIBLE por defecto. |
| RF04 | Activos | Yo como operador deseo editar y actualizar la informacion de los activos existentes para corregir datos o reflejar cambios en su estado. | El sistema permite modificar todos los campos del activo. La validacion de serial unico excluye el registro actual en edicion. |
| RF05 | Activos | Yo como administrador deseo eliminar activos del sistema para depurar el inventario, siempre que no esten actualmente asignados. | El sistema verifica que el activo no tenga asignaciones activas (sin fecha de devolucion) antes de permitir la eliminacion. Si tiene asignaciones activas, muestra mensaje de error. |
| RF06 | Activos | Yo como operador deseo buscar y filtrar activos por nombre, serial, tipo y estado para localizar rapidamente un activo especifico. | El sistema permite filtrar la lista de activos por multiples criterios simultaneamente. Los resultados se actualizan en tiempo real. |
| RF07 | Empleados | Yo como operador deseo registrar empleados con nombre, apellido, cedula, cargo, sede y departamento para vincularlos con los activos de la organizacion. | El formulario valida que la cedula sea unica. Todos los campos obligatorios deben estar completos. |
| RF08 | Empleados | Yo como administrador deseo editar y eliminar empleados del sistema, siempre que no tengan activos asignados actualmente. | La edicion permite modificar todos los campos. La eliminacion verifica que no existan asignaciones activas. |
| RF09 | Asignaciones | Yo como operador deseo asignar activos disponibles a empleados registrados, incluyendo observaciones, para formalizar la entrega de bienes. | Solo se muestran activos con estado DISPONIBLE. Al crear la asignacion, el activo cambia automaticamente a estado ASIGNADO. Se registra la fecha de asignacion. |
| RF10 | Asignaciones | Yo como operador deseo registrar la devolucion de activos asignados para liberar el activo y dejarlo disponible para nueva asignacion. | Al registrar la devolucion, se registra la fecha y el activo cambia automaticamente a estado DISPONIBLE. No se permite devolver un activo ya devuelto. |
| RF11 | Sedes | Yo como administrador deseo gestionar las sedes de la organizacion (crear, editar, eliminar) para mantener actualizada la estructura organizacional. | CRUD completo de sedes. Solo accesible para usuarios con rol ADMIN. |
| RF12 | Departamentos | Yo como administrador deseo gestionar los departamentos de la organizacion (crear, editar, eliminar) para organizar la estructura interna. | CRUD completo de departamentos vinculados a sedes. Solo accesible para usuarios con rol ADMIN. |
| RF13 | Sedes/Departamentos | Yo como administrador deseo que el sistema valide las dependencias al eliminar sedes o departamentos para evitar la perdida de datos relacionados. | El sistema verifica que no existan activos, empleados o departamentos asociados antes de permitir la eliminacion. |
| RF14 | Reportes | Yo como operador deseo generar reportes de activos por estado (disponibles, asignados, danados) para conocer la situacion actual del inventario. | El sistema muestra listas filtradas de activos segun su estado. Los reportes de activos asignados incluyen informacion del empleado responsable. |
| RF15 | Reportes | Yo como operador deseo generar reportes por sede con desglose de activos para conocer la distribucion de bienes en cada ubicacion. | El reporte muestra los activos agrupados por sede con conteo y detalle. |
| RF16 | Reportes | Yo como operador deseo generar reportes por empleado con historial de asignaciones para auditar la responsabilidad sobre los activos. | El reporte muestra cada empleado con la cantidad de activos asignados actualmente y el historial completo de asignaciones (incluyendo devoluciones). |
| RF17 | Reportes | Yo como operador deseo exportar los reportes a formato CSV para procesarlos en herramientas externas como Excel. | El sistema genera un archivo CSV descargable con los datos del reporte seleccionado. |
| RF18 | Usuarios | Yo como administrador deseo gestionar los usuarios del sistema y sus roles para controlar el acceso a las funcionalidades. | CRUD de usuarios con asignacion de roles (ADMIN/OPERADOR). Solo accesible para usuarios con rol ADMIN. |
| RF19 | Actividad | Yo como administrador deseo consultar el registro de actividad del sistema para auditar las acciones realizadas por los usuarios. | El sistema registra automaticamente las acciones (login, logout, creacion, edicion, eliminacion) con fecha, usuario y detalle. |
| RF20 | Dashboard | Yo como usuario autenticado deseo ver un dashboard con estadisticas generales para tener una vision rapida del estado del inventario. | El dashboard muestra tarjetas con conteos de activos por estado, total de empleados, asignaciones activas y actividad reciente. |

#### 5.2.4 Requerimientos No Funcionales

| Ref | Tipo | Descripcion | Metrica / Criterio |
|-----|------|-------------|-------------------|
| RNF-01 | Usabilidad | El sistema debe ser accesible desde navegadores modernos (Chrome, Firefox, Edge) sin instalacion adicional. | Compatible con las ultimas 2 versiones de Chrome, Firefox y Edge. |
| RNF-02 | Usabilidad | La interfaz debe ser responsiva y adaptarse a dispositivos moviles y de escritorio. | Uso de Bootstrap 5 con grid system responsivo. Navegacion funcional en pantallas desde 320px. |
| RNF-03 | Eficiencia | El tiempo de respuesta de la API no debe superar los 2 segundos para operaciones CRUD. | Medido con herramientas de desarrollo del navegador en condiciones normales de operacion. |
| RNF-04 | Eficiencia | El sistema debe soportar al menos 50 usuarios concurrentes. | Validado mediante la arquitectura stateless de JWT y el servidor WSGI de Django. |
| RNF-05 | Seguridad | Las contrasenas deben almacenarse con hash seguro (PBKDF2). | Django utiliza PBKDF2 con SHA256 por defecto para el hash de contrasenas. Nunca se almacenan en texto plano. |
| RNF-06 | Seguridad | La autenticacion debe implementarse mediante tokens JWT con expiracion configurable. | Access token con expiracion de 5 minutos (configurable). Refresh token con expiracion de 24 horas. |
| RNF-07 | Eticos | El sistema no debe recopilar datos personales mas alla de los necesarios para la gestion de activos. | Solo se almacenan: nombre, apellido, cedula, cargo, departamento y sede del empleado. No se recopilan datos biometricos ni financieros. |
| RNF-08 | Eticos | Los datos de los empleados deben tratarse conforme a la Ley 1581 de 2012 de proteccion de datos personales. | Acceso restringido por roles. Datos visibles solo para usuarios autenticados. |
| RNF-09 | Regulatorios | El sistema debe cumplir con la normativa colombiana de proteccion de datos (Ley 1581 de 2012). | Control de acceso basado en roles. Registro de actividad para auditoria. Hash seguro de credenciales. |
| RNF-10 | Regulatorios | El sistema debe permitir la generacion de reportes para procesos de auditoria interna. | Reportes por estado, sede y empleado disponibles. Exportacion a CSV. Registro de actividad consultable. |


### 5.3 Modelado de Software

#### 5.3.1 Diagramas de Casos de Uso

Los diagramas de casos de uso del sistema se encuentran disponibles en formato interactivo HTML en:
**Archivo:** `documentacion/diagramas/diagrama_casos_uso.html`

A continuacion se describen los casos de uso principales del sistema:

---

**CU01 - Gestionar Activos**

| Elemento | Descripcion |
|----------|-------------|
| **Nombre** | Gestionar Activos |
| **Actores** | Administrador, Operador |
| **Referencias** | RF03, RF04, RF05, RF06 |
| **Precondicion** | El usuario debe estar autenticado en el sistema con rol ADMIN u OPERADOR. |
| **Postcondicion** | El activo ha sido registrado, actualizado o eliminado exitosamente en el sistema. |

**Flujo Normal:**
1. El usuario accede al modulo "Activos" desde el menu lateral de navegacion.
2. El sistema muestra la lista de activos registrados con columnas: nombre, tipo, serial, valor, estado y acciones.
3. El usuario puede buscar activos por nombre, serial, tipo o estado usando la barra de busqueda y filtros.
4. El usuario selecciona la accion deseada:
   - **Crear:** Hace clic en "Nuevo Activo". El sistema muestra un formulario con campos: nombre, descripcion, tipo, serial, valor, fecha de compra, sede y departamento.
   - **Editar:** Hace clic en el icono de edicion del activo. El sistema carga los datos actuales en el formulario.
   - **Eliminar:** Hace clic en el icono de eliminacion (solo ADMIN).
5. El usuario completa o modifica los datos del formulario.
6. El sistema valida los datos: serial unico (excluyendo el registro actual en edicion), valor mayor a 0, campos obligatorios completos.
7. El sistema guarda los cambios y muestra un mensaje de confirmacion.
8. La lista de activos se actualiza automaticamente.

**Flujo Alterno:**
- **FA1 - Serial duplicado:** Si el serial ingresado ya existe en otro activo, el sistema muestra el mensaje "Ya existe un activo con este serial" y no permite guardar hasta que se corrija.
- **FA2 - Valor invalido:** Si el valor ingresado es menor o igual a 0, el sistema muestra "El valor debe ser un numero positivo".

**Excepciones:**
- **E1 - Activo asignado:** Si se intenta eliminar un activo que tiene asignaciones activas (sin fecha de devolucion), el sistema muestra "No se puede eliminar: el activo esta actualmente asignado" y cancela la operacion.
- **E2 - Permisos insuficientes:** Si un usuario OPERADOR intenta eliminar un activo, el sistema deniega la accion.

---

**CU02 - Registrar Asignacion**

| Elemento | Descripcion |
|----------|-------------|
| **Nombre** | Registrar Asignacion |
| **Actores** | Administrador, Operador |
| **Referencias** | RF09, RF10 |
| **Precondicion** | Existen activos con estado DISPONIBLE y empleados registrados en el sistema. El usuario esta autenticado. |
| **Postcondicion** | Se ha creado un registro de asignacion. El activo cambia su estado de DISPONIBLE a ASIGNADO. |

**Flujo Normal:**
1. El usuario accede al modulo "Asignaciones" desde el menu lateral.
2. El sistema muestra la lista de asignaciones existentes con columnas: activo, empleado, fecha de asignacion, fecha de devolucion, observaciones y acciones.
3. El usuario hace clic en "Nueva Asignacion".
4. El sistema muestra un formulario con:
   - Selector de activo (solo muestra activos con estado DISPONIBLE).
   - Selector de empleado (muestra todos los empleados activos).
   - Campo de observaciones (opcional).
5. El usuario selecciona un activo disponible.
6. El usuario selecciona un empleado.
7. El usuario agrega observaciones opcionales (ej: "Asignacion inicial", "Reemplazo por dano").
8. El usuario confirma la asignacion.
9. El sistema crea el registro de asignacion con la fecha actual (auto_now_add).
10. El sistema cambia el estado del activo de DISPONIBLE a ASIGNADO (operacion atomica con @transaction.atomic).
11. El sistema muestra mensaje de confirmacion y actualiza la lista.

**Flujo Alterno:**
- **FA1 - No hay activos disponibles:** Si no existen activos con estado DISPONIBLE, el selector de activos aparece vacio y el formulario no puede completarse.
- **FA2 - Activo danado:** Si se intenta asignar un activo con estado DANADO, el sistema muestra "No se pueden asignar activos con estado DANADO".
- **FA3 - Activo ya asignado:** Si el activo ya esta asignado, el sistema muestra "El activo ya esta asignado a otro empleado".

**Flujo de Devolucion:**
1. En la lista de asignaciones, el usuario identifica una asignacion activa (sin fecha de devolucion).
2. El usuario hace clic en "Devolver".
3. El sistema registra la fecha de devolucion (timezone.now()).
4. El sistema cambia el estado del activo de ASIGNADO a DISPONIBLE.
5. El sistema muestra mensaje de confirmacion.

**Excepciones:**
- **E1 - Devolucion duplicada:** Si se intenta devolver un activo que ya fue devuelto, el sistema muestra "La devolucion ya fue registrada para esta asignacion".

---

**CU03 - Generar Reportes**

| Elemento | Descripcion |
|----------|-------------|
| **Nombre** | Generar Reportes |
| **Actores** | Administrador, Operador |
| **Referencias** | RF14, RF15, RF16, RF17 |
| **Precondicion** | Existen activos registrados en el sistema. El usuario esta autenticado. |
| **Postcondicion** | El reporte ha sido generado y mostrado al usuario. Opcionalmente, ha sido exportado a CSV. |

**Flujo Normal:**
1. El usuario accede al modulo "Reportes" desde el menu lateral.
2. El sistema muestra las opciones de reportes disponibles:
   - Activos Disponibles
   - Activos Asignados (con informacion del empleado responsable)
   - Activos Danados
   - Reporte por Empleado (con historial de asignaciones)
3. El usuario selecciona el tipo de reporte deseado.
4. El sistema consulta los datos correspondientes:
   - Disponibles: `Activo.objects.filter(estado='DISPONIBLE')`
   - Asignados: Activos con estado ASIGNADO + datos del empleado de la asignacion activa
   - Danados: `Activo.objects.filter(estado='DAÑADO')`
   - Por empleado: Empleados con conteo de activos asignados y historial completo
5. El sistema muestra los resultados en formato de tabla.
6. El usuario puede exportar los datos a CSV haciendo clic en "Exportar CSV".
7. El sistema genera un archivo CSV con los datos del reporte y lo descarga automaticamente.

**Flujo Alterno:**
- **FA1 - Sin datos:** Si no existen activos en el estado seleccionado, el sistema muestra un mensaje indicando que no hay datos para mostrar.

#### 5.3.2 Diagramas de Secuencia

Los diagramas de secuencia del sistema se encuentran disponibles en formato interactivo HTML en:
**Archivo:** `documentacion/diagramas/diagrama_secuencia.html`

Los diagramas de secuencia modelan las interacciones principales del sistema:

1. **Secuencia de Autenticacion:** El usuario envia credenciales al frontend, que las reenvia al endpoint `/api/token/`. El backend valida las credenciales contra la base de datos, genera un par de tokens JWT (access + refresh) y los retorna. El frontend almacena los tokens y redirige al Dashboard.

2. **Secuencia de Creacion de Activo:** El usuario completa el formulario de activo. El frontend envia una peticion POST a `/api/activos/`. El backend valida los datos (serial unico, valor positivo) a traves del ActivoSerializer, crea el registro en la base de datos y retorna el activo creado con codigo 201.

3. **Secuencia de Asignacion:** El usuario selecciona activo y empleado. El frontend envia POST a `/api/asignaciones/`. El backend valida que el activo este DISPONIBLE (AsignacionCreateSerializer), crea la asignacion y actualiza el estado del activo a ASIGNADO en una transaccion atomica.

4. **Secuencia de Devolucion:** El usuario solicita devolucion. El frontend envia POST a `/api/asignaciones/{id}/devolver/`. El backend registra la fecha de devolucion y cambia el estado del activo a DISPONIBLE en una transaccion atomica.

#### 5.3.3 Diagramas de Actividad

Los diagramas de actividad del sistema se encuentran disponibles en formato interactivo HTML en:
**Archivo:** `documentacion/diagramas/diagrama_actividades.html`

Los diagramas de actividad modelan los flujos de trabajo principales:

1. **Proceso de Login:** Inicio -> Ingresar credenciales -> Validar usuario y contrasena -> [Valido] Generar tokens JWT -> Almacenar sesion -> Redirigir a Dashboard / [Invalido] Mostrar error -> Fin.

2. **Proceso de Gestion de Activos:** Inicio -> Acceder a modulo Activos -> Seleccionar accion -> [Crear] Completar formulario -> Validar datos -> [Valido] Guardar activo -> Actualizar lista / [Invalido] Mostrar errores -> Fin.

3. **Proceso de Asignacion y Devolucion:** Inicio -> Seleccionar activo disponible -> Seleccionar empleado -> Agregar observaciones -> Confirmar asignacion -> Cambiar estado activo a ASIGNADO -> Registrar asignacion -> Fin. Para devolucion: Seleccionar asignacion activa -> Confirmar devolucion -> Registrar fecha devolucion -> Cambiar estado activo a DISPONIBLE -> Fin.

#### 5.3.4 Diagrama de Clases

El diagrama de clases del sistema se encuentra disponible en formato interactivo HTML en:
**Archivo:** `documentacion/diagramas/diagrama_clases.html`

**Descripcion de las clases principales del modelo de datos:**

**Clase Usuario** (hereda de AbstractUser)
```
Usuario
├── Atributos heredados de AbstractUser:
│   ├── id: Integer (PK, auto-generado)
│   ├── username: CharField(max_length=150, unique=True)
│   ├── email: EmailField
│   ├── password: CharField(max_length=128) - hash PBKDF2
│   ├── first_name: CharField(max_length=150)
│   ├── last_name: CharField(max_length=150)
│   ├── is_active: BooleanField
│   └── date_joined: DateTimeField
├── Atributos propios:
│   └── rol: CharField(max_length=10, choices=[ADMIN, USER], default=USER)
└── Metodos:
    └── __str__(): retorna username
```

**Clase Activo**
```
Activo
├── Atributos:
│   ├── id: Integer (PK, auto-generado)
│   ├── nombre: CharField(max_length=200)
│   ├── descripcion: TextField(blank=True, null=True)
│   ├── tipo: CharField(max_length=100)
│   ├── serial: CharField(max_length=100, unique=True)
│   ├── valor: DecimalField(max_digits=12, decimal_places=2)
│   ├── fecha_compra: DateField
│   └── estado: CharField(max_length=20, choices=[DISPONIBLE, ASIGNADO, DAÑADO], default=DISPONIBLE)
├── Relaciones:
│   └── asignaciones: reverse FK desde Asignacion (related_name='asignaciones')
├── Meta:
│   └── ordering: ['-id']
└── Metodos:
    └── __str__(): retorna "nombre (serial)"
```

**Clase Empleado**
```
Empleado
├── Atributos:
│   ├── id: Integer (PK, auto-generado)
│   ├── nombre: CharField(max_length=100)
│   ├── apellido: CharField(max_length=100)
│   ├── cedula: CharField(max_length=20, unique=True)
│   ├── departamento: CharField(max_length=100)
│   └── cargo: CharField(max_length=100)
├── Relaciones:
│   └── asignaciones: reverse FK desde Asignacion (related_name='asignaciones')
├── Meta:
│   └── ordering: ['-id']
└── Metodos:
    └── __str__(): retorna "nombre apellido"
```

**Clase Asignacion**
```
Asignacion
├── Atributos:
│   ├── id: Integer (PK, auto-generado)
│   ├── activo: ForeignKey(Activo, on_delete=PROTECT)
│   ├── empleado: ForeignKey(Empleado, on_delete=PROTECT)
│   ├── fecha_asignacion: DateTimeField(auto_now_add=True)
│   ├── fecha_devolucion: DateTimeField(blank=True, null=True)
│   └── observaciones: TextField(blank=True, null=True)
├── Meta:
│   └── ordering: ['-fecha_asignacion']
└── Metodos:
    └── __str__(): retorna "activo.nombre → empleado"
```

**Relaciones entre clases:**
- Activo (1) ---< (*) Asignacion: Un activo puede tener multiples asignaciones a lo largo del tiempo.
- Empleado (1) ---< (*) Asignacion: Un empleado puede tener multiples asignaciones.
- La relacion es protegida (on_delete=PROTECT): no se puede eliminar un activo o empleado que tenga asignaciones.


### 5.4 Diseno de la Interfaz

#### 5.4.1 Arquitectura de Informacion

El sistema SIGAE organiza su contenido en una estructura jerarquica accesible desde un menu lateral (sidebar) persistente. La navegacion esta dividida en secciones logicas con iconos representativos y acceso controlado por roles.

**Mapa del sitio:**

```
Login (pagina publica)
│
└── Dashboard (pagina principal post-login)
    │
    ├── INVENTARIO
    │   ├── Activos (lista, crear, editar, eliminar)
    │   ├── Empleados (lista, crear, editar, eliminar)
    │   └── Asignaciones (lista, crear, devolver)
    │
    ├── ORGANIZACION
    │   ├── Sedes (lista, crear, editar, eliminar) [Solo ADMIN]
    │   └── Departamentos (lista, crear, editar, eliminar) [Solo ADMIN]
    │
    ├── ANALISIS
    │   └── Reportes (disponibles, asignados, danados, por empleado, exportar CSV)
    │
    └── ADMINISTRACION [Solo ADMIN]
        ├── Usuarios (lista, crear, editar, eliminar)
        └── Actividad (log de acciones del sistema)
```

**Componentes de navegacion:**
- **Sidebar (menu lateral):** Componente persistente en todas las paginas autenticadas. Muestra el logo del sistema, las secciones de navegacion agrupadas por categoria, y el boton de cerrar sesion. Las secciones de Organizacion y Administracion solo son visibles para usuarios con rol ADMIN.
- **Navbar (barra superior):** Muestra el nombre del usuario autenticado, su rol y opciones de sesion.
- **Layout:** Componente contenedor que envuelve todas las paginas autenticadas, proporcionando el sidebar y el area de contenido principal.

#### 5.4.2 Wireframe

**Pantalla de Login:**
La pagina de inicio de sesion utiliza un diseno dividido (split layout):
- **Lado izquierdo:** Formulario de autenticacion con campos de usuario y contrasena, boton de inicio de sesion con colores corporativos (rojo #FF0000 y azul #003087), y enlace de registro.
- **Lado derecho:** Panel de branding con el logo de SIGAE, nombre del sistema y descripcion breve sobre fondo de color corporativo.
- Diseno responsivo: en dispositivos moviles, el panel de branding se oculta y el formulario ocupa todo el ancho.

**Pantalla de Dashboard:**
- **Tarjetas de estadisticas (stat cards):** Grid de 4-6 tarjetas en la parte superior mostrando: total de activos, activos disponibles, activos asignados, activos danados, total de empleados, asignaciones activas. Cada tarjeta tiene un icono, valor numerico y etiqueta descriptiva.
- **Tabla de actividad reciente:** Debajo de las tarjetas, una tabla con las ultimas acciones registradas en el sistema (login, creacion, edicion, eliminacion) con columnas: accion, detalle, usuario, fecha.

**Pantalla de Activos:**
- **Barra de herramientas:** Barra de busqueda por texto, filtros por tipo y estado (dropdowns), boton "Nuevo Activo".
- **Tabla de datos:** Tabla responsiva con columnas: nombre, tipo, serial, valor (formato COP), fecha de compra, estado (badge con color), acciones (editar, eliminar).
- **Modal de formulario:** Al crear o editar, se muestra un modal con el formulario de datos del activo.
- **Badges de estado:** DISPONIBLE (verde), ASIGNADO (azul), DANADO (rojo).

**Pantalla de Empleados:**
- Similar a Activos: barra de busqueda, filtros, tabla con columnas (nombre, apellido, cedula, departamento, cargo, acciones), modal de formulario.

**Pantalla de Asignaciones:**
- Tabla con columnas: activo (nombre + serial), empleado (nombre completo), fecha de asignacion, fecha de devolucion, observaciones, acciones.
- Boton "Nueva Asignacion" que abre formulario con selectores de activo (solo disponibles) y empleado.
- Boton "Devolver" en asignaciones activas.

**Pantalla de Reportes:**
- Pestanas o botones para seleccionar tipo de reporte.
- Tabla de resultados con datos filtrados.
- Boton "Exportar CSV" para descarga.

**Paleta de colores corporativos:**
- Rojo primario: #FF0000
- Rojo oscuro (hover): #CC0000
- Azul corporativo: #003087
- Blanco: #FFFFFF
- Grises para fondos y bordes

### 5.5 Diseno de Datos

#### 5.5.1 Metodo de acceso a la base de datos

El acceso a la base de datos se realiza a traves del ORM (Object-Relational Mapping) de Django, que permite interactuar con la base de datos utilizando objetos Python en lugar de consultas SQL directas. Esto proporciona abstraccion de la base de datos, seguridad contra inyeccion SQL y portabilidad entre motores de base de datos.

**Ejemplos de operaciones con el ORM:**

```python
# Consultar todos los activos disponibles
activos_disponibles = Activo.objects.filter(estado='DISPONIBLE')

# Crear un nuevo activo
activo = Activo.objects.create(
    nombre='Laptop Dell Latitude 5540',
    descripcion='16GB RAM, Intel i7, SSD 512GB',
    tipo='Computador',
    serial='PC-2024-0001',
    valor=3500000,
    fecha_compra='2024-01-15'
)

# Actualizar el estado de un activo
activo.estado = 'ASIGNADO'
activo.save()

# Consultar asignaciones activas de un empleado
asignaciones = Asignacion.objects.filter(
    empleado_id=1,
    fecha_devolucion__isnull=True
).select_related('activo')

# Contar activos asignados por empleado
from django.db.models import Count, Q
empleados = Empleado.objects.annotate(
    activos_asignados_count=Count(
        'asignaciones',
        filter=Q(asignaciones__fecha_devolucion__isnull=True)
    )
)

# Operacion atomica: asignar activo
from django.db import transaction

@transaction.atomic
def asignar_activo(activo, empleado, observaciones=''):
    asignacion = Asignacion.objects.create(
        activo=activo,
        empleado=empleado,
        observaciones=observaciones
    )
    activo.estado = 'ASIGNADO'
    activo.save()
    return asignacion
```

**Frontend (localStorage):**
El frontend utiliza una capa de abstraccion (`db.js`) que simula las operaciones de base de datos usando localStorage del navegador, manteniendo la misma estructura de datos que el backend:

```javascript
// Ejemplo de operaciones en db.js
const activos = DB.getActivos();                    // Equivale a Activo.objects.all()
const activo = DB.createActivo({                    // Equivale a Activo.objects.create()
    nombre: 'Laptop Dell',
    tipo: 'Computador',
    serial: 'PC-2024-0001',
    valor: 3500000
});
DB.updateActivo(id, { estado: 'ASIGNADO' });       // Equivale a activo.save()
```

#### 5.5.2 Definicion de Entidades

| Entidad | Descripcion | Campos Clave |
|---------|-------------|-------------|
| Usuario | Representa a los usuarios del sistema con credenciales de acceso y rol asignado. Hereda de AbstractUser de Django, lo que proporciona campos estandar de autenticacion mas el campo personalizado de rol. | username (unique), email, password (hash), rol (ADMIN/USER) |
| Activo | Representa un bien fisico o tecnologico propiedad de la organizacion. Cada activo tiene un serial unico, un valor monetario en COP y un estado que refleja su disponibilidad actual. | nombre, tipo, serial (unique), valor, fecha_compra, estado |
| Empleado | Representa al personal de la organizacion que puede ser responsable de activos asignados. Cada empleado se identifica por su cedula unica. | nombre, apellido, cedula (unique), departamento, cargo |
| Asignacion | Registra la relacion temporal entre un activo y un empleado, incluyendo fechas de asignacion y devolucion. Permite rastrear el historial completo de movimientos de cada activo. | activo (FK), empleado (FK), fecha_asignacion, fecha_devolucion, observaciones |
| Sede | Representa una ubicacion fisica de la organizacion. El sistema incluye 20 sedes preconfiguradas en ciudades colombianas. Gestionada en el frontend con localStorage. | nombre, ciudad, direccion, telefono |
| Departamento | Representa una unidad organizacional dentro de la estructura de la empresa, vinculada a una sede. El sistema incluye 10 departamentos preconfigurados. | nombre, sede_id (FK), area, responsable |

#### 5.5.3 Modelo Relacional

El modelo relacional del sistema define las siguientes relaciones entre entidades:

```
┌──────────┐       ┌──────────────┐       ┌──────────┐
│  Activo  │──1:*──│  Asignacion  │──*:1──│ Empleado │
└──────────┘       └──────────────┘       └──────────┘
     │                                          │
     │                                          │
     *                                          *
┌──────────┐                              ┌──────────┐
│   Sede   │──1:*─────────────────────────│   Sede   │
└──────────┘                              └──────────┘
     │
     │ 1:*
     ▼
┌──────────────┐
│ Departamento │──1:*──> Empleado
└──────────────┘──1:*──> Activo
```

**Relaciones detalladas:**

| Relacion | Cardinalidad | Descripcion | Restriccion |
|----------|-------------|-------------|-------------|
| Activo → Asignacion | 1 : * | Un activo puede tener multiples asignaciones a lo largo del tiempo | ON DELETE PROTECT |
| Empleado → Asignacion | 1 : * | Un empleado puede tener multiples asignaciones | ON DELETE PROTECT |
| Sede → Departamento | 1 : * | Una sede contiene multiples departamentos | Validacion de dependencias al eliminar |
| Sede → Empleado | 1 : * | Una sede tiene multiples empleados | Validacion de dependencias al eliminar |
| Sede → Activo | 1 : * | Una sede contiene multiples activos | Validacion de dependencias al eliminar |
| Departamento → Empleado | 1 : * | Un departamento tiene multiples empleados | Validacion de dependencias al eliminar |
| Departamento → Activo | 1 : * | Un departamento tiene multiples activos | Validacion de dependencias al eliminar |

#### 5.5.4 Diccionario de Datos

**Tabla: Activo**

| Campo | Tipo | Longitud | Obligatorio | Restriccion | Descripcion |
|-------|------|----------|-------------|-------------|-------------|
| id | INTEGER | - | Si (PK) | Auto-incremento | Identificador unico del activo |
| nombre | VARCHAR | 200 | Si | - | Nombre descriptivo del activo |
| descripcion | TEXT | - | No | Permite NULL y blank | Descripcion detallada del activo |
| tipo | VARCHAR | 100 | Si | - | Categoria del activo (Computador, Monitor, Impresora, Mobiliario, Periferico, Servidor, Red, Energia, Audiovisual, Telefonia, Seguridad) |
| serial | VARCHAR | 100 | Si | UNIQUE | Numero de serie unico del activo |
| valor | DECIMAL | 12,2 | Si | > 0 | Valor monetario en pesos colombianos (COP) |
| fecha_compra | DATE | - | Si | - | Fecha de adquisicion del activo |
| estado | VARCHAR | 20 | Si | Choices: DISPONIBLE, ASIGNADO, DAÑADO. Default: DISPONIBLE | Estado actual del activo |

**Tabla: Empleado**

| Campo | Tipo | Longitud | Obligatorio | Restriccion | Descripcion |
|-------|------|----------|-------------|-------------|-------------|
| id | INTEGER | - | Si (PK) | Auto-incremento | Identificador unico del empleado |
| nombre | VARCHAR | 100 | Si | - | Nombre(s) del empleado |
| apellido | VARCHAR | 100 | Si | - | Apellido(s) del empleado |
| cedula | VARCHAR | 20 | Si | UNIQUE | Numero de cedula de ciudadania (unico) |
| departamento | VARCHAR | 100 | Si | - | Nombre del departamento al que pertenece |
| cargo | VARCHAR | 100 | Si | - | Cargo o posicion del empleado |

**Tabla: Asignacion**

| Campo | Tipo | Longitud | Obligatorio | Restriccion | Descripcion |
|-------|------|----------|-------------|-------------|-------------|
| id | INTEGER | - | Si (PK) | Auto-incremento | Identificador unico de la asignacion |
| activo_id | INTEGER | - | Si | FK → Activo(id), ON DELETE PROTECT | Referencia al activo asignado |
| empleado_id | INTEGER | - | Si | FK → Empleado(id), ON DELETE PROTECT | Referencia al empleado responsable |
| fecha_asignacion | DATETIME | - | Si | auto_now_add=True | Fecha y hora de la asignacion (automatica) |
| fecha_devolucion | DATETIME | - | No | Permite NULL. Se establece al devolver | Fecha y hora de la devolucion |
| observaciones | TEXT | - | No | Permite NULL y blank | Notas adicionales sobre la asignacion |

**Tabla: Usuario** (hereda campos de AbstractUser)

| Campo | Tipo | Longitud | Obligatorio | Restriccion | Descripcion |
|-------|------|----------|-------------|-------------|-------------|
| id | INTEGER | - | Si (PK) | Auto-incremento | Identificador unico del usuario |
| username | VARCHAR | 150 | Si | UNIQUE | Nombre de usuario para autenticacion |
| email | VARCHAR | 254 | Si | Formato email valido | Correo electronico del usuario |
| password | VARCHAR | 128 | Si | Hash PBKDF2 con SHA256 | Contrasena almacenada como hash seguro |
| rol | VARCHAR | 10 | Si | Choices: ADMIN, USER. Default: USER | Rol del usuario que determina sus permisos |
| is_active | BOOLEAN | - | Si | Default: True | Indica si la cuenta esta activa |
| date_joined | DATETIME | - | Si | Auto | Fecha de creacion de la cuenta |

**Tabla: Sede** (gestionada en frontend con localStorage)

| Campo | Tipo | Longitud | Obligatorio | Descripcion |
|-------|------|----------|-------------|-------------|
| id | INTEGER | - | Si (PK) | Identificador unico de la sede |
| nombre | VARCHAR | - | Si | Nombre de la sede (ej: "Sede Bogota") |
| ciudad | VARCHAR | - | Si | Ciudad donde se ubica la sede |
| direccion | VARCHAR | - | Si | Direccion fisica de la sede |
| telefono | VARCHAR | - | Si | Telefono de contacto de la sede |

**Tabla: Departamento** (gestionada en frontend con localStorage)

| Campo | Tipo | Longitud | Obligatorio | Descripcion |
|-------|------|----------|-------------|-------------|
| id | INTEGER | - | Si (PK) | Identificador unico del departamento |
| nombre | VARCHAR | - | Si | Nombre del departamento (ej: "Tecnologia") |
| sede_id | INTEGER | - | Si (FK) | Referencia a la sede a la que pertenece |
| area | VARCHAR | - | Si | Area funcional (ej: "Sistemas", "Finanzas") |
| responsable | VARCHAR | - | No | Nombre del responsable del departamento |

#### 5.5.5 Restricciones de seguridad e integridad

**Restricciones de integridad referencial:**
- `ON DELETE PROTECT` en `Asignacion.activo → Activo`: No se puede eliminar un activo que tenga asignaciones registradas. El sistema verifica adicionalmente que no existan asignaciones activas (sin fecha de devolucion) antes de permitir la eliminacion.
- `ON DELETE PROTECT` en `Asignacion.empleado → Empleado`: No se puede eliminar un empleado que tenga asignaciones registradas. El sistema verifica que no tenga activos asignados actualmente.
- Validacion de dependencias en Sedes: No se puede eliminar una sede que tenga activos, empleados o departamentos asociados.
- Validacion de dependencias en Departamentos: No se puede eliminar un departamento que tenga activos o empleados asociados.

**Restricciones de unicidad:**
- `serial` en la tabla Activo es UNIQUE: No pueden existir dos activos con el mismo numero de serie.
- `cedula` en la tabla Empleado es UNIQUE: No pueden existir dos empleados con la misma cedula.
- `username` en la tabla Usuario es UNIQUE: No pueden existir dos usuarios con el mismo nombre de usuario.

**Restricciones de validacion:**
- El `valor` del activo debe ser un numero positivo (> 0).
- El `estado` del activo solo puede ser uno de los valores definidos: DISPONIBLE, ASIGNADO, DAÑADO.
- El `rol` del usuario solo puede ser ADMIN o USER.
- La `contrasena` debe tener al menos 8 caracteres (validacion en RegisterSerializer).
- Solo se pueden asignar activos con estado DISPONIBLE (validacion en AsignacionCreateSerializer).
- No se puede registrar una devolucion para una asignacion que ya fue devuelta.

**Restricciones de seguridad:**
- Las contrasenas se almacenan con hash PBKDF2 con SHA256 (mecanismo por defecto de Django). Nunca se almacenan en texto plano.
- La autenticacion se realiza mediante tokens JWT con expiracion configurable.
- Solo los usuarios con rol ADMIN pueden eliminar activos y empleados (IsAdminRole permission).
- Las operaciones criticas (asignacion, devolucion) se ejecutan dentro de transacciones atomicas (@transaction.atomic) para garantizar la consistencia de los datos.