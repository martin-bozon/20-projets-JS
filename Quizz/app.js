const form = document.querySelector('.form-quizz');
let tableauResults = [];
const reponses = ['c', 'a', 'b', 'a', 'c'];
const emojis = ['✔️','✨','👀','😭','👎'];
const titreResultat = document.querySelector('.resultats h2'); //Récupère le titre du block résultat
const noteResultat = document.querySelector('.note'); // Récupère le bloc pour afficher la note 
const aideResultat = document.querySelector('.aide'); // Récupère le bloc pour afficher l'aide
const toutesLesQuestions = document.querySelectorAll('.question-block'); // Récupère tous les blocs question
let verifTableau = [];

// Récupère les réponses du quizz quand on valide les réponses
form.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        for(let i = 1; i<6; i++)
            {
                tableauResults.push(document.querySelector('input[name="q'+i+'"]:checked').value);                
            }      
        verifFunction(tableauResults);      
        tableauResults = [];
    })

function verifFunction(tabResult)
    {
        for(let a =0 ; a < 5; a++)
            {
                if(tabResult[a] === reponses[a])
                    {
                        verifTableau.push(true);
                    }
                else
                    {
                        verifTableau.push(false);
                    }
            }        
        afficherResultats(verifTableau);
        couleursFonction(verifTableau);
        verifTableau = [];
    }   

function afficherResultats(tabCheck)
    {
        const nbDeFautes = tabCheck.filter(el => el !== true).length;
        // console.log(nbDeFautes);
        switch(nbDeFautes)
            {
                case 0: 
                    titreResultat.innerText = emojis[0] + "Bravo c'est un sans faute !" + emojis[0];
                    noteResultat.innerText = '5/5';
                break;                
                case 1:
                    titreResultat.innerText = `✨ Vous y êtes presque ! ✨`
                    aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
                    noteResultat.innerText = '4/5'
                break;
                case 2:
                    titreResultat.innerText = `✨ Encore un effort ... 👀`
                    aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
                    noteResultat.innerText = '3/5'
                break;
                case 3:
                    titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`
                    aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
                    noteResultat.innerText = '2/5'
                break;
                case 4:
                    titreResultat.innerText = `😭 Peux mieux faire ! 😭`
                    aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
                    noteResultat.innerText = '1/5'
                break;
                case 5:
                    titreResultat.innerText = `👎 Peux mieux faire ! 👎`
                    aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
                    noteResultat.innerText = '0/5'
                break;

                default:
                    'Wops, cas innatendu.';
            }
    }
/** 
 * Défini les couleurs des blocs question suivant la réponse
 * @param {boolean} tabValsBool
*/
function couleursFonction(tabValsBool)
    {
        for(let j = 0; j < tabValsBool.length; j++)
            {
                if(tabValsBool[j] === true)
                    {
                        toutesLesQuestions[j].style.background = 'lightgreen';
                    }
                else
                    {
                        toutesLesQuestions[j].style.background = '#ffb8b8';
                        toutesLesQuestions[j].classList.add('echec');
                        setTimeout(() => 
                            {
                                toutesLesQuestions[j].classList.remove('echec');
                            }, 500);
                    }
            }
    }

toutesLesQuestions.forEach(item => 
    {
        item.addEventListener('click', () => 
            {
                item.style.background = 'white';
            });
    });