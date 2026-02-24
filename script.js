/**
 * Typewriter intro: "Hi, I'm Arjun Manikandan." typed character by character.
 */
(function () {
  var introEl = document.getElementById("intro-line");
  if (!introEl) return;

  var text = "Hi, I'm Arjun Manikandan.";
  var delayMs = 85;
  var cursorEl = document.createElement("span");
  cursorEl.className = "cursor";
  cursorEl.setAttribute("aria-hidden", "true");

  introEl.appendChild(cursorEl);

  function typeNext(i) {
    if (i > text.length) {
      cursorEl.remove();
      introEl.textContent = text;
      return;
    }
    introEl.textContent = "";
    introEl.appendChild(document.createTextNode(text.slice(0, i)));
    introEl.appendChild(cursorEl);
    setTimeout(function () {
      typeNext(i + 1);
    }, delayMs);
  }

  setTimeout(function () {
    typeNext(0);
  }, 400);
})();

/**
 * Decrypt effect: about section text reveals character-by-character from random chars.
 */
(function () {
  var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
  var DELAY_PER_CHAR = 18;
  var SCRAMBLE_PASSES = 3;
  var SCRAMBLE_INTERVAL = 40;

  function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function decryptElement(el) {
    var text = el.textContent;
    if (!text) return;
    var chars = text.split("");
    var spans = [];
    for (var i = 0; i < chars.length; i++) {
      var span = document.createElement("span");
      span.className = "decrypt-char";
      span.setAttribute("data-char", chars[i]);
      span.textContent = chars[i] === " " ? " " : randomChar();
      spans.push(span);
    }
    el.textContent = "";
    spans.forEach(function (s) {
      el.appendChild(s);
    });
    var index = 0;
    function revealNext() {
      if (index >= spans.length) return;
      var span = spans[index];
      var real = span.getAttribute("data-char");
      if (real !== " ") {
        var pass = 0;
        var scrambleId = setInterval(function () {
          span.textContent = randomChar();
          pass++;
          if (pass >= SCRAMBLE_PASSES) {
            clearInterval(scrambleId);
            span.textContent = real;
            span.classList.add("decrypted");
          }
        }, SCRAMBLE_INTERVAL);
      } else {
        span.classList.add("decrypted");
      }
      index++;
      setTimeout(revealNext, DELAY_PER_CHAR);
    }
    setTimeout(revealNext, DELAY_PER_CHAR);
  }

  function runDecrypt() {
    var title = document.getElementById("about-title");
    var content = document.getElementById("about-content");
    if (title) decryptElement(title);
    if (content) {
      var paras = content.querySelectorAll("p");
      paras.forEach(function (p, i) {
        setTimeout(function () {
          decryptElement(p);
        }, i * 120);
      });
    }
  }

  setTimeout(runDecrypt, 2800);
})();

/**
 * Magnet lines: grid of lines that rotate toward the cursor only when cursor is nearby.
 * Lines beyond INFLUENCE_RADIUS stay at baseAngle so they don't spin when cursor moves.
 */
(function () {
  var container = document.getElementById("magnet-lines");
  if (!container) return;

  var rows = 9;
  var columns = 9;
  var baseAngle = -10;
  var INFLUENCE_RADIUS = 140;
  var total = rows * columns;

  for (var i = 0; i < total; i++) {
    var span = document.createElement("span");
    span.style.setProperty("--rotate", baseAngle + "deg");
    container.appendChild(span);
  }

  var items = container.querySelectorAll("span");

  function normalizeAngleDiff(diff) {
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    return diff;
  }

  function onPointerMove(pointer) {
    items.forEach(function (item) {
      var rect = item.getBoundingClientRect();
      var centerX = rect.x + rect.width / 2;
      var centerY = rect.y + rect.height / 2;

      var dx = pointer.x - centerX;
      var dy = pointer.y - centerY;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= INFLUENCE_RADIUS) {
        item.style.setProperty("--rotate", baseAngle + "deg");
        return;
      }

      var cursorAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      var influence = 1 - (distance / INFLUENCE_RADIUS) * (distance / INFLUENCE_RADIUS);
      var diff = normalizeAngleDiff(cursorAngle - baseAngle);
      var angle = baseAngle + diff * influence;

      item.style.setProperty("--rotate", angle + "deg");
    });
  }

  window.addEventListener("pointermove", function (e) {
    onPointerMove({ x: e.clientX, y: e.clientY });
  });

  if (items.length) {
    var middleIndex = Math.floor(items.length / 2);
    var rect = items[middleIndex].getBoundingClientRect();
    onPointerMove({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
  }
})();

// Apply resume link from config (edit config.js to set your resume URL)
(function () {
  if (typeof window.RESUME_LINK !== "string" || window.RESUME_LINK === "YOUR_RESUME_LINK") return;
  var el = document.querySelector(".nav-resume");
  if (el) el.href = window.RESUME_LINK;
})();
