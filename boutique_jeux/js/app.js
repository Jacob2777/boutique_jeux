import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export const page_active = ref("accueil")
export const params = ref(null)

// Accueil
export const texte_recherche = ref("")
export const joueurs_recherche = ref("*")
export const jeux = ref([])

// Détails
export const image_principale_details = ref("")


// ==========================

fetch("data/jeux.json").then(resp => resp.json()).then(fichier => {
    jeux.value = fichier

    // changerPage('jeu-infos', jeux.value[0])
})

export function changerPage(nom_page, params_page = null) {
    page_active.value = nom_page
    params.value = params_page
    
    image_principale_details.value = ""
}

export function filtrer(jeux) {
    // Copier jeux
    // Filtrer la copie
    const jeux_filtres = jeux.filter(jeu => {
        const titre = jeu.titre.toLowerCase()
        const recherche = texte_recherche.value.toLowerCase()
        return titre.includes(recherche)
    }).filter(jeu => {
        // 1  joueurs_recherche.value
        // 2  jeu.joueurs.min
        // 6  jeu.joueurs.max
        if (joueurs_recherche.value == "*") {
            return true
        }

        const minimum_ok = joueurs_recherche.value >= jeu.joueurs.min
        const maximum_ok = joueurs_recherche.value <= jeu.joueurs.max
        return minimum_ok && maximum_ok
    })

    // Return la copie
    return jeux_filtres
}

export function couperUrl(url) {
    return url.slice(0, 20)
}