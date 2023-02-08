/**
 * Created by sstienface on 16/10/2018.
 */
var compte = {
    "temps" : 0,
    "tempsRestant" : 0,

    saisirTemps : function() {  }, //l'utilisateur peut spécifier un temps personnalisé
    goStop : function() {  }, //stopperReprendre le décompte
    reinitialiser : function() {  }, //on repart avec le temps défini (temps restant = temps)
    annuler : function() {  },          //tous les champs sont remis à zéro
};

const divClassBibliotheque = document.getElementById("div-class-bibliotheque");

var tabDesInstances = [];
var tabDesEvenements = []; //cosnt des élémnéts sur lesquels il y a des événements
const ITEMPS = 0, BTGOSTOP  = 1, ITEMPSRESTANT =2, BTREINIT = 3, BTANNULER = 4;

var tabDesStops = [];

instancierCompte();
function instancierCompte(){
    //Instancier un compte
    var monCompte = Object.create(compte);
    tabDesInstances.push(monCompte); 

    //créer l'IHM
    //divClassBibliotheque.innerHTML+='<div class="col-12" id="compte'+(tabDesInstances.length - 1)+'">Ma div</div>';
    //ok alert(tabDesInstances[0].tempsRestant);

    //divClassBibliotheque.innerHTML+='

    //Créer les événements :
    
    //bt-go
    var monElement = [null,null,null,null, null];
    monElement[BTGOSTOP] = document.getElementById("bt-go_"+(tabDesInstances.length-1));
    monElement[ITEMPS] = document.getElementById("i-temps_"+(tabDesInstances.length-1));
    monElement[ITEMPSRESTANT] = document.getElementById("i-temps-restant_"+(tabDesInstances.length-1));
    
    tabDesEvenements.push(monElement); //à faire seulement quand les 5 const ont été récupérées
    tabDesStops[tabDesInstances.length-1]=false;
    
    tabDesEvenements[tabDesInstances.length-1][BTGOSTOP].addEventListener("click", function(){ 
        maCountDown(parseInt((this.getAttribute("id")).substring(((this.getAttribute("id")).indexOf("_"))+1)));
    }, false);
}
// Make it count down on a timer, calling this function

var numObjet = 0;
var stop = true; //précédent click = arret        //pour cet objet ?? 
var temps = parseInt(tabDesEvenements[numObjet][ITEMPS].value);



function maCountDown(numObjet){
    
    var compteur = parseInt(tabDesEvenements[numObjet][ITEMPS].value);
    
    var countDown = function() {
        if(stop==false){ //reprendre
            compteur-=1;
            tabDesEvenements[numObjet][ITEMPSRESTANT].value=compteur;
            setTimeout(countDown, 1000);
            if(compteur <=0) {
                clearTimeout(); // ?? si pls setTimeout ?? (pls instances d'objets)
                compteur = 0;
            }
        }
        else{  //stop == true //suspendre
            stop = false ;
        }
    };

    if (stop){ // précédent click = arret => reprendre
        stop = false ; //pour info prochain click
        countDown(); //reprendre
    }
    else stop = true;
};




/*

var voiture = {
    "Nom" : "Eggo",
    "imgUrl" : "https://fr.ubergizmo.com/wp-content/uploads/2011/10/eggo_01.jpg",
    "imgUrl2" : "https://www.radiofrance.fr/s3/cruiser-production/2020/07/aea86ae2-f8a6-4ffd-a4cd-58dd892cf533/1200x680_gettyimages-88006560.jpg",
    "nombresRoues" : 4,
    "Couleur" : "Marron",
    "Contructeur" : "Citroen",
    "Carburant" : "Solaire",
    "nombrePortes" : 3,
    "Autonomie" : "450km",
    "vitesseMaxi" : "120km/h"
};

const divDescription = document.getElementById("div-description");
const divImage = document.getElementById("div-image");
const imgVoiture = document.getElementById("img-voiture");

divDescription.innerHTML+="<p> Nom de la voiture : "+voiture.Nom+"</p>";
divDescription.innerHTML+="<p Nombre de roues"+voiture.nombresRoues+"</p>";
divDescription.innerHTML+="<p>Couleur : "+voiture.Couleur+"</p>";
divDescription.innerHTML+="<p>Contructeur : "+voiture.Contructeur+"</p>";
divDescription.innerHTML+="<p>Carburant : "+voiture.Carburant+"</p>";
divDescription.innerHTML+="<p>Nombre de portes : "+voiture.nombrePortes+"</p>";
divDescription.innerHTML+="<p>Autonomie : "+voiture.Autonomie+"</p>";
divDescription.innerHTML+="<p>Vitesse maximale : "+voiture.vitesseMaxi+"</p>";



imgVoiture.setAttribute("alt", "voiture "+voiture.Nom);
imgVoiture.setAttribute("src", voiture.imgUrl2);
imgVoiture.setAttribute("src", voiture.imgUrl2);
imgVoiture.classList.add("w-100");

const aPhotos = document.createElement("a");
aPhotos.setAttribute("href", voiture.imgUrl2);
aPhotos.innerHTML = "Lien vers la photo";
divImage.appendChild(aPhotos);

*/
