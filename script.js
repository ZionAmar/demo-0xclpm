(function () {
  "use strict";

  var form = document.getElementById("agent-form");
  var input = document.getElementById("goal-input");
  var runBtn = document.getElementById("run-btn");
  var consoleEl = document.getElementById("agent-console");
  var chips = document.querySelectorAll(".chip");

  var running = false;

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var goal = chip.getAttribute("data-goal") || chip.textContent;
      input.value = goal;
      input.focus();
    });
  });

  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (running) return;
    var goal = (input.value || "").trim();
    if (!goal) {
      input.focus();
      return;
    }
    runAgent(goal);
  });

  function clearConsole() {
    consoleEl.innerHTML = "";
  }

  function appendLine(tag, tagClass, text, delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var line = document.createElement("div");
        line.className = "log-line";
        var tagEl = document.createElement("span");
        tagEl.className = "log-tag " + tagClass;
        tagEl.textContent = tag;
        var textEl = document.createElement("span");
        textEl.className = "log-text";
        textEl.textContent = text;
        line.appendChild(tagEl);
        line.appendChild(textEl);
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;
        resolve();
      }, delay);
    });
  }

  function planStepsFor(goal) {
    // Purely cosmetic, deterministic "planning" so the same goal always
    // produces the same believable-looking plan — no real AI/network call.
    var base = [
      "לפרק את הבקשה לתת-משימות ברורות",
      "לבדוק אילו כלים/מידע נדרשים לביצוע",
      "לבצע את הצעד המרכזי בפועל",
      "לאמת שהתוצאה תואמת את המטרה המקורית",
    ];
    return base;
  }

  function runAgent(goal) {
    running = true;
    runBtn.disabled = true;
    clearConsole();

    var steps = planStepsFor(goal);
    var t = 0;
    var seq = [];

    seq.push(function () {
      return appendLine("PLAN", "plan", 'התקבלה מטרה: "' + goal + '"', 0);
    });

    steps.forEach(function (step, i) {
      seq.push(function () {
        return appendLine("PLAN", "plan", "צעד " + (i + 1) + ": " + step, 0);
      });
    });

    seq.push(function () {
      return appendLine("ACT", "act", "מפעיל כלי מתאים לצעד 1…", 0);
    });
    seq.push(function () {
      return appendLine("OBSERVE", "observe", "התוצאה התקבלה — תואמת את התוכנית ✔", 0);
    });
    seq.push(function () {
      return appendLine("ACT", "act", "ממשיך לצעד 2, מעדכן הקשר לפי מה שנצפה…", 0);
    });
    seq.push(function () {
      return appendLine("OBSERVE", "observe", "אין חוסם — עובר לצעד הבא בלולאה", 0);
    });
    seq.push(function () {
      return appendLine("ACT", "act", "מבצע את הצעד המרכזי ומאמת תוצאה סופית", 0);
    });
    seq.push(function () {
      return appendLine(
        "DONE",
        "done",
        'המטרה "' + goal + '" הושלמה — 3 סבבי Plan→Act→Observe, בלי התערבות ידנית באמצע.',
        0
      );
    });

    (async function play() {
      for (var i = 0; i < seq.length; i++) {
        await sleep(i === 0 ? 120 : 480);
        await seq[i]();
      }
      running = false;
      runBtn.disabled = false;
    })();
  }

  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }
})();
