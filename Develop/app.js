const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./lib/htmlRenderer");

const employees = [];

const managerQuestions = [
    {
        type: "input",
        message: "What is you managers name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your managers id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your managers email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your managers office number?",
        name: "office"
    }
]

const internQuestions = [
    {
        type: "input",
        message: "What is your interns name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your interns id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your intern email?",
        name: "email"
    },
    {
        type: "input",
        message: "What school does this interns go to?",
        name: "school"
    }
]


const engineerQuestions = [
    {
        type: "input",
        message: "What is your engineers name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your engineers id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your engineers email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your engineers github?",
        name: "github"
    }
]

const memberQuestion = [{
    type: "list",
    message: "What role does your next employee have?",
    choices: ["intern", "engineer", "I do not have any more team members"],
    name: "team"
}]


async function askQuestions() {

    try {
        const newmember = await inquirer.prompt(memberQuestion)

        if (newmember.team === "intern") {
            const askIntern = await inquirer.prompt(internQuestions)
            const newIntern = new Intern(askIntern.name, askIntern.id, askIntern.email, askIntern.school)
            employees.push(newIntern)
            console.log(newIntern)
            askQuestions()
        }
        else if (newmember.team === "engineer") {
            const askEngineer = await inquirer.prompt(engineerQuestions)
            const newEngineer = new Engineer(askEngineer.name, askEngineer.id, askEngineer.email, askEngineer.github)
            employees.push(newEngineer)
            console.log(newEngineer)
            askQuestions()
        }
        else {
            console.log(employees)
            const rendered = render(employees)
            fs.writeFile(outputPath, rendered, (err) => {
                if (err) {
                    throw err;
                }
            })
            return;
        }

    } catch (err) { throw err; }



}

inquirer.prompt(managerQuestions).then(function(res){
    const newManager = new Manager(res.name, res.id, res.email, res.office)
    employees.push(newManager)
    console.log(newManager);
    askQuestions()
})







// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
