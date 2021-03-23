// REMOVE BEFORE DEPLOY
window.addEventListener("error", handleError, true);

function handleError(evt) {
    if (evt.message) { // Chrome sometimes provides this
      alert("error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename);
    } else {
      alert("error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
    }
}
// REMOVE BEFORE DEPLOY
var vendors = [
  {
    "id": 0,
    "name": "Location 1",
    "description": "This is Location 1!",
    "link": "google.com",
    "image": "0.png"
  },
  {
    "id": 1,
    "name": "Location 2",
    "description": "This is Location 2!",
    "link": "google.com",
    "image": "0.png"
  },
  {
    "id": 2,
    "name": "Location 3",
    "description": "This is Location 3!",
    "link": "google.com",
    "image": "0.png"
  },
  {
    "id": 3,
    "name": "Location 4",
    "description": "This is Location 4!",
    "link": "google.com",
    "image": "0.png"
  },
  {
    "id": 4,
    "name": "Location 5",
    "description": "This is Location 5!",
    "link": "google.com",
    "image": "0.png"
  },
  {
    "id": 5,
    "name": "Location 6",
    "description": "This is Location 6!",
    "link": "google.com",
    "image": "0.png"
  },
  {
    "id": 6,
    "name": "Location 7",
    "description": "This is Location 7!",
    "link": "google.com",
   "image": "0.png"
  },
  {
    "id": 7,
    "name": "Location 8",
    "description": "This is Location 8!",
    "link": "google.com",
    "image": "0.png"
    
  },
  {
    "id": 8,
    "name": "Location 9",
    "description": "This is Location 9!",
    "link": "google.com",
    "image": "0.png"
  },
  {
    "id": 9,
    "name": "Location 10",
    "description": "This is Location 10!",
    "link": "google.com",
    "image": "0.png"
  }
];
function setCookie(cname, cvalue) {
  exdays = 1;
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(name){
    var pattern = RegExp(name + "=.[^;]*")
    var matched = document.cookie.match(pattern)
    if(matched){
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}
function getUserData(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      var db = firebase.firestore();
      var docRef = db.collection("users").doc(user.uid.toString());
      docRef.get().then((doc) => {
        if (doc.exists) {
            var data = doc.data();
            console.log(data);
            setCookie('placesVisited', data.visited.join("|"));
            setCookie('timestamps', data.timestamps.join("|"));
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    } else {
      // No user is signed in.
      console.log("Not signed in", error);
    }
  });
}
function makeCard(vendor, visited) {
  var green = "success";
  var gray = "muted";
  var yes = "Visited!";
  var no = "Not Visited Yet";
  var card = "<div class='card'><img class='card-img-top' src='../images/vendors/"+vendor.image+"' alt='"+vendor.name+"'><div class='card-body'><h5 class='card-title'>"+vendor.name+"</h5><p class='card-text'>"+vendor.description+"</p><p class='text-"+(visited?green:gray)+"'>"+(visited?yes:no)+"</p></div><div class='card-footer'><div class='btn-group'><a href='https://www."+vendor.link+ "' target='_blank' class='btn btn-primary'>See more information</a><a class='btn btn-primary text-white'>"+(visited?"Unmark":"Mark") + " As Visited</a></div></div></div>";
  return card;
}
function getCards() {
  var s = "";
  var v = getCookie('placesVisited');
  if(!v) {
    getUserData();
    v = getCookie('placesVisited');
  }
  alert(v);
  var placesVisited = v.split("|");
  for (x of vendors) {
    s += makeCard(x, placesVisited.includes(x.id));
  }
  return s;
}
