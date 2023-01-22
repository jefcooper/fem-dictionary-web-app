# Frontend Mentor - Challenge

[![Deploy Site to GitHub Pages](https://github.com/jefcooper/fem-template/actions/workflows/static.yml/badge.svg)](https://github.com/jefcooper/fem-template/actions/workflows/static.yml)

Live on Github Pages: https://jefcooper.github.io/fem-template

This is a solution to the [Template](https://www.frontendmentor.io/challenges/X). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- deploy this

### Screenshot

### Links

- Solution URL: [Github Repository](https://github.com/jefcooper/fem-template)
- Live Site URL: [Github Pages](https://jefcooper.github.io/fem-template)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Github Actions
- Github Pages
- npm / vite

### What I learned

### Github Actions Workflow

I'm outlining the build process here.  It's easier than it looks, the documentation is a little sparse in places and overwhelming in others.

1. Move to one repo per project.  In this case, I split out a subdirectory of my main repo into its own repository on github.
2. Build tooling.  Whatever toolchain, the build process on node is the same: npm install (or npm ci), npm run build.
3. For the actual toolchain, I setup a package.json and installed vite and sass as development dependencies.
4. Moved my code and assets directory into a ./src subdirectory to better separate it from build and tooling concerns in the root.
5. Added a vite.config.js file in the project root with options to build to a /dist directory.
6. Edited the package.json to add scripts for "start", "build", and "preview" using vite.
7. Verify that I can 'npm start' without path problems in the code.  Check things like absolute and relative paths in url() etc.
8. Verify that 'npm build' puts stuff into a /dist directory as expected.
9. Commit and Switch over to Github console.
10. Go to Github Repository Settings (gear on right/top), then Pages (left hand sidebar)
11. Default is 'Deploy from branch', switch this to Github Actions
12. Choose the static website template
13. Modify the static.yml, 'Upload Artifact' to have with: path: pointing to your dist directory
14. Modify the static.yml, add nodejs, npm build steps:
15. Commit and verify everything builds
16. Go to Pages and verify link to live site is working.

```
jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node 16.x
        uses: actions/setup-node@v3
        with:
          node-version: 16.x
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Rebuild the dist directory
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v2
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
        	# this is relative to repository root
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

### Bugs and Finishing Steps

### Useful resources

#### Tooling

- https://www.joshwcomeau.com/css/custom-css-reset/
- https://svg-sprite-generator.vercel.app/
- https://medium.com/swlh/better-ways-to-organise-css-properties-9a066e7ded62

#### Unsplash

#### My Codepens

## Author

- Website - [Jeff Cooper](https://jefcooper.github.io)
- Frontend Mentor - [@jefcooper](https://www.frontendmentor.io/profile/jefcooper)

## Acknowledgments
