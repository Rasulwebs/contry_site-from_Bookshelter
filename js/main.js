"use strict";


// modal menu





// ================ Paginate func ======================
async function getUser() {
  const users = await fetch("https://restcountries.com/v2/all");
  const result = await users.json();
  return result;
};
async function dataRender(num) {
  $(".count_card_wrapp").innerHTML = "";
  $(".paginationnn").innerHTML = "";
  const data = await getUser();

  const currentPage = num || 1;
  const totalPage = 20;

  const end = currentPage * totalPage;

  const start = end - totalPage;

  const lastData = data.slice(start, end);

  paginate(data, lastData, totalPage, currentPage);
};

function paginate(all, data, current, num) {
  //   // console.log(num);

  let dot = [];

  for (let i = 1; i <= Math.ceil(all.length / current); i++) {
    dot.push(i);
  };

  dot.forEach((i) => {
    // console.log(i);
    const li = crElement(
      "li",
      `${i == num
        ? "page-item p-3 shadow m-2 rounded-5 act"
        : "page-item p-3 shadow m-2 rounded-5"
      }`, i
    );
    $(".paginationnn").appendChild(li);
  });
  data.forEach((item) => {
    const carrd = crElement(
      "div",
      "col-lg-4 col-md-6 col-sm-12 boxx",
      `     <div class="card shadow mt-3">
      <img src="${item.flags.png}" alt="img"
          class="card-img img-fluid p-4 bg-secondarys">
      <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-Lest-Name">${item.nativeName}</p>
          
          <div class="d-flex justify-content-between">
              <button class="btn bookmark-btn w-100 mx-2" data-bok=${item.name}>Bookmark</button>
              <a href="https://www.britannica.com/browse/Countries-of-the-World" class="btn bookmark-info w-100 mx-2 text-primary">More
                  Info</a>
          </div>
          <div class="bookmark-btn-center text-center"><button
                  class="btn text-center w-100 bookmark-redmore" data-read=${item.capital}>Read</button></div>
      </div>
  </div>`);
    $(".info_length").textContent = `Result(s) ${data.length} `
    carrd.dataset.info = item.name;
    $(".count_card_wrapp").appendChild(carrd);

carrd.addEventListener("click", (e) => {
      renderModal(e.target.getAttribute("data-bok"));
    });
  


  });
  $a(".bookmark-redmore").forEach((readBtn) => {
    readBtn.addEventListener("click", (e) => {
      renderModal2(e.target.getAttribute("data-read"))
    });
  });


  // modal window info
  $a(".bookmark-redmore").forEach((readBtn) => {
    readBtn.addEventListener("click", () => {
      $(".red-more-wrap").style.right = "0px"
      
    });
  });
 
};

$(".paginationnn").addEventListener("click", (e) => {

  if (e.target.textContent) {
    dataRender(e.target.textContent);
  }
});
dataRender();





// ============== Name api search func ======================

async function searchCountry(query) {
  $(".count_card_wrapp").innerHTML = ``;
  const nameInfo = await fetch(`https://restcountries.com/v3.1/name/${query}`);
  const res = await nameInfo.json();
  $(".count_card_wrapp").innerHTML = "";
  if (res.message) {
    // $(
    //   ".count_card_wrapp"
    // ).innerHTML = `<h2 class="text-warning fs-1 text-center m-5">Not Found</h2>`;
  } else {
    renderData(res);
  }
};
// searchCountry();

/////////////////////////////////////////
$("#serach-country").addEventListener("keyup", (e) => {

  if (e.target.value.length === 0) {
    // allCountry()
  } else {
    searchCountry(e.target.value.trim().toLowerCase());
  }
});


function renderData(data = []) {
  if (data.length === 0) {
    $(".count_card_wrapp").innerHTML = ``; // loading
  } else {
    $(".count_card_wrapp").innerHTML = "";

    data.forEach((item) => {

      const card = crElement(
        "div",
        "col-lg-4 col-md-6 col-sm-12 boxx",
        `     <div class="card shadow mt-3">
                <img src="${item.flags.png}" alt="img"
                    class="card-img img-fluid p-4 bg-secondarys">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-Lest-Name">${item.nativeName}</p>

                    <div class="d-flex justify-content-between ">
                        <button class="btn  bookmark-btn w-100 mx-2">Bookmark</button>
                        <a href="https://www.britannica.com/browse/Countries-of-the-World" class="btn  bookmark-info w-100 mx-2 text-primary">More
                            Info</a>
                    </div>
                    <div class="bookmark-btn-center text-center"><button
                            class="btn text-center w-100 bookmark-redmore">Read</button></div>
                </div>
            </div>

       `
      );
      card.dataset.info = item.name;
      $(".count_card_wrapp").appendChild(card);

      card.addEventListener("click", (e) => {
        // console.log(card.getAttribute("data-info"));
      });
    });
  }
}
renderData();







// bookmark


async function renderModal(data) {
  // console.log(data);
  const result = await fetch("https://restcountries.com/v2/all");
  const res = await result.json();


  res.forEach((item) => {
    if (item.name == data) {

      const modal = crElement(
        "div",
        "card-bookmark d-flex align-items-center mt-4",
        `<div class="card-bookmark-text">
         <h5 class="fs-5">${data}[</h5>
         <p class="bokmark-info mb-0">${item.nativeName}</p>
         </div>
         <div class="card-bookmark-imgs mx-3 d-flex justify-content-end">
         <img src="./images/book.png" class="mx-2" alt="img">
         <img src="./images/book-delet.png" class="mx-2" alt="img">
         </div>`
      );

      $(".sidebar-bookmarks-wrapperr").appendChild(modal);
    }
  });
};


// modal info


async function renderModal2(datad) {
  // console.log(data);

  const result = await fetch("https://restcountries.com/v2/all");
  const res = await result.json();


  res.forEach((item) => {
    if (item.capital == datad) {
      $(".more_wrapp").innerHTML="";
      const modal2 = crElement(
        "div",
        "more_wrapp",
        ` <div class="d-flex justify-content-between px-3 pt-4 pb-4 redmore-top">
        <h2 class="card-title-red-more">${item.name}</h2>
        <div class="back-to-index"><i class="close_modal bi bi-x-lg"></i></div>
    </div>
    <div class="card-redmore">
        <img src="${item.flags.png}" class="img-fluid mt-5 mb-5 mx-auto d-block" alt="imh">
        <div class="card-body">
            <div class="card-description w-75 mx-auto">
            <div class="modall_info row">
            <h2 class="modal_title text-center mt-3">${item.name}</h2>
            <div class="col-lg-6 col-md-5 col-sm-12 mt-2">
            <p><strong>Capital:</strong>${item.capital}</p>
            <p><strong>Subregion:</strong>${item.subregion}</p>
            <p><strong>Callingcode:</strong>${item.region}</p>
            <p><strong>Population:</strong>${item.population}</p>
            <p><strong>Timezones:</strong>${item.timezones[0]}</p>
            
            <p><strong>Callingcode:</strong>${item.callingCodes[0]}</p></div>
         
            <div class="col-lg-6 col-md-5 col-sm-12 mt-2">
            <p><strong>Alphacode:</strong>${item.alpha3Code}</p>
            <p><strong>Demon:</strong>${item.demonym}</p>
            <p><strong>Area:</strong>${item.area}</p>
            <p><strong>Domain:</strong>${item.topLevelDomain}</p>
            </div>
                <div class="card-red-more-author mt-4">
                    <p><strong>Author : </strong><span class="mx-3">Rasul</span></p>
                </div>
                <div class="card-red-more-author mt-4">
                    <p><strong>Published : 
                        </strong><span class="mx-3">2022</span></p>
                </div>
                <div class="card-red-more-author mt-4">
                    <p><strong>Categories:
                        </strong><span class="mx-3">Country</span></p>
                </div>
            </div>

        </div>
    </div>`
      );

      $(".more_wrapp").appendChild(modal2);
    };
    $(".close_modal").addEventListener("click", () => {
      $(".red-more-wrap").style.right = "-1000px"
    });

  });
};



// let arr=[1,1,1,3,4,6,5,7,3,5];

// let arr2=[];

// function addd(){
//   arr.forEach((item)=>{
//     if(arr2!=item){
//       arr2.push(item)
//     }
//   })
//   console.log(arr2);
// };
// addd()




// ///////////////////////////////////////////////////////////////////////
// // theme moon dark anda theme light sun
$(".theme").addEventListener("click", () => {
  if ($(".theme").classList.contains("bi-moon-stars-fill")) {
    $(".theme").classList.toggle("bi-sun");
  }
  if ($(".theme").classList.contains("bi-sun")) {
    $("body").style.backgroundColor = "rgba(0, 51, 117, 0.952)";
    $(".card-bookmark").style.backgroundColor = "rgba(44, 0, 139, 0.741)";
    $(".red-more-wrap").style.backgroundColor = "rgba(0, 51, 117, 0.952)";
    $(".header").style.backgroundColor = "rgba(0, 51, 117, 0.952)";
    $a(".card").forEach((cardds) => {
      console.log(cardds);
      cardds.style.backgroundColor = "rgba(0, 51, 117, 0.952)";
    });
    $a("p").forEach((texts) => {
      console.log();
      texts.style.color = "white";
    });
    $a("strong").forEach((strongText) => {
      console.log(cardds);
      strongText.style.backgroundColor = "white";
    });
    $a("h5").forEach((titles) => {
      console.log();
      titles.style.color = "white";
    });
    $a("h4").forEach((ttls) => {
      console.log();
      ttls.style.color = "white";
    });
   
  } else {
    $("body").style.backgroundColor = "white";
    $(".card-bookmark").style.backgroundColor = "#F8FAFD";
    $(".red-more-wrap").style.backgroundColor = "white";
    $a(".card").forEach((cardds) => {
      console.log(cardds);
      cardds.style.backgroundColor = "white";
    });
    $a("p").forEach((texts) => {
      console.log();
      texts.style.color = "black";
    });
    $a("h5").forEach((titles) => {
      console.log();
      titles.style.color = "black";
    });
    $a("h4").forEach((ttls) => {
      console.log();
      ttls.style.color = "black";
    });
    $(".header").style.backgroundColor = "#fff";
  }
});