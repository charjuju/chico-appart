#!/bin/bash

# Vérifier le nombre d'arguments
if [ $# -ne 1 ]; then
    echo "Usage: $0 chemin_du_dossier"
    exit 1
fi

dossier=$1
output_json="contenu_du_dossier.json"

# Vérifier si le chemin du dossier est valide
if [ ! -d "$dossier" ]; then
    echo "Le chemin spécifié n'est pas un dossier valide."
    exit 1
fi

# Fonction pour récursivement lister les fichiers et dossiers
liste_contenu() {
    local dossier_actuel="$1"
    local indentation="$2"
    local contenu=()
    
    for element in "$dossier_actuel"/*; do
        local nom=$(basename "$element")
        local ligne="{"
        ligne+="\"nom\": \"$nom\","
        
        if [ -d "$element" ]; then
            ligne+="\"type\": \"dossier\","
            ligne+="\"contenu\": ["
            ligne+=$(liste_contenu "$element" "$indentation    ")
            ligne+="]"
        else
            ligne+="\"type\": \"fichier\""
        fi

        ligne+="}"
        contenu+=("$ligne")
    done

    # Concaténer les éléments de contenu avec des virgules
    local resultat=""
    local delim=""
    for ligne in "${contenu[@]}"; do
        resultat+="$delim$ligne"
        delim=","
    done

    echo "$resultat"
}

# Initialiser le fichier JSON
echo "{" > "./public/$output_json"
echo '"nom": "appartement",' >> "./public/$output_json"
echo '"type": "dossier",' >> "./public/$output_json"
echo '  "contenu": [' >> "./public/$output_json"

# Appeler la fonction pour lister le contenu récursivement
contenu_du_dossier=$(liste_contenu "$dossier" "    ")
echo "$contenu_du_dossier" >> "./public/$output_json"

# Fermer le fichier JSON
echo "  ]" >> "./public/$output_json"
echo "}" >> "./public/$output_json"

echo "Le fichier JSON a été généré avec succès : ./public/$output_json"
