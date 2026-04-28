# PROYECTO DE DESARROLLO DE PRODUCTO DE SOFTWARE

# InventPro: Sistema de Gestion de Inventario y Control de Activos Empresariales

---

Facultad de Ingenierias — Programa de Ingenieria de Sistemas

Barranquilla, Colombia — Abril 2026

---

# 1. INTRODUCCION

## 1.1 Contexto del Problema

La gestion de activos fisicos representa uno de los desafios operativos mas criticos para las organizaciones con presencia en multiples ubicaciones geograficas. Segun la Encuesta de Micronegocios del DANE (2024), mas del 68% de las micro, pequenas y medianas empresas colombianas carecen de sistemas formales para el control de sus bienes fisicos, lo que genera perdidas estimadas en un 12% del valor total de sus inventarios por deterioro, extravio o asignaciones no documentadas.

Esta problematica se agrava en empresas con estructuras organizacionales complejas que operan en varias ciudades del pais. Los administradores enfrentan la imposibilidad de conocer en tiempo real el estado, ubicacion y responsable de cada activo. Las hojas de calculo y registros manuales resultan insuficientes cuando el volumen de activos supera las decenas, generando duplicidad de compras, perdida de trazabilidad en las asignaciones y ausencia de reportes consolidados para la toma de decisiones.

La ausencia de control diferenciado por roles agrava la situacion: cualquier persona con acceso al archivo compartido puede modificar registros sin dejar rastro, comprometiendo la integridad de la informacion y la accountability organizacional.

## 1.2 Justificacion

El presente proyecto responde a la necesidad de digitalizar y centralizar la gestion de activos empresariales mediante una plataforma web accesible que no requiera infraestructura compleja de servidores ni bases de datos externas.

El proyecto se alinea con el Objetivo de Desarrollo Sostenible (ODS) 9 de las Naciones Unidas, "Industria, Innovacion e Infraestructura", especificamente con la meta 9.3 que busca aumentar el acceso de las pequenas industrias a los servicios tecnologicos y su integracion en las cadenas de valor. Asimismo, contribuye al pilar de transformacion productiva del Plan Nacional de Desarrollo 2022-2026 "Colombia Potencia Mundial de la Vida", que prioriza la digitalizacion de procesos empresariales como estrategia de competitividad.

A nivel local, el Plan de Desarrollo de Barranquilla contempla la modernizacion tecnologica del sector empresarial como eje estrategico para el crecimiento economico de la region Caribe.

## 1.3 Objetivos

### 1.3.1 Objetivo General

Disenar, desarrollar e implementar un sistema web de gestion de inventario y control de activos empresariales denominado InventPro, que permita administrar de forma centralizada activos fisicos, empleados, sedes y departamentos con trazabilidad completa, seguridad basada en roles jerarquicos y generacion de reportes en tiempo real.

### 1.3.2 Objetivos Especificos

1. Implementar un sistema de autenticacion con cuatro niveles de roles jerarquicos (SuperAdmin, Admin de Sede, Admin de Departamento y Usuario) que garantice el control de acceso diferenciado a las funcionalidades del sistema.

2. Desarrollar modulos CRUD completos para la gestion de activos, empleados, sedes y departamentos, incorporando validaciones de integridad de datos como unicidad de serial y cedula.

3. Crear un modulo de asignaciones que permita vincular activos a empleados con validaciones automaticas de estado, registro de devoluciones y mantenimiento de historial completo para trazabilidad.

4. Implementar un modulo de reportes con visualizacion por estado, sede, departamento y empleado, incluyendo capacidad de exportacion a formato CSV para auditoria externa.

5. Disenar una interfaz de usuario profesional, responsiva e intuitiva con sistema de notificaciones en tiempo real, busqueda integrada con filtros y navegacion mediante sidebar lateral.

6. Desarrollar un sistema de registro de actividad que permita rastrear todas las operaciones realizadas en el sistema, garantizando transparencia y accountability organizacional.

---

# 2. ALCANCE DEL PROYECTO

## 2.1 Que Incluye

El sistema InventPro abarca las siguientes funcionalidades:

- Modulo de autenticacion con cuatro niveles de roles y control de sesion
- Gestion completa (CRUD) de activos fisicos con 10 campos por registro
- Gestion completa de empleados con vinculacion a sede y departamento
- Gestion de 20 sedes a nivel nacional con datos de contacto
- Gestion de 10 departamentos organizacionales vinculados a sedes
- Modulo de asignaciones con validaciones de estado y registro de devoluciones
- Dashboard ejecutivo con ocho indicadores clave de rendimiento
- Modulo de reportes con cinco vistas (disponibles, asignados, reparacion, por sede, por empleado)
- Exportacion de datos a formato CSV
- Busqueda y filtrado en tiempo real para activos y empleados
- Gestion de usuarios del sistema (creacion y eliminacion de cuentas)
- Registro de actividad con log de auditoria
- Sistema de notificaciones visuales para retroalimentacion de operaciones
- Landing page corporativa con informacion del sistema
- Datos de prueba precargados: 200 activos, 100 empleados, 20 sedes, 10 departamentos, 32 usuarios

## 2.2 Que No Incluye

- Integracion con sistemas ERP, contables o de nomina externos
- Sincronizacion en la nube ni acceso remoto entre dispositivos
- Generacion de codigos de barras, codigos QR o etiquetas fisicas
- Aplicacion movil nativa para iOS o Android
- Modulo de depreciacion contable de activos
- Sistema de alertas por correo electronico
- Soporte multiidioma

## 2.3 Entregables

| No. | Entregable | Formato | Descripcion |
|-----|-----------|---------|-------------|
| 1 | Documento de requerimientos | Markdown | Especificacion de 20 requerimientos funcionales con criterios de aceptacion |
| 2 | Documento de diseno tecnico | Markdown | Arquitectura, modelos de datos, componentes y propiedades de correctitud |
| 3 | Plan de implementacion | Markdown | Lista de 16 tareas con subtareas, dependencias y checkpoints |
| 4 | Codigo fuente del sistema | HTML | Archivo index.html autocontenido con CSS y JavaScript embebido |
| 5 | Datos de prueba | Integrado | 200 activos, 100 empleados, 20 sedes, 10 departamentos precargados |
| 6 | Informe del proyecto | Markdown | Documento tecnico completo (este documento) |
| 7 | Manual de credenciales | Integrado | Tabla de usuarios con roles y contrasenas para pruebas |

---

# 3. GESTION DEL PROYECTO

## 3.1 Suposiciones

1. Los usuarios finales disponen de un navegador web moderno actualizado (Google Chrome 90+, Microsoft Edge 90+ o Mozilla Firefox 88+).
2. Los usuarios poseen conocimientos basicos de navegacion web y manejo de formularios.
3. La organizacion cuenta con una estructura definida de sedes, departamentos y cargos.
4. Cada activo fisico de la empresa puede ser identificado mediante un codigo serial unico.
5. El volumen de datos operativos no excedera la capacidad de almacenamiento de localStorage del navegador (aproximadamente 5 a 10 megabytes).
6. El sistema sera utilizado en un entorno local o de red interna, sin requerir servidor web dedicado.

## 3.2 Restricciones

| Tipo | Restriccion | Detalle |
|------|------------|---------|
| Tiempo | Duracion maxima de 16 semanas | El proyecto debe completarse dentro del periodo academico establecido |
| Alcance | Sin integracion externa | No se conecta con sistemas ERP, contables ni servicios en la nube |
| Tecnologia | Solo tecnologias web estandar | HTML5, CSS3 y JavaScript vanilla, sin frameworks ni librerias externas |
| Almacenamiento | localStorage del navegador | Capacidad limitada a 5-10 MB, datos locales al equipo del usuario |
| Costo | Presupuesto cero en herramientas | Se utilizan exclusivamente herramientas gratuitas y de codigo abierto |
| Infraestructura | Sin servidor dedicado | El sistema funciona como archivo HTML autocontenido |

## 3.3 Analisis de Riesgos

| ID | Riesgo | Prob. (1-5) | Impacto (1-5) | Nivel | Estrategia de Mitigacion |
|----|--------|-------------|---------------|-------|--------------------------|
| R1 | Incompatibilidad con navegadores antiguos | 2 | 3 | 6 | Desarrollo con JavaScript ES5+ compatible. Pruebas en Chrome, Edge y Firefox |
| R2 | Perdida de datos por limpieza de localStorage | 3 | 4 | 12 | Versionado interno de datos con auto-migracion. Exportacion CSV como respaldo |
| R3 | Acceso no autorizado a funciones administrativas | 2 | 5 | 10 | Sistema de cuatro niveles de roles con validacion en cada operacion de escritura |
| R4 | Solicitudes de funcionalidades fuera de alcance | 3 | 3 | 9 | Definicion clara de requerimientos desde la fase de analisis. Desarrollo incremental |
| R5 | Interfaz compleja para usuarios no tecnicos | 2 | 3 | 6 | Diseno intuitivo con sidebar, notificaciones contextuales y busqueda integrada |
| R6 | Colision de datos entre versiones del sistema | 2 | 4 | 8 | Prefijo unico en claves de localStorage y limpieza automatica al detectar nueva version |

## 3.4 Cronograma

| Sprint | Semanas | Fase | Actividades | Entregable |
|--------|---------|------|------------|-----------|
| 0 | 1-2 | Analisis | Levantamiento de requerimientos, identificacion de actores, definicion de reglas de negocio | Documento de requerimientos |
| 1 | 3-4 | Diseno | Arquitectura del sistema, modelos de datos, diseno de interfaz, propiedades de correctitud | Documento de diseno tecnico |
| 2 | 5-6 | Desarrollo | Implementacion de autenticacion, roles jerarquicos y estructura base del sistema | Modulo de login funcional con 4 roles |
| 3 | 7-8 | Desarrollo | CRUD de activos y empleados con validaciones de integridad | Modulos CRUD operativos |
| 4 | 9-10 | Desarrollo | Gestion de sedes, departamentos y modulo de asignaciones con devoluciones | Modulos organizacionales completos |
| 5 | 11-12 | Desarrollo | Reportes con cinco vistas, exportacion CSV y dashboard ejecutivo | Modulo de reportes y dashboard |
| 6 | 13-14 | Desarrollo | Gestion de usuarios, log de actividad, busqueda con filtros, notificaciones | Funcionalidades avanzadas |
| 7 | 15 | Pruebas | Landing page, diseno final, pruebas funcionales, de integracion y de usabilidad | Sistema completo verificado |
| 8 | 16 | Entrega | Documentacion tecnica, empaquetado final y presentacion del proyecto | Informe y sistema entregado |

## 3.5 Presupuesto Estimado

| Concepto | Cantidad | Valor Unitario (COP) | Total (COP) |
|----------|----------|----------------------|-------------|
| Desarrollador full stack (horas de trabajo) | 320 horas | $25.000 | $8.000.000 |
| Equipo de computo portatil | 1 unidad | Disponible | $0 |
| Licencias de software | Ninguna | $0 | $0 |
| Servidor o hosting | No requerido | $0 | $0 |
| Papeleria y materiales de presentacion | Global | $50.000 | $50.000 |
| Transporte y logistica | Global | $100.000 | $100.000 |
| **TOTAL ESTIMADO** | | | **$8.150.000** |

Nota: El costo efectivo en herramientas tecnologicas es cero, dado que el proyecto utiliza exclusivamente tecnologias web estandar sin dependencias comerciales.

---

# 4. METODOLOGIA DE DESARROLLO

## 4.1 Metodologia Seleccionada

Se adopto una adaptacion de la metodologia agil Scrum para un equipo de desarrollo individual. Esta seleccion se fundamenta en la necesidad de flexibilidad para incorporar cambios durante el desarrollo, la naturaleza iterativa del proyecto y la entrega incremental de funcionalidades verificables al final de cada sprint.

La adaptacion consiste en mantener los artefactos y ceremonias fundamentales de Scrum, ajustando los roles para un contexto de proyecto academico con un solo desarrollador.

## 4.2 Roles del Proyecto

| Rol Scrum | Responsable | Funciones |
|-----------|------------|-----------|
| Product Owner | Tutor academico | Define prioridades del backlog, valida entregables, aprueba criterios de aceptacion |
| Scrum Master | Tutor en sitio | Facilita el proceso, elimina impedimentos, supervisa cumplimiento de la metodologia |
| Development Team | Estudiante desarrollador | Analisis, diseno, codificacion, pruebas y documentacion del sistema completo |

## 4.3 Artefactos

**Product Backlog:** Lista priorizada de 20 requerimientos funcionales y 10 requerimientos no funcionales, organizados por modulo y nivel de dependencia. Cada item incluye descripcion, criterios de aceptacion y estimacion de esfuerzo.

**Sprint Backlog:** Subconjunto del Product Backlog seleccionado para cada sprint de dos semanas. Incluye las tareas especificas de desarrollo, pruebas y documentacion correspondientes.

**Incremento:** Al final de cada sprint se entrega un incremento funcional del sistema que puede ser verificado de forma independiente. Cada incremento incluye las funcionalidades nuevas integradas con las existentes.

## 4.4 Ceremonias

| Ceremonia | Frecuencia | Duracion | Descripcion |
|-----------|-----------|----------|-------------|
| Sprint Planning | Inicio de cada sprint | 1 hora | Seleccion de items del backlog y definicion de tareas para el sprint |
| Daily Standup | Diaria (auto-reporte) | 10 minutos | Registro de avance, impedimentos y plan del dia en bitacora personal |
| Sprint Review | Final de cada sprint | 30 minutos | Demostracion del incremento funcional al tutor academico |
| Sprint Retrospective | Final de cada sprint | 20 minutos | Reflexion sobre el proceso, identificacion de mejoras para el siguiente sprint |

---

# 5. ARQUITECTURA DEL SISTEMA

## 5.1 Descripcion General

InventPro es una aplicacion web de pagina unica (SPA) que opera completamente en el navegador del usuario sin requerir servidor backend, base de datos externa ni conexion a internet una vez cargado el archivo. Toda la logica de negocio, la interfaz de usuario y la persistencia de datos estan contenidas en un unico archivo HTML autocontenido.

## 5.2 Arquitectura

El sistema implementa una arquitectura MVC (Modelo-Vista-Controlador) simplificada dentro del contexto de una SPA:

**Modelo:** Objeto JavaScript denominado DB que encapsula todas las operaciones de acceso a datos sobre la API Web Storage (localStorage). Proporciona mas de 40 metodos para operaciones CRUD sobre siete entidades de datos.

**Vista:** Conjunto de funciones generadoras de HTML (prefijo pg_) que construyen dinamicamente la interfaz de cada pagina del sistema. Cada funcion recibe un contenedor DOM y renderiza el HTML correspondiente.

**Controlador:** Objeto JavaScript denominado App que gestiona la autenticacion, el enrutamiento entre paginas, la validacion de permisos por rol y la coordinacion entre el modelo y las vistas.

## 5.3 Tecnologias Utilizadas

| Capa | Tecnologia | Version | Justificacion |
|------|-----------|---------|---------------|
| Estructura | HTML5 | 5 | Estandar universal para documentos web, soporte nativo en todos los navegadores |
| Presentacion | CSS3 | 3 | Variables CSS para tematizacion, Grid y Flexbox para layout responsivo |
| Logica | JavaScript | ES5+ | Compatibilidad maxima sin transpilacion, suficiente para SPA completa |
| Persistencia | Web Storage API | localStorage | Almacenamiento persistente del lado del cliente sin servidor |
| Iconografia | SVG inline | 1.1 | Iconos vectoriales escalables sin dependencias externas |

## 5.4 Justificacion Tecnica

La decision de utilizar tecnologias web estandar sin frameworks responde a tres criterios fundamentales:

1. **Accesibilidad:** El sistema debe funcionar abriendo un solo archivo en cualquier navegador, sin instalacion de Node.js, Python, PostgreSQL ni ninguna otra dependencia.

2. **Portabilidad:** Un archivo HTML autocontenido puede distribuirse por correo electronico, USB o cualquier medio de transferencia de archivos, y ejecutarse inmediatamente.

3. **Mantenibilidad:** Al no depender de versiones especificas de frameworks, el sistema no queda obsoleto por actualizaciones de terceros. JavaScript vanilla y las APIs del navegador tienen garantia de compatibilidad a largo plazo.

---

# 6. REQUERIMIENTOS DEL SISTEMA

## 6.1 Actores del Sistema

| Actor | Descripcion | Nivel de Acceso |
|-------|------------|-----------------|
| SuperAdmin | Director general o administrador de TI responsable de la gestion global del sistema. Tiene acceso irrestricto a todas las funcionalidades, incluyendo la creacion de otros usuarios administradores. | Total |
| Admin de Sede | Responsable operativo de una sede especifica. Gestiona los activos, empleados y asignaciones dentro de su sede asignada. Puede crear y editar registros pero no puede gestionar otras sedes ni crear usuarios. | Sede asignada |
| Admin de Departamento | Jefe funcional de un departamento especifico. Gestiona los activos y empleados de su departamento. Tiene permisos de edicion limitados a su area funcional. | Departamento asignado |
| Usuario | Empleado con acceso de consulta al sistema. Puede visualizar el inventario, consultar reportes y realizar busquedas, pero no puede crear, editar ni eliminar ningun registro. | Solo lectura |

## 6.2 Historias de Usuario

| ID | Historia de Usuario | Prioridad |
|----|---------------------|-----------|
| HU01 | Yo como SuperAdmin quiero iniciar sesion con mis credenciales para acceder al panel de administracion completo del sistema | Alta |
| HU02 | Yo como Admin de Sede quiero registrar nuevos activos con serial unico, valor y ubicacion para mantener actualizado el inventario de mi sede | Alta |
| HU03 | Yo como Admin de Departamento quiero asignar un activo disponible a un empleado de mi departamento para llevar control de quien tiene cada bien | Alta |
| HU04 | Yo como Admin de Sede quiero registrar la devolucion de un activo asignado para liberar el bien y dejarlo disponible para futuras asignaciones | Alta |
| HU05 | Yo como Usuario quiero consultar el listado de activos con busqueda por nombre, serial o tipo para localizar rapidamente un bien especifico | Media |
| HU06 | Yo como SuperAdmin quiero generar reportes de activos por estado, sede y empleado para tomar decisiones informadas sobre el inventario | Media |
| HU07 | Yo como SuperAdmin quiero exportar los datos de reportes en formato CSV para compartirlos con el area contable y de auditoria | Media |
| HU08 | Yo como SuperAdmin quiero crear cuentas de usuario con roles diferenciados para controlar quien puede modificar datos en el sistema | Alta |
| HU09 | Yo como Admin de Sede quiero gestionar los empleados de mi sede con sus datos de cedula, cargo y departamento para mantener actualizado el directorio | Media |
| HU10 | Yo como SuperAdmin quiero consultar el registro de actividad del sistema para auditar las operaciones realizadas por cada usuario | Baja |

## 6.3 Criterios de Aceptacion

**HU01 - Inicio de Sesion:**
- Dado un usuario con credenciales validas, cuando ingresa su nombre de usuario y contrasena, entonces el sistema lo redirige al dashboard con su rol correspondiente.
- Dado un usuario con credenciales invalidas, cuando intenta iniciar sesion, entonces el sistema muestra un mensaje de error sin revelar cual campo es incorrecto.
- Dado un usuario autenticado, cuando cierra sesion, entonces el sistema limpia la sesion y lo redirige a la landing page.

**HU03 - Asignacion de Activos:**
- Dado un activo con estado DISPONIBLE, cuando un administrador lo asigna a un empleado, entonces el estado del activo cambia a ASIGNADO y se crea un registro de asignacion con fecha automatica.
- Dado un activo con estado ASIGNADO, cuando un administrador intenta asignarlo, entonces el sistema rechaza la operacion con el mensaje "El activo ya esta asignado".
- Dado un activo con estado DANADO, cuando un administrador intenta asignarlo, entonces el sistema rechaza la operacion con el mensaje "No se pueden asignar activos en reparacion".

**HU04 - Devolucion:**
- Dada una asignacion activa, cuando el administrador registra la devolucion, entonces el sistema registra la fecha de devolucion y cambia el estado del activo a DISPONIBLE.
- Dada una asignacion ya devuelta, cuando se intenta registrar otra devolucion, entonces el sistema no permite la operacion.

## 6.4 Requerimientos Funcionales

| Ref | Modulo | Requerimiento |
|-----|--------|--------------|
| RF01 | Autenticacion | El sistema debe permitir el inicio de sesion mediante nombre de usuario y contrasena, validando las credenciales contra la base de datos de usuarios registrados |
| RF02 | Autenticacion | El sistema debe soportar cuatro niveles de roles jerarquicos con permisos diferenciados: SuperAdmin, Admin Sede, Admin Departamento y Usuario |
| RF03 | Activos | El sistema debe permitir a los administradores crear, consultar, actualizar y eliminar activos con los campos: nombre, descripcion, tipo, serial, valor, fecha de compra, estado, sede y departamento |
| RF04 | Activos | El sistema debe validar que el campo serial de cada activo sea unico en toda la base de datos, rechazando duplicados con mensaje descriptivo |
| RF05 | Activos | El sistema debe permitir buscar y filtrar activos por nombre, serial, tipo y estado de forma simultanea |
| RF06 | Empleados | El sistema debe permitir a los administradores gestionar empleados con los campos: nombre, apellido, cedula, email, sede, departamento y cargo |
| RF07 | Empleados | El sistema debe validar la unicidad del campo cedula y permitir busqueda por nombre, cedula o cargo |
| RF08 | Asignaciones | El sistema debe permitir asignar un activo con estado DISPONIBLE a un empleado, cambiando automaticamente el estado del activo a ASIGNADO |
| RF09 | Asignaciones | El sistema debe impedir la asignacion de activos con estado DANADO o ASIGNADO, mostrando mensajes de error descriptivos |
| RF10 | Asignaciones | El sistema debe permitir registrar la devolucion de un activo asignado, cambiando su estado a DISPONIBLE y registrando la fecha de devolucion |
| RF11 | Asignaciones | El sistema debe mantener un historial permanente de todas las asignaciones y devoluciones sin eliminar registros historicos |
| RF12 | Reportes | El sistema debe generar reportes de activos filtrados por estado: disponibles, asignados y en reparacion |
| RF13 | Reportes | El sistema debe generar reportes agrupados por sede con detalle de activos y valor total por ubicacion |
| RF14 | Reportes | El sistema debe generar reportes por empleado con historial de asignaciones expandible |
| RF15 | Reportes | El sistema debe permitir exportar los datos de activos en formato CSV descargable |
| RF16 | Sedes | El sistema debe permitir a los administradores gestionar sedes con los campos: nombre, ciudad, direccion y telefono |
| RF17 | Departamentos | El sistema debe permitir gestionar departamentos vinculados a una sede con los campos: nombre, area y responsable |
| RF18 | Usuarios | El sistema debe permitir al SuperAdmin crear y eliminar cuentas de usuario con asignacion de rol, sede y departamento |
| RF19 | Dashboard | El sistema debe mostrar un panel ejecutivo con ocho indicadores: total activos, disponibles, asignados, en reparacion, empleados, sedes, departamentos y valor total del inventario |
| RF20 | Sistema | El sistema debe registrar un log de actividad con fecha, usuario, accion y detalle de cada operacion realizada |

## 6.5 Requerimientos No Funcionales

### Rendimiento

| Ref | Requerimiento |
|-----|--------------|
| RNF01 | El sistema debe renderizar cualquier pagina en menos de un segundo en un equipo con procesador de doble nucleo y 4 GB de RAM |
| RNF02 | La busqueda y filtrado de activos debe actualizar los resultados en tiempo real conforme el usuario escribe, sin demora perceptible |

### Seguridad

| Ref | Requerimiento |
|-----|--------------|
| RNF03 | El sistema debe validar el rol del usuario en cada operacion de escritura, impidiendo que usuarios sin permisos de administrador modifiquen datos |
| RNF04 | El sistema debe sanitizar todas las entradas de usuario mediante la funcion de escape HTML para prevenir ataques de inyeccion de codigo (XSS) |
| RNF05 | El sistema debe impedir que un usuario elimine su propia cuenta para evitar bloqueos del sistema |

### Usabilidad

| Ref | Requerimiento |
|-----|--------------|
| RNF06 | El sistema debe ser navegable mediante un menu lateral permanente con secciones organizadas por categoria funcional |
| RNF07 | El sistema debe proporcionar notificaciones visuales temporales al completar cualquier operacion de creacion, edicion, eliminacion o asignacion |
| RNF08 | El sistema debe ser responsivo, adaptando su layout para pantallas de escritorio y tableta |

### Disponibilidad

| Ref | Requerimiento |
|-----|--------------|
| RNF09 | El sistema debe funcionar sin conexion a internet una vez cargado el archivo HTML en el navegador |
| RNF10 | El sistema debe preservar los datos entre sesiones del navegador mediante almacenamiento persistente en localStorage |


---

# 7. MODELOS UML

## 7.1 Diagrama de Casos de Uso

El diagrama de casos de uso del sistema InventPro identifica cuatro actores principales y doce casos de uso agrupados en cuatro paquetes funcionales.

**Paquete de Autenticacion:**
- CU01 Iniciar Sesion: Todos los actores acceden al sistema mediante credenciales. El sistema valida usuario y contrasena, establece la sesion con el rol correspondiente y redirige al dashboard.
- CU02 Cerrar Sesion: Todos los actores pueden finalizar su sesion. El sistema limpia los datos de sesion y redirige a la landing page.

**Paquete de Gestion de Inventario:**
- CU03 Gestionar Activos: Los actores SuperAdmin, Admin Sede y Admin Departamento pueden crear, editar y eliminar activos. El caso de uso incluye la validacion de serial unico y valor positivo. Extiende a CU04 Buscar Activos.
- CU04 Buscar Activos: Todos los actores pueden buscar activos por nombre, serial o tipo, y filtrar por estado. Este caso de uso es incluido por CU03.
- CU05 Gestionar Empleados: Los administradores pueden crear, editar y eliminar empleados con validacion de cedula unica. Extiende a CU06 Buscar Empleados.
- CU06 Buscar Empleados: Todos los actores pueden buscar empleados por nombre, cedula o cargo.

**Paquete de Asignaciones:**
- CU07 Asignar Activo: Los administradores seleccionan un activo disponible y un empleado para crear una asignacion. El sistema valida que el activo tenga estado DISPONIBLE. Incluye CU09 Registrar Actividad.
- CU08 Registrar Devolucion: Los administradores registran la devolucion de un activo asignado. El sistema cambia el estado del activo a DISPONIBLE. Incluye CU09.
- CU09 Registrar Actividad: Caso de uso incluido automaticamente por todas las operaciones de escritura. Registra fecha, usuario, accion y detalle.

**Paquete de Reportes y Administracion:**
- CU10 Generar Reportes: Todos los actores pueden consultar reportes por estado, sede y empleado. Los administradores pueden exportar a CSV.
- CU11 Gestionar Usuarios: Solo el SuperAdmin puede crear y eliminar cuentas de usuario con asignacion de rol.
- CU12 Consultar Log de Actividad: Los administradores pueden consultar el historial de operaciones del sistema.

**Relaciones entre actores:** El SuperAdmin hereda todos los permisos de Admin Sede. El Admin Sede hereda los permisos de Admin Departamento. El Admin Departamento hereda los permisos de Usuario. Esta jerarquia se implementa mediante la funcion isAdmin() que retorna verdadero para los tres roles administrativos.

## 7.2 Diagrama de Clases

El sistema se compone de siete clases principales con las siguientes relaciones:

**Clase Usuario:**
Atributos: id (entero, PK), username (texto, unico), email (texto, unico), password (texto), rol (texto: SUPERADMIN|ADMIN_SEDE|ADMIN_DEPTO|USER), nombre (texto), apellido (texto), sede_id (entero, FK), departamento_id (entero, FK), fecha (fecha).
Metodos: login(), logout(), validarRol(), crearUsuario(), eliminarUsuario().

**Clase Activo:**
Atributos: id (entero, PK), nombre (texto), descripcion (texto), tipo (texto), serial (texto, unico), valor (decimal), fecha_compra (fecha), estado (texto: DISPONIBLE|ASIGNADO|DANADO), sede_id (entero, FK), departamento_id (entero, FK).
Metodos: crear(), editar(), eliminar(), buscar(), filtrarPorEstado().

**Clase Empleado:**
Atributos: id (entero, PK), nombre (texto), apellido (texto), cedula (texto, unico), email (texto), cargo (texto), sede_id (entero, FK), departamento_id (entero, FK).
Metodos: crear(), editar(), eliminar(), buscar().

**Clase Asignacion:**
Atributos: id (entero, PK), activo_id (entero, FK), empleado_id (entero, FK), fecha_asignacion (fechahora), fecha_devolucion (fechahora, nullable), observaciones (texto).
Metodos: crear(), devolver().

**Clase Sede:**
Atributos: id (entero, PK), nombre (texto), ciudad (texto), direccion (texto), telefono (texto).
Metodos: crear(), editar(), eliminar().

**Clase Departamento:**
Atributos: id (entero, PK), nombre (texto), sede_id (entero, FK), area (texto), responsable (texto).
Metodos: crear(), editar(), eliminar().

**Clase Log:**
Atributos: id (entero, PK), action (texto), detail (texto), user (texto), fecha (fechahora).
Metodos: registrar(), consultar(), limpiar().

**Relaciones:**
- Sede (1) --- (*) Departamento: Una sede contiene multiples departamentos.
- Sede (1) --- (*) Activo: Una sede alberga multiples activos.
- Sede (1) --- (*) Empleado: Una sede tiene multiples empleados.
- Departamento (1) --- (*) Activo: Un departamento gestiona multiples activos.
- Departamento (1) --- (*) Empleado: Un departamento tiene multiples empleados.
- Activo (1) --- (*) Asignacion: Un activo puede tener multiples asignaciones a lo largo del tiempo.
- Empleado (1) --- (*) Asignacion: Un empleado puede recibir multiples asignaciones.
- Usuario (1) --- (0..1) Sede: Un usuario administrador puede estar vinculado a una sede.
- Usuario (1) --- (0..1) Departamento: Un usuario administrador puede estar vinculado a un departamento.

## 7.3 Diagrama de Secuencia

**Secuencia: Proceso de Asignacion de Activo**

1. El administrador navega a la pagina de Asignaciones.
2. El sistema consulta la base de datos y obtiene la lista de activos con estado DISPONIBLE.
3. El sistema consulta la base de datos y obtiene la lista de empleados registrados.
4. El sistema renderiza el formulario de nueva asignacion con los selectores poblados y la tabla de asignaciones existentes.
5. El administrador selecciona un activo del selector de activos disponibles.
6. El administrador selecciona un empleado del selector de empleados.
7. El administrador opcionalmente ingresa observaciones en el campo de texto.
8. El administrador hace clic en el boton "Registrar".
9. El sistema valida que se hayan seleccionado tanto un activo como un empleado.
10. El sistema consulta el estado actual del activo en la base de datos.
11. El sistema verifica que el estado del activo sea DISPONIBLE.
12. El sistema crea un nuevo registro de asignacion con activo_id, empleado_id, observaciones y fecha_asignacion automatica.
13. El sistema actualiza el estado del activo a ASIGNADO en la base de datos.
14. El sistema registra la operacion en el log de actividad con el detalle del activo y empleado.
15. El sistema muestra una notificacion verde "Activo asignado correctamente" durante 2.5 segundos.
16. El sistema recarga la pagina de asignaciones mostrando el nuevo registro en la tabla.

**Secuencia: Proceso de Devolucion**

1. El administrador visualiza la tabla de asignaciones en la pagina de Asignaciones.
2. El administrador identifica una asignacion activa (sin fecha de devolucion) y hace clic en "Devolver".
3. El sistema muestra un dialogo de confirmacion con el mensaje "Confirmar devolucion?".
4. El administrador confirma la operacion.
5. El sistema obtiene el registro de asignacion de la base de datos.
6. El sistema actualiza el campo fecha_devolucion con la fecha y hora actual.
7. El sistema actualiza el estado del activo asociado a DISPONIBLE.
8. El sistema registra la operacion en el log de actividad.
9. El sistema muestra una notificacion verde "Devolucion registrada".
10. El sistema recarga la pagina mostrando la asignacion con estado "Devuelta" y la fecha de devolucion.

## 7.4 Diagrama de Actividades

**Actividad: Flujo Completo de Gestion de un Activo**

Inicio del flujo. El administrador accede al modulo de Activos. El sistema verifica el rol del usuario. Si el rol es USER, el sistema muestra la tabla en modo solo lectura sin botones de accion y el flujo termina. Si el rol es administrativo, el sistema muestra la tabla con botones de Nuevo, Editar y Eliminar.

Rama de creacion: El administrador hace clic en Nuevo Activo. El sistema muestra el formulario vacio. El administrador completa los campos obligatorios. El sistema valida que el nombre, tipo, serial, valor y fecha esten completos. Si la validacion falla, el sistema muestra el error y permanece en el formulario. Si la validacion pasa, el sistema verifica unicidad del serial. Si el serial existe, muestra error. Si es unico, crea el activo con estado DISPONIBLE, registra en el log, muestra notificacion y redirige a la lista.

Rama de edicion: El administrador hace clic en Editar. El sistema carga los datos del activo en el formulario, incluyendo el selector de estado. El administrador modifica los campos deseados. El sistema valida los datos y actualiza el registro.

Rama de eliminacion: El administrador hace clic en Eliminar. El sistema verifica si el activo tiene asignaciones activas. Si tiene asignaciones activas, muestra alerta "No se puede eliminar: esta asignado" y cancela la operacion. Si no tiene asignaciones activas, muestra dialogo de confirmacion. Si el administrador confirma, el sistema elimina el activo, registra en el log y recarga la lista.

Fin del flujo.

---

# 8. DISENO DEL SISTEMA

## 8.1 Descripcion de Modulos

| Modulo | Funcion Principal | Paginas |
|--------|------------------|---------|
| Landing | Presentacion publica del sistema con informacion de funcionalidades y acceso al login | showLanding() |
| Autenticacion | Inicio de sesion, cierre de sesion y gestion de sesion por roles | showLogin() |
| Dashboard | Panel ejecutivo con ocho indicadores clave y tabla de actividad reciente | pg_dashboard() |
| Activos | CRUD completo con busqueda por texto y filtro por estado | pg_activos(), pg_activo_form() |
| Empleados | CRUD completo con busqueda por nombre, cedula o cargo | pg_empleados(), pg_empleado_form() |
| Asignaciones | Creacion de asignaciones, registro de devoluciones y listado historico | pg_asignaciones() |
| Sedes | CRUD de ubicaciones fisicas de la empresa | pg_sedes(), pg_sede_form() |
| Departamentos | CRUD de unidades organizacionales vinculadas a sedes | pg_departamentos(), pg_dep_form() |
| Reportes | Cinco vistas de reportes con exportacion CSV | pg_reportes() |
| Usuarios | Creacion y eliminacion de cuentas del sistema (solo admin) | pg_usuarios() |
| Actividad | Consulta del log de auditoria con opcion de limpieza | pg_actividad() |

## 8.2 Flujo del Sistema

1. El usuario accede al archivo index.html en su navegador.
2. El sistema verifica si existe una sesion activa en localStorage.
3. Si no hay sesion, muestra la landing page con boton de acceso.
4. El usuario hace clic en "Iniciar Sesion" y completa el formulario.
5. El sistema valida credenciales y establece la sesion con el rol correspondiente.
6. El sistema renderiza el layout principal: sidebar con menu, topbar con informacion de sesion y area de contenido.
7. El sidebar muestra las secciones disponibles segun el rol del usuario.
8. El usuario navega entre paginas haciendo clic en los items del menu.
9. Cada pagina se renderiza dinamicamente en el area de contenido sin recargar la pagina completa.
10. Las operaciones de escritura (crear, editar, eliminar, asignar) verifican el rol antes de ejecutarse.
11. Cada operacion exitosa genera una notificacion visual y un registro en el log de actividad.
12. Al cerrar sesion, el sistema limpia la sesion y redirige a la landing page.

## 8.3 Estructura de Base de Datos

| Tabla | Campos Principales | Claves | Registros Precargados |
|-------|-------------------|--------|----------------------|
| USUARIO | id, username, email, password, rol, nombre, apellido, sede_id, departamento_id | PK: id, UK: username, UK: email, FK: sede_id, FK: departamento_id | 32 (1 superadmin, 20 admin sede, 10 admin depto, 1 usuario) |
| SEDE | id, nombre, ciudad, direccion, telefono | PK: id | 20 sedes en ciudades de Colombia |
| DEPARTAMENTO | id, nombre, sede_id, area, responsable | PK: id, FK: sede_id | 10 departamentos organizacionales |
| ACTIVO | id, nombre, descripcion, tipo, serial, valor, fecha_compra, estado, sede_id, departamento_id | PK: id, UK: serial, FK: sede_id, FK: departamento_id | 200 activos de 45 tipos diferentes |
| EMPLEADO | id, nombre, apellido, cedula, email, cargo, sede_id, departamento_id | PK: id, UK: cedula, FK: sede_id, FK: departamento_id | 100 empleados distribuidos en sedes y departamentos |
| ASIGNACION | id, activo_id, empleado_id, fecha_asignacion, fecha_devolucion, observaciones | PK: id, FK: activo_id, FK: empleado_id | 40 asignaciones activas |
| LOG | id, action, detail, user, fecha | PK: id | Se genera dinamicamente con cada operacion |

---

# 9. PRUEBAS DEL SISTEMA

## 9.1 Estrategia de Pruebas

La estrategia de pruebas del sistema InventPro se basa en tres niveles complementarios ejecutados de forma progresiva durante el desarrollo:

1. **Pruebas funcionales:** Verificacion de cada requerimiento funcional mediante casos de prueba especificos que validan entradas, procesamiento y salidas esperadas.
2. **Pruebas de integracion:** Verificacion de flujos completos que involucran multiples modulos, como el ciclo asignacion-devolucion que afecta los modulos de Activos, Empleados y Asignaciones simultaneamente.
3. **Pruebas de aceptacion:** Validacion del sistema completo desde la perspectiva de cada rol de usuario, verificando que los permisos y restricciones se apliquen correctamente.

## 9.2 Casos de Prueba

| ID | Modulo | Accion | Datos de Entrada | Resultado Esperado | Tipo |
|----|--------|--------|-----------------|-------------------|------|
| CP01 | Login | Iniciar sesion con credenciales validas | usuario: superadmin, contrasena: super123 | Redireccion al dashboard con rol SUPERADMIN visible | Funcional |
| CP02 | Login | Iniciar sesion con credenciales invalidas | usuario: admin, contrasena: incorrecta | Mensaje de error "Usuario o contrasena incorrectos" | Funcional |
| CP03 | Activos | Crear activo con serial unico | nombre: Laptop Test, serial: TEST-001, valor: 1000000 | Activo creado, notificacion verde, registro en log | Funcional |
| CP04 | Activos | Crear activo con serial duplicado | serial: TEST-001 (ya existente) | Mensaje de error "Serial TEST-001 ya existe" | Funcional |
| CP05 | Activos | Crear activo con valor negativo | valor: -500 | Mensaje de error "Valor debe ser mayor a 0" | Funcional |
| CP06 | Activos | Buscar activo por nombre | texto: "Laptop" en campo de busqueda | Tabla filtrada mostrando solo activos con "Laptop" en el nombre | Funcional |
| CP07 | Activos | Filtrar por estado | seleccionar "Disponible" en filtro | Tabla mostrando solo activos con estado DISPONIBLE | Funcional |
| CP08 | Empleados | Crear empleado con cedula duplicada | cedula: 1234567890 (ya existente) | Mensaje de error "Cedula ya existe" | Funcional |
| CP09 | Asignaciones | Asignar activo disponible | activo: disponible, empleado: existente | Asignacion creada, estado del activo cambia a ASIGNADO | Integracion |
| CP10 | Asignaciones | Intentar asignar activo ya asignado | activo con estado ASIGNADO | Mensaje de error "Activo no disponible" | Funcional |
| CP11 | Asignaciones | Registrar devolucion | clic en "Devolver" + confirmar | Estado del activo cambia a DISPONIBLE, fecha de devolucion registrada | Integracion |
| CP12 | Activos | Intentar eliminar activo asignado | activo con asignacion activa | Alerta "No se puede eliminar: esta asignado" | Integracion |
| CP13 | Empleados | Intentar eliminar empleado con activos | empleado con asignaciones activas | Alerta "No se puede eliminar: tiene activos" | Integracion |
| CP14 | Roles | Acceder como USER e intentar crear activo | login como usuario/user1234 | No se muestra boton "Nuevo Activo" ni botones de editar/eliminar | Aceptacion |
| CP15 | Roles | Acceder como ADMIN_SEDE y gestionar activos | login como admin.sede1/sede1123 | Se muestran botones de crear, editar y eliminar | Aceptacion |
| CP16 | Reportes | Exportar CSV | clic en "Exportar CSV" en pagina de reportes | Descarga de archivo activos_reporte.csv con datos correctos | Funcional |
| CP17 | Usuarios | Crear usuario como SuperAdmin | datos completos de nuevo usuario | Usuario creado, notificacion verde, aparece en tabla | Funcional |
| CP18 | Usuarios | Intentar eliminar cuenta propia | clic en eliminar sobre la cuenta del usuario actual | Alerta "No puede eliminar su propia cuenta" | Funcional |
| CP19 | Dashboard | Verificar estadisticas | acceder al dashboard | Los conteos de activos, empleados, sedes y departamentos coinciden con los datos reales | Integracion |
| CP20 | Actividad | Verificar registro de log | realizar una operacion de creacion | La operacion aparece en la pagina de Actividad con fecha, usuario y detalle | Integracion |

## 9.3 Tipos de Prueba Aplicados

| Tipo | Cantidad | Cobertura | Herramienta |
|------|----------|-----------|-------------|
| Pruebas funcionales | 12 casos | Validacion de cada modulo CRUD, busqueda, filtros y exportacion | Pruebas manuales en navegador |
| Pruebas de integracion | 5 casos | Flujos que cruzan multiples modulos (asignacion-devolucion, eliminacion protegida) | Pruebas manuales de flujo completo |
| Pruebas de aceptacion | 3 casos | Verificacion de permisos por rol (SuperAdmin, Admin, Usuario) | Pruebas con diferentes credenciales |
| Pruebas de compatibilidad | 3 navegadores | Chrome, Edge y Firefox en sus versiones actuales | Ejecucion del sistema en cada navegador |
| Validacion de sintaxis | Continua | Cero errores de JavaScript reportados por el IDE | Diagnosticos de Kiro IDE |

---

# 10. CONCLUSIONES

## 10.1 Impacto del Sistema

El sistema InventPro demuestra que es posible desarrollar una solucion empresarial completa y funcional utilizando exclusivamente tecnologias web estandar, sin dependencias de frameworks, servidores ni bases de datos externas. Esta aproximacion elimina las barreras de entrada tecnologicas que impiden a muchas organizaciones adoptar herramientas de gestion de activos.

El sistema aborda directamente la problematica identificada en el contexto colombiano, donde la mayoria de las MiPymes carecen de herramientas formales de control de inventario. Al funcionar como un archivo HTML autocontenido, InventPro puede ser distribuido y utilizado inmediatamente por cualquier organizacion con acceso a un navegador web.

La implementacion de cuatro niveles de roles jerarquicos garantiza que la informacion sea gestionada de forma segura y controlada, mientras que el registro de actividad proporciona la trazabilidad necesaria para procesos de auditoria.

## 10.2 Beneficios

| Beneficio | Descripcion |
|-----------|-------------|
| Cero costo de infraestructura | No requiere servidores, bases de datos ni licencias de software |
| Despliegue inmediato | Funciona abriendo un solo archivo HTML en cualquier navegador moderno |
| Operacion sin internet | Una vez cargado, el sistema funciona completamente offline |
| Control de acceso granular | Cuatro niveles de roles con permisos diferenciados por sede y departamento |
| Trazabilidad completa | Historial de asignaciones y log de actividad para auditoria |
| Escalabilidad de datos | Soporte demostrado para 200 activos, 100 empleados y 20 sedes simultaneamente |
| Exportabilidad | Datos exportables a CSV para integracion con herramientas externas de analisis |
| Mantenibilidad | Codigo en un solo archivo sin dependencias externas que puedan quedar obsoletas |

---

*Documento generado como parte del proyecto de practica profesional en Ingenieria de Sistemas. Todos los datos tecnicos corresponden al sistema InventPro v3.0 implementado y verificado.*
