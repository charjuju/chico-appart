export function getDossiers(data) {
    // Utilisez la méthode filter pour filtrer les éléments de type "dossier"
    const dossiers = data.filter(item => item.type === "dossier");

    return dossiers;
}

export function getImageOfAppartement(justAppartementFile, appartementIndex, imgNbr) {
    const i = imgNbr % justAppartementFile[appartementIndex].contenu.length
    return('appartement/' + justAppartementFile[appartementIndex].nom + '/' + justAppartementFile[appartementIndex].contenu[i].nom)
}