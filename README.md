# Renfo — genou & dos

Appli de renforcement musculaire (PWA) adaptée à une fissure complexe du ménisque interne droit, non opérée, avec suivi kiné.
Matériel : élastique, tapis de marche, rameur. Suivi du poids intégré. Thème gothique, icône château (`castle.svg`).

- Appli : `index.html`, publiée par GitHub Pages depuis ce dépôt.
- Données : dépôt **privé** `Leveilleur-bit/Renfo-donees`.

## Fichiers du dépôt privé `Renfo-donees`

### `seances.json` (écrit par l'appli)
```json
{
  "seances": [{
    "id": "…", "date": "ISO", "prog": "genou|dos|complet|cardio", "programme": "Genou",
    "phase": 1, "duree_s": 1520, "douleur": 2, "interrompue": false, "note": "…",
    "exercices": [{"id": "slr", "nom": "Élévation jambe tendue", "series_prevues": 2,
                   "series_faites": 2, "valeur": 10, "unite": "reps", "par_cote": true, "douleur": true}]
  }],
  "suivi": [{"id": "j2026-11-14", "jour": "2026-11-14", "douleur": 2,
             "gonflement": "aucun|léger|net", "symptomes": ["blocage", "dérobement", "raideur matin"]}],
  "taille_cm": 178, "annee_naissance": 1980, "questions_kine": "…",
  "ajustements": {"pont": {"d": 2, "s": 0, "vu": "ISO"}},
  "cuisses": [{"id": "c2026-11-14", "jour": "2026-11-14", "droite_cm": 52, "gauche_cm": 54.5}],
  "tests": [{"id": "t2026-11-14", "jour": "2026-11-14", "assis30": 11, "chaise_s": 45, "equi_d_s": 18, "equi_g_s": 40, "douleur": 1}],
  "poids": [{"id": "p2026-11-14", "jour": "2026-11-14", "kg": 83.2, "supprime": false}]
}
```

Chaque exercice d'une séance peut avoir `ressenti` (`facile|correct|dur`). `suivi[]` contient aussi `dos` (0–10) et `dos_zone`. Les champs scalaires ont un `<champ>_maj` (horodatage) pour la fusion.

Séances saisies à la main (kiné du vendredi, marche…) : `manuel: true`, `prog` = `kine|libre|marche|rameur|autre`, champs `contenu`, `consignes` (kiné), `note`. Toute entrée peut porter `supprime: true`.

### `programme.json` (facultatif, écrit par Claude ou selon les consignes du kiné)
Lu par l'appli à chaque synchro, il ajuste le programme sans toucher au code.
```json
{
  "message": "Pont fessier passé à 3×15 suite à la séance kiné du 20/11.",
  "exercices": { "pont": { "m": "Nouvelle consigne…" } },
  "programmes": {
    "genou": { "items": [["tapis",[1,1],[300,300],0], ["pont",[3,3],[15,15],45]] },
    "cardio": null
  }
}
```
Format d'un item : `[id_exercice, [séries phase1, phase2], [reps ou secondes phase1, phase2], repos_s]`.
Un exercice nouveau peut être défini dans `exercices` avec `n` (nom), `z` (`knee|back|cardio`), `eq`, `t` (`reps|time`), `d`, `c` (consignes), `m` (note ménisque), `w` (alerte), `side` (par côté).

## Token
Token GitHub *fine-grained* : dépôt `Renfo-donees` uniquement, permission **Contents : Read and write**. À coller dans Réglages. Il reste stocké sur le téléphone.
