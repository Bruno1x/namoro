const quotes = [
  '"Voce nao precisa provar nada para ninguem. So continuar sendo essa mulher gigante que eu tenho orgulho de amar."',
  '"O seu sonho e grande porque combina com voce. Vai no seu tempo, mas nunca duvida do seu brilho."',
  '"Voce vai cuidar de muita gente como fisioterapeuta, mas hoje deixa eu cuidar de uma certeza: voce e incrivel."',
  '"Todo esforco que voce faz agora vai virar orgulho la na frente. E eu vou estar la dizendo que sempre acreditei."',
  '"Voce merece uma vida linda, uma carreira forte e um amor que te lembre disso nos dias dificeis."',
  '"A futura fisio mais linda desse mundo ja esta sendo construida um dia de cada vez."'
];

const quiz = [
  {
    question: "Qual carreira vai ganhar uma profissional absurda?",
    options: ["Fisioterapia", "Astronauta de Marte", "Chef de miojo"],
    answer: 0
  },
  {
    question: "O que ela merece?",
    options: ["Todo sucesso do mundo", "So um parabens seco", "Pouca coisa"],
    answer: 0
  },
  {
    question: "Quem acredita nela ate nos dias dificeis?",
    options: ["O namorado dela", "Ninguem", "So quando da certo"],
    answer: 0
  }
];

const memoryValues = ["amor", "fisio", "roxo", "sucesso", "amor", "fisio", "roxo", "sucesso"];
const relationshipStart = "2024-01-01";
const randomMessages = [
  "Voce e mais forte do que imagina e mais amada do que consegue medir.",
  "Seu futuro como fisioterapeuta vai ser lindo porque voce cuida com o coracao.",
  "Eu amo o jeito que voce transforma momentos simples em lembrancas favoritas.",
  "Quando o dia pesar, lembra: voce nao esta sozinha, eu estou com voce.",
  "Voce merece uma vida roxa de tao bonita: cheia de carinho, paz e conquista.",
  "Seu sorriso continua sendo uma das minhas partes favoritas do mundo."
];
const catchMessages = [
  "Um lirio para lembrar que voce floresce.",
  "Outro lirio porque voce merece jardim inteiro.",
  "Esse aqui veio com orgulho de voce.",
  "Lirio pego, amor aumentado.",
  "Voce e delicada, mas tambem e gigante."
];

const gate = document.querySelector("#gate");
const gateForm = document.querySelector("#gateForm");
const gatePassword = document.querySelector("#gatePassword");
const gateFeedback = document.querySelector("#gateFeedback");
const progress = document.querySelector(".progress");
const glow = document.querySelector(".cursor-glow");
const quoteText = document.querySelector("#quoteText");
const nextQuote = document.querySelector("#nextQuote");
const surpriseBtn = document.querySelector("#surpriseBtn");
const rainBtn = document.querySelector("#rainBtn");
const daysTogether = document.querySelector("#daysTogether");
const timeText = document.querySelector("#timeText");
const randomMessage = document.querySelector("#randomMessage");
const messageBtn = document.querySelector("#messageBtn");
const modal = document.querySelector("#photoModal");
const modalImg = modal.querySelector("img");
const modalCaption = modal.querySelector("p");
const modalClose = modal.querySelector(".modal-close");
const quizQuestion = document.querySelector("#quizQuestion");
const quizOptions = document.querySelector("#quizOptions");
const quizFeedback = document.querySelector("#quizFeedback");
const quizScore = document.querySelector("#quizScore");
const memoryBoard = document.querySelector("#memoryBoard");
const memoryScore = document.querySelector("#memoryScore");
const resetMemory = document.querySelector("#resetMemory");
const boostLove = document.querySelector("#boostLove");
const loveMeter = document.querySelector("#loveMeter");
const lovePercent = document.querySelector("#lovePercent");
const loveText = document.querySelector("#loveText");
const catchGame = document.querySelector("#catchGame");
const catchScore = document.querySelector("#catchScore");
const catchMessage = document.querySelector("#catchMessage");
const startCatch = document.querySelector("#startCatch");
const envelope = document.querySelector("#envelope");
const openLetter = document.querySelector("#openLetter");
const secretBtn = document.querySelector("#secretBtn");
const secretText = document.querySelector("#secretText");

let quoteIndex = 0;
let quizIndex = 0;
let quizHits = 0;
let loveValue = 100;
let flippedCards = [];
let matchedPairs = 0;
let catchPoints = 0;
let catchTimer = null;

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max <= 0 ? 0 : (window.scrollY / max) * 100;
  progress.style.width = `${percent}%`;
}

function unlockSite() {
  gate.classList.add("hidden");
  document.body.classList.remove("locked");
  window.setTimeout(() => gate.remove(), 500);
}

function checkGate(event) {
  event.preventDefault();
  const answer = gatePassword.value.trim().toLowerCase();
  const normalized = answer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (["lirio", "lirios"].includes(normalized)) {
    unlockSite();
    rainFlowers(18);
    return;
  }

  gateFeedback.textContent = "Quase. E a flor que ela ama.";
  gatePassword.select();
}

function updateRelationshipTime() {
  const start = new Date(`${relationshipStart}T00:00:00`);
  const today = new Date();
  const diff = today - start;
  const days = Math.max(0, Math.floor(diff / 86400000));
  daysTogether.textContent = String(days);
  timeText.textContent = `Desde ${start.toLocaleDateString("pt-BR")} nossa historia vem ganhando mais motivos para sorrir.`;
}

function showNextQuote() {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteText.animate(
    [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(8px)" }],
    { duration: 160, easing: "ease-out" }
  ).onfinish = () => {
    quoteText.textContent = quotes[quoteIndex];
    quoteText.animate(
      [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 240, easing: "ease-out" }
    );
  };
}

function createHeart(x, y) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "\u2665";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function createFallingSymbol(symbol, className) {
  const item = document.createElement("span");
  item.className = className;
  if (className === "falling-lily") {
    item.innerHTML = "<span></span><span></span><span></span><span></span><span></span>";
  } else {
    item.textContent = symbol;
  }
  item.style.left = `${Math.random() * 100}vw`;
  item.style.top = "-40px";
  item.style.animationDuration = `${2.6 + Math.random() * 2.2}s`;
  item.style.setProperty("--flower-size", `${34 + Math.random() * 22}px`);
  document.body.appendChild(item);
  item.addEventListener("animationend", () => item.remove());
}

function rainFlowers(amount = 28) {
  for (let index = 0; index < amount; index += 1) {
    setTimeout(() => {
      createFallingSymbol(index % 3 === 0 ? "\u2665" : "lirio", index % 3 === 0 ? "falling-heart" : "falling-lily");
    }, index * 70);
  }
}

function openModal(button) {
  modalImg.src = button.dataset.src;
  modalCaption.textContent = button.dataset.caption;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderQuiz() {
  const current = quiz[quizIndex];
  quizQuestion.textContent = current.question;
  quizScore.textContent = `${quizHits}/${quiz.length}`;
  quizOptions.innerHTML = "";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuiz(index, button));
    quizOptions.appendChild(button);
  });
}

function answerQuiz(index, button) {
  const current = quiz[quizIndex];
  const buttons = quizOptions.querySelectorAll("button");
  buttons.forEach(item => {
    item.disabled = true;
    item.classList.toggle("correct", item.textContent === current.options[current.answer]);
  });

  if (index === current.answer) {
    quizHits += 1;
    quizFeedback.textContent = "Acertou. Obvio que voce e perfeita.";
    createHeart(window.innerWidth / 2, window.innerHeight / 2);
  } else {
    button.classList.add("wrong");
    quizFeedback.textContent = "Quase. Mas a resposta certa tambem te ama.";
  }

  quizScore.textContent = `${quizHits}/${quiz.length}`;
  setTimeout(() => {
    quizIndex = (quizIndex + 1) % quiz.length;
    if (quizIndex === 0) {
      quizFeedback.textContent = quizHits === quiz.length ? "Gabaritou, como sempre." : "Rodada nova para tentar gabaritar.";
      quizHits = 0;
    }
    renderQuiz();
  }, 900);
}

function shuffle(values) {
  return [...values].sort(() => Math.random() - 0.5);
}

function renderMemory() {
  flippedCards = [];
  matchedPairs = 0;
  memoryScore.textContent = "0 pares";
  memoryBoard.innerHTML = "";

  shuffle(memoryValues).forEach(value => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.dataset.value = value;
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
    memoryBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.value;
  flippedCards.push(card);

  if (flippedCards.length !== 2) return;

  const [first, second] = flippedCards;
  if (first.dataset.value === second.dataset.value) {
    first.classList.add("matched");
    second.classList.add("matched");
    matchedPairs += 1;
    memoryScore.textContent = `${matchedPairs} pares`;
    flippedCards = [];
    createHeart(window.innerWidth / 2, window.innerHeight / 2);
    return;
  }

  setTimeout(() => {
    first.classList.remove("flipped");
    second.classList.remove("flipped");
    first.textContent = "?";
    second.textContent = "?";
    flippedCards = [];
  }, 650);
}

function boostLoveMeter() {
  loveValue = loveValue >= 140 ? 100 : loveValue + 10;
  loveMeter.style.width = `${Math.min(loveValue, 100)}%`;
  lovePercent.textContent = loveValue >= 140 ? "infinito" : `${loveValue}%`;
  loveText.textContent = loveValue >= 140
    ? "Deu erro no sistema: amor grande demais para medir."
    : "Subindo, mas ja estava no maximo desde o comeco.";
}

function showRandomMessage() {
  const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  randomMessage.textContent = message;
  rainFlowers(8);
}

function spawnCatchLily() {
  const lily = document.createElement("button");
  lily.type = "button";
  lily.className = "catch-lily";
  lily.innerHTML = "<span></span><span></span><span></span><span></span><span></span>";
  lily.setAttribute("aria-label", "Pegar lirio");
  lily.style.left = `${Math.random() * 86 + 4}%`;
  lily.style.animationDuration = `${2.2 + Math.random() * 1.4}s`;
  lily.addEventListener("click", () => {
    catchPoints += 1;
    catchScore.textContent = `${catchPoints} pts`;
    catchMessage.textContent = catchMessages[catchPoints % catchMessages.length];
    createHeart(window.innerWidth / 2, window.innerHeight / 2);
    lily.remove();
  });
  lily.addEventListener("animationend", () => lily.remove());
  catchGame.appendChild(lily);
}

function startCatchGame() {
  catchPoints = 0;
  catchScore.textContent = "0 pts";
  catchMessage.textContent = "Valendo. Pega todos os lirios que conseguir.";
  catchGame.querySelectorAll(".catch-lily").forEach(item => item.remove());
  startCatch.style.display = "none";

  let rounds = 0;
  clearInterval(catchTimer);
  catchTimer = setInterval(() => {
    spawnCatchLily();
    rounds += 1;
    if (rounds >= 16) {
      clearInterval(catchTimer);
      catchTimer = null;
      startCatch.style.display = "";
      catchMessage.textContent = catchPoints >= 10
        ? "Jardim completo. Ela merece todos."
        : "Fim de rodada. Da para tentar de novo e encher o jardim.";
    }
  }, 520);
}

function openEnvelope() {
  envelope.classList.add("open");
  rainFlowers(14);
}

function revealSecret() {
  secretText.hidden = false;
  secretBtn.textContent = "Surpresa desbloqueada";
  rainFlowers(32);
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

function revealVisibleNow() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(element => {
    const rect = element.getBoundingClientRect();
    const insideViewport = rect.top < window.innerHeight * 0.96 && rect.bottom > 0;
    if (insideViewport) element.classList.add("visible");
  });
}

document.querySelectorAll(".photo").forEach(button => {
  button.addEventListener("click", event => {
    openModal(button);
    createHeart(event.clientX, event.clientY);
  });
});

nextQuote.addEventListener("click", showNextQuote);
surpriseBtn.addEventListener("click", event => {
  showNextQuote();
  createHeart(event.clientX, event.clientY);
  document.querySelector(".quote-band").scrollIntoView({ behavior: "smooth", block: "center" });
});

gateForm.addEventListener("submit", checkGate);
rainBtn.addEventListener("click", () => rainFlowers(36));
messageBtn.addEventListener("click", showRandomMessage);
resetMemory.addEventListener("click", renderMemory);
boostLove.addEventListener("click", boostLoveMeter);
startCatch.addEventListener("click", startCatchGame);
openLetter.addEventListener("click", openEnvelope);
secretBtn.addEventListener("click", revealSecret);

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

window.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("scroll", revealVisibleNow, { passive: true });
window.addEventListener("hashchange", revealVisibleNow);
window.addEventListener("pointermove", event => {
  glow.style.opacity = "1";
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.addEventListener("click", event => {
  const interactive = event.target.closest("a, button");
  if (interactive) createHeart(event.clientX, event.clientY);
});

updateProgress();
updateRelationshipTime();
renderQuiz();
renderMemory();
document.body.classList.add("locked");
requestAnimationFrame(revealVisibleNow);
