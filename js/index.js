const btn = document.getElementById("submitbtn");

  let retreivedobj = JSON.parse(localStorage.getItem("bikecard"));
        let count = retreivedobj.length-1;
        console.log(count);
        console.log(retreivedobj[count]);
        

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const bike = document.getElementById("bike-model").value;
  const mileage = document.getElementById("bike-mileage").value;
  const locatio = document.getElementById("city").value;
  const image = document.getElementById("fileInput").value;
  const pay = document.getElementById("hourly-rate").value;

  // Create new bike object
  let cardObj = [{
    bikename: bike,
    mileagekmpl: mileage,
    loc: locatio,
    img: image,
    payment: pay
  }];

  let existing = localStorage.getItem("bikecard");
  let cardbody = existing ? JSON.parse(existing) : [];
  cardbody.push(cardObj);

  // Save back to localStorage
  localStorage.setItem("bikecard", JSON.stringify(cardbody));

  const app = document.getElementById("addbike-body");
  const appelement = document.createElement("div");
  appelement.innerHTML = ` <div class="col-md-6 mb-4">
                                <h1>hello</h1>
                                </div>`

    app.append(appelement);
});



 
