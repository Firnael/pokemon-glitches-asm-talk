import 'reveal.js/dist/reveal.css'
// see available themes in the
// node_modules/reveal.js/dist/theme
//  beige, black, blood, league, moon, night, serif, simple, ...
import 'reveal.js/dist/theme/blood.css'
import 'reveal.js/plugin/highlight/monokai.css'
import './style.css'

import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes/notes'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'
import RevealMath from 'reveal.js/plugin/math/math'

const deck = new Reveal()
deck.initialize({
    hash: true,
    slideNumber: false,
    plugins: [
        RevealNotes,
        RevealHighlight,
        RevealMath.KaTeX
    ]
})

// automatically load the initial fragment on a slide if the fragment
// has been defined with the 'preload' class
deck.addEventListener('slidechanged', function (event) {
    if (event.currentSlide.querySelectorAll('.preload[data-fragment-index="0"]').length > 0) {
        deck.nextFragment();
    }
});

// if the initial fragment on a slide has been defined with a 'preload' class
// then transition to the previous slide if the fragment is hidden
deck.addEventListener('fragmenthidden', function (event) {
    if (event.fragment.hasAttribute('data-fragment-index') && event.fragment.classList.contains('preload')) {
        if (event.fragment.attributes['data-fragment-index'].value == '0') {
            deck.prev();
        }
    }
});