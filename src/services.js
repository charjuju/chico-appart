export function getDossiers(data) {
    // Utilisez la méthode filter pour filtrer les éléments de type "dossier"
    const dossiers = data.filter(item => item.type === "dossier");

    return dossiers;
}

function filtrerImages(tableau) {
    // Liste des extensions d'image courantes
    const extensionsImages = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  
    // Utilisez la méthode filter pour filtrer les objets avec des noms d'image valides
    const images = tableau.filter(item => {
      // Obtenez l'extension du fichier en convertissant le nom en minuscules et en utilisant une expression régulière
      const extension = item.nom.toLowerCase().match(/\.\w+$/);
  
      // Vérifiez si l'extension est dans la liste des extensions d'image
      return extension && extensionsImages.includes(extension[0]);
    });

    return images;
  }

export function getImageOfAppartement(justAppartementFile, appartementIndex, imgNbr) {
    const imageTap = filtrerImages(justAppartementFile[appartementIndex].contenu)

    const i = imgNbr % imageTap.length
    return('appartement/' + justAppartementFile[appartementIndex].nom + '/' + imageTap[i].nom)
}