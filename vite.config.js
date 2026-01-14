import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/041225_react_op4_gutendex_2/",
});

/*
1.
$ git init
$ git add .
$ git commit -m "initial-commit"
$ git branch -M main
$ git remote add origin http://github.com/{username}/{repo-name}.git
$ git push -u origin main

2.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/book-landing-page/"
})

3.
pnpm install gh-pages --save-dev

4.

name: "react-template" => "{project name}"

"homepage": "https://anders0825.github.io/{repo-name}/"

"scripts": {
    "predeploy" : "pnpm run build",
    "deploy" : "gh-pages -d dist",
    ...
}
  => {
      "name": "book-product",
      "private": true,
      "version": "0.0.0",
      "homepage": "https://aishwaryaparab.github.io/book-landing-page/",
      "type": "module",
      "scripts": {
        "predeploy" : "pnpm run build",
        "deploy" : "gh-pages -d dist",
        "dev": "vite",
        "build": "vite build",
        ...
    }

5. 
pnpm run deploy
  */
