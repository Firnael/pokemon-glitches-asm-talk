# Retourner le cerveau de sa Gameboy et attraper Mew sans tricher

Ce talk s'adresse à toutes les personnes curieuses de connaître les techniques de l'ombre permettant à n'importe qui d'assez déterminé de retourner le cerveau de sa Gameboy, et de son jeu Pokémon Bleu (ou Rouge, ou Jaune en fait) pour lui faire faire à peu près n'importe quoi.

## Description des scripts NPM

L'application est bundlée avec **Vite**

- `dev` : sert l'app avec en mode dev (HMR enabled)
- `build` : créer un livrable optimisé pour de la prod dans `dist`
- `preview` : lance un build, puis sert le résultat

## Production des slides

### Détourer les images

```bash
pip install rembg
curl -s http://input.png | rembg i > output.png
```

### Utiliser FFMPEG

```bash
# installer l'outil :
apt install ffmpeg # linux
brew install ffmpeg # macos

# convertir .MOV en .MP4 :  
ffmpeg -i input.mov -vcodec h264 -acodec mp2 output.mp4

# convertir .MP4 en .GIF :
ffmpeg -i input.mov -vf "fps=24,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif
```

## Améliorations

### Plugins Reveal à considérer

- Chalkboard (on peut écrire sur les slides) : https://github.com/rajgoel/reveal.js-plugins/tree/master/chalkboard
- Appearance (meilleurs animation) : https://martinomagnifico.github.io/reveal.js-appearance/

Voir [cette liste](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware) si on en veut encore plus.

## Sources des assets

- https://www.artstation.com/artwork/4JAvL
- https://screenrant.com/pokemon-mew-arcade-game-inspiration-xevious-sprite-secret/