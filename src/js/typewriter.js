(() => {
  const heading = document.getElementById("hero-heading");
  const cursor = document.getElementById("hero-cursor");
  const roleEl = document.getElementById("hero-role");
  if (!heading || !cursor || !roleEl) return;


  // Previous titles to cycle through before landing on the final one
  const previousRoles = [
    "front end developer",
    "staff engineer",
    "engineering lead",
  ];
  const finalRole = "product engineer";

  // Collect all text nodes
  const textNodes = [];
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      if (node.parentElement.id === "hero-cursor") return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.textContent.length > 0) {
      textNodes.push({ node, fullText: node.textContent });
    }
  }

  // Find which text node is the role
  let roleNodeIndex = -1;
  for (let i = 0; i < textNodes.length; i++) {
    if (textNodes[i].node.parentElement === roleEl) {
      roleNodeIndex = i;
      break;
    }
  }

  // Hide all text
  for (const t of textNodes) t.node.textContent = "";

  // Show cursor
  cursor.style.display = "inline-block";
  cursor.style.animation = "blink 0.7s step-end infinite";
  if (!document.getElementById("blink-style")) {
    const style = document.createElement("style");
    style.id = "blink-style";
    style.textContent = `@keyframes blink { 50% { opacity: 0 } }`;
    document.head.appendChild(style);
  }

  let nodeIndex = 0;
  let nodeCharIndex = 0;

  function typeChar() {
    if (nodeIndex >= textNodes.length) {
      finishAnimation();
      return;
    }

    // When we reach the role node, do the cycling sequence instead
    if (nodeIndex === roleNodeIndex && nodeCharIndex === 0) {
      cycleRoles(0);
      return;
    }

    const t = textNodes[nodeIndex];
    t.node.textContent = t.fullText.slice(0, nodeCharIndex + 1);
    nodeCharIndex++;

    if (nodeCharIndex >= t.fullText.length) {
      nodeIndex++;
      nodeCharIndex = 0;
    }

    const ch = t.fullText[nodeCharIndex - 1];
    let delay = 30;
    if (ch === "\n") delay = 80;
    else if (ch === "," || ch === ".") delay = 120;
    else if (ch === "!") delay = 150;

    setTimeout(typeChar, delay);
  }

  function cycleRoles(roleIndex) {
    if (roleIndex >= previousRoles.length) {
      typeRole(finalRole, () => {
        nodeIndex = roleNodeIndex + 1;
        nodeCharIndex = 0;
        setTimeout(typeChar, 30);
      });
      return;
    }

    typeRole(previousRoles[roleIndex], () => {
      setTimeout(() => {
        // backspace, backspace, select-all
        const method = roleIndex < 2 ? backspaceDelete : selectDelete;
        method(() => {
          setTimeout(() => cycleRoles(roleIndex + 1), 150);
        });
      }, 400);
    });
  }

  function typeRole(text, onDone) {
    const node = textNodes[roleNodeIndex].node;
    let i = 0;
    function next() {
      if (i >= text.length) { onDone(); return; }
      i++;
      node.textContent = text.slice(0, i);
      setTimeout(next, 35);
    }
    next();
  }

  function selectDelete(onDone) {
    const node = textNodes[roleNodeIndex].node;
    // Highlight then delete all at once
    roleEl.style.backgroundColor = "rgba(148, 163, 184, 0.15)";
    roleEl.style.borderRadius = "2px";
    setTimeout(() => {
      node.textContent = "";
      roleEl.style.backgroundColor = "";
      onDone();
    }, 300);
  }

  function backspaceDelete(onDone) {
    const node = textNodes[roleNodeIndex].node;
    function del() {
      const text = node.textContent;
      if (text.length === 0) { onDone(); return; }
      node.textContent = text.slice(0, -1);
      setTimeout(del, 25);
    }
    del();
  }

  function finishAnimation() {
    cursor.style.animation = "none";
    setTimeout(() => {
      cursor.style.transition = "opacity 0.5s";
      cursor.style.opacity = "0";
      setTimeout(() => (cursor.style.display = "none"), 500);
    }, 800);
  }

  setTimeout(typeChar, 400);
})();
