// STEP 1: GET ALL GAME
const getAllGames = async () => {
    try {
      const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?limit=20`;
      const res = await fetch(url);
      const data = await res.json();
      const listOfGames = data.data;
      renderListOfGames(listOfGames);
    } catch (err) {
      console.log("err", err);
    }
  };
  
  const renderListOfGames = (listOfGames = []) => {
    const divListOfGames = document.getElementById("list-games");
    divListOfGames.innerHTML = "";
    listOfGames.forEach((allgames, index) => {
      divListOfGames.innerHTML += `<div class="gameItem">                               
                    <img src="${
                      allgames.header_image
                    }" alt="Hello" width="250" height="120">
                    <div onclick="getGameDetail(${
                      allgames.appid
                    })" class="li-title">${allgames.name.toUpperCase()}</div>    
                </div>`;
    });
  };
  
  //--------------------------------------
  
  // STEP 2: GET ALL GENRES
  const getGenresList = async () => {
    try {
      const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres?limit=8`;
      const res = await fetch(url);
      const data = await res.json();
      const listOfGeneres = data.data;
      renderListOfGeneres(listOfGeneres);
    } catch (err) {
      console.log("err", err);
    }
  };
  
  const renderListOfGeneres = (listOfGeneres = []) => {
    const divActionList = document.getElementById("action-lists");
    divActionList.innerHTML = "";
    listOfGeneres.forEach((genre, index) => {
      divActionList.innerHTML += `
            <div id="action-lists" class="flex flex-column card card-shadow">
                <div>
                  <button id="action-list-btn"  onclick="getAction('${
                    genre.name
                  }')">
                    ${genre.name.toUpperCase()}
                  </button>
                </div>
            </div>
        `;
    });
  };
  //--------------------------------------
  
  // STEP 3: RENDER LIST OF GAMES AND LIST OF GENRES AT THE FIRST TIME OPEN WEB
  
  getGenresList();
  getAllGames();
  
  //--------------------------------------
  
  // STEP 4: CREATE FUNCTION WHEN USER CLICK FILTER WITH GENRES
  const getAction = async (genre) => {
    try {
      const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?genres=${genre}`;
  
      const res = await fetch(url);
      const data = await res.json();
      const listOfGames = data.data;
      const divCategory = document.getElementById("nav-category");
      divCategory.innerHTML = `${genre.toUpperCase()}`;
      renderListOfGames(listOfGames);
    } catch (err) {
      console.log("err", err);
    }
  };
  //--------------------------------------
  
  // STEP 5: CREATE FUNCTION WHEN USER CLICK FIND GAME IN GAME LIST
  
  //--------------------------------------
  
  // 5.1: Lay thanh input ra truoc va luc nut search ra
  
  const searchQuery = document.getElementById("search-query");
  const searchButton = document.getElementById("games-lists-btn");
  
  // 5.2: Khi click vao kinh lup se lay ket qua ra tu thanh Input
  searchButton.addEventListener("click", () => {
    console.log(searchQuery.value);
    getGames(searchQuery.value);
  });
  
  const getGames = async (query) => {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?q=${query}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const listOfGames = data.data;
      renderListOfGames(listOfGames);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  
  const renderGetOfGames = (listOfGeneres = []) => {
    const divGetActionList = document.getElementById("games-lists");
    divGetActionList.innerHTML = "";
    listOfGeneres.forEach((genre, index) => {
      divGetActionList.innerHTML += `
            <div id="action-lists" class="flex flex-column card card-shadow">
                <div>
                  <button id="action-list-btn" class="uppercase-btn" onclick="icon btn('${
                    genre.name
                  }')">
                    ${genre.name.toUpperCase()}
                  </button>
                </div>
            </div>
        `;
    });
  };
  
  // 5.4 Khi User click vào 1 game bất kỳ trong list game sẽ được truyền tới 1 link chi tiết về game đó.
  
  const getGameDetail = async (id) => {
    try {
      const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${id}`;
  
      const res = await fetch(url);
      const data = await res.json();
      const divListOfGames = document.getElementById("list-games");
      const detailGame = data.data;
      const genres = detailGame.genres;
      const tags = detailGame.steamspy_tags;
      const developers = detailGame.developer;
      const releaseDate = new Date(detailGame.release_date);
  
      divListOfGames.innerHTML = `
      <div class="detailGame">
        <img class="backgroundDetailGame" src="${detailGame.header_image}"/>
        <span class="detailGameTitle">${detailGame.name}</span>
        <span class="detailGameDescription">${detailGame.description}</span>
  
        <div class="genre">
          <span class="tag">Developer:</span>
          ${developers.map((developer) => {
            return `
          <div class="developerItem">
            <span class="genreTitle">${developers}</span>
          </div>
          `;
          })}
        </div>
  
        <div class="genre">
         <span class="tag">Date:</span>
         <span class="tag">${
           releaseDate.getDate() +
           "-" +
           (releaseDate.getMonth() + 1) +
           "-" +
           releaseDate.getFullYear()
         }</span>
        </div>
        
        <div class="genre">
         <span class="tag">Genres:</span>
         ${genres.map((genre) => {
           return `
          <div class="genreItem">
            <span class="genreTitle">${genre}</span>
          </div>
          `;
         })}
        </div>
  
        <div class="genre">
        <span class="tag">Tags:</span>
        ${tags.map((tag) => {
          return `
          <div class="genreItem">
            <span class="tagItem">${tag}</span>
          </div>
          `;
        })}
        </div>
      </div>
      `;
      console.log(data);
    } catch (err) {
      console.log("err", err);
    }
  };
  // ---------------
  