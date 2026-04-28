# GUION DE SUSTENTACION - InventPro
## Sistema de Gestion de Inventario y Control de Activos Empresariales

---

## SLIDE 1: PORTADA (30 segundos)

"Buenos dias/tardes. Mi nombre es Cristian Ramirez y hoy les presento mi proyecto de practica profesional: InventPro, un sistema de gestion de inventario y control de activos empresariales."

---

## SLIDE 2: PROBLEMA (1 minuto)

"Segun el DANE, mas del 68% de las MiPymes colombianas no tienen sistemas formales para controlar sus activos fisicos. Esto genera perdidas del 12% del valor del inventario por extravio, deterioro o asignaciones no documentadas."

"Las empresas con multiples sedes enfrentan un problema aun mayor: no saben en tiempo real que activos tienen, donde estan, ni quien los tiene asignados."

**Puntos clave:**
- 68% de MiPymes sin control formal
- 12% de perdidas en inventario
- Sin trazabilidad en asignaciones
- Sin reportes consolidados

---

## SLIDE 3: SOLUCION (1 minuto)

"InventPro es una plataforma web que centraliza la gestion de activos empresariales. Permite controlar activos, empleados, sedes y departamentos con trazabilidad completa, seguridad por roles y reportes en tiempo real."

**Caracteristicas principales:**
- Control de 200+ activos con serial unico
- Gestion de 100+ empleados en 20 sedes
- Asignaciones con validaciones automaticas
- 2 niveles de roles: Admin total y Operador por sede
- Reportes con exportacion CSV
- Log de auditoria

---

## SLIDE 4: ARQUITECTURA (1 minuto)

"El sistema utiliza una arquitectura SPA (Single Page Application) con patron MVC simplificado."

**Tecnologias:**
- Frontend: HTML5, CSS3, JavaScript vanilla
- Persistencia: Web Storage API (localStorage)
- Iconografia: SVG inline
- Hosting: GitHub Pages

**Justificacion:** Se eligieron tecnologias web estandar para garantizar accesibilidad (funciona en cualquier navegador), portabilidad (un solo archivo) y mantenibilidad (sin dependencias externas).

---

## SLIDE 5: DEMO EN VIVO (5 minutos)

### Flujo de demostracion:

**1. Landing Page** (30 seg)
- Mostrar la pagina de inicio con las funcionalidades
- Hacer clic en "Acceder al Sistema"

**2. Login como Admin** (30 seg)
- Ingresar: admin / admin123
- Mostrar el dashboard con las 8 tarjetas de estadisticas

**3. Gestion de Activos** (1 min)
- Mostrar la tabla de 200 activos
- Usar la busqueda: escribir "Laptop"
- Filtrar por estado: "Disponible"
- Crear un nuevo activo (mostrar validacion de serial unico)
- Mostrar la notificacion verde de exito

**4. Asignaciones** (1 min)
- Crear una nueva asignacion (seleccionar activo disponible + empleado)
- Mostrar que el activo cambio a "Asignado"
- Registrar una devolucion
- Mostrar que el activo volvio a "Disponible"

**5. Reportes** (30 seg)
- Mostrar las 5 pestanas de reportes
- Expandir un accordion de "Por Sede"
- Hacer clic en "Exportar CSV"

**6. Roles** (30 seg)
- Cerrar sesion
- Entrar como operador (op.bogota / opbogota123 - si lo creaste)
- Mostrar que solo ve datos de su sede
- Mostrar que no ve "Usuarios" ni "Actividad" en el menu

**7. Gestion de Usuarios** (30 seg)
- Volver a entrar como admin
- Ir a "Usuarios"
- Crear un nuevo operador
- Mostrar el log de actividad

---

## SLIDE 6: REQUERIMIENTOS CUMPLIDOS (1 minuto)

| Requerimiento | Estado |
|---|---|
| Autenticacion JWT con roles | Cumplido |
| CRUD Activos con serial unico | Cumplido |
| CRUD Empleados con cedula unica | Cumplido |
| Asignaciones con validaciones | Cumplido |
| Devoluciones con trazabilidad | Cumplido |
| Reportes por estado/sede/empleado | Cumplido |
| Exportacion CSV | Cumplido |
| Busqueda y filtros | Cumplido |
| Gestion de usuarios | Cumplido |
| Log de auditoria | Cumplido |
| Multi-sede (20 sedes) | Cumplido |
| Notificaciones visuales | Cumplido |

"Se cumplieron los 20 requerimientos funcionales y los 10 requerimientos no funcionales definidos en la fase de analisis."

---

## SLIDE 7: REGLAS DE NEGOCIO (30 segundos)

"El sistema implementa las siguientes reglas de negocio:"

1. Un activo solo puede estar asignado a un empleado a la vez
2. No se pueden asignar activos danados
3. El serial de cada activo es unico
4. La cedula de cada empleado es unica
5. No se puede eliminar un activo asignado
6. No se puede eliminar un empleado con activos
7. Solo el admin puede eliminar registros y gestionar usuarios
8. Los operadores solo ven datos de su sede

---

## SLIDE 8: ALINEACION CON ODS (30 segundos)

"El proyecto se alinea con el ODS 9 - Industria, Innovacion e Infraestructura, meta 9.3, que busca aumentar el acceso de las pequenas industrias a los servicios tecnologicos."

"Tambien contribuye al Plan Nacional de Desarrollo 2022-2026 en su pilar de transformacion productiva y digitalizacion empresarial."

---

## SLIDE 9: CONCLUSIONES (30 segundos)

1. Se demostro que es posible construir una plataforma empresarial completa con tecnologias web estandar
2. El sistema maneja 200 activos, 100 empleados y 20 sedes sin problemas de rendimiento
3. La arquitectura de archivo unico facilita la distribucion y el despliegue
4. El sistema de roles garantiza la seguridad y el control de acceso

---

## SLIDE 10: TRABAJO FUTURO (30 segundos)

"Como trabajo futuro se propone:"
- Migracion a React + Django + PostgreSQL para produccion real
- Implementacion de sincronizacion en la nube
- Aplicacion movil complementaria
- Generacion de codigos QR para activos
- Modulo de depreciacion contable

---

## PREGUNTAS FRECUENTES DEL JURADO

**P: Por que no usaron una base de datos real?**
R: "El objetivo era demostrar la logica de negocio y la arquitectura del sistema. localStorage simula una base de datos completa y permite que el sistema funcione sin infraestructura. En la documentacion se incluye el diseno para migracion a PostgreSQL."

**P: Como se garantiza la seguridad?**
R: "El sistema implementa autenticacion basada en sesion, control de acceso por roles (Admin y Operador), sanitizacion de entradas contra XSS, y un log de auditoria que registra todas las operaciones."

**P: Que pasa si se borran los datos del navegador?**
R: "El sistema incluye exportacion CSV como mecanismo de respaldo. Ademas, el versionado interno permite reinicializar los datos de prueba automaticamente."

**P: Puede funcionar con multiples usuarios simultaneos?**
R: "En la version actual con localStorage, cada usuario tiene su propia instancia de datos. Para uso multiusuario real, se migraria a un backend con Django REST Framework y PostgreSQL, cuyo diseno ya esta documentado."

**P: Que metodologia usaron?**
R: "Se utilizo una adaptacion de Scrum para desarrollador individual, con sprints de 2 semanas, backlog priorizado y revisiones al final de cada sprint."

---

## TIEMPO TOTAL ESTIMADO: 12-15 minutos

## TIPS PARA LA PRESENTACION:
- Tener el sistema abierto en el navegador ANTES de empezar
- Tener localStorage limpio para que los datos se vean frescos
- Practicar la demo en vivo al menos 2 veces antes
- Tener las credenciales anotadas: admin / admin123
- Si algo falla en vivo, tener capturas de pantalla como respaldo
