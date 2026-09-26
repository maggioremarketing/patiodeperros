# Patio de Perros

Guardería de día para perros en una casa con patio, en Las Condes. El perro
llega en la mañana, pasa el día afuera con otros perros y lo retiran en la
tarde. Reserva por WhatsApp, pago por transferencia.

Marca hermana: **Plantas con Palabra** (`maggioremarketing/plantas-con-palabra`).
Comparten casa, familia, razón social y método. No comparten identidad, y eso
es una decisión, no un descuido: ver `src/lib/criterios.ts`, criterio
«La razón social y las dos marcas».

> El repositorio se llama `vidadeperros` porque así se llamaba el proyecto
> antes de que el nombre se cerrara. La marca es Patio de Perros. Renombrar el
> repositorio es una tarea pendiente y no urgente.

## Qué hay construido

Una app Next.js en `app/` con dos rutas:

- `/` la portada
- `/marca` el manual de marca

El manual sigue la estructura de apetitoff.com/marca y la misma que Plantas
con Palabra: tres partes (Estrategia, Identidad visual, Voz), 26 criterios,
menú lateral y registro de decisiones. 23 criterios tienen bloque escrito; los
otros 3 declaran qué les falta.

La tesis es la misma: **el manual se genera de los mismos tokens y las mismas
piezas que la portada**, así que no se puede desincronizar del producto. La
paleta se lee de `colors.css`, el contraste lo calcula la misma función que
corre en la prueba, los precios salen del catálogo. Si vas a cambiar un color,
un tamaño o un texto de marca, cámbialo en el sistema, no en la pantalla.

## El método, que no se negocia

Cada regla se escribe, el sistema la obedece, una prueba la mide, y la prueba
se verifica rompiendo el código a propósito. El cuarto paso es el que se
saltea y el único que distingue una suite que mide de una que tranquiliza.

    npm run verificar       comprobaciones de sistema (leen código y tokens)
    npm run accesibilidad   comprobaciones de pantalla (construye, sirve out/, mide)
    npm run romper          rompe el código a propósito y exige que cada prueba lo note
    npm run avance          qué criterio está escrito y cuál no (informa, no falla)

Las dos primeras tienen que estar verdes antes de cada commit. Son 11
comprobaciones y se descubren leyendo `app/pruebas/`, así que agregar un
archivo ahí alcanza para que corra. `gobernanza.ts` es la prueba que vigila a
las pruebas: falla si un archivo quedó fuera del descubrimiento o si una
comprobación no tiene forma de fallar.

`npm run romper` es la verificación del cuarto paso y hoy cubre las 11.

## Reglas de copy que las pruebas hacen cumplir

- Español de Chile, tuteo. Nunca voseo: «eliges», no «elegís».
- Nunca guiones largos, en ningún texto. Hay una prueba que falla si aparece uno.
- Nunca emojis, en ninguna parte. Hay una prueba que falla si aparece uno.
- Tipo oración en todas partes. Caja alta solo en sobretítulos.
- Ningún precio escrito a mano: todos salen de `app/src/lib/catalogo.ts`.
- Ninguna pantalla nombra un token primitivo: todo pasa por la capa semántica.
- Hay palabras que la marca todavía no escribe. Viven en `PALABRAS_PROHIBIDAS`
  de `app/src/lib/marca.ts`, con su razón al lado, y una prueba las busca en
  todas las pantallas. Ese archivo es el único lugar donde pueden aparecer.

## Decisiones cerradas

Están en `app/src/lib/decisiones.ts`, cada una con su razón y con lo que cuesta
sostenerla. Se publican en el manual. Las que más cuestan hoy:

1. No se nombra el servicio nocturno hasta que exista y esté autorizado.
2. No se publica la dirección exacta mientras el permiso municipal no esté resuelto.
3. No se usan fotos de banco: mientras falte la foto, el sitio dice que falta.
4. La marca no dibuja un perro. El isotipo es el portón, no el animal.

No las reabras sin que te lo pidan.

## Pendientes

- **El número de WhatsApp es de ejemplo** (`56900000000`). Sale de `WHATSAPP`
  en `app/src/lib/catalogo.ts` y alimenta todos los enlaces del sitio.
- **No hay fotos.** El sitio muestra un marco que declara que falta.
- **Precios por confirmar** contra el costo real de operación.
- **Cupos por confirmar**: están calculados sobre 585 m² de terreno menos lo
  construido y la piscina, no medidos en el patio.
- **Objetivos del manual**: falta la cifra, y sin cifra no es objetivo.
- **Marca no presentada en INAPI.** Por lo descriptivo del nombre hay que
  presentarla como marca mixta, en clases 43 y 44.
- **Despliegue**: `patiodeperros.cl` está registrado en Hostinger con DNS en
  parking. Falta apuntarlo a Vercel.

## Lo que este repositorio no decide

La factibilidad municipal. El predio está en zona **U-V1** del Plan Regulador
de Las Condes, donde la actividad no está entre los usos permitidos, así que la
vía es **microempresa familiar** (Ley 19.749) a nombre de quien reside en la
casa. De eso dependen dos criterios del manual y dos de las decisiones
cerradas. No es una tarea de código, pero explica por qué el sitio calla
algunas cosas.
