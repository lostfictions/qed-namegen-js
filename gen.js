const [
  firstnames,
  lastnames,
  words
] = await Promise.all([
  "./firstnames.json",
  "./lastnames.json",
  "./words.json"
].map(f => fetch(f).then(r => r.json())));

function randomInArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomName() {
  const firstName = Math.random() < 0.65 ? randomInArray(firstnames) : "";
  let alias = Math.random() < (firstName ? 0.5 : 0.9) ? randomInArray(words) : "";
  const lastName = Boolean(firstName && alias) || (Math.random() < (alias ? 0.85 : 0.7)) ? randomInArray(lastnames) : "";

  if (!firstName && !lastName && !alias) {
    alias = randomInArray(words);
  }

  if (alias) {
    const doubleUpChance = (!firstName && !lastName) ? 0.6 : 0.12;
    if (Math.random() < doubleUpChance) {
      alias = alias + " " + randomInArray(words);
    }

    const aliasPrefixChance = (!firstName && !lastName) ? 0.5 : 0.13;
    if (Math.random() < aliasPrefixChance) {
      alias = "The " + alias;
    }

    if (firstName || lastName) {
      alias = '"' + alias + '"';
    }
  }

  return [firstName, alias, lastName].join(" ").trim();
}

const text = document.querySelector("#text");
document.querySelector("#button").addEventListener("click", (e) => {
  e.preventDefault();
  text.textContent = randomName();
});

text.textContent = randomName();