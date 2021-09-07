# Device Monitoring

Visualisation d'une liste d'objets connectés et de leur propriétés


Ce projet repose sur l'utilisation de 
 - [Vue 3](https://v3.vuejs.org/guide/installation.html)
 - [Vue router](https://next.router.vuejs.org/)

Les outils de développement utilisés sont 
 - [Vite](http://vitejs.dev/)
 - Typescript
 - Sass
 
 
 Informations fournies par vite

# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


## Lancer le projet

Avec docker

    docker-compose up
En local

    npm install
    npm run dev
Ensuite l'application est accessible sur `http://localhost:3000` par défaut si le port n'est pas déjà occupé
## Documentation

Via vue-router on expose deux points d'entrée
### Home
Path : /
Composant : `Home.vue`
Le composant utilise l'api [suspense](https://v3.vuejs.org/guide/migration/suspense.html) de vue pour afficher la liste des devices une la donnée récupérée, qui est encore à un stade expérimental

La liste des objets (`DevicesList.vue`) utilise la composition api de vue pour récupérer la donnée via `useDevices`. Un scroll infini est implémenté en utilisant un `IntersectionObserver`dont la logique est encapsulée dans un composant `Intersect.vue`

> TODO : La logique de la pagination pourrait être extraite du composant pour la réutiliser sur une éventuelle autre liste


### Modale

Affiche les propriétés détaillées d'un device
Path : `/device/:serialNumber`
Composant : `Device.vue` 

La transition d'affichage est gérée par un composant `Modal.vue`, qui s'affiche quand on entre sur la route dédiée.

Les propriétés affichées sont passées en tant que props quand on navigue depuis la liste, certaines d'entre elles ont besoin d'être castées dans leur type d'origine car le router les interprètent comme des `string`
Si on arrive directement sur une url de modale un guard agit sur la route pour faire une requête et récupérer les données.

> TODO : La récupération du vid via le serial_number n'est pas très robuste
> Peut-être trouver une solution pour ne pas à avoir à caster les paramètres de la route avant de les injecter dans le composant



### Syntaxe des composants
Tous les composants utilisent l'api [script setup](https://v3.vuejs.org/api/sfc-script-setup.html#basic-syntax) de vue 3 qui permet notamment d'utiliser la fonction `defineProps`qui s'accorde avec typescript pour déclarer les props éventuelles, elle reste néanmoins très récente et présente encore des limitations telles que l'impossibilité d'importer des types/interfaces depuis un autre fichier ou la nécessité d'utiliser `suspense` pour les composants asynchrones)
