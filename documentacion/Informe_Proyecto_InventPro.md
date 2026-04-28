# Facultad de Ingenierias
## Programa de Ingenieria de Sistemas

---

# INVENTPRO: Sistema de Gestion de Inventario y Control de Activos Empresariales

**Presentado por:** [NOMBRE DEL ESTUDIANTE]

**Grupo:** [XX]

**Tutor:** [NOMBRE DEL TUTOR]

**Evidencia del curso de Practica Profesional**

Barranquilla - Colombia, 2026

---

## Historial de Cambios

| Revision | Fecha | Item | Descripcion de Cambio | Responsable |
|----------|-------|------|----------------------|-------------|
| 1.0 | 01/01/2026 | Documento completo | Creacion inicial del documento | [Estudiante] |
| 1.1 | 15/02/2026 | Seccion 5 | Actualizacion de requerimientos y diagramas | [Estudiante] |
| 2.0 | 01/04/2026 | Todo | Version final con sistema implementado | [Estudiante] |

---

# 1. Proyecto de Producto de Software

## 1.1 Identificacion y Contexto del Problema

En Colombia, segun el DANE (2024), mas del 68% de las micro, pequenas y medianas empresas (MiPymes) no cuentan con sistemas formales para el control de sus activos fisicos. Esta situacion genera perdidas economicas estimadas en un 12% del valor total de los inventarios por deterioro, extravio o asignaciones no documentadas.

La Organizacion de las Naciones Unidas, a traves del Objetivo de Desarrollo Sostenible (ODS) 9 "Industria, Innovacion e Infraestructura", establece la meta 9.3 que busca aumentar el acceso de las pequenas industrias a los servicios financieros y su integracion en las cadenas de valor y los mercados. Un sistema de gestion de activos contribuye directamente a esta meta al permitir a las empresas tener visibilidad completa de sus recursos.

Adicionalmente, el Plan Nacional de Desarrollo 2022-2026 "Colombia Potencia Mundial de la Vida" incluye en su pilar de transformacion productiva la digitalizacion de procesos empresariales como estrategia para mejorar la competitividad.

A nivel local, el Plan de Desarrollo de Barranquilla contempla la modernizacion tecnologica del sector empresarial como eje estrategico para el crecimiento economico de la region Caribe.

**Problematica identificada:** Las empresas con multiples sedes carecen de herramientas centralizadas para controlar la ubicacion, estado y asignacion de sus activos fisicos, lo que genera:
- Perdida de trazabilidad en la asignacion de equipos
- Duplicidad de compras por desconocimiento del inventario existente
- Imposibilidad de generar reportes consolidados por sede o departamento
- Falta de control de acceso diferenciado por roles

**Aporte del proyecto:** Desarrollo de una plataforma web integral denominada InventPro que centraliza la gestion de activos empresariales con soporte multi-sede, roles jerarquicos, trazabilidad completa de asignaciones y reportes en tiempo real, contribuyendo a la digitalizacion y eficiencia operativa de las organizaciones.

### 1.1.1 Analisis de Riesgo

#### 1.1.1.1 Identificacion de Riesgos

Se identificaron los siguientes riesgos potenciales para el proyecto:

1. Riesgo tecnologico: Incompatibilidad del sistema con navegadores antiguos
2. Riesgo de datos: Perdida de informacion almacenada en localStorage
3. Riesgo de seguridad: Acceso no autorizado por vulnerabilidades en el manejo de sesiones
4. Riesgo de alcance: Solicitudes de funcionalidades adicionales que excedan el cronograma
5. Riesgo de usabilidad: Interfaz compleja para usuarios no tecnicos

#### 1.1.1.2 Estimacion de Riesgos / Resultado

| ID | Riesgo | Probabilidad (1-5) | Impacto (1-5) | Nivel (P x I) | Estrategia de Mitigacion |
|----|--------|-------------------|---------------|---------------|--------------------------|
| R1 | Incompatibilidad con navegadores | 2 | 3 | 6 | Uso de JavaScript vanilla compatible con ES5+, pruebas en Chrome, Edge y Firefox |
| R2 | Perdida de datos en localStorage | 3 | 4 | 12 | Implementacion de versionado de datos con auto-migracion y respaldo via exportacion CSV |
| R3 | Acceso no autorizado | 2 | 5 | 10 | Sistema de roles jerarquico (4 niveles), validacion de sesion en cada operacion |
| R4 | Exceso de alcance | 3 | 3 | 9 | Definicion clara de requerimientos, desarrollo incremental con checkpoints |
| R5 | Interfaz compleja | 2 | 3 | 6 | Diseno intuitivo con sidebar, notificaciones y busqueda integrada |

### 1.1.2 Identificacion del Problema

Las empresas con presencia en multiples ciudades enfrentan el desafio de gestionar cientos de activos fisicos distribuidos en diferentes sedes y departamentos. Sin un sistema centralizado, los administradores no pueden:

- Saber en tiempo real que activos estan disponibles, asignados o en reparacion
- Identificar que empleado tiene asignado cada activo
- Generar reportes consolidados del valor del inventario por sede
- Controlar quien puede crear, modificar o eliminar registros

Esto resulta en ineficiencia operativa, perdidas economicas y falta de accountability en la gestion de recursos empresariales.

## 1.2 Proposito, Alcance y Objetivo del Proyecto

### 1.2.1 Proposito

Desarrollar una aplicacion web completa denominada InventPro que permita a empresas con multiples sedes gestionar de forma centralizada sus activos fisicos, empleados y asignaciones, con trazabilidad completa, seguridad basada en roles jerarquicos y reportes en tiempo real, utilizando tecnologias web estandar (HTML, CSS, JavaScript) que no requieran instalacion de software adicional.

### 1.2.2 Alcance

**Por que es necesario:** Las empresas necesitan una herramienta accesible que no dependa de infraestructura compleja (servidores, bases de datos) para controlar sus activos. El sistema debe funcionar abriendo un solo archivo HTML en cualquier navegador.

**Resultados esperados:**
- Sistema funcional con 8 modulos: Dashboard, Activos, Empleados, Asignaciones, Sedes, Departamentos, Reportes y Usuarios
- Soporte para 20 sedes, 10 departamentos, 100+ empleados y 200+ activos
- 4 niveles de roles: SuperAdmin, Admin Sede, Admin Departamento, Usuario
- Exportacion de datos a CSV
- Registro de actividad (log de auditoria)

**Condiciones de desarrollo:**
- Tecnologia: HTML5, CSS3, JavaScript vanilla (sin frameworks)
- Almacenamiento: localStorage del navegador
- Compatibilidad: Chrome, Edge, Firefox (versiones actuales)
- Entrega: Archivo unico index.html autocontenido

**Actividades del proyecto:**
1. Diseno de la arquitectura de datos (modelos de entidades)
2. Implementacion del sistema de autenticacion y roles
3. Desarrollo de CRUD para Activos, Empleados, Sedes y Departamentos
4. Implementacion de logica de asignaciones y devoluciones
5. Desarrollo de modulo de reportes con exportacion CSV
6. Implementacion de busqueda y filtros
7. Desarrollo de gestion de usuarios (solo admin)
8. Implementacion de registro de actividad
9. Diseno de landing page y pantalla de login
10. Pruebas funcionales y de usabilidad

### 1.2.3 Objetivo General

Disenar y desarrollar un sistema web de gestion de inventario y control de activos empresariales que permita administrar de forma centralizada activos fisicos, empleados, sedes y departamentos con trazabilidad completa, seguridad por roles y reportes en tiempo real.

#### 1.2.3.1 Objetivos Especificos

1. Implementar un sistema de autenticacion con 4 niveles de roles jerarquicos (SuperAdmin, Admin Sede, Admin Departamento, Usuario) que garantice el control de acceso diferenciado.
2. Desarrollar modulos CRUD completos para la gestion de activos, empleados, sedes y departamentos con validaciones de integridad de datos.
3. Crear un modulo de asignaciones que permita vincular activos a empleados con validaciones de estado, registro de devoluciones y mantenimiento de historial completo.
4. Implementar un modulo de reportes con visualizacion por estado, sede, departamento y empleado, incluyendo exportacion a formato CSV.
5. Disenar una interfaz de usuario profesional, responsiva e intuitiva con sistema de notificaciones, busqueda integrada y navegacion por sidebar.
6. Desarrollar un sistema de registro de actividad (log de auditoria) que permita rastrear todas las operaciones realizadas en el sistema.

## 1.3 Suposiciones y Restricciones

### 1.3.1 Suposiciones

1. Los usuarios finales cuentan con un navegador web moderno (Chrome, Edge o Firefox actualizado).
2. Los usuarios tienen conocimientos basicos de navegacion web.
3. La empresa cuenta con una estructura organizacional definida (sedes, departamentos, cargos).
4. Los activos fisicos de la empresa pueden ser identificados con un serial unico.
5. El volumen de datos no excedera la capacidad de localStorage del navegador (aproximadamente 5-10 MB).
6. El sistema sera utilizado en un entorno de red local o individual (no requiere servidor).

### 1.3.2 Restricciones

**Tiempo:**
- El proyecto debe completarse en un periodo de 16 semanas academicas.
- Las entregas parciales se realizan cada 4 semanas.

**Alcance:**
- El sistema no incluye integracion con sistemas ERP externos.
- No se implementa sincronizacion en la nube ni acceso remoto.
- El almacenamiento esta limitado a localStorage del navegador.
- No se incluye generacion de codigos de barras o QR.

**Costo:**
- El proyecto se desarrolla con herramientas gratuitas y de codigo abierto.
- No se requiere licenciamiento de software ni infraestructura de servidores.
- Costo total estimado: $0 en herramientas (solo tiempo de desarrollo).

## 1.4 Entregables del Proyecto

| # | Entregable | Descripcion |
|---|-----------|-------------|
| 1 | Documento de requerimientos | Especificacion de 15 requerimientos funcionales con criterios de aceptacion |
| 2 | Documento de diseno tecnico | Arquitectura, modelos de datos, endpoints API, componentes |
| 3 | Plan de implementacion | Lista de tareas con dependencias y checkpoints |
| 4 | Codigo fuente | Archivo index.html autocontenido con todo el sistema |
| 5 | Datos de prueba | 20 sedes, 10 departamentos, 100 empleados, 200 activos precargados |
| 6 | Manual de usuario | Guia de uso del sistema por cada rol |
| 7 | Informe final | Documento completo del proyecto (este documento) |

## 1.5 Cronograma y Resumen del Presupuesto

### 1.5.1 Cronograma

| Semana | Actividad | Entregable |
|--------|-----------|-----------|
| 1-2 | Analisis de requerimientos y diseno | Documento de requerimientos |
| 3-4 | Diseno de arquitectura y modelos de datos | Documento de diseno |
| 5-6 | Implementacion de autenticacion y roles | Modulo de login funcional |
| 7-8 | Desarrollo de CRUD (Activos, Empleados) | Modulos CRUD operativos |
| 9-10 | Desarrollo de Sedes, Departamentos, Asignaciones | Modulos organizacionales |
| 11-12 | Implementacion de Reportes y Exportacion CSV | Modulo de reportes |
| 13-14 | Gestion de usuarios, log de actividad, busqueda | Funcionalidades avanzadas |
| 15 | Landing page, diseno final, pruebas | Sistema completo |
| 16 | Documentacion y entrega final | Informe y presentacion |

### 1.5.2 Presupuesto

| Concepto | Cantidad | Valor Unitario | Total |
|----------|----------|---------------|-------|
| Desarrollador (horas) | 320 hrs | $25.000/hr | $8.000.000 |
| Equipo de computo | 1 | Ya disponible | $0 |
| Licencias de software | 0 | $0 | $0 |
| Servidor/hosting | 0 | $0 | $0 |
| Papeleria y materiales | 1 | $50.000 | $50.000 |
| **TOTAL** | | | **$8.050.000** |

*Nota: El costo real del proyecto es $0 en herramientas ya que se utilizan tecnologias web estandar sin dependencias externas.*


---

# 2. Documentos de Referencia

## 2.1 Referencias

| Referencia | Titulo | Autor | Ano |
|-----------|--------|-------|-----|
| [R1] | Objetivos de Desarrollo Sostenible - ODS 9 | Naciones Unidas | 2015 |
| [R2] | Plan Nacional de Desarrollo 2022-2026 | Gobierno de Colombia | 2023 |
| [R3] | Encuesta de Micronegocios - EMICRON | DANE | 2024 |
| [R4] | JavaScript: The Definitive Guide, 7th Edition | David Flanagan | 2020 |
| [R5] | Don't Make Me Think, Revisited | Steve Krug | 2014 |
| [R6] | Clean Code: A Handbook of Agile Software Craftsmanship | Robert C. Martin | 2008 |
| [R7] | Web Storage API - localStorage | MDN Web Docs / Mozilla | 2024 |

## 2.2 Estandares

| Estandar | Titulo | Autor | Ano |
|---------|--------|-------|-----|
| [E1] | ISO/IEC/IEEE 29148:2018 | Ingenieria de Requerimientos | ISO | 2018 |
| [E2] | ISO/IEC 25010:2011 | Modelo de Calidad de Software | ISO | 2011 |
| [E3] | WCAG 2.1 | Pautas de Accesibilidad para Contenido Web | W3C | 2018 |
| [E4] | ECMAScript 2015 (ES6) | Especificacion del lenguaje JavaScript | ECMA International | 2015 |
| [E5] | HTML5 | Especificacion del lenguaje de marcado | W3C/WHATWG | 2014 |
| [E6] | CSS3 | Hojas de estilo en cascada nivel 3 | W3C | 2011 |

---

# 3. Definiciones y Acronimos

## 3.1 Definiciones

| Termino | Definicion | Ref |
|---------|-----------|-----|
| Activo | Bien fisico de la empresa registrado en el sistema con un serial unico, valor monetario y estado | [R1] |
| Asignacion | Registro que vincula un activo con un empleado durante un periodo de tiempo determinado | [R1] |
| Sede | Ubicacion fisica de la empresa en una ciudad especifica | [R1] |
| Departamento | Unidad organizacional dentro de una sede con un area funcional definida | [R1] |
| Devolucion | Accion de registrar el retorno de un activo asignado, cambiando su estado a disponible | [R1] |
| localStorage | API del navegador web que permite almacenar datos de forma persistente en el equipo del usuario | [R7] |
| Rol | Nivel de acceso y permisos asignado a un usuario del sistema | [R1] |
| Trazabilidad | Capacidad de rastrear el historial completo de movimientos de un activo | [R1] |

## 3.2 Acronimos

| Acronimo | Significado |
|---------|------------|
| CRUD | Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar) |
| CSV | Comma-Separated Values (Valores Separados por Comas) |
| HTML | HyperText Markup Language |
| CSS | Cascading Style Sheets |
| JS | JavaScript |
| SVG | Scalable Vector Graphics |
| API | Application Programming Interface |
| UML | Unified Modeling Language |
| ODS | Objetivos de Desarrollo Sostenible |
| MiPymes | Micro, Pequenas y Medianas Empresas |
| UI | User Interface (Interfaz de Usuario) |

---

# 4. Resumen del Trabajo Requerido

El proyecto InventPro requiere el desarrollo de una aplicacion web completa de gestion de activos empresariales que funcione como un archivo HTML autocontenido, sin dependencias de servidores, frameworks o bases de datos externas.

**Supuestos del esfuerzo de desarrollo:**
- Se utiliza JavaScript vanilla para maxima compatibilidad
- localStorage como mecanismo de persistencia de datos
- Iconos SVG inline para eliminar dependencias externas
- CSS embebido para archivo unico autocontenido

**Restricciones:**
- Cronograma: 16 semanas
- Presupuesto: $0 en herramientas
- Tecnologia: Solo HTML, CSS y JavaScript estandar
- Almacenamiento: Limitado a capacidad de localStorage (~5-10 MB)

**Objetivos de desarrollo:**
1. Sistema funcional con 8 modulos principales
2. Soporte para organizacion multi-sede con roles jerarquicos
3. Datos de prueba precargados (20 sedes, 10 departamentos, 100 empleados, 200 activos)
4. Interfaz profesional con sidebar, notificaciones y busqueda

**Metodo de satisfaccion:** Se verificara mediante pruebas funcionales de cada modulo, validacion de reglas de negocio y pruebas de usabilidad con usuarios de diferentes roles.

## 4.1 Organizacion y Control del Proyecto

| Nombre y Apellidos | Rol en el Proyecto | Responsabilidades |
|--------------------|--------------------|-------------------|
| [Estudiante] | Desarrollador Full Stack / Lider | Analisis, diseno, desarrollo, pruebas y documentacion del sistema completo |
| [Tutor] | Director de Proyecto | Supervision, revision de avances, retroalimentacion tecnica |
| [Tutor en sitio] | Asesor Empresarial | Validacion de requerimientos con contexto empresarial real |

---

# 5. Proceso de Desarrollo de Software

## 5.1 Entorno del Proceso de Software

**Modelo de ciclo de vida:** Se utilizo un modelo de desarrollo incremental iterativo, donde cada iteracion agrega funcionalidades al sistema de forma progresiva. Este modelo fue seleccionado por su flexibilidad para incorporar cambios y su adecuacion a proyectos de complejidad media con un solo desarrollador [R6].

**Fases del proceso:**

1. **Fase de Analisis (Semanas 1-2):** Levantamiento de requerimientos, identificacion de actores, definicion de reglas de negocio.
2. **Fase de Diseno (Semanas 3-4):** Arquitectura del sistema, modelos de datos, diseno de interfaz.
3. **Fase de Construccion (Semanas 5-14):** Desarrollo iterativo de modulos en orden de dependencia.
4. **Fase de Pruebas (Semana 15):** Verificacion funcional, pruebas de integracion, pruebas de usabilidad.
5. **Fase de Entrega (Semana 16):** Documentacion final, empaquetado y presentacion.

**Metodologia:** Se aplico una adaptacion de Scrum para desarrollador individual, con sprints de 2 semanas, backlog priorizado y revisiones al final de cada sprint.

**Herramientas tecnologicas:**
- Editor de codigo: Visual Studio Code / Kiro IDE
- Navegadores de prueba: Google Chrome, Microsoft Edge, Mozilla Firefox
- Control de versiones: Git
- Documentacion: Markdown

## 5.2 Analisis de Software

### 5.2.1 Definicion de Roles o Actores

| Nombre del Rol | Descripcion |
|---------------|-------------|
| SuperAdmin | Director general o administrador de TI con acceso total al sistema. Puede gestionar todas las sedes, departamentos, activos, empleados, asignaciones y usuarios. Es el unico que puede crear otros administradores. |
| Admin Sede | Responsable de una sede especifica. Gestiona los activos, empleados y asignaciones dentro de su sede asignada. Puede crear y editar registros pero no puede gestionar otras sedes. |
| Admin Departamento | Jefe de un departamento especifico. Gestiona los activos y empleados de su departamento. Tiene permisos de edicion limitados a su area funcional. |
| Usuario | Empleado con acceso de solo lectura al sistema. Puede consultar el inventario, ver reportes y buscar activos, pero no puede crear, editar ni eliminar ningun registro. |

### 5.2.2 Analisis de Requerimientos de Software

La tecnica utilizada para la recoleccion de requerimientos fue el **analisis de documentos y entrevistas estructuradas** con stakeholders del sector empresarial. Se identificaron las necesidades a partir de:

1. Revision de procesos manuales de control de inventario en empresas locales
2. Analisis de sistemas existentes en el mercado y sus limitaciones
3. Entrevistas con administradores de activos de empresas con multiples sedes
4. Revision de normativas y mejores practicas de gestion de activos (ISO 55000)

### 5.2.3 Requerimientos Funcionales

| Ref | Requerimiento |
|-----|--------------|
| RF01 | El sistema debe permitir el inicio de sesion mediante usuario y contrasena, validando las credenciales contra la base de datos de usuarios |
| RF02 | El sistema debe soportar 4 niveles de roles (SuperAdmin, Admin Sede, Admin Depto, Usuario) con permisos diferenciados |
| RF03 | El sistema debe permitir a los administradores crear, leer, actualizar y eliminar activos con campos: nombre, descripcion, tipo, serial (unico), valor, fecha de compra, estado, sede y departamento |
| RF04 | El sistema debe validar que el serial de cada activo sea unico en toda la base de datos |
| RF05 | El sistema debe permitir a los administradores crear, leer, actualizar y eliminar empleados con campos: nombre, apellido, cedula (unica), email, sede, departamento y cargo |
| RF06 | El sistema debe permitir asignar un activo disponible a un empleado, cambiando automaticamente el estado del activo a ASIGNADO |
| RF07 | El sistema debe impedir la asignacion de activos con estado DANADO o ASIGNADO |
| RF08 | El sistema debe permitir registrar la devolucion de un activo asignado, cambiando su estado a DISPONIBLE |
| RF09 | El sistema debe mantener un historial completo de todas las asignaciones y devoluciones |
| RF10 | El sistema debe generar reportes de activos filtrados por estado (Disponible, Asignado, En reparacion) |
| RF11 | El sistema debe generar reportes agrupados por sede y por empleado con historial de asignaciones |
| RF12 | El sistema debe permitir a los administradores crear, editar y eliminar sedes con campos: nombre, ciudad, direccion, telefono |
| RF13 | El sistema debe permitir a los administradores crear, editar y eliminar departamentos vinculados a una sede |
| RF14 | El sistema debe permitir buscar y filtrar activos por nombre, serial, tipo y estado |
| RF15 | El sistema debe permitir buscar empleados por nombre, cedula o cargo |
| RF16 | El sistema debe permitir al SuperAdmin crear y eliminar cuentas de usuario con asignacion de rol, sede y departamento |
| RF17 | El sistema debe exportar los datos de reportes en formato CSV |
| RF18 | El sistema debe registrar un log de actividad con fecha, usuario, accion y detalle de cada operacion |
| RF19 | El sistema debe mostrar un dashboard con estadisticas en tiempo real: total activos, disponibles, asignados, en reparacion, empleados, sedes, departamentos y valor total del inventario |
| RF20 | El sistema debe mostrar notificaciones visuales al completar operaciones (crear, editar, eliminar, asignar) |

### 5.2.4 Requerimientos No Funcionales

| Ref | Tipo | Descripcion |
|-----|------|-------------|
| RNF-01 | Usabilidad | El sistema debe ser navegable mediante un menu lateral (sidebar) con secciones organizadas por categoria |
| RNF-02 | Usabilidad | El sistema debe proporcionar retroalimentacion visual inmediata (notificaciones) al completar cualquier operacion |
| RNF-03 | Eficiencia | El sistema debe cargar cualquier pagina en menos de 1 segundo en un equipo con especificaciones minimas |
| RNF-04 | Eficiencia | El sistema debe funcionar sin conexion a internet una vez cargado el archivo HTML |
| RNF-05 | Seguridad | El sistema debe validar el rol del usuario en cada operacion de escritura, impidiendo que usuarios sin permisos modifiquen datos |
| RNF-06 | Seguridad | El sistema debe sanitizar todas las entradas de usuario para prevenir inyeccion de codigo (XSS) |
| RNF-07 | Etica | El sistema no debe almacenar contrasenas en texto plano en entornos de produccion (nota: en esta version de prototipo se almacenan en localStorage por simplicidad) |
| RNF-08 | Etica | El sistema debe registrar quien realiza cada operacion para garantizar accountability |
| RNF-09 | Regulatorio | El sistema debe cumplir con la Ley 1581 de 2012 de Proteccion de Datos Personales de Colombia en el manejo de informacion de empleados |
| RNF-10 | Regulatorio | El sistema debe permitir la exportacion de datos para cumplir con requerimientos de auditoria empresarial |


## 5.3 Modelado de Software

El modelado del sistema se realizo utilizando la notacion UML (Unified Modeling Language) para representar la estructura y comportamiento del software. El diseno es trazable a los requerimientos funcionales mediante referencias directas (RF01-RF20).

### 5.3.1 Diagramas de Casos de Uso

**Caso de Uso Principal: Gestion de Activos**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Gestionar Activos |
| Version | V1 |
| Referencia | CU01 |
| Autor | [Estudiante] |
| Fecha | 15/02/2026 |
| Actores | SuperAdmin, Admin Sede, Admin Departamento |
| Referencias | RF03, RF04, RF14 |
| Precondiciones | El usuario debe estar autenticado con rol de administrador |
| Postcondicion | El activo es creado/editado/eliminado exitosamente y se registra en el log |
| **Flujo Normal** | |
| Paso 1 | Actor: Selecciona "Activos" en el menu lateral |
| Paso 2 | Sistema: Muestra la lista de activos con busqueda y filtros |
| Paso 3 | Actor: Hace clic en "Nuevo Activo" |
| Paso 4 | Sistema: Muestra formulario con campos: nombre, descripcion, tipo, serial, valor, fecha, sede, departamento |
| Paso 5 | Actor: Completa los campos y hace clic en "Guardar" |
| Paso 6 | Sistema: Valida datos (serial unico, valor positivo), crea el activo, muestra notificacion y registra en log |
| Flujos alternos | Si el serial ya existe, el sistema muestra error y no crea el activo |
| Excepciones | Si el usuario no tiene permisos de admin, no ve los botones de crear/editar/eliminar |

**Caso de Uso: Asignar Activo**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Asignar Activo a Empleado |
| Version | V1 |
| Referencia | CU02 |
| Actores | SuperAdmin, Admin Sede, Admin Departamento |
| Referencias | RF06, RF07, RF09 |
| Precondiciones | Debe existir al menos un activo con estado DISPONIBLE y un empleado registrado |
| Postcondicion | El activo cambia a estado ASIGNADO y se crea un registro de asignacion |
| **Flujo Normal** | |
| Paso 1 | Actor: Selecciona "Asignaciones" en el menu |
| Paso 2 | Sistema: Muestra formulario de nueva asignacion y lista de asignaciones existentes |
| Paso 3 | Actor: Selecciona un activo disponible y un empleado |
| Paso 4 | Actor: Opcionalmente agrega observaciones y hace clic en "Registrar" |
| Paso 5 | Sistema: Valida que el activo este DISPONIBLE, crea la asignacion, cambia estado a ASIGNADO |
| Flujos alternos | Si el activo esta DANADO o ASIGNADO, el sistema rechaza la operacion con mensaje de error |
| Excepciones | Si no hay activos disponibles, el boton de registrar se deshabilita |

**Caso de Uso: Registrar Devolucion**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Registrar Devolucion de Activo |
| Version | V1 |
| Referencia | CU03 |
| Actores | SuperAdmin, Admin Sede, Admin Departamento |
| Referencias | RF08, RF09 |
| Precondiciones | Debe existir una asignacion activa (sin fecha de devolucion) |
| Postcondicion | La asignacion se marca como devuelta y el activo vuelve a estado DISPONIBLE |
| **Flujo Normal** | |
| Paso 1 | Actor: En la pagina de Asignaciones, hace clic en "Devolver" en una asignacion activa |
| Paso 2 | Sistema: Muestra dialogo de confirmacion |
| Paso 3 | Actor: Confirma la devolucion |
| Paso 4 | Sistema: Registra fecha de devolucion, cambia estado del activo a DISPONIBLE, muestra notificacion |
| Flujos alternos | Si el actor cancela la confirmacion, no se realiza ninguna accion |

**Caso de Uso: Gestionar Empleados**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Gestionar Empleados |
| Version | V1 |
| Referencia | CU04 |
| Actores | SuperAdmin, Admin Sede, Admin Departamento |
| Referencias | RF05, RF15 |
| Precondiciones | El usuario debe estar autenticado con rol de administrador |
| Postcondicion | El empleado es creado/editado/eliminado exitosamente |
| **Flujo Normal** | |
| Paso 1 | Actor: Selecciona "Empleados" en el menu lateral |
| Paso 2 | Sistema: Muestra la lista de empleados con campo de busqueda |
| Paso 3 | Actor: Hace clic en "Nuevo Empleado" |
| Paso 4 | Sistema: Muestra formulario con campos: nombre, apellido, cedula, email, sede, departamento, cargo |
| Paso 5 | Actor: Completa los campos y hace clic en "Guardar" |
| Paso 6 | Sistema: Valida datos (cedula unica), crea el empleado, muestra notificacion |
| Flujos alternos | Si la cedula ya existe, el sistema muestra error. Si el actor busca, la tabla se filtra en tiempo real |
| Excepciones | No se puede eliminar un empleado con activos asignados |

**Caso de Uso: Generar Reportes**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Generar Reportes |
| Version | V1 |
| Referencia | CU05 |
| Actores | SuperAdmin, Admin Sede, Admin Departamento, Usuario |
| Referencias | RF10, RF11, RF17 |
| Precondiciones | El usuario debe estar autenticado |
| Postcondicion | Se muestra el reporte solicitado con datos actualizados |
| **Flujo Normal** | |
| Paso 1 | Actor: Selecciona "Reportes" en el menu lateral |
| Paso 2 | Sistema: Muestra tarjetas de resumen y tabs de reportes |
| Paso 3 | Actor: Selecciona un tab (Disponibles, Asignados, Reparacion, Por Sede, Por Empleado) |
| Paso 4 | Sistema: Muestra la tabla correspondiente con datos filtrados |
| Paso 5 | Actor: Opcionalmente hace clic en "Exportar CSV" |
| Paso 6 | Sistema: Genera y descarga archivo CSV con todos los activos |
| Flujos alternos | En el tab "Por Sede" y "Por Empleado", el actor puede expandir accordions para ver detalle |

**Caso de Uso: Gestionar Usuarios (Solo SuperAdmin)**

| Campo | Detalle |
|-------|---------|
| Caso de Uso | Gestionar Usuarios del Sistema |
| Version | V1 |
| Referencia | CU06 |
| Actores | SuperAdmin |
| Referencias | RF02, RF16 |
| Precondiciones | El usuario debe estar autenticado como SuperAdmin |
| Postcondicion | Se crea o elimina un usuario del sistema |
| **Flujo Normal** | |
| Paso 1 | Actor: Selecciona "Usuarios" en el menu lateral (seccion Admin) |
| Paso 2 | Sistema: Muestra formulario de creacion y lista de usuarios existentes |
| Paso 3 | Actor: Completa usuario, email, contrasena, rol, sede y departamento |
| Paso 4 | Actor: Hace clic en "Crear Usuario" |
| Paso 5 | Sistema: Valida unicidad de usuario y email, crea la cuenta, muestra notificacion |
| Flujos alternos | Si el usuario ya existe, muestra error. Para eliminar, clic en boton eliminar con confirmacion |
| Excepciones | Un usuario no puede eliminar su propia cuenta |

### 5.3.2 Diagramas de Secuencia

**Secuencia: Login de Usuario**
```
Usuario -> Landing: Clic "Iniciar Sesion"
Landing -> Login: Muestra formulario
Usuario -> Login: Ingresa usuario y contrasena
Login -> DB: Busca usuario por username
DB -> Login: Retorna datos del usuario
Login -> Login: Valida contrasena
Login -> DB: Guarda sesion en localStorage
Login -> Dashboard: Redirige al dashboard
Dashboard -> DB: Consulta estadisticas
DB -> Dashboard: Retorna datos
Dashboard -> Usuario: Muestra panel con estadisticas
```

**Secuencia: Asignar Activo**
```
Admin -> Asignaciones: Selecciona pagina
Asignaciones -> DB: Consulta activos DISPONIBLE
Asignaciones -> DB: Consulta empleados
DB -> Asignaciones: Retorna listas
Admin -> Asignaciones: Selecciona activo y empleado
Admin -> Asignaciones: Clic "Registrar"
Asignaciones -> DB: Valida estado del activo
Asignaciones -> DB: Crea registro de asignacion
Asignaciones -> DB: Actualiza estado activo a ASIGNADO
Asignaciones -> Log: Registra actividad
Asignaciones -> Admin: Muestra notificacion de exito
```

### 5.3.3 Diagramas de Actividad

**Actividad: Flujo de Asignacion y Devolucion**
```
[Inicio] -> Verificar estado del activo
  -> Si DISPONIBLE: Crear asignacion -> Cambiar estado a ASIGNADO -> Registrar en log -> [Fin exitoso]
  -> Si ASIGNADO: Mostrar error "Ya asignado" -> [Fin con error]
  -> Si DANADO: Mostrar error "No se puede asignar" -> [Fin con error]

[Devolucion] -> Verificar asignacion activa
  -> Si tiene asignacion activa: Registrar fecha devolucion -> Cambiar estado a DISPONIBLE -> Registrar en log -> [Fin exitoso]
  -> Si ya fue devuelto: Mostrar error -> [Fin con error]
```

### 5.3.4 Diagrama de Clases

```
+------------------+       +------------------+       +------------------+
|     Usuario      |       |      Activo      |       |    Empleado      |
+------------------+       +------------------+       +------------------+
| - id: int        |       | - id: int        |       | - id: int        |
| - username: str  |       | - nombre: str    |       | - nombre: str    |
| - email: str     |       | - descripcion: str|      | - apellido: str  |
| - password: str  |       | - tipo: str      |       | - cedula: str    |
| - rol: str       |       | - serial: str    |       | - email: str     |
| - nombre: str    |       | - valor: float   |       | - cargo: str     |
| - apellido: str  |       | - fecha_compra: date|    | - sede_id: int   |
| - sede_id: int   |       | - estado: str    |       | - depto_id: int  |
| - depto_id: int  |       | - sede_id: int   |       +------------------+
+------------------+       | - depto_id: int  |       | + crear()        |
| + login()        |       +------------------+       | + editar()       |
| + logout()       |       | + crear()        |       | + eliminar()     |
| + validarRol()   |       | + editar()       |       +------------------+
+------------------+       | + eliminar()     |              |
                            | + asignar()      |              |
                            | + devolver()     |              |
                            +------------------+              |
                                   |                          |
                            +------------------+              |
                            |   Asignacion     |--------------+
                            +------------------+
                            | - id: int        |
                            | - activo_id: int |
                            | - empleado_id: int|
                            | - fecha_asig: date|
                            | - fecha_dev: date |
                            | - observaciones: str|
                            +------------------+

+------------------+       +------------------+
|      Sede        |       |  Departamento    |
+------------------+       +------------------+
| - id: int        |       | - id: int        |
| - nombre: str    |       | - nombre: str    |
| - ciudad: str    |       | - sede_id: int   |
| - direccion: str |       | - area: str      |
| - telefono: str  |       | - responsable: str|
+------------------+       +------------------+
```

**Relaciones:**
- Sede 1 --- * Departamento (Una sede tiene muchos departamentos)
- Sede 1 --- * Activo (Una sede tiene muchos activos)
- Sede 1 --- * Empleado (Una sede tiene muchos empleados)
- Departamento 1 --- * Activo
- Departamento 1 --- * Empleado
- Activo 1 --- * Asignacion (Un activo puede tener muchas asignaciones historicas)
- Empleado 1 --- * Asignacion (Un empleado puede tener muchas asignaciones)

## 5.4 Diseno de la Interfaz

### 5.4.1 Arquitectura de Informacion

**Mapa del sitio:**
```
InventPro
|
+-- Landing Page (publica)
|   +-- Boton: Iniciar Sesion
|
+-- Login
|
+-- Dashboard (autenticado)
|   +-- Estadisticas generales
|   +-- Actividad reciente
|
+-- Inventario
|   +-- Activos (lista + busqueda + filtro)
|   |   +-- Formulario Crear/Editar
|   +-- Empleados (lista + busqueda)
|   |   +-- Formulario Crear/Editar
|   +-- Asignaciones (lista + formulario)
|
+-- Organizacion
|   +-- Sedes (lista)
|   |   +-- Formulario Crear/Editar
|   +-- Departamentos (lista)
|       +-- Formulario Crear/Editar
|
+-- Analisis
|   +-- Reportes (tabs: Disponibles, Asignados, Reparacion, Por Sede, Por Empleado)
|       +-- Exportar CSV
|
+-- Admin (solo administradores)
    +-- Usuarios (lista + formulario crear)
    +-- Actividad (log de auditoria)
```

**Navegacion principal:** Sidebar lateral fijo con secciones: Principal, Inventario, Organizacion, Analisis, Admin.

### 5.4.2 Wireframe

Los wireframes principales del sistema son:

1. **Landing Page:** Pagina centrada con fondo oscuro (#0a0f1a). Navbar fija con logo y boton "Iniciar Sesion". Hero centrado con badge, titulo grande con gradiente, parrafo descriptivo, boton CTA naranja y fila de 5 estadisticas. Seccion de 6 features en grid 3x2 con iconos de colores. CTA final con gradiente teal y footer.

2. **Login:** Layout split-screen. Lado izquierdo (60%) fondo oscuro con logo InventPro, titulo "Bienvenido de vuelta al sistema", parrafo descriptivo y 3 items con checkmarks (Control de inventario, Gestion multi-sede, Reportes). Lado derecho (40%) fondo blanco con formulario: titulo "Iniciar Sesion", campos usuario y contrasena, boton teal "Iniciar Sesion", link "Volver al inicio" y caja de credenciales de prueba.

3. **Dashboard:** Sidebar oscuro a la izquierda (250px) con logo, info de usuario, menu por secciones y boton cerrar sesion. Area principal con topbar (titulo + fecha + badge de rol). Contenido: banner de bienvenida con gradiente, 2 filas de 4 tarjetas de estadisticas con iconos, y card de "Actividad reciente" con tabla.

4. **Lista de Activos:** Header con titulo "Activos (200)" y boton "Nuevo Activo". Barra de busqueda con input de texto y select de filtro por estado. Card con tabla de 8 columnas (Activo, Tipo, Serial, Valor, Sede, Depto, Estado, Acciones). Badges de colores para estado. Botones de editar/eliminar solo para admins.

5. **Formulario de Activo:** Card centrada (max 700px) con titulo dinamico (Nuevo/Editar). Campos organizados: nombre (full width), descripcion (textarea), tipo y serial (2 columnas), valor y fecha (2 columnas), sede y departamento (2 columnas), estado (solo en edicion). Botones cancelar y guardar alineados a la derecha.

6. **Asignaciones:** Titulo con conteo. Card de "Nueva Asignacion" con 3 selects en fila (activo, empleado, observaciones) y boton registrar. Card con tabla de asignaciones: activo con serial, empleado, sede, fecha, estado (badge Activa/Devuelta), observaciones, boton devolver.

7. **Reportes:** Fila de 4 tarjetas de resumen (valor total, activos, asignaciones, empleados). Tabs de navegacion (Disponibles, Asignados, Reparacion, Por Sede, Por Empleado). Boton "Exportar CSV". Contenido dinamico segun tab seleccionado con tablas y accordions.

8. **Gestion de Usuarios:** Card de formulario para crear usuario con 3 filas de 3 campos. Tabla de usuarios existentes con columnas: usuario, nombre, email, rol (badge de color), sede, depto, acciones.

## 5.5 Diseno de Datos

### 5.5.1 Metodo de acceso a la base de datos

El sistema utiliza la API Web Storage (localStorage) del navegador como mecanismo de persistencia. Los datos se almacenan como cadenas JSON serializadas con claves prefijadas (`ip_`) para evitar colisiones.

**Operaciones de acceso:**
```javascript
// Lectura
var datos = JSON.parse(localStorage.getItem('ip_a')) || [];

// Escritura
localStorage.setItem('ip_a', JSON.stringify(datos));

// Eliminacion
localStorage.removeItem('ip_a');
```

### 5.5.2 Definicion de las Entidades de datos

| Entidad | Descripcion |
|---------|-------------|
| Usuario | Persona con credenciales de acceso al sistema. Tiene un rol que determina sus permisos |
| Activo | Bien fisico de la empresa con serial unico, valor monetario y estado (Disponible/Asignado/Danado) |
| Empleado | Persona de la organizacion a quien se pueden asignar activos |
| Asignacion | Registro que vincula un activo con un empleado, con fechas de asignacion y devolucion |
| Sede | Ubicacion fisica de la empresa en una ciudad |
| Departamento | Unidad organizacional dentro de una sede |
| Log | Registro de actividad del sistema con fecha, usuario, accion y detalle |

### 5.5.3 Modelo Relacional

```
USUARIO (id PK, username UK, email UK, password, rol, nombre, apellido, sede_id FK, departamento_id FK)
SEDE (id PK, nombre, ciudad, direccion, telefono)
DEPARTAMENTO (id PK, nombre, sede_id FK, area, responsable)
ACTIVO (id PK, nombre, descripcion, tipo, serial UK, valor, fecha_compra, estado, sede_id FK, departamento_id FK)
EMPLEADO (id PK, nombre, apellido, cedula UK, email, cargo, sede_id FK, departamento_id FK)
ASIGNACION (id PK, activo_id FK, empleado_id FK, fecha_asignacion, fecha_devolucion, observaciones)
LOG (id PK, action, detail, user, fecha)
```

### 5.5.4 Diccionario de Datos

**Entidad: ACTIVO**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | Entero | - | Si | PK | Identificador unico autogenerado |
| nombre | Texto | 200 | Si | - | Nombre descriptivo del activo |
| descripcion | Texto | 500 | No | - | Descripcion detallada |
| tipo | Texto | 100 | Si | - | Categoria del activo (Computador, Monitor, etc.) |
| serial | Texto | 100 | Si | UK | Codigo serial unico del activo |
| valor | Decimal | - | Si | - | Valor monetario en pesos colombianos |
| fecha_compra | Fecha | - | Si | - | Fecha de adquisicion del activo |
| estado | Texto | 20 | Si | - | DISPONIBLE, ASIGNADO o DANADO |
| sede_id | Entero | - | No | FK->SEDE | Sede donde se encuentra el activo |
| departamento_id | Entero | - | No | FK->DEPTO | Departamento al que pertenece |

**Entidad: EMPLEADO**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | Entero | - | Si | PK | Identificador unico |
| nombre | Texto | 100 | Si | - | Nombre del empleado |
| apellido | Texto | 100 | Si | - | Apellido del empleado |
| cedula | Texto | 20 | Si | UK | Numero de cedula unico |
| email | Texto | 200 | No | - | Correo electronico |
| cargo | Texto | 100 | Si | - | Cargo en la empresa |
| sede_id | Entero | - | No | FK->SEDE | Sede asignada |
| departamento_id | Entero | - | No | FK->DEPTO | Departamento asignado |

**Entidad: ASIGNACION**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | Entero | - | Si | PK | Identificador unico |
| activo_id | Entero | - | Si | FK->ACTIVO | Activo asignado |
| empleado_id | Entero | - | Si | FK->EMPLEADO | Empleado receptor |
| fecha_asignacion | FechaHora | - | Si | - | Fecha y hora de la asignacion (autogenerada) |
| fecha_devolucion | FechaHora | - | No | - | Fecha y hora de devolucion (null si activa) |
| observaciones | Texto | 500 | No | - | Notas adicionales |

**Entidad: USUARIO**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | Entero | - | Si | PK | Identificador unico |
| username | Texto | 50 | Si | UK | Nombre de usuario para login |
| email | Texto | 200 | Si | UK | Correo electronico unico |
| password | Texto | 100 | Si | - | Contrasena del usuario |
| rol | Texto | 20 | Si | - | SUPERADMIN, ADMIN_SEDE, ADMIN_DEPTO o USER |
| nombre | Texto | 100 | No | - | Nombre real del usuario |
| apellido | Texto | 100 | No | - | Apellido del usuario |
| sede_id | Entero | - | No | FK->SEDE | Sede asignada (para admins de sede) |
| departamento_id | Entero | - | No | FK->DEPTO | Departamento asignado (para admins de depto) |
| fecha | FechaHora | - | Si | - | Fecha de creacion de la cuenta |

**Entidad: SEDE**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | Entero | - | Si | PK | Identificador unico |
| nombre | Texto | 200 | Si | - | Nombre de la sede |
| ciudad | Texto | 100 | Si | - | Ciudad donde se ubica |
| direccion | Texto | 300 | Si | - | Direccion fisica |
| telefono | Texto | 20 | No | - | Numero de contacto |

**Entidad: DEPARTAMENTO**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | Entero | - | Si | PK | Identificador unico |
| nombre | Texto | 200 | Si | - | Nombre del departamento |
| sede_id | Entero | - | Si | FK->SEDE | Sede a la que pertenece |
| area | Texto | 100 | Si | - | Area funcional (Sistemas, Finanzas, etc.) |
| responsable | Texto | 200 | No | - | Nombre del responsable |

**Entidad: LOG**

| Campo | Tipo | Longitud | Obligatorio | Llave | Descripcion |
|-------|------|----------|-------------|-------|-------------|
| id | Entero | - | Si | PK | Identificador unico |
| action | Texto | 100 | Si | - | Tipo de accion realizada |
| detail | Texto | 500 | Si | - | Detalle de la operacion |
| user | Texto | 50 | Si | - | Username del usuario que realizo la accion |
| fecha | FechaHora | - | Si | - | Fecha y hora de la accion |

### 5.5.5 Restricciones de seguridad e integridad

1. **Unicidad:** Los campos serial (Activo), cedula (Empleado), username y email (Usuario) son unicos en toda la base de datos.
2. **Integridad referencial:** No se puede eliminar un activo que tenga una asignacion activa. No se puede eliminar un empleado con activos asignados.
3. **Validacion de estado:** Solo activos con estado DISPONIBLE pueden ser asignados. Activos DANADOS no pueden asignarse.
4. **Control de acceso:** Solo usuarios con rol de administrador pueden crear, editar y eliminar registros. Usuarios con rol USER solo pueden consultar.
5. **Proteccion contra auto-eliminacion:** Un usuario no puede eliminar su propia cuenta.

## 5.6 Diseno de la Arquitectura de Software

### 5.6.1 Patron de Diseno

El sistema utiliza el patron **SPA (Single Page Application)** con arquitectura **MVC simplificada**:

- **Modelo (M):** Objeto DB que encapsula todas las operaciones de datos sobre localStorage
- **Vista (V):** Funciones pg_* que generan el HTML de cada pagina
- **Controlador (C):** Objeto App que maneja la navegacion, autenticacion y logica de negocio

### 5.6.2 Diagrama de Componentes

```
+------------------------------------------+
|           index.html (SPA)               |
|                                          |
|  +----------+  +----------+  +--------+ |
|  |  Estilos |  |  Iconos  |  |  DB    | |
|  |  (CSS)   |  |  (SVG)   |  | (localStorage) |
|  +----------+  +----------+  +--------+ |
|                                          |
|  +--------------------------------------+|
|  |           App Controller             ||
|  |  +--------+ +--------+ +----------+ ||
|  |  | Auth   | | Router | | Notify   | ||
|  |  +--------+ +--------+ +----------+ ||
|  +--------------------------------------+|
|                                          |
|  +--------------------------------------+|
|  |           Page Views                 ||
|  | Landing|Login|Dashboard|Activos|...  ||
|  +--------------------------------------+|
+------------------------------------------+
```

### 5.6.3 Diagrama de Despliegue

```
+---------------------------+
|   Equipo del Usuario      |
|                           |
|  +---------------------+ |
|  |   Navegador Web      | |
|  |  (Chrome/Edge/FF)    | |
|  |                      | |
|  |  +----------------+  | |
|  |  | index.html     |  | |
|  |  | (HTML+CSS+JS)  |  | |
|  |  +----------------+  | |
|  |         |             | |
|  |  +----------------+  | |
|  |  | localStorage   |  | |
|  |  | (Datos JSON)   |  | |
|  |  +----------------+  | |
|  +---------------------+ |
+---------------------------+
```

*No se requiere servidor, base de datos externa ni conexion a internet.*

## 5.7 Construccion e Implementacion de Software

### 5.7.1 Integracion del sistema de software

El sistema se compone de los siguientes modulos integrados en un unico archivo HTML:

1. **Modulo de Estilos (CSS):** 140+ reglas CSS con variables, responsive design
2. **Modulo de Iconos (SVG):** 20 iconos vectoriales inline
3. **Modulo de Base de Datos (DB):** Objeto con 40+ metodos CRUD
4. **Modulo de Aplicacion (App):** Controlador con autenticacion, routing y 12 paginas
5. **Modulo de Utilidades:** Funciones de formato, escape HTML, exportacion CSV, logging

### 5.7.2 Verificacion y validacion del sistema de software

**Pruebas unitarias realizadas:**
- Validacion de serial unico al crear activos
- Validacion de cedula unica al crear empleados
- Validacion de estado DISPONIBLE para asignaciones
- Validacion de permisos por rol en cada operacion CRUD
- Validacion de proteccion contra eliminacion de activos asignados

**Pruebas de integracion:**
- Flujo completo: Login -> Crear activo -> Crear empleado -> Asignar -> Devolver
- Flujo de roles: Verificar que USER no puede crear/editar/eliminar
- Flujo de reportes: Verificar que los conteos coinciden con los datos

**Pruebas de usuario final:**
- Navegacion por todas las paginas del sistema
- Busqueda y filtrado de activos y empleados
- Exportacion CSV de reportes

### 5.7.3 Integracion de software en Hardware

El software se ejecuta directamente en el navegador web del equipo del usuario. No requiere instalacion, configuracion de servidor ni base de datos externa. El unico requisito de hardware es un equipo con navegador web moderno.

### 5.7.4 Transicion de software y gestion de lanzamientos

El sistema utiliza un esquema de versionado interno (`ip_v12`) almacenado en localStorage. Cuando se detecta una nueva version, el sistema automaticamente:
1. Limpia datos de versiones anteriores
2. Reinicializa la base de datos con datos de prueba actualizados
3. Establece la nueva version como activa

### 5.7.5 Mantenimiento del software

El mantenimiento se realiza editando el archivo index.html unico. Las mejoras se implementan de forma incremental, actualizando la version interna para forzar la reinicializacion de datos cuando sea necesario.

### 5.7.6 Gestion de defectos y problemas de software

Los defectos se identifican mediante:
1. Pruebas manuales en multiples navegadores
2. Revision de la consola del navegador (F12) para errores JavaScript
3. Validacion de diagnosticos del IDE (sin errores de sintaxis)

La resolucion sigue el proceso: Identificar -> Reproducir -> Corregir -> Verificar -> Documentar.

---

# 6. Aspectos Eticos del Proyecto

## 6.1 Consideraciones eticas en la planeacion del proyecto

- Se garantiza que el sistema no recopila datos personales mas alla de lo estrictamente necesario para su funcionamiento (principio de minimizacion de datos).
- El diseno del sistema contempla la proteccion de la informacion de empleados conforme a la Ley 1581 de 2012.
- Se utilizo exclusivamente software libre y de codigo abierto, respetando licencias y derechos de autor.

## 6.2 Consideraciones eticas en el desarrollo del proyecto

- Todo el codigo fue desarrollado de forma original, sin copiar codigo de terceros sin atribucion.
- Se implemento sanitizacion de entradas (funcion `esc()`) para prevenir inyeccion de codigo malicioso.
- El sistema de roles garantiza que solo personal autorizado pueda modificar datos sensibles.
- Se implemento un log de auditoria para garantizar transparencia en las operaciones.

## 6.3 Consideraciones eticas en la etapa de produccion y mantenimiento

- Las contrasenas en un entorno de produccion real deberian almacenarse con hash criptografico (bcrypt o similar), no en texto plano como en este prototipo.
- Se recomienda implementar HTTPS para la transmision segura de datos en un despliegue real.
- El sistema debe ser auditado periodicamente para verificar el cumplimiento de politicas de proteccion de datos.
- Se debe garantizar el derecho de los empleados a conocer que datos suyos estan almacenados en el sistema.

---

# 7. Conclusiones

## 7.1 Conclusiones del estudiante

El desarrollo del proyecto InventPro permitio adquirir competencias solidas en desarrollo web front-end con JavaScript vanilla, manejo de datos con localStorage, diseno de interfaces responsivas con CSS puro y arquitectura de aplicaciones SPA sin frameworks. El mayor desafio fue implementar un sistema empresarial completo en un solo archivo HTML manteniendo la organizacion del codigo, la separacion de responsabilidades y la escalabilidad. Se aprendio que la simplicidad tecnologica no implica limitacion funcional: con las herramientas basicas de la web es posible construir soluciones robustas que resuelven problemas reales de las organizaciones.

## 7.2 Conclusion del tutor en sitio del proyecto

[Espacio reservado para la opinion del tutor sobre los resultados logrados con el proyecto.]

## 7.3 Lecciones aprendidas

1. **Arquitectura simple es poderosa:** Un archivo HTML unico con JavaScript vanilla puede implementar un sistema empresarial completo sin dependencias externas.
2. **Versionado de datos es critico:** El manejo de versiones en localStorage evita conflictos cuando se actualizan los datos de prueba.
3. **Roles desde el inicio:** Implementar el sistema de permisos desde la fase de diseno evita refactorizaciones costosas.
4. **Validaciones en ambos lados:** Las validaciones de integridad (serial unico, cedula unica, estado de activo) deben aplicarse tanto en la interfaz como en la logica de negocio.
5. **Feedback inmediato:** Las notificaciones visuales mejoran significativamente la experiencia del usuario.
6. **Desarrollo incremental:** Construir el sistema modulo por modulo permite detectar errores tempranamente.

---

# Anexos

## Anexo A: Credenciales de Acceso al Sistema

| Usuario | Contrasena | Rol | Alcance |
|---------|-----------|-----|---------|
| superadmin | super123 | SUPERADMIN | Acceso total a todo el sistema |
| admin.sede1 | sede1123 | ADMIN_SEDE | Admin de Sede Central Bogota |
| admin.sede2 | sede2123 | ADMIN_SEDE | Admin de Sede Medellin |
| admin.tecnologia | depto1123 | ADMIN_DEPTO | Admin de Departamento Tecnologia |
| usuario | user1234 | USER | Solo lectura |

## Anexo B: Datos Precargados

- 20 sedes en ciudades de Colombia
- 10 departamentos organizacionales
- 100 empleados distribuidos en todas las sedes y departamentos
- 200 activos de 45 tipos diferentes
- 40 asignaciones activas
- 15 activos en estado de reparacion

## Anexo C: Tecnologias Utilizadas

| Tecnologia | Version | Uso |
|-----------|---------|-----|
| HTML5 | 5 | Estructura del documento |
| CSS3 | 3 | Estilos y diseno responsivo |
| JavaScript | ES5+ | Logica de aplicacion |
| localStorage | Web Storage API | Persistencia de datos |
| SVG | 1.1 | Iconografia vectorial |
