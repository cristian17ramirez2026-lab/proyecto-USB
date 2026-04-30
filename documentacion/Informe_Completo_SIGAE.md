# SIGAE - Sistema de Gestion de Activos Empresariales
## Informe Completo del Proyecto de Practica Profesional

**Facultad de Ingenierias - Programa de Ingenieria de Sistemas**

**Presentado por:** Cristian Rafael Ramirez Romero
**Grupo:** P15 - P29
**Tutor:** Jonathan Ruiz
**Fecha:** Abril 2026
**Barranquilla - Colombia**

---

## Historial de Cambios

| Revision | Fecha | Item | Descripcion | Responsable |
|----------|-------|------|-------------|-------------|
| 1.0 | 20/03/2026 | Documento | Elaboracion inicial del resumen del proyecto | Cristian Ramirez Romero |
| 2.0 | 30/04/2026 | Documento completo | Documentacion tecnica completa: analisis, diseno, desarrollo, pruebas, marco teorico | Cristian Ramirez Romero |

---

# PARTE I - MARCO TEORICO Y CONCEPTUAL

## 1. Conceptos Clave del Marco Teorico

Los conceptos centrales que fundamentan este proyecto son:

1. **Gestion de Activos Empresariales (EAM):** Disciplina que abarca el ciclo de vida completo de los activos fisicos de una organizacion, desde su adquisicion hasta su disposicion final, incluyendo operacion, mantenimiento y optimizacion.

2. **Sistemas de Informacion Web:** Aplicaciones basadas en arquitectura cliente-servidor accesibles mediante navegadores, que permiten centralizar procesos organizacionales en plataformas digitales.

3. **Trazabilidad de Recursos:** Capacidad de rastrear el historial, ubicacion, asignacion y estado de un activo en cualquier momento, garantizando transparencia y control.

4. **Control de Inventario Tecnologico:** Proceso sistematico de registro, clasificacion y seguimiento de equipos de computo, perifericos, mobiliario y demas recursos fisicos de una empresa.

5. **Arquitectura de Software MVC/MVT:** Patron de diseno que separa la logica de negocio (Modelo), la presentacion (Vista) y el control de flujo (Controlador/Template), facilitando mantenibilidad y escalabilidad.

6. **API REST:** Interfaz de programacion basada en el protocolo HTTP que permite la comunicacion entre el frontend y el backend mediante operaciones CRUD estandarizadas.

7. **Autenticacion y Autorizacion basada en Roles (RBAC):** Mecanismo de seguridad que controla el acceso a funcionalidades del sistema segun el rol asignado al usuario (Administrador, Operador).

8. **Transformacion Digital Organizacional:** Proceso de integracion de tecnologias digitales en todas las areas de una empresa para mejorar la eficiencia operativa y la toma de decisiones.

---

## 2. Estructura Recomendada del Marco Teorico

### 2.1 Gestion de Activos Empresariales
- Definicion y alcance de la gestion de activos
- Norma ISO 55000: Gestion de Activos - Aspectos generales, principios y terminologia
- Ciclo de vida de los activos: adquisicion, operacion, mantenimiento, disposicion
- Importancia de la gestion de activos en la eficiencia organizacional
- Problematicas comunes: perdida de activos, falta de trazabilidad, registros manuales

### 2.2 Sistemas de Informacion para la Gestion Empresarial
- Evolucion de los sistemas de informacion: de hojas de calculo a plataformas web
- Tipos de sistemas: ERP, EAM, CMMS
- Ventajas de los sistemas web centralizados frente a soluciones aisladas
- Impacto en la toma de decisiones gerenciales

### 2.3 Ingenieria de Software y Metodologias de Desarrollo
- Ciclo de vida del desarrollo de software (SDLC)
- Metodologias agiles: Scrum, Kanban
- Patron de arquitectura: Model-View-Template (Django) y SPA (React)
- Buenas practicas: versionamiento, pruebas, documentacion

### 2.4 Tecnologias Web Modernas
- Backend: Python/Django, Django REST Framework
- Frontend: React.js, Vite, Bootstrap
- Base de datos: SQLite (desarrollo), PostgreSQL (produccion)
- Autenticacion: JWT (JSON Web Tokens)
- Despliegue: Docker, servidores VPS

### 2.5 Seguridad Informatica en Aplicaciones Web
- Autenticacion y autorizacion
- Control de acceso basado en roles (RBAC)
- Proteccion contra vulnerabilidades comunes (OWASP Top 10)
- Cifrado de contrasenas y manejo seguro de sesiones

### 2.6 Marco Legal y Normativo
- Ley 1273 de 2009 (Colombia): Proteccion de la informacion y datos
- Ley 1581 de 2012: Proteccion de datos personales
- ISO/IEC 27001: Seguridad de la informacion
- ISO 55000: Gestion de activos

---

## 3. Explicacion de Cada Seccion

### 3.1 Gestion de Activos Empresariales
**Que abordar:** Definir que son los activos empresariales (fisicos, tecnologicos, mobiliario), explicar por que su gestion es critica para las organizaciones, y como la norma ISO 55000 establece un marco de referencia internacional.

**Teorias relevantes:** Teoria de gestion de recursos, gestion del ciclo de vida de activos, teoria de costos de propiedad total (TCO).

### 3.2 Sistemas de Informacion
**Que abordar:** Como los sistemas de informacion transforman los procesos manuales en digitales, la evolucion desde registros en papel hasta plataformas web, y los beneficios medibles de la centralizacion.

**Teorias relevantes:** Teoria general de sistemas (Bertalanffy), modelo de aceptacion tecnologica (TAM), teoria de la informacion.

### 3.3 Ingenieria de Software
**Que abordar:** El proceso sistematico de desarrollo, las fases del SDLC aplicadas al proyecto, y como las metodologias agiles permiten entregas incrementales.

**Teorias relevantes:** Modelo en cascada, desarrollo agil (Manifiesto Agil), principios SOLID, patrones de diseno.

### 3.4 Tecnologias Web
**Que abordar:** Justificacion tecnica de la seleccion de Django + React, ventajas de la arquitectura API REST, y como estas tecnologias soportan los requerimientos del sistema.

### 3.5 Seguridad Informatica
**Que abordar:** Mecanismos implementados para proteger datos sensibles, control de acceso, y cumplimiento de estandares de seguridad.

### 3.6 Marco Legal
**Que abordar:** Normativas colombianas aplicables al manejo de datos personales de empleados y al control de activos institucionales.

---

## 4. Preguntas Guia para el Desarrollo del Contenido

### Gestion de Activos
- Que se entiende por activo empresarial y cuales son sus categorias?
- Cuales son las consecuencias de una gestion deficiente de activos?
- Como contribuye un sistema de gestion a la reduccion de perdidas?
- Que establece la norma ISO 55000 sobre gestion de activos?

### Sistemas de Informacion
- Que ventajas ofrece un sistema web frente a registros manuales?
- Como impacta la centralizacion de informacion en la toma de decisiones?
- Que caracteristicas debe tener un sistema de informacion empresarial?

### Ingenieria de Software
- Que metodologia de desarrollo es mas adecuada para este tipo de proyecto?
- Como se garantiza la calidad del software mediante pruebas?
- Que patrones de diseno se aplican en la arquitectura del sistema?

### Seguridad
- Como se protege la informacion sensible de empleados y activos?
- Que mecanismos de autenticacion y autorizacion se implementan?
- Como se previenen accesos no autorizados al sistema?

---

## 5. Palabras Clave para Busqueda Academica

- "Enterprise Asset Management System"
- "Gestion de activos empresariales software"
- "Web-based inventory management system"
- "Django REST Framework application"
- "Role-based access control web application"
- "ISO 55000 asset management"
- "Software development life cycle SDLC"
- "React.js single page application"
- "JWT authentication REST API"
- "Transformacion digital gestion de recursos"
- "OWASP web application security"
- "Trazabilidad de activos tecnologicos"

---

## 6. Relacion entre Conceptos y Variables

```
GESTION DE ACTIVOS EMPRESARIALES
        |
        v
PROBLEMATICA: Control manual, perdida de trazabilidad
        |
        v
SOLUCION: Sistema de Informacion Web (SIGAE)
        |
        +---> INGENIERIA DE SOFTWARE (metodologia, arquitectura)
        |         |
        |         +---> Backend: Django + DRF (API REST)
        |         +---> Frontend: React + Bootstrap (SPA)
        |         +---> Base de datos: SQLite/PostgreSQL
        |
        +---> SEGURIDAD (autenticacion JWT, RBAC, cifrado)
        |
        +---> MARCO LEGAL (Ley 1581/2012, ISO 27001)
        |
        v
RESULTADO: Plataforma centralizada, trazable, segura y escalable
```

**Variables principales:**
- **Variable independiente:** Implementacion del sistema SIGAE
- **Variable dependiente:** Eficiencia en la gestion de activos empresariales
- **Variables intervinientes:** Capacitacion de usuarios, infraestructura tecnologica, resistencia al cambio

---

## 7. Recomendaciones Metodologicas

1. **Coherencia conceptual:** Cada seccion del marco teorico debe conectarse logicamente con el problema de investigacion y los objetivos del proyecto.

2. **De lo general a lo especifico:** Iniciar con conceptos amplios (gestion de activos, sistemas de informacion) y avanzar hacia lo particular (tecnologias especificas, patrones de diseno).

3. **Fuentes academicas:** Priorizar articulos de revistas indexadas (IEEE, ACM, Scopus), libros de texto reconocidos y normas internacionales (ISO).

4. **Citacion rigurosa:** Utilizar norma APA 7ma edicion para todas las referencias.

5. **Actualizacion:** Preferir fuentes publicadas en los ultimos 5 anos (2021-2026) para tecnologias web.

6. **Triangulacion teorica:** Contrastar al menos 3 fuentes por cada concepto clave para dar solidez al marco.

7. **Vinculacion con el proyecto:** Cada concepto teorico debe justificar una decision de diseno o implementacion del sistema SIGAE.


---

# PARTE II - DOCUMENTACION TECNICA DEL PROYECTO

---

## 1. Proyecto de Producto de Software

El sistema SIGAE es una plataforma web empresarial desarrollada con Django (backend), React.js (frontend) y SQLite como base de datos, orientada a la gestion integral de activos fisicos y tecnologicos.

### 1.1 Identificacion y Contexto del Problema

Las organizaciones medianas y grandes enfrentan dificultades significativas en la administracion de sus activos empresariales. El uso de hojas de calculo, registros fisicos y sistemas aislados genera perdida de activos, duplicidad de registros, ausencia de trazabilidad y dificultades en auditorias.

**Pregunta de investigacion:**
Como desarrollar un sistema de gestion de activos empresariales que permita optimizar el control, seguimiento y trazabilidad de los recursos organizacionales mediante una plataforma web centralizada, segura y escalable?

---

## 2. Documentos de Referencia

### 2.1 Referencias

| Referencia | Titulo | Autor | Ano |
|------------|--------|-------|-----|
| [R1] | Django Documentation - Official | Django Software Foundation | 2024 |
| [R2] | React Documentation | Meta (Facebook) | 2024 |
| [R3] | Django REST Framework | Tom Christie | 2024 |
| [R4] | ISO 55000:2014 Asset Management | ISO/TC 251 | 2014 |
| [R5] | Clean Code: A Handbook of Agile Software Craftsmanship | Robert C. Martin | 2008 |
| [R6] | Design Patterns: Elements of Reusable Object-Oriented Software | Gamma, Helm, Johnson, Vlissides | 1994 |
| [R7] | Ingenieria del Software: Un enfoque practico | Roger S. Pressman | 2014 |
| [R8] | JSON Web Tokens (RFC 7519) | IETF | 2015 |

### 2.2 Estandares

| Estandar | Titulo | Autor | Ano |
|----------|--------|-------|-----|
| [E1] | ISO/IEC/IEEE 29148:2011 | Ingenieria de Requerimientos | IEEE | 2011 |
| [E2] | ISO/IEC 27001:2022 | Seguridad de la Informacion | ISO | 2022 |
| [E3] | ISO 55000:2014 | Gestion de Activos | ISO | 2014 |
| [E4] | OWASP Top 10:2021 | Seguridad en Aplicaciones Web | OWASP Foundation | 2021 |
| [E5] | PEP 8 | Guia de Estilo para Codigo Python | Python Software Foundation | 2001 |

---

## 3. Definiciones y Acronimos

### 3.1 Definiciones

| Termino | Definicion |
|---------|-----------|
| Activo empresarial | Bien fisico o tecnologico propiedad de la organizacion que tiene valor economico y es utilizado en sus operaciones |
| Asignacion | Proceso de vincular un activo a un empleado responsable, registrando fecha, ubicacion y observaciones |
| Trazabilidad | Capacidad de rastrear el historial completo de un activo: movimientos, responsables, estados y fechas |
| API REST | Interfaz de programacion que permite la comunicacion entre sistemas mediante operaciones HTTP (GET, POST, PUT, DELETE) |
| SPA | Single Page Application - aplicacion web que carga una sola pagina HTML y actualiza dinamicamente el contenido |
| CRUD | Operaciones basicas sobre datos: Crear, Leer, Actualizar, Eliminar |
| Sede | Ubicacion fisica de la organizacion donde se encuentran activos y empleados |
| Departamento | Division organizacional dentro de una sede que agrupa empleados por funcion |

### 3.2 Acronimos

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
| HTTP | HyperText Transfer Protocol |
| SQL | Structured Query Language |
| ORM | Object-Relational Mapping |
| CSV | Comma-Separated Values |
| UML | Unified Modeling Language |

---

## 4. Resumen del Trabajo Requerido

El proyecto SIGAE requiere el desarrollo de una plataforma web completa que permita:

1. **Gestion de activos:** Registro, edicion, consulta, clasificacion y seguimiento de activos con serial unico, valor, tipo, estado y ubicacion.
2. **Gestion de empleados:** Administracion del personal con datos de identificacion, sede, departamento y cargo.
3. **Asignaciones:** Control de prestamos de activos a empleados con trazabilidad completa (fecha asignacion, devolucion, observaciones).
4. **Multi-sede:** Soporte para 20+ sedes con operadores independientes por sede.
5. **Reportes:** Generacion de informes por estado, sede, empleado con exportacion CSV.
6. **Seguridad:** Autenticacion JWT, control de acceso por roles (ADMIN/OPERADOR).
7. **Auditoria:** Log de actividad con registro de todas las operaciones del sistema.

**Restricciones:**
- Tiempo: 16 semanas de practica profesional
- Presupuesto: $980.000 COP
- Tecnologia: Stack web moderno (Django + React)
- Equipo: Desarrollo individual

### 4.1 Organizacion y Control del Proyecto

| Nombre | Rol | Responsabilidades |
|--------|-----|-------------------|
| Cristian Rafael Ramirez Romero | Desarrollador Full-Stack / Lider del Proyecto | Analisis de requerimientos, diseno de arquitectura, desarrollo backend (Django), desarrollo frontend (React), pruebas, documentacion, despliegue |
| Jonathan Ruiz | Tutor Academico | Supervision, revision de avances, retroalimentacion tecnica y metodologica |

---

## 5. Proceso de Desarrollo de Software

### 5.1 Entorno del Proceso de Software

**Modelo de ciclo de vida:** Desarrollo iterativo incremental con elementos de Scrum.

**Fases del desarrollo:**

| Fase | Semanas | Actividades |
|------|---------|-------------|
| Analisis | 1-2 | Levantamiento de requerimientos, identificacion de actores, definicion de alcance |
| Diseno | 3-4 | Arquitectura del sistema, modelo de datos, diagramas UML, wireframes |
| Desarrollo Sprint 1 | 5-7 | Backend: modelos, API REST, autenticacion JWT |
| Desarrollo Sprint 2 | 8-10 | Frontend: Login, Dashboard, CRUD Activos y Empleados |
| Desarrollo Sprint 3 | 11-13 | Asignaciones, Sedes, Departamentos, Reportes, Usuarios |
| Pruebas | 14-15 | Pruebas unitarias, integracion, funcionales, correccion de bugs |
| Documentacion y entrega | 16 | Documentacion final, manual de usuario, despliegue |

**Metodologia:** Scrum adaptado para desarrollo individual con sprints de 3 semanas.

**Herramientas tecnologicas:**

| Herramienta | Proposito |
|-------------|-----------|
| Python 3.12 | Lenguaje backend |
| Django 5.x | Framework backend |
| Django REST Framework | API REST |
| React 19 | Framework frontend |
| Vite 8 | Build tool frontend |
| Bootstrap 5 | Framework CSS |
| SQLite | Base de datos desarrollo |
| Git / GitHub | Control de versiones |
| VS Code / Kiro | IDE de desarrollo |
| Node.js | Runtime JavaScript |

### 5.2 Analisis de Software

#### 5.2.1 Definicion de Roles o Actores

| Nombre del Rol | Descripcion |
|----------------|-------------|
| Administrador (ADMIN) | Responsable general del sistema. Tiene acceso completo a todas las funcionalidades: gestion de usuarios, sedes, departamentos, activos, empleados, asignaciones, reportes y log de actividad. Puede ver datos de todas las sedes. |
| Operador (OPERADOR) | Personal asignado a una sede especifica. Puede gestionar activos, empleados y asignaciones unicamente dentro de su sede. No puede crear sedes, departamentos ni gestionar usuarios. |
| Sistema | Actor automatico que ejecuta procesos internos como generacion de logs, validaciones de integridad, control de estados de activos y generacion de reportes. |

#### 5.2.2 Analisis de Requerimientos de Software

**Tecnica utilizada:** Analisis de procesos existentes mediante observacion directa de los flujos de trabajo manuales de gestion de activos, entrevistas con personal administrativo y revision de documentacion institucional (hojas de calculo, formatos fisicos de inventario).

Se identificaron las necesidades funcionales a partir de las falencias detectadas en el proceso actual: falta de registro centralizado, ausencia de trazabilidad, dificultad para generar reportes y carencia de control de acceso.

#### 5.2.3 Requerimientos Funcionales

| Ref | Requerimiento |
|-----|--------------|
| RF01 | Yo como Administrador deseo iniciar sesion con usuario y contrasena para acceder al sistema de forma segura |
| RF02 | Yo como Administrador deseo registrar nuevos activos con nombre, tipo, serial, valor, fecha de compra, sede y departamento para mantener un inventario actualizado |
| RF03 | Yo como Administrador deseo editar la informacion de un activo existente para corregir datos o actualizar su estado |
| RF04 | Yo como Administrador deseo eliminar un activo que no este asignado para depurar el inventario |
| RF05 | Yo como Operador deseo buscar activos por nombre, serial o tipo para localizar rapidamente un recurso |
| RF06 | Yo como Operador deseo filtrar activos por estado (Disponible, Asignado, En reparacion) para conocer la disponibilidad |
| RF07 | Yo como Administrador deseo registrar empleados con nombre, apellido, cedula, sede, departamento y cargo para vincularlos al sistema |
| RF08 | Yo como Administrador deseo editar y dar de baja empleados para mantener el directorio actualizado |
| RF09 | Yo como Operador deseo asignar un activo disponible a un empleado registrando observaciones para controlar prestamos |
| RF10 | Yo como Operador deseo registrar la devolucion de un activo asignado para liberarlo y dejarlo disponible |
| RF11 | Yo como Administrador deseo crear y administrar sedes con nombre, ciudad, direccion y telefono para organizar la estructura |
| RF12 | Yo como Administrador deseo crear y administrar departamentos vinculados a sedes para clasificar areas |
| RF13 | Yo como Administrador deseo generar reportes de activos por estado, sede y empleado para toma de decisiones |
| RF14 | Yo como Operador deseo exportar reportes en formato CSV para analisis externo |
| RF15 | Yo como Administrador deseo crear usuarios con rol (Admin/Operador) y sede asignada para controlar accesos |
| RF16 | Yo como Administrador deseo ver el log de actividad del sistema para auditar operaciones |
| RF17 | Yo como Operador deseo ver unicamente los activos y empleados de mi sede para trabajar con datos relevantes |
| RF18 | Yo como Administrador deseo que el sistema valide serial unico al crear activos para evitar duplicados |
| RF19 | Yo como Administrador deseo que el sistema impida eliminar sedes con activos, empleados o departamentos asociados para mantener integridad |
| RF20 | Yo como Sistema deseo registrar automaticamente cada operacion en el log de actividad para garantizar trazabilidad |

#### 5.2.4 Requerimientos No Funcionales

| Ref | Tipo | Descripcion |
|-----|------|-------------|
| RNF-01 | Usabilidad | El sistema debe ser accesible desde cualquier navegador web moderno (Chrome, Firefox, Edge) sin necesidad de instalar software adicional |
| RNF-02 | Usabilidad | La interfaz debe ser responsiva y adaptarse a dispositivos moviles y tablets con resolucion minima de 360px |
| RNF-03 | Eficiencia | El tiempo de respuesta de cualquier operacion CRUD no debe superar los 2 segundos |
| RNF-04 | Eficiencia | El sistema debe soportar al menos 50 usuarios concurrentes sin degradacion del rendimiento |
| RNF-05 | Seguridad | Las contrasenas deben almacenarse cifradas mediante algoritmo PBKDF2 (Django default) |
| RNF-06 | Seguridad | El acceso a la API debe estar protegido mediante tokens JWT con expiracion configurable |
| RNF-07 | Etica | El sistema no debe recopilar datos personales mas alla de los estrictamente necesarios para la gestion de activos |
| RNF-08 | Etica | Los datos de empleados deben ser tratados conforme a la Ley 1581 de 2012 de proteccion de datos personales |
| RNF-09 | Regulatorio | El sistema debe cumplir con la Ley 1273 de 2009 sobre proteccion de la informacion |
| RNF-10 | Regulatorio | El manejo de activos debe ser trazable y auditable conforme a normas de control interno |


---

### 5.3 Modelado de Software

El modelado del sistema se realizo utilizando la notacion UML (Unified Modeling Language) para representar la estructura, comportamiento e interacciones del software. Cada diagrama es trazable a los requerimientos funcionales definidos.

#### 5.3.1 Diagramas de Casos de Uso

**Caso de Uso: Gestionar Activos**

| Campo | Descripcion |
|-------|-------------|
| Caso de Uso | Gestionar Activos |
| Version | V1 |
| Referencia | CU01 |
| Autor | Cristian Ramirez Romero |
| Fecha | 15/04/2026 |
| Actores | Administrador, Operador |
| Referencias | RF02, RF03, RF04, RF05, RF06, RF18 |
| Precondiciones | El usuario debe estar autenticado y tener rol ADMIN u OPERADOR |
| Postcondicion | El activo queda registrado/actualizado/eliminado en el sistema con log de auditoria |

**Flujo Normal:**

| Paso | Actor | Descripcion |
|------|-------|-------------|
| 1 | Usuario | Accede al modulo de Activos desde el menu lateral |
| 2 | Sistema | Muestra la lista de activos filtrada por sede (si es operador) |
| 3 | Usuario | Hace clic en "Nuevo Activo" |
| 4 | Sistema | Muestra formulario con campos: nombre, descripcion, tipo, serial, valor, fecha compra, sede, departamento |
| 5 | Usuario | Completa los campos y hace clic en "Guardar" |
| 6 | Sistema | Valida datos (serial unico, valor positivo, campos obligatorios) |
| 7 | Sistema | Registra el activo con estado DISPONIBLE y genera log de actividad |
| 8 | Sistema | Muestra notificacion de exito y actualiza la tabla |

**Flujos alternos:** Si el serial ya existe, el sistema muestra error "Serial duplicado" y no guarda. Si faltan campos obligatorios, muestra "Complete todos los campos".

**Excepciones:** Error de conexion a la base de datos, sesion expirada.

---

**Caso de Uso: Asignar Activo**

| Campo | Descripcion |
|-------|-------------|
| Caso de Uso | Asignar Activo a Empleado |
| Version | V1 |
| Referencia | CU02 |
| Autor | Cristian Ramirez Romero |
| Fecha | 15/04/2026 |
| Actores | Administrador, Operador |
| Referencias | RF09, RF10, RF20 |
| Precondiciones | Debe existir al menos un activo con estado DISPONIBLE y un empleado registrado |
| Postcondicion | El activo cambia a estado ASIGNADO y se crea registro de asignacion con fecha |

**Flujo Normal:**

| Paso | Actor | Descripcion |
|------|-------|-------------|
| 1 | Usuario | Accede al modulo de Asignaciones |
| 2 | Sistema | Muestra formulario de nueva asignacion y tabla de asignaciones existentes |
| 3 | Usuario | Selecciona un activo disponible del dropdown |
| 4 | Usuario | Selecciona un empleado del dropdown |
| 5 | Usuario | Opcionalmente agrega observaciones |
| 6 | Usuario | Hace clic en "Registrar" |
| 7 | Sistema | Valida que el activo este DISPONIBLE |
| 8 | Sistema | Crea la asignacion, cambia estado del activo a ASIGNADO, genera log |
| 9 | Sistema | Actualiza la tabla de asignaciones |

**Flujos alternos:** Si el activo ya no esta disponible, muestra "Activo no disponible". Para devolucion: usuario hace clic en "Devolver", confirma, sistema cambia estado a DISPONIBLE.

---

**Caso de Uso: Gestionar Usuarios (solo ADMIN)**

| Campo | Descripcion |
|-------|-------------|
| Caso de Uso | Gestionar Usuarios del Sistema |
| Version | V1 |
| Referencia | CU03 |
| Autor | Cristian Ramirez Romero |
| Fecha | 15/04/2026 |
| Actores | Administrador |
| Referencias | RF15, RF16 |
| Precondiciones | El usuario debe tener rol ADMIN |
| Postcondicion | Nuevo usuario creado con rol y sede asignados |

**Flujo Normal:**

| Paso | Actor | Descripcion |
|------|-------|-------------|
| 1 | Admin | Accede al modulo Usuarios |
| 2 | Sistema | Muestra formulario de creacion y tabla de usuarios existentes |
| 3 | Admin | Completa: usuario, email, contrasena, nombre, apellido, rol, sede |
| 4 | Admin | Hace clic en "Crear Usuario" |
| 5 | Sistema | Valida unicidad de username, longitud de contrasena (min 6) |
| 6 | Sistema | Crea el usuario y genera log de actividad |

**Flujos alternos:** Si el username ya existe, muestra error. Admin no puede eliminar su propia cuenta.

---

#### 5.3.2 Diagramas de Secuencia

Los diagramas de secuencia se encuentran en: `documentacion/diagramas/diagrama_secuencia.html`

Flujo principal de asignacion:
```
Usuario -> Frontend(React) -> API(Django) -> Base de Datos
  |            |                  |               |
  | click      | POST /api/      | validate()    | INSERT
  | "Asignar"  | asignaciones/   | create()      | asignacion
  |            |                  | update_activo | UPDATE activo
  |            | <-- 201 Created  | <-- OK        | estado=ASIGNADO
  | <-- notify |                  |               |
```

#### 5.3.3 Diagramas de Actividad

Los diagramas de actividad se encuentran en: `documentacion/diagramas/diagrama_actividades.html`

**Proceso de asignacion de activo:**
1. Inicio -> Usuario accede a Asignaciones
2. Sistema carga activos disponibles y empleados
3. Usuario selecciona activo y empleado
4. Decision: Activo disponible? -> Si: continuar / No: mostrar error
5. Sistema crea asignacion con fecha actual
6. Sistema actualiza estado del activo a ASIGNADO
7. Sistema registra en log de actividad
8. Fin -> Notificacion de exito

#### 5.3.4 Diagrama de Clases

El diagrama de clases se encuentra en: `documentacion/diagramas/diagrama_clases.html`

**Clases principales del sistema:**

```
+------------------+       +------------------+       +------------------+
|     Usuario      |       |      Activo      |       |    Empleado      |
+------------------+       +------------------+       +------------------+
| - id: int        |       | - id: int        |       | - id: int        |
| - username: str  |       | - nombre: str    |       | - nombre: str    |
| - email: str     |       | - descripcion:str|       | - apellido: str  |
| - password: str  |       | - tipo: str      |       | - cedula: str    |
| - rol: enum      |       | - serial: str    |       | - departamento_id|
+------------------+       | - valor: decimal |       | - sede_id: int   |
| + login()        |       | - fecha_compra   |       | - cargo: str     |
| + logout()       |       | - estado: enum   |       | - email: str     |
| + isAdmin()      |       | - sede_id: int   |       +------------------+
+------------------+       | - depto_id: int  |       | + getAsignados() |
                           +------------------+       +------------------+
                           | + asignar()      |              |
                           | + devolver()     |              |
                           +------------------+              |
                                  |                          |
                                  v                          v
                           +------------------+
                           |   Asignacion     |
                           +------------------+
                           | - id: int        |
                           | - activo_id: FK  |
                           | - empleado_id:FK |
                           | - fecha_asig     |
                           | - fecha_devol    |
                           | - observaciones  |
                           +------------------+

+------------------+       +------------------+
|      Sede        |       |  Departamento    |
+------------------+       +------------------+
| - id: int        |       | - id: int        |
| - nombre: str    |       | - nombre: str    |
| - ciudad: str    |       | - sede_id: FK    |
| - direccion: str |       | - area: str      |
| - telefono: str  |       | - responsable    |
+------------------+       +------------------+
```

---

### 5.4 Diseno de la Interfaz

#### 5.4.1 Arquitectura de Informacion (Mapa del Sitio)

```
SIGAE (Login)
  |
  +-- Dashboard (estadisticas generales, actividad reciente)
  |
  +-- INVENTARIO
  |     +-- Activos (lista, busqueda, filtros, CRUD, exportar CSV)
  |     +-- Empleados (lista, busqueda, CRUD, ver activos asignados)
  |     +-- Asignaciones (nueva asignacion, devolucion, historial)
  |
  +-- ORGANIZACION
  |     +-- Sedes (lista, CRUD - solo ADMIN)
  |     +-- Departamentos (lista, CRUD - solo ADMIN)
  |
  +-- ANALISIS
  |     +-- Reportes (disponibles, asignados, reparacion, por sede, por empleado, CSV)
  |
  +-- ADMINISTRACION (solo ADMIN)
        +-- Usuarios (crear, editar, eliminar, asignar rol y sede)
        +-- Actividad (log de operaciones, limpiar)
```

**Navegacion principal:** Sidebar lateral fijo con secciones agrupadas por funcion. El menu se adapta segun el rol del usuario (ADMIN ve todas las secciones, OPERADOR no ve Administracion).

#### 5.4.2 Wireframes

Los wireframes principales del sistema son:

1. **Login:** Pantalla dividida - lado izquierdo con informacion del sistema (fondo rojo), lado derecho con formulario de acceso (fondo blanco).

2. **Dashboard:** Banner de bienvenida (azul), 8 tarjetas de estadisticas en grid, tabla de actividad reciente.

3. **Lista de Activos:** Header con titulo y botones de accion, barra de busqueda + filtro por estado, tabla con columnas (Activo, Tipo, Serial, Valor, Sede, Depto, Estado, Acciones).

4. **Formulario de Activo:** Card centrada con campos en grid de 2 columnas, botones Cancelar/Guardar.

5. **Asignaciones:** Formulario de nueva asignacion (3 columnas: activo, empleado, observaciones), tabla de historial.

---

### 5.5 Diseno de Datos

#### 5.5.1 Metodo de Acceso a la Base de Datos

El sistema utiliza el ORM (Object-Relational Mapping) de Django para acceder a la base de datos. Esto permite realizar operaciones CRUD sin escribir SQL directamente.

**Ejemplo de transacciones en Python/Django:**

```python
# Crear un activo
activo = Activo.objects.create(
    nombre="Laptop Dell #1",
    tipo="Computador",
    serial="COM-2024-0001",
    valor=3500000,
    fecha_compra="2024-01-15",
    estado="DISPONIBLE"
)

# Consultar activos disponibles
disponibles = Activo.objects.filter(estado="DISPONIBLE")

# Actualizar estado
activo.estado = "ASIGNADO"
activo.save()

# Eliminar (protegido si tiene asignaciones)
activo.delete()  # Lanza ProtectedError si tiene FK
```

#### 5.5.2 Definicion de las Entidades de Datos

| Entidad | Descripcion |
|---------|-------------|
| Usuario | Representa a los usuarios del sistema con credenciales de acceso, rol (ADMIN/USER) y permisos asociados. Extiende el modelo AbstractUser de Django |
| Activo | Recurso fisico o tecnologico de la organizacion. Contiene informacion de identificacion (serial unico), clasificacion (tipo), valoracion economica y estado actual |
| Empleado | Personal de la organizacion al que se le pueden asignar activos. Identificado por cedula unica, vinculado a departamento y sede |
| Asignacion | Registro de la relacion temporal entre un activo y un empleado. Contiene fechas de asignacion y devolucion para trazabilidad |
| Sede | Ubicacion fisica de la organizacion (ciudad, direccion, telefono). Agrupa empleados y activos por locacion |
| Departamento | Division organizacional dentro de una sede. Clasifica empleados por area funcional |
| Log de Actividad | Registro cronologico de todas las operaciones realizadas en el sistema para auditoria |

#### 5.5.3 Modelo Relacional

```
USUARIO (id PK, username, email, password, rol, is_active, date_joined)

SEDE (id PK, nombre, ciudad, direccion, telefono)

DEPARTAMENTO (id PK, nombre, sede_id FK->SEDE, area, responsable)

EMPLEADO (id PK, nombre, apellido, cedula UNIQUE, departamento_id FK->DEPARTAMENTO,
          sede_id FK->SEDE, cargo, email, fecha_ingreso, activo)

ACTIVO (id PK, nombre, descripcion, tipo, serial UNIQUE, valor, fecha_compra,
        estado, sede_id FK->SEDE, departamento_id FK->DEPARTAMENTO)

ASIGNACION (id PK, activo_id FK->ACTIVO, empleado_id FK->ACTIVO,
            fecha_asignacion, fecha_devolucion, observaciones)

LOG (id PK, action, detail, user, fecha)
```

**Relaciones:**
- SEDE 1:N DEPARTAMENTO
- SEDE 1:N EMPLEADO
- SEDE 1:N ACTIVO
- DEPARTAMENTO 1:N EMPLEADO
- DEPARTAMENTO 1:N ACTIVO
- ACTIVO 1:N ASIGNACION
- EMPLEADO 1:N ASIGNACION

#### 5.5.4 Diccionario de Datos

**Entidad: ACTIVO**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | INTEGER | - | Si | PK | Identificador unico autoincremental |
| nombre | VARCHAR | 200 | Si | - | Nombre descriptivo del activo |
| descripcion | TEXT | - | No | - | Descripcion detallada del activo |
| tipo | VARCHAR | 100 | Si | - | Categoria del activo (Computador, Monitor, etc.) |
| serial | VARCHAR | 100 | Si | UNIQUE | Numero de serie unico del activo |
| valor | DECIMAL | 12,2 | Si | - | Valor economico en pesos colombianos |
| fecha_compra | DATE | - | Si | - | Fecha de adquisicion del activo |
| estado | VARCHAR | 20 | Si | - | Estado actual: DISPONIBLE, ASIGNADO, DANADO |

**Entidad: EMPLEADO**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | INTEGER | - | Si | PK | Identificador unico autoincremental |
| nombre | VARCHAR | 100 | Si | - | Nombre del empleado |
| apellido | VARCHAR | 100 | Si | - | Apellido del empleado |
| cedula | VARCHAR | 20 | Si | UNIQUE | Numero de cedula de ciudadania |
| departamento | VARCHAR | 100 | Si | - | Departamento al que pertenece |
| cargo | VARCHAR | 100 | Si | - | Cargo o puesto de trabajo |

**Entidad: ASIGNACION**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | INTEGER | - | Si | PK | Identificador unico autoincremental |
| activo_id | INTEGER | - | Si | FK->ACTIVO | Referencia al activo asignado |
| empleado_id | INTEGER | - | Si | FK->EMPLEADO | Referencia al empleado responsable |
| fecha_asignacion | DATETIME | - | Si | - | Fecha y hora de la asignacion (automatica) |
| fecha_devolucion | DATETIME | - | No | - | Fecha y hora de devolucion (null si activa) |
| observaciones | TEXT | - | No | - | Notas adicionales sobre la asignacion |

**Entidad: USUARIO**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | INTEGER | - | Si | PK | Identificador unico autoincremental |
| username | VARCHAR | 150 | Si | UNIQUE | Nombre de usuario para login |
| email | VARCHAR | 254 | Si | - | Correo electronico |
| password | VARCHAR | 128 | Si | - | Contrasena cifrada (PBKDF2) |
| rol | VARCHAR | 10 | Si | - | Rol del usuario: ADMIN o USER |

#### 5.5.5 Restricciones de Seguridad e Integridad

1. **Integridad referencial:** Las relaciones FK utilizan `on_delete=PROTECT` para Activo y Empleado en Asignacion, impidiendo eliminar registros con dependencias activas.

2. **Unicidad:** Los campos `serial` (Activo) y `cedula` (Empleado) tienen restriccion UNIQUE a nivel de base de datos.

3. **Validacion de negocio:** No se permite asignar activos con estado DANADO o ASIGNADO. No se permite eliminar sedes con activos, empleados o departamentos asociados.

4. **Cifrado:** Las contrasenas se almacenan con hash PBKDF2-SHA256 (Django default), nunca en texto plano.

5. **Control de acceso:** Tokens JWT con expiracion. Permisos por rol verificados en cada endpoint de la API.

---

### 5.6 Diseno de la Arquitectura de Software

#### 5.6.1 Patron de Diseno

El sistema implementa una **arquitectura de tres capas** con separacion clara de responsabilidades:

1. **Capa de Presentacion (Frontend):** React.js como SPA con React Router para navegacion, Bootstrap para estilos, y Axios/fetch para comunicacion con la API.

2. **Capa de Logica de Negocio (Backend):** Django con patron MVT (Model-View-Template), Django REST Framework para la API REST, y sistema de permisos basado en roles.

3. **Capa de Datos:** SQLite (desarrollo) / PostgreSQL (produccion) con ORM de Django para abstraccion de consultas.

**Patrones aplicados:**
- **MVC/MVT:** Separacion modelo-vista-controlador
- **Repository Pattern:** A traves del ORM de Django
- **Observer Pattern:** Signals de Django para log de actividad
- **Strategy Pattern:** Permisos dinamicos segun rol del usuario

#### 5.6.2 Diagrama de Componentes

```
+------------------------------------------+
|            FRONTEND (React)              |
|  +----------+ +----------+ +----------+ |
|  |  Pages   | |Components| | Services | |
|  | (Activos,| | (Layout, | | (db.js,  | |
|  | Empleados| |  Navbar) | |  API)    | |
|  |  etc.)   | |          | |          | |
|  +----------+ +----------+ +----------+ |
+------------------------------------------+
              |  HTTP/REST  |
              v             v
+------------------------------------------+
|            BACKEND (Django)               |
|  +----------+ +----------+ +----------+ |
|  |  Views   | |Serializers| |  Models  | |
|  | (API     | | (Validac.)| | (ORM)   | |
|  |  endpoints| |          | |          | |
|  +----------+ +----------+ +----------+ |
|  +----------+ +----------+              |
|  |  URLs    | |Permissions|              |
|  | (Router) | | (RBAC)   |              |
|  +----------+ +----------+              |
+------------------------------------------+
              |    ORM     |
              v            v
+------------------------------------------+
|         BASE DE DATOS (SQLite)           |
|  Activos | Empleados | Asignaciones      |
|  Usuarios | Sedes | Departamentos        |
+------------------------------------------+
```

#### 5.6.3 Diagrama de Despliegue

```
+-------------------+          +-------------------+
|   CLIENTE WEB     |          |   SERVIDOR WEB    |
|   (Navegador)     |  HTTPS   |   (VPS Linux)     |
|                   |<-------->|                   |
|  React SPA        |          |  Nginx            |
|  Bootstrap 5      |          |    |              |
|  Vite (build)     |          |    +-> Django     |
+-------------------+          |    |   (Gunicorn) |
                               |    |              |
                               |    +-> SQLite/    |
                               |        PostgreSQL |
                               +-------------------+
```

---

### 5.7 Construccion e Implementacion de Software

#### 5.7.1 Integracion del Sistema de Software

El sistema se compone de los siguientes modulos integrados:

| Modulo | Tecnologia | Funcion |
|--------|-----------|---------|
| Autenticacion | Django + JWT | Login, registro, control de sesion |
| Gestion de Activos | Django REST + React | CRUD completo de activos |
| Gestion de Empleados | Django REST + React | CRUD de empleados con baja/reactivacion |
| Asignaciones | Django REST + React | Asignar/devolver activos con trazabilidad |
| Sedes y Departamentos | Django REST + React | Estructura organizacional |
| Reportes | React + CSV export | Informes por estado, sede, empleado |
| Usuarios | Django REST + React | Gestion de cuentas y roles (solo ADMIN) |
| Auditoria | localStorage + React | Log de actividad del sistema |

#### 5.7.2 Verificacion y Validacion

**Pruebas unitarias (Backend):**
- Test de serializers: validacion de serial unico, valor positivo, estado valido
- Test de permisos: verificacion de acceso por rol ADMIN
- Ubicacion: `backend/inventario/tests/` y `backend/usuarios/tests/`

**Pruebas funcionales (Frontend):**
- Verificacion de flujos completos: login -> crear activo -> asignar -> devolver
- Validacion de formularios: campos obligatorios, serial duplicado, cedula duplicada
- Verificacion de permisos: operador no puede crear sedes/departamentos

**Pruebas de integracion:**
- Comunicacion frontend-backend via API REST
- Build de produccion exitoso (Vite build: 37 modulos, 0 errores)

#### 5.7.3 Integracion de Software en Hardware

El sistema se ejecuta sobre la siguiente infraestructura:

- **Servidor:** VPS con Linux (Ubuntu 22.04+)
- **Web Server:** Nginx como proxy reverso
- **App Server:** Gunicorn para Django
- **Frontend:** Archivos estaticos servidos por Nginx
- **Base de datos:** SQLite (desarrollo) / PostgreSQL (produccion)
- **Cliente:** Cualquier dispositivo con navegador web moderno

#### 5.7.4 Transicion de Software y Gestion de Lanzamientos

- **Control de versiones:** Git con repositorio en GitHub (https://github.com/cristian17ramirez2026-lab/proyecto-USB)
- **Rama principal:** `main` para codigo estable
- **Versionamiento:** Semantico (v4.0.0 actual)
- **Despliegue:** Build de produccion con `vite build`, archivos estaticos en `dist/`

#### 5.7.5 Mantenimiento del Software

- **Correctivo:** Correccion de bugs reportados mediante issues en GitHub
- **Adaptativo:** Actualizacion de dependencias (Django, React, Bootstrap)
- **Perfectivo:** Mejoras de rendimiento y usabilidad basadas en feedback
- **Preventivo:** Revision periodica de seguridad (dependencias, OWASP)

#### 5.7.6 Gestion de Defectos y Problemas

- **Identificacion:** Issues en GitHub con etiquetas (bug, enhancement, security)
- **Registro:** Descripcion del problema, pasos para reproducir, severidad
- **Resolucion:** Branch de fix, pruebas, merge a main
- **Aseguramiento de calidad:** Build exitoso obligatorio antes de merge

---

## 6. Aspectos Eticos del Proyecto

### 6.1 Consideraciones Eticas en la Planeacion

- **Honestidad intelectual:** Todo el codigo y documentacion es de autoria propia o debidamente referenciado.
- **Privacidad por diseno:** El sistema fue disenado desde el inicio para recopilar solo los datos estrictamente necesarios para la gestion de activos.
- **Transparencia:** Los objetivos, alcance y limitaciones del proyecto fueron comunicados claramente al tutor y a los stakeholders.
- **Responsabilidad profesional:** Se siguieron estandares de ingenieria de software reconocidos (ISO, IEEE) para garantizar calidad.

### 6.2 Consideraciones Eticas en el Desarrollo

- **Proteccion de datos:** Las contrasenas se almacenan cifradas, nunca en texto plano. Los tokens JWT tienen expiracion.
- **Principio de minimo privilegio:** Los operadores solo acceden a datos de su sede. Solo los administradores gestionan usuarios y estructura organizacional.
- **Codigo limpio:** Se siguieron convenciones de estilo (PEP 8 para Python, ESLint para JavaScript) para facilitar mantenimiento futuro.
- **No discriminacion:** El sistema no recopila ni procesa datos sensibles como genero, raza, religion o afiliacion politica.

### 6.3 Consideraciones Eticas en Produccion y Mantenimiento

- **Cumplimiento legal:** El sistema cumple con la Ley 1581 de 2012 (Proteccion de Datos Personales) y la Ley 1273 de 2009 (Proteccion de la Informacion).
- **Derecho al olvido:** Los empleados dados de baja pueden ser eliminados del sistema si no tienen asignaciones activas.
- **Auditabilidad:** El log de actividad permite rastrear quien realizo cada operacion y cuando.
- **Actualizaciones de seguridad:** Compromiso de mantener las dependencias actualizadas para prevenir vulnerabilidades.

---

## 7. Conclusiones

### 7.1 Conclusiones del Estudiante

El desarrollo del proyecto SIGAE represento una experiencia integral de ingenieria de software, abarcando desde el levantamiento de requerimientos hasta el despliegue de una aplicacion web funcional. Durante el proceso, se consolidaron conocimientos en:

- Arquitectura de software con separacion de capas (frontend/backend/datos)
- Desarrollo de API REST con Django REST Framework
- Construccion de interfaces reactivas con React.js y Bootstrap
- Implementacion de seguridad basada en JWT y control de acceso por roles
- Modelado de datos relacional y uso de ORM
- Control de versiones con Git y GitHub
- Documentacion tecnica y metodologica de proyectos de software

El principal aprendizaje fue la importancia de planificar la arquitectura antes de codificar, y de validar continuamente con los requerimientos para evitar desviaciones del alcance.

### 7.2 Conclusion del Tutor en Sitio del Proyecto

*(Espacio reservado para la opinion del tutor Jonathan Ruiz)*

### 7.3 Lecciones Aprendidas

1. **Definir roles y permisos desde el inicio:** La correccion tardia de permisos (operador no debe crear sedes) genero retrabajo. Es mejor definir la matriz de permisos completa en la fase de diseno.

2. **Validar dependencias antes de eliminar:** Permitir eliminar sedes con activos asociados causa datos huerfanos. Las validaciones de integridad deben implementarse desde el primer sprint.

3. **Separar archivos desde el principio:** Un archivo monolitico de 300+ lineas es inmantenible. La separacion en componentes (React) y modulos (Django apps) facilita el desarrollo y las pruebas.

4. **Probar en multiples roles:** Cada funcionalidad debe probarse como ADMIN y como OPERADOR para detectar problemas de permisos.

5. **Documentar mientras se desarrolla:** Dejar la documentacion para el final genera presion innecesaria. Es mas eficiente documentar cada modulo al completarlo.

---

## Anexos

### Anexo A: Repositorio del Proyecto
- **URL:** https://github.com/cristian17ramirez2026-lab/proyecto-USB
- **Rama principal:** main
- **Estructura:**
  - `backend/` - API REST con Django
  - `frontend/` - SPA con React + Bootstrap
  - `documentacion/` - Informes y diagramas
  - `inventario-system/` - Version HTML standalone

### Anexo B: Credenciales de Prueba
- **Admin:** usuario `admin` / contrasena `admin123`
- **Operadores:** Se crean desde el modulo de Usuarios

### Anexo C: Comandos de Ejecucion
```bash
# Frontend (desarrollo)
cd frontend
npm install
npm run dev    # http://localhost:3000

# Backend (desarrollo)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver    # http://localhost:8000
```

### Anexo D: Tecnologias y Versiones
| Tecnologia | Version |
|-----------|---------|
| Python | 3.12+ |
| Django | 5.x |
| Django REST Framework | 3.x |
| React | 19.2 |
| Vite | 8.0 |
| Bootstrap | 5.3 |
| Node.js | 20+ |
| SQLite | 3.x |
| Git | 2.x |
