# Attraper Mew sans tricher dans Pokémon Rouge & Bleu

Let's go !

## Faire la prez avec Reveal & Vite

https://glebbahmutov.com/blog/reveal-vite/

Plugins à considérer : 

- Chalkboard (on peut écrire sur les slides) : https://github.com/rajgoel/reveal.js-plugins/tree/master/chalkboard
- Appearance (meilleurs animation) : https://martinomagnifico.github.io/reveal.js-appearance/

Voir [cette liste](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware) si on en veut encore plus.

## Utiliser FFMPEG

```bash
# installer l'outil :
apt install ffmpeg # linux
brew install ffmpeg # macos

# convertir .MOV en .MP4 :  
ffmpeg -i input.mov -vcodec h264 -acodec mp2 output.mp4

# convertir .MP4 en .GIF :
ffmpeg -i input.mov -vf "fps=24,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif
```