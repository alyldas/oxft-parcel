import * as common from "./common.js";
import * as chart from "./chart.js";

import * as boysJson from "../json/boys.json";
import * as girlsJson from "../json/girls.json";
import * as menJson from "../json/men.json";
import * as questionsJson from "../json/questions.json";
import * as womenJson from "../json/women.json";

let questions;
let ranges;

export let chartSVG;

export const parameters = {
  document: null,
  instruction: {
    element: null
  },
  userInfo: {
    element: null
  },
  questions: {
    element: null,
    json: "json/questions.json"
  },
  results: {
    element: null,
    womenJSON: "json/women.json",
    menJSON: "json/men.json",
    boysJSON: "json/boys.json",
    girlsJSON: "json/girls.json"
  },
  chart: {
    options: {
      height: "100%",
      width: "100%",
      topPadding: 0,
      leftPadding: 250,
      chartArea: {
        style: {
          width: 3,
          color: "black"
        }
      },
      header: {
        title: {
          text: "Основной заголовок",
          style: {
            fontSize: 100,
            color: "black",
            fill: "black",
            opacity: 1,
            anchor: "start",
            offset: 0
          }
        },
        subTitle: {
          text: "Подзаголовок",
          style: {
            fontSize: 80,
            color: "gray",
            fill: "gray",
            opacity: 1,
            anchor: "start",
            offset: 0
          }
        }
      },
      hAxis: {
        position: 10,
        style: {
          width: 10,
          fill: "black",
          color: "black"
        }
      },
      vAxis: {
        position: 0,
        style: {
          width: 3,
          color: "black"
        }
      },
      hGrid: {
        step: 100,
        count: 21,
        offset: 0,
        extend: 200,
        style: { width: 3, color: "black" },
        dataLabels: {
          labels: [
            "+100",
            "+90",
            "+80",
            "+70",
            "+60",
            "+50",
            "+40",
            "+30",
            "+20",
            "+10",
            "0",
            "-10",
            "-20",
            "-30",
            "-40",
            "-50",
            "-60",
            "-70",
            "-80",
            "-90",
            "-100"
          ],
          style: {
            fontSize: 60,
            color: "black",
            fill: "black",
            opacity: 1,
            anchor: "end",
            offset: 200 // Подумать о замене на расчетный от leftPadding
          }
        },
        emphasises: [
          {
            emphasisUp: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            emphasisDown: [
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15
            ],
            style: {
              fill: "gray",
              width: 6,
              fillOpacity: 0.3,
              strokeDasharray: "60 15"
            }
          },
          {
            emphasisUp: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
            emphasisDown: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            style: { fill: "#DDD", width: 6, fillOpacity: 0.3 }
          }
        ]
      },
      vGrid: {
        step: 500,
        count: 10,
        offset: 250,
        style: {
          width: 3,
          color: "black"
        },
        dataLabels: {
          labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", " "],
          subLabels: [
            "Стабильность",
            "Счастье",
            "Спокойствие",
            "Уверенность",
            "Активность",
            "Cпособность",
            "Ответственность",
            "Объективность",
            "Чуткость",
            "Общительность"
          ],
          parameters: {
            rect: {
              fill: "white",
              height: 250
            },
            style: {
              fontSize: 70,
              color: "black",
              fill: "black",
              opacity: 1,
              anchor: "middle",
              offset: 0
            },
            subStyle: {
              fontSize: 48,
              color: "black",
              fill: "black",
              opacity: 1,
              anchor: "middle",
              offset: 0
            }
          }
        },
        dataLabelsA: {
          labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", " "],
          subLabels: [
            "Рассеянность",
            "Депрессия",
            "Нервозность",
            "Неуверенность",
            "Пассивность",
            "Безволие",
            "Безответственность",
            "Критичность",
            "Неотзывчивость",
            "Необщительность"
          ],
          parameters: {
            rect: {
              fill: "white",
              height: 250
            },
            style: {
              fontSize: 70,
              color: "black",
              fill: "black",
              opacity: 1,
              anchor: "middle",
              offset: 0
            },
            subStyle: {
              fontSize: 48,
              color: "black",
              fill: "black",
              opacity: 1,
              anchor: "middle",
              offset: 0
            }
          }
        }
      },
      graph: {
        line: {
          width: 10,
          color: "#449"
        },
        point: {
          radius: 20,
          color: "maroon"
        },
        label: {
          style: {
            fontSize: 70,
            color: "black",
            fill: "black",
            opacity: 1,
            anchor: "start",
            offset: 30
          }
        }
      }
    }
  }
};

export const userInfo = {
  firstname: "",
  lastname: "",
  age: null,
  sex: "",
  occupation: ""
};
export const answers = [];
export const capacityAnswers = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  G: 0,
  H: 0,
  I: 0,
  J: 0,
  ManicB: 0,
  ManicE: 0
};

export const capacityResults = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  G: 0,
  H: 0,
  I: 0,
  J: 0
};

const instruction = {
  title: "Как заполнять опросный лист",
  instructions: [
    "Убедитесь в том, что понимаете вопрос. Прочтите его столько раз, сколько Вам необходимо.",
    "Пожалуйста, ответьте на каждый вопрос.",
    "Не задерживайтесь слишком долго на одном вопросе. Ответьте на вопрос сразу же, как только Вы его поняли, и переходите к следующему вопросу.",
    "Когда ответ будет разным, в зависимости от того, рассматриваете ли Вы прошлое или настоящее, отвечайте по отношению к настоящему времени."
  ]
};

const userInfoForm = {
  caption: "Введите данные для прохождения теста",
  questions: [
    {
      name: "firstname",
      label: "Имя",
      type: "text",
      required: true,
      placeholder: "Ваше имя",
      value: ""
    },
    {
      name: "lastname",
      label: "Фамилия",
      type: "text",
      required: false,
      placeholder: "Ваша фамилия",
      value: ""
    },
    {
      name: "age",
      label: "Возраст",
      type: "number",
      min: 14,
      max: 100,
      required: true,
      placeholder: "Ваш возраст",
      value: null
    },
    {
      name: "occupation",
      label: "Профессия",
      type: "text",
      required: false,
      placeholder: "Ваша профессия",
      value: ""
    },
    {
      name: "sex",
      label: "Пол",
      type: "radio",
      required: true,
      placeholder: "Ваша пол",
      options: [
        { label: "Женский", id: "female", value: "female" },
        { label: "Мужской", id: "male", value: "male" }
      ],
      value: ""
    }
  ]
};

function calculateResults() {
  if (ranges) {
    document.removeEventListener("keydown", keyDownSwitch, false);

    capacityResults.A = ranges.A[capacityAnswers.A];
    capacityResults.B = ranges.B[capacityAnswers.B];
    capacityResults.C = ranges.C[capacityAnswers.C];
    capacityResults.D = ranges.D[capacityAnswers.D];
    capacityResults.E = ranges.E[capacityAnswers.E];
    capacityResults.F = ranges.F[capacityAnswers.F];
    capacityResults.G = ranges.G[capacityAnswers.G];
    capacityResults.H = ranges.H[capacityAnswers.H];
    capacityResults.I = ranges.I[capacityAnswers.I];
    capacityResults.J = ranges.J[capacityAnswers.J];

    if (capacityResults.A === undefined) capacityResults.A = 100;
    if (capacityResults.B === undefined) capacityResults.B = 100;
    if (capacityResults.C === undefined) capacityResults.C = 100;
    if (capacityResults.D === undefined) capacityResults.D = 100;
    if (capacityResults.E === undefined) capacityResults.E = 100;
    if (capacityResults.F === undefined) capacityResults.F = 100;
    if (capacityResults.G === undefined) capacityResults.G = 100;
    if (capacityResults.H === undefined) capacityResults.H = 100;
    if (capacityResults.I === undefined) capacityResults.I = 100;
    if (capacityResults.J === undefined) capacityResults.J = 100;
  } else {
    alert("Ranges еще не загружены"); // Диагностическое сообщение
  }
}

function clearLocalStorage(event) {
  localStorage.clear();
  event.currentTarget.form.reset();

  event.preventDefault();
}

function clickSaveChartButton() {
  const exportSVG =
    "data:image/svg," + escape(common.getElementById("oxftChartDiv").innerHTML);
  let exportLink = common.getElementById("osftResultA");

  if (exportLink) {
    exportLink.setAttribute("href", exportSVG);
    exportLink.setAttribute("download", "results.svg");
  } else {
    exportLink = common.createA(exportSVG, null, "osftResultA", "results.svg");
  }

  document.body.appendChild(exportLink);
  exportLink.click();
}

function clickPrintChartButton() {
  document.getElementById("oxftSave").style.display = "none";
  document.getElementById("oxftPrint").style.display = "none";
  document.getElementById("oxftReset").style.display = "none";

  window.print();

  document.getElementById("oxftSave").style.display = "inline";
  document.getElementById("oxftPrint").style.display = "inline";
  document.getElementById("oxftReset").style.display = "inline";
}

function createUserInfoForm() {
  const form = common.createForm();
  const buttonsDiv = common.createDiv();

  buttonsDiv.appendChild(common.createButton("Далее"));

  form.appendChild(common.createHeader(userInfoForm.caption));
  form.appendChild(common.createFields(userInfoForm.questions));
  form.appendChild(buttonsDiv);

  if (userInfo.firstname) {
    const clearButton = common.createButton("Очистить");
    clearButton.addEventListener("click", clearLocalStorage);
    buttonsDiv.appendChild(clearButton);
  }

  form.addEventListener("submit", submitUserInfo);

  return form;
}

function createInstruction() {
  const form = common.createForm();
  const buttonsDiv = common.createDiv();

  buttonsDiv.appendChild(common.createButton("Далее"));

  form.appendChild(common.createHeader(instruction.title));
  form.appendChild(common.createList(instruction.instructions, "ol"));
  form.appendChild(buttonsDiv);

  form.addEventListener("submit", submitInstruction);

  return form;
}

function createQuestion() {
  const result = common.createDiv(null, "oxftQuestion");
  const textDiv = common.createDiv(null, "oxftQuestionText");
  const buttonsDiv = common.createDiv(null, "oxftQuestionButtons");
  const capacityInput = common.createInput("oxftCapacity", "hidden");
  const numInput = common.createInput("oxftNum", "hidden");
  const yesButton = common.createButton("Да", "oxftYes", "yes", "button");
  const unknownButton = common.createButton(
    "Возможно",
    "oxftUnknown",
    "unknown",
    "button"
  );
  const noButton = common.createButton("Нет", "oxftNo", "no", "button");
  const prevButton = common.createButton(
    "Предыдущий вопрос",
    "oxftPrev",
    "prev",
    "button"
  );

  yesButton.addEventListener("click", submitYesQuestionForm);
  unknownButton.addEventListener("click", submitUnknownQuestionForm);
  noButton.addEventListener("click", submitNoQuestionForm);
  prevButton.addEventListener("click", prevQuestionForm);

  buttonsDiv.appendChild(yesButton);
  buttonsDiv.appendChild(unknownButton);
  buttonsDiv.appendChild(noButton);
  buttonsDiv.appendChild(prevButton);

  result.appendChild(textDiv);
  result.appendChild(capacityInput);
  result.appendChild(numInput);
  result.appendChild(buttonsDiv);

  return result;
}

function commitAnswer(answerData) {
  capacityAnswers[answerData.capacity] += answerData.value;

  if ((answerData.num === 197) & (answerData.answer.toUpperCase() === "YES"))
    capacityAnswers["ManicB"] = 1;

  if ((answerData.num === 22) & (answerData.answer.toUpperCase() === "YES"))
    capacityAnswers["ManicE"] = 1;

  answers.push(answerData);
}

function fillQuestionForm() {
  let questionNum = 1;
  if (answers.length === questions.length) {
    return false;
  } else if (answers.length > 0) {
    questionNum = answers[answers.length - 1].num + 1;
  }

  const question = questions[questionNum - 1];

  common.getElementById("oxftQuestionText").innerHTML =
    question.Num + ".&nbsp;" + question.Question;
  common
    .getElementById("oxftCapacity")
    .setAttribute("value", question.Capacity);
  common.getElementById("oxftNum").setAttribute("value", question.Num);
  common.getElementById("oxftYes").setAttribute("value", question.Values.Yes);
  common
    .getElementById("oxftUnknown")
    .setAttribute("value", question.Values.Unknown);
  common.getElementById("oxftNo").setAttribute("value", question.Values.No);

  return true;
}

function getSexName(sex) {
  if (sex.toUpperCase() === "MALE") {
    return "Мужской";
  } else {
    return "Женский";
  }
}

function loadJSON(url, func) {
  switch (url) {
    case "json/questions.json":
      func(questionsJson.default);
      break;
    case "json/boys.json":
      func(boysJson.default);
      break;
    case "json/girls.json":
      func(girlsJson.default);
      break;
    case "json/men.json":
      func(menJson.default);
      break;
    case "json/women.json":
      func(womenJson.default);
      break;
    default:
      console.log(`JSON loading error.`);
  }
}

function loadQuestionsFunc(json) {
  questions = json;
  parameters.userInfo.element.style.display = "block";

  if (userInfo.firstname !== "" && userInfo.firstname !== null) {
    loadRanges(userInfo, loadRangesFunc);
    // calculateResults();
    // showResults(parameters.results.element);

    parameters.userInfo.element.style.display = "none";
    parameters.results.element.style.display = "block";
  }
}

function loadRanges(userInfo, func) {
  let json;
  if (userInfo.sex === "female") {
    if (userInfo.age > 18) {
      json = parameters.results.womenJSON;
    } else {
      json = parameters.results.girlsJSON;
    }
  } else if (userInfo.sex === "male") {
    if (userInfo.age > 18) {
      json = parameters.results.menJSON;
    } else {
      json = parameters.results.boysJSON;
    }
  }

  loadJSON(json, func);
}

function loadRangesFunc(json) {
  ranges = json;
  loadAnswersFromLocalStorage();
  parameters.userInfo.element.style.display = "none";
  if (fillQuestionForm()) {
    parameters.instruction.element.style.display = "block";
  } else {
    calculateResults();
    showResults(parameters.results.element);
    parameters.results.element.style.display = "block";
  }
}

function loadUserInfoFromLocalStorage() {
  userInfo.firstname = localStorage.getItem("userInfo_firstname");
  userInfo.lastname = localStorage.getItem("userInfo_lastname");
  userInfo.age = parseInt(localStorage.getItem("userInfo_age"));
  userInfo.sex = localStorage.getItem("userInfo_sex");
  userInfo.occupation = localStorage.getItem("userInfo_occupation");
}

function loadAnswersFromLocalStorage() {
  for (let i = 0; i < questions.length; i++) {
    let answerData = { num: 0, capacity: "", value: 0, answer: "" };
    let numStr = localStorage.getItem("answer_" + questions[i].Num + "_num");
    if (numStr) {
      answerData.num = parseInt(numStr);
      answerData.capacity = localStorage.getItem(
        "answer_" + questions[i].Num + "_capacity"
      );
      answerData.value = parseInt(
        localStorage.getItem("answer_" + questions[i].Num + "_value")
      );
      answerData.answer = localStorage.getItem(
        "answer_" + questions[i].Num + "_answer"
      );

      commitAnswer(answerData);
    } else {
      break;
    }
  }
}

function saveUserInfoToLocalStorage() {
  localStorage.setItem("userInfo_firstname", userInfo.firstname);
  localStorage.setItem("userInfo_lastname", userInfo.lastname);
  localStorage.setItem("userInfo_age", userInfo.age);
  localStorage.setItem("userInfo_sex", userInfo.sex);
  localStorage.setItem("userInfo_occupation", userInfo.occupation);
}

function saveAnswerToLocalStorage(answer) {
  localStorage.setItem("answer_" + answer.num + "_num", answer.num);
  localStorage.setItem("answer_" + answer.num + "_capacity", answer.capacity);
  localStorage.setItem("answer_" + answer.num + "_value", answer.value);
  localStorage.setItem("answer_" + answer.num + "_answer", answer.answer);
}

function showResults(element) {
  const points = [];
  const percents = [];
  const resultDiv = common.createDiv(null, "oxftResultDiv");
  const percentsDiv = common.createDiv(null, "oxftPercentsDiv");
  const chartDiv = common.createDiv(null, "oxftChartDiv");

  resultDiv.style.display = "flex";
  percentsDiv.style.flex = "1";

  points.push("A: " + capacityAnswers["A"]);
  points.push("B: " + capacityAnswers["B"]);
  points.push("C: " + capacityAnswers["C"]);
  points.push("D: " + capacityAnswers["D"]);
  points.push("E: " + capacityAnswers["E"]);
  points.push("F: " + capacityAnswers["F"]);
  points.push("G: " + capacityAnswers["G"]);
  points.push("H: " + capacityAnswers["H"]);
  points.push("I: " + capacityAnswers["I"]);
  points.push("J: " + capacityAnswers["J"]);

  percents.push("A: " + capacityResults["A"]);
  percents.push("B: " + capacityResults["B"]);
  percents.push("C: " + capacityResults["C"]);
  percents.push("D: " + capacityResults["D"]);
  percents.push("E: " + capacityResults["E"]);
  percents.push("F: " + capacityResults["F"]);
  percents.push("G: " + capacityResults["G"]);
  percents.push("H: " + capacityResults["H"]);
  percents.push("I: " + capacityResults["I"]);
  percents.push("J: " + capacityResults["J"]);

  percentsDiv.appendChild(common.createHeader("Результаты", "h2"));
  percentsDiv.appendChild(common.createListH(percents));

  percentsDiv.lastElementChild.style.listStyleType = "none";
  percentsDiv.lastElementChild.style.paddingLeft = 0;

  resultDiv.appendChild(percentsDiv);

  showChart(chartDiv);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "oxftQuestionButtons";

  const saveButton = common.createButton("Сохранить график", "oxftSave");
  saveButton.addEventListener("click", clickSaveChartButton);
  buttonsDiv.appendChild(saveButton);

  const printButton = common.createButton("Распечатать график", "oxftPrint");
  printButton.addEventListener("click", clickPrintChartButton);
  buttonsDiv.appendChild(printButton);

  const resetButton = common.createButton("Пройти заново", "oxftReset");
  resetButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
  buttonsDiv.appendChild(resetButton);

  element.appendChild(chartDiv);
  element.appendChild(resultDiv);
  element.appendChild(buttonsDiv);
}

function showChart(element) {
  const percents = [];

  percents.push(capacityResults["A"]);
  percents.push(capacityResults["B"]);
  percents.push(capacityResults["C"]);
  percents.push(capacityResults["D"]);
  percents.push(capacityResults["E"]);
  percents.push(capacityResults["F"]);
  percents.push(capacityResults["G"]);
  percents.push(capacityResults["H"]);
  percents.push(capacityResults["I"]);
  percents.push(capacityResults["J"]);

  let keyPoints = [];
  if (capacityAnswers.ManicB) keyPoints.push(1);
  if (capacityAnswers.ManicE) keyPoints.push(4);

  let title = userInfo.firstname;
  if (userInfo.lastname) title += " " + userInfo.lastname;
  if (userInfo.occupation) title += " (" + userInfo.occupation + ")";

  parameters.chart.options.header.title.text = title;
  parameters.chart.options.header.subTitle.text = "Возраст: " + userInfo.age;
  parameters.chart.options.header.subTitle.text +=
    ", пол: " + getSexName(userInfo.sex);
  chartSVG = chart.drawChart(
    null,
    percents,
    parameters.chart.options,
    keyPoints
  );

  element.appendChild(chartSVG);
}

function keyDownSwitch(event) {
  switch (event.keyCode) {
    case 49:
      submitYesQuestionForm();
      break;
    case 50:
      submitUnknownQuestionForm();
      break;
    case 51:
      submitNoQuestionForm();
      break;
    case 52:
      prevQuestionForm();
      break;
    default:
      break;
  }
}

function submitInstruction(event) {
  parameters.instruction.element.style.display = "none";
  parameters.questions.element.style.display = "block";

  document.addEventListener("keydown", keyDownSwitch);

  event.preventDefault();
}

function submitQuestion(answer, value) {
  const answerData = { num: 0, capacity: "", value: 0, answer: "" };
  const numInput = document.getElementById("oxftNum");
  answerData.answer = answer;
  answerData.value = value;

  answerData.num = parseInt(document.getElementById("oxftNum").value);
  answerData.capacity = document.getElementById("oxftCapacity").value;

  commitAnswer(answerData);
  saveAnswerToLocalStorage(answerData);

  if (answerData.num < questions.length) {
    numInput.value = answerData.num + 1;
    fillQuestionForm();
  } else {
    calculateResults();
    showResults(parameters.results.element);
    parameters.questions.element.style.display = "none";
    parameters.results.element.style.display = "block";
  }
}

function prevQuestionForm() {
  const answerData = { num: 0, capacity: "", value: 0, answer: "" };
  const numInput = document.getElementById("oxftNum");

  numInput.value = answerData.num - 1;
  let questionNum = 1;
  if (answers.length > 0) {
    questionNum = answers[answers.length - 1].num;
  }

  const question = questions[questionNum - 1];

  common.getElementById("oxftQuestionText").innerHTML =
    question.Num + ".&nbsp;" + question.Question;
  common
    .getElementById("oxftCapacity")
    .setAttribute("value", question.Capacity);
  common.getElementById("oxftNum").setAttribute("value", question.Num);
  common.getElementById("oxftYes").setAttribute("value", question.Values.Yes);
  common
    .getElementById("oxftUnknown")
    .setAttribute("value", question.Values.Unknown);
  common.getElementById("oxftNo").setAttribute("value", question.Values.No);

  answerData.num = parseInt(document.getElementById("oxftNum").value);
  answerData.capacity = document.getElementById("oxftCapacity").value;

  switch (answers[answers.length - 1].answer) {
    case "yes":
      answerData.value = parseInt(document.getElementById("oxftYes").value);
      break;
    case "no":
      answerData.value = parseInt(document.getElementById("oxftNo").value);
      break;
    case "unknown":
      answerData.value = parseInt(document.getElementById("oxftUnknown").value);
      break;
    default:
      break;
  }

  capacityAnswers[answerData.capacity] -= answerData.value;
  answers.splice(-1, 1);
}

function submitNoQuestionForm() {
  const value = parseInt(document.getElementById("oxftNo").value);
  submitQuestion("no", value);
}

function submitUnknownQuestionForm() {
  const value = parseInt(document.getElementById("oxftUnknown").value);
  submitQuestion("unknown", value);
}

function submitYesQuestionForm() {
  const value = parseInt(document.getElementById("oxftYes").value);
  submitQuestion("yes", value);
}

function submitUserInfo(event) {
  const sexInputs = common.getElementsByName("inp_sex");

  userInfo.firstname = common.getElementById("inp_firstname").value;
  userInfo.lastname = common.getElementById("inp_lastname").value;
  userInfo.age = parseInt(common.getElementById("inp_age").value);
  userInfo.occupation = common.getElementById("inp_occupation").value;

  for (let i = 0; i < sexInputs.length; i++) {
    if (sexInputs[i].checked) userInfo.sex = sexInputs[i].value;
  }

  saveUserInfoToLocalStorage();
  loadRanges(userInfo, loadRangesFunc);

  event.preventDefault();
}

export function startTest() {
  loadUserInfoFromLocalStorage();

  userInfoForm.questions[0].value = userInfo.firstname;
  userInfoForm.questions[1].value = userInfo.lastname;
  userInfoForm.questions[2].value = userInfo.age;
  userInfoForm.questions[3].value = userInfo.occupation;
  userInfoForm.questions[4].value = userInfo.sex;

  common.parameters.document = parameters.document;

  parameters.instruction.element.style.display = "none";
  parameters.instruction.element.appendChild(createInstruction());

  parameters.userInfo.element.style.display = "none";
  parameters.userInfo.element.appendChild(createUserInfoForm());

  parameters.questions.element.style.display = "none";
  parameters.questions.element.appendChild(createQuestion());

  parameters.results.element.style.display = "none";

  loadJSON(parameters.questions.json, loadQuestionsFunc);
}

// Секция тестовых функций

function testRangesFunc() {
  ranges = this.response;
  loadJSON(parameters.questions.json, testQuestionsFunc);
}

function testQuestionsFunc(json) {
  questions = json;

  calculateResults();
  showResults(parameters.results.element);

  parameters.questions.element.style.display = "none";
  parameters.results.element.style.display = "block";
}

export function testTest() {
  userInfoForm.questions[0].value = userInfo.firstname;
  userInfoForm.questions[1].value = userInfo.lastname;
  userInfoForm.questions[2].value = userInfo.age;
  userInfoForm.questions[3].value = userInfo.occupation;
  userInfoForm.questions[4].value = userInfo.sex;

  common.parameters.document = parameters.document;

  parameters.instruction.element.style.display = "none";
  parameters.instruction.element.appendChild(createInstruction());

  parameters.userInfo.element.style.display = "none";
  parameters.userInfo.element.appendChild(createUserInfoForm());

  parameters.questions.element.style.display = "none";
  parameters.questions.element.appendChild(createQuestion());

  parameters.results.element.style.display = "none";

  loadRanges(userInfo, testRangesFunc);
}
