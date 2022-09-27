import 'reveal.js/dist/reveal.css'
// see available themes in the
// node_modules/reveal.js/dist/theme
//  beige, black, blood, league, moon, night, serif, simple, ...
import 'reveal.js/dist/theme/blood.css'
import 'reveal.js/plugin/highlight/monokai.css'

import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes/notes'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'

const deck = new Reveal()
deck.initialize({
    hash: true,
    slideNumber: false,
    plugins: [
        RevealNotes,
        RevealHighlight
    ]
})