# Mercado Libre Challenge

## INTRO

Este test fue desarrollado en 2 dias y medio. La principal dificultad fue configurar Express + webpack + React, estoy mas enfocado al desarrollo 100% frontend y en mi labor diaria no tengo mucha necesidad de Express.

Esta app fue desarrollada en Chrome y mac OSX.

## REQUISITOS

Para poder ejecutar la app se requiere:

1. Git.
2. Yarn, opcionalmente se puede reemplazar por npm cambiando los scripts en package.json. [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

## STACK

* El proyecto fue creado usando el siguiente template para create-react-app: [cra-template-node-express](https://www.npmjs.com/package/cra-template-node-express). Este provee boilerplate para una app Express + React.
* Redux esta implementado usando react-redux + @reduxjs/toolkit [Redux Toolkit](https://redux-toolkit.js.org/) es una solucion recomendada por React-Redux para simplificar todo el boilerpalte necesario para crear Actions y Reducers.
* Uso Axios para todos los REST requests.
* Para los unit tests de ejemplo use Jest + Enzyme, http-errors para crear Http errors de prueba, redux-mock-store para tests a Redux y react-test-renderer para creacion de test snapshots.
* El IDE usa Eslint para forzar las mejores pracicas de desarrollo.
* Proptypes para los componentes React que tienen props definidos. La mayoria no usa props, por lo general usan Hooks para obtener funcioanlidad como useHistory, useDispatch, etc.
* Los estilos se definen usando index.css solo para el minimo indispensable para iniciar la app, los demas son creados usando Styled Components.
* El Head en el html se administra usando react-helmet.
* Los routes en frontend estan definidos usando react-router-dom.
* Los mensajes de error se muestran usando Toasts que se destruyen despues de 5 segundos, use react-toastify.
* Para poder seguir las instrucciones sobre la grilla definida en los specs use css-grid [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/).

## INSTALACION Y EJECUCION

1. Instalar ejecutando: yarn
2. Iniciar la app como developer: yarn start
3. Opcionalmente, iniciar la version para produccion. Esta version esta optimizada, el javascript esta minimizado:
NODE_ENV=production yarn start

## ESTRUCTURA DE CODIGO

* dist: Directorio donde se hace build a la app React. Express sirve los files estaticos desde este folder.
* public: Files estaticos a servir, principalmente robots.txt y favicon.ico.
* src: El codigo.
* src/setupTests.js: Configuracion para Jest.
* src/client: React app.
* src/server: Node Express app.

## SEO, PERFORMANCE

Use la extension de browser Lighthouse en una ventana de incognito, con los siguientes resultados para una pagina de detalle:

* Performance: 77 / 100
* Accessibility: 86 / 100
* Best Practices: 79 / 100
* SEO: 97 / 100

## CAVEATS

* Estilos: todos los margins definidos en los specs fueron aplicados, pero el espacio entre textos no es pixel perfect pues el line-height impacta en el espacio final entre textos.
* Las instrucciones indican que para el detalle de un item se debe crear su propio breadcrumb, sin embargo la data recibida desde el API solo contiene category_id, por lo que requeriria un API request adicional a un endpoint no documentado en el challenge.
* Las instrucciones no incluyen una version responsive. Para la version mobile se podria cargar las versiones mas pequeñas de las imagenes como el logo y la lupa.
* No tuve tiempo suficiente para implementar la logica de cache en Redux. Por ejemplo se puede almacenar cada detalle de un item en un array agregando un TTL de expiracion. Si el usuario vuelve a cargar la mismpa pagina de detalle esto evitaria hacer un request adicional al API.
