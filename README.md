# Prueba técnica frontend móvil - Austro

Aplicación móvil construida con React Native, Expo y TypeScript para consumir la API pública de Random User, listar usuarios, aplicar una regla de selección ordenada y gestionar favoritos con estado local.

## Características implementadas

- Listado principal de usuarios con `FlatList`.
- Datos remotos obtenidos con TanStack React Query.
- Navegación entre pantalla principal y detalle con React Navigation.
- Favoritos en una sección horizontal superior.
- Regla de selección ordenada por apellido con casillas de selección.
- Acción para seleccionar todos los usuarios válidos y agregarlos a favoritos.
- Edición local del teléfono en la pantalla de detalle usando React Context.
- Estados de carga, error, vacío y actualización con pull to refresh.
- Interfaz visual con estilo sobrio tipo fintech.

## Decisiones técnicas

- **Expo** se usa como base para simplificar la ejecución local sin cambiar el requisito de React Native con TypeScript.
- **TanStack React Query** se encarga únicamente de los datos remotos.
- **React Context** conserva las decisiones locales del usuario: favoritos, selección y teléfonos editados.
- **Orden de selección**: solo se permite seleccionar el siguiente usuario según el orden alfabético por apellido. Para desmarcar, primero debe retirarse el último seleccionado.

## Estructura del proyecto

```text
src/
  components/     Componentes de presentación reutilizables
  constants/      Colores, espaciado y tokens visuales
  context/        Estado local de favoritos, selección y teléfonos
  hooks/          Hooks para acceso a React Query
  navigation/     Configuración de React Navigation
  providers/      Proveedores globales de la app
  screens/        Pantallas Home y Detalle
  services/       Consumo y mapeo de la API pública
  types/          Tipos de dominio y navegación
  utils/          Reglas de selección ordenada
```

## Requisitos

- Node.js 20 o superior recomendado
- npm 10 o superior recomendado
- Un emulador Android, un dispositivo físico con Expo Go o un simulador iOS en macOS

## Instalación

```bash
npm install
```

## Ejecución

Iniciar el servidor de desarrollo:

```bash
npm start
```

Opciones habituales:

```bash
npm run android
npm run ios
npm run web
```

## Cómo revisar el proyecto sin Android Studio

Si no se desea instalar Android Studio, es posible revisar la aplicación con cualquiera de estas alternativas:

1. **Expo Go en un dispositivo Android o iPhone**: ejecutar `npm start`, escanear el código QR y abrir la app.
2. **Navegador web**: ejecutar `npm run web` para una validación rápida de flujo y estado.
3. **Simulador iOS en macOS**: ejecutar `npm run ios`.

Android Studio solo es necesario si se desea usar un emulador Android local o inspeccionar el proyecto nativo con más profundidad.

## Flujo funcional cubierto

- Home con carga remota de usuarios.
- Ordenamiento por apellido.
- Favoritos destacados en la parte superior.
- Navegación al detalle desde tarjetas principales y favoritas.
- Casillas de selección múltiple con regla de negocio ordenada.
- Opción para seleccionar todos y agregarlos a favoritos.
- Edición y validación del teléfono local en detalle.

## API utilizada

- Random User API: [https://randomuser.me/api/?results=30&seed=sipy](https://randomuser.me/api/?results=30&seed=sipy)

## Repositorio

El repositorio remoto indicado para la entrega es:

- [https://github.com/XaviX598/prueba-austro-xavier-aguilar.git](https://github.com/XaviX598/prueba-austro-xavier-aguilar.git)
