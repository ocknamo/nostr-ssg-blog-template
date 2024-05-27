# nostr SSG blog template

Blog template as Static site on Nostr.

sample
https://nostr-ssg-blog-template.pages.dev/

## How it works

It uses the SSG feature of the Svelte kit.
When the build is executed, information about the events retrieved by a specific filter is fetched from the relay and generated as a static page under `/blog`.

All data fetching is done at build time. Therefore, the screen display is very fast. On the other hand, after Nostr events are updated, it is necessary to run the build again to reflect them on the blog screen.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Future work(TODO)

- Preview for Nostr Events in article 
- Config
- Thumbnail image
- OGP of articles
- Update documents
