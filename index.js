$(document).ready(() => {
  const easyCardsCount = 6;
  const easyMatches = 3;
  const mediumCardsCount = 12;
  const mediumMatches = 6;
  const hardCardsCount = 24;
  const hardMatches = 12;


  // 게임 정보 업데이트

  const easySetup = () => {
    let matchCount = 0;
    let flip = 0;
    const totalCardsCount = easyCardsCount;
    const totalMatches = easyMatches;
    let numberOfPairLeft = totalMatches;
    let firstCard = undefined;
    let secondCard = undefined;
    let timer;

    const updateGameInfo = () => {
      $("#pairCount").text(numberOfPairLeft);
      $("#matchCount").text(matchCount);
      $("#clickCount").text(flip);
    };
    const startTimer = () => {
      let timeLeft = 100;
      $("#timer").text(timeLeft);

      timer = setInterval(() => {
        timeLeft--;
        $("#timer").text(timeLeft);

        if (timeLeft === 0) {
          clearInterval(timer);
          $(".game-grid").hide();
          alert("game over")
        }
      }, 1000);
    };

    $(".card").on("click", function () {
      $(this).toggleClass("flip");
      flip++;
      updateGameInfo();
      if (!firstCard) {
        firstCard = $(this).find(".front_face");
      } else {
        secondCard = $(this).find(".front_face");
        console.log(firstCard, secondCard);
        if (firstCard.attr("src") === secondCard.attr("src")) {
          console.log("match");
          matchCount++;
          numberOfPairLeft--;
          $(this).off("click");
          if (matchCount === totalMatches) {
            alert("You win!");
          }
          updateGameInfo();
          firstCard = undefined;
          secondCard = undefined;
        } else {
          console.log("no match");
          setTimeout(() => {
            $(this).toggleClass("flip");
            firstCard.parent().toggleClass("flip");
            firstCard = undefined;
            secondCard = undefined;
          }, 1000);
        }
      }
    });

    updateGameInfo();
    startTimer();
  };

  const mediumSetup = () => {
    let matchCount = 0;
    let flip = 0;
    const totalCardsCount = mediumCardsCount;
    const totalMatches = mediumMatches;
    let numberOfPairLeft = totalMatches;
    let firstCard = undefined;
    let secondCard = undefined;

    const startTimer = (timeLimit) => {
      let timeLeft = timeLimit;
      $("#timer").text(timeLeft);

      timer = setInterval(() => {
        timeLeft--;
        $("#timer").text(timeLeft);

        if (timeLeft === 0) {
          clearInterval(timer);
          $(".game-grid").hide();
          alert("game over")
        }
      }, 1000);
    };

    const updateGameInfo = () => {
      $("#pairCount").text(numberOfPairLeft);
      $("#matchCount").text(matchCount);
      $("#clickCount").text(flip);
    };

    $(".card").on("click", function () {
      $(this).toggleClass("flip");
      flip++;
      updateGameInfo();
      if (!firstCard) {
        firstCard = $(this).find(".front_face");
      } else {
        secondCard = $(this).find(".front_face");
        console.log(firstCard, secondCard);
        if (firstCard.attr("src") === secondCard.attr("src")) {
          console.log("match");
          matchCount++;
          numberOfPairLeft--;
          $(this).off("click");
          firstCard.parent().attr("data-matched", "true");
          secondCard.parent().attr("data-matched", "true");
          if (matchCount === totalMatches) {
            alert("You win!");
          }
          updateGameInfo();
          firstCard = undefined;
          secondCard = undefined;
        } else {
          console.log("no match");
          setTimeout(() => {
            $(this).toggleClass("flip");
            firstCard.parent().toggleClass("flip");
            firstCard = undefined;
            secondCard = undefined;
          }, 1000);
        }
      }
    });

    updateGameInfo();
    startTimer(200);
  };

  const hardSetup = () => {
    let matchCount = 0;
    let flip = 0;
    const totalCardsCount = hardCardsCount;
    const totalMatches = hardMatches;
    let numberOfPairLeft = totalMatches;
    let firstCard = undefined;
    let secondCard = undefined;

    const updateGameInfo = () => {
      $("#pairCount").text(numberOfPairLeft);
      $("#matchCount").text(matchCount);
      $("#clickCount").text(flip);
    };

    const startTimer = (timeLimit) => {
      let timeLeft = timeLimit;
      $("#timer").text(timeLeft);

      timer = setInterval(() => {
        timeLeft--;
        $("#timer").text(timeLeft);

        if (timeLeft === 0) {
          clearInterval(timer);
          $(".game-grid").hide();
        }
      }, 1000);
    };

    $(".card").on("click", function () {
      $(this).toggleClass("flip");
      flip++;
      updateGameInfo();
      if (!firstCard) {
        firstCard = $(this).find(".front_face");
      } else {
        secondCard = $(this).find(".front_face");
        console.log(firstCard, secondCard);
        if (firstCard.attr("src") === secondCard.attr("src")) {
          console.log("match");
          matchCount++;
          numberOfPairLeft--;
          $(this).off("click");
          firstCard.parent().attr("data-matched", "true");
          secondCard.parent().attr("data-matched", "true");
          if (matchCount === totalMatches) {
            alert("You win!");
          }
          updateGameInfo();
          firstCard = undefined;
          secondCard = undefined;
        } else {
          console.log("no match");
          setTimeout(() => {
            $(this).toggleClass("flip");
            firstCard.parent().toggleClass("flip");
            firstCard = undefined;
            secondCard = undefined;
          }, 1000);
        }
      }
    });

    updateGameInfo();
    startTimer(300);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setDifficultyCSS = (difficulty) => {
    const gameGrid = $("#game_grid");
    let cardWidth, cardPaddingBottom;

    if (difficulty === "easy") {
      cardWidth = "33.3%";
      cardPaddingBottom = "33.3%";
      gameGrid.css("--cards-per-row", "3");
    } else if (difficulty === "medium") {
      cardWidth = "25%";
      cardPaddingBottom = "25%";
      gameGrid.css("--cards-per-row", "4");
    } else if (difficulty === "hard") {
      cardWidth = "16.6%";
      cardPaddingBottom = "16.6%";
      gameGrid.css("--cards-per-row", "6");
    }

    gameGrid.css("--card-width", cardWidth);
    gameGrid.css("--card-padding-bottom", cardPaddingBottom);
  };

  $("#startButton").on("click", function () {

    $("#gameInfo").css("display", "block");

    const selectedDifficulty = $("#difficultySelect").val();

    $("#game_grid").empty();
    let totalCardsCount, totalMatches;

    if (selectedDifficulty === "easy") {
      totalCardsCount = easyCardsCount;
      totalMatches = easyMatches;
    } else if (selectedDifficulty === "medium") {
      totalCardsCount = mediumCardsCount;
      totalMatches = mediumMatches;
    } else if (selectedDifficulty === "hard") {
      totalCardsCount = hardCardsCount;
      totalMatches = hardMatches;
    }

    const flipAllCards = () => {
      alert("Power up!");

      $(".card").each(function () {
        if ($(this).attr("data-matched") !== "true") {
          $(this).toggleClass("flip");
        }
      });

      setTimeout(() => {
        $(".card").each(function () {
          if ($(this).attr("data-matched") !== "true") {
            $(this).toggleClass("flip");
          }
        });
      }, 1000);
    };

    if (selectedDifficulty !== "easy") {
      setInterval(flipAllCards, 12000);
    }

    const cardPositions = Array.from({ length: totalCardsCount }, (_, index) => index);
    const shuffledPositions = shuffleArray(cardPositions);

    shuffledPositions.forEach((position) => {
      $("#game_grid").append(`
        <div class="card">
          <img class="front_face" alt="" src="">
          <img class="back_face" src="back.webp" alt="">
        </div>
      `);
    });

    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon?limit=151",
      success: (response) => {
        const pokemon = response.results;

        const randomPokemon = [];
        while (randomPokemon.length < totalMatches) {
          const index = Math.floor(Math.random() * pokemon.length);
          const poke = pokemon[index];
          if (!randomPokemon.some((p) => p.name === poke.name)) {
            randomPokemon.push(poke);
          }
        }

        const cardPokemon = [];
        for (let i = 0; i < totalCardsCount; i++) {
          cardPokemon.push(randomPokemon[i % totalMatches]);
        }

        const shuffledPokemon = shuffleArray(cardPokemon);

        $(".card").each((index, element) => {
          const name = shuffledPokemon[index].name;
          const id = shuffledPokemon[index].url.split("/")[6];
          const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          const frontFace = $(element).find(".front_face");
          frontFace.attr("src", imgUrl);
        });

        setDifficultyCSS(selectedDifficulty);
        if (selectedDifficulty === "easy") {
          easySetup();
        } else if (selectedDifficulty === "medium") {
          mediumSetup();
        } else if (selectedDifficulty === "hard") {
          hardSetup();
        }
      },
    });
  });
});
