require('../db/index.js')
const {Salarie} = require('../models/Salarie.model')

let salaries = [
    {
        contact: {
            nom: "Dupont",
            prenom: "Jean",
            telephone: {
                nom: "portable",
                numero: "+33666666666"
            },
            adresse: {
                rue: "32 boulevard du boule",
                codePostal: 75005,
                pays: "France",
            },
            email: "jean.dupont@gmail.com",
        },
        tauxHoraire: 8,
        typeSalarie: {
            nom: "Salarié"
        }
    },
    {
        contact: {
            nom: "Dupont",
            prenom: "Jean-Michel",
            telephone: {
                nom: "portable",
                numero: "+33666666667"
            },
            adresse: {
                rue: "32 bis boulevard du boule",
                codePostal: 75005,
                pays: "France",
            },
            email: "jeanmichel.dupont@gmail.com",
        },
        tauxHoraire: 8,
        typeSalarie: {
            nom: "Salarié"
        }
    }
]

const seedDB = async () => {

  const nbSalaries = await Salarie.insertMany(salaries) // renvoie les items push
  console.log(nbSalaries," have been added")
}

seedDB()
