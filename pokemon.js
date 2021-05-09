  

    let inputData = document.querySelector("[data-input]").value;
    fetch("https://pokeapi.co/api/v2/pokemon/" + inputData.trim().toLowerCase())
      .then((response) => response.json())
      .then((data) => {
        // Skapa ett nytt image element
        let sprite = document.createElement("img");
        // Fyll image elementets URL med data som vi hämtade från PokeAPI
        sprite.setAttribute("src", data.sprites.front_default);
        // Lägg till bilden i vårt "gym" (en helt vanlig div)
        document.querySelector("#pokegym").prepend(sprite);
        document.querySelector("[data-input]").value = ""; //Nollställ textfältet
        document.querySelector(
          ".message"
        ).innerText = `✨ En vild ${inputData} dök upp ur det höga gräset!`;
      })
      .catch((error) => {
        document.querySelector(
          ".message"
        ).innerText = `⚠️ ${inputData} är inte en giltig Pokemon. Försök igen!`;
      });
