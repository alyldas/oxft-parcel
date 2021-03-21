import * as oxft from "./scripts/oxford-test.js";
import "./styles.css";

document.getElementById("app").innerHTML = `
<main>
<h1>Оксфордский тест способностей личности</h1>
<section id="instruction" class="instruction"></section>
<section id="userInfo" class="inputForm"></section>
<section id="question" class="inputForm"></section>
<section id="results" class="results"></section>
</main>
`;

let sectionInstr = document.getElementById("instruction");
let sectionUserInfo = document.getElementById("userInfo");
let sectionQuestion = document.getElementById("question");
let sectionResults = document.getElementById("results");
let secitonChart = document.getElementById("chart");

oxft.parameters.document = document;
oxft.parameters.instruction.element = sectionInstr;
oxft.parameters.userInfo.element = sectionUserInfo;
oxft.parameters.questions.element = sectionQuestion;
oxft.parameters.results.element = sectionResults;

oxft.startTest();
