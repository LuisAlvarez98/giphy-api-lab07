// By Luis Felipe Alvarez Sanchez
$(document).ready(function () {
  let themes = [
    "Halo 3",
    "Among Us",
    "League of Legends",
    "Elder Scrolls Skyrim",
  ];
  // The API Constant
  const API_KEY = "xNbQx8u8SOw3k6Yeo35i2ZQKK3ne7VKQ";

  // Load defined themes
  const loadThemes = () => {
    themes.forEach((item) => {
      $("#elements").append(
        `<button id="btn-element" type="submit" value=${item}> ${item} </button>`
      );
    });
  };
  loadThemes();

  // Adds an element to the theme list
  $("#add-element").on("click", (e) => {
    $("#elements").empty();
    e.preventDefault();
    let val = $("#element-input").val();
    themes.push(val);
    loadThemes();
  });

  $("#elements").on("click", "button", (e) => {
    // clear items
    $("#gifs").empty();
    // request object
    let requestObj = {
      api_key: API_KEY,
      q: e.target.value,
      limit: 10,
    };

    $.get("https://api.giphy.com/v1/gifs/search", requestObj, function (
      data,
      status
    ) {
      displayData(data);
    });
  });

  $("#gifs").on("click", ".image-item", function (e) {
    if ($(this).attr("data-clicked") === "yes") {
      $(this).attr("src", $(this).attr("data-img-still"));
      $(this).attr("data-clicked", "no");
    } else if ($(this).attr("data-clicked") === "no") {
      $(this).attr("src", $(this).attr("data-img-animated"));
      $(this).attr("data-clicked", "yes");
    }
  });

  const displayData = (data) => {
    data.data.forEach((item) => {
      $("#gifs").append(
        `
        <div class="container-img">
        <p>${item.rating}</p>
            <img data-img-still=${item.images.fixed_height_still.url} data-img-animated=${item.images.fixed_height.url} data-clicked="no" class="image-item" alt="image" width="200" height="200" src=${item.images.fixed_height_still.url}/>
        </div>
        `
      );
    });
  };
});
