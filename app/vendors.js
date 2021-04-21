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
function getTime(){
    var d = new Date();
    var n = d.toLocaleDateString();
    return n;
}
function toggle(id, something, visited){alert(id);
    var c = Cookies.get('placesVisited').split('|');
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var docRef = db.collection("users").doc(user.uid.toString());
    
    if(visited){alert("Mark as unvisited");
        var l = c.indexOf(something) - 1;
        c.splice(l, l+1);
        docRef.update({visited: firebase.firestore.FieldValue.arrayRemove(something)}).then(() => {
            Cookies.set('placesVisited', c.join("|"), {path: '' });
            console.log("Document successfully updated!");
            location.reload(false);
        });
    } else {alert('Mark as visited');
        label = id.toString()+"@"+getTime();
        c.push(label);
        docRef.update({visited: firebase.firestore.FieldValue.arrayUnion(label)}).then(() => {
            Cookies.set('placesVisited', c.join("|"), {path: '' });
            console.log("Document successfully updated!");
            location.reload(false);
        });
    }    
}
async function getUserData(){
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
            Cookies.set('placesVisited', data.visited.join("|"), {path: '' });
        } else {
            // doc.data() will be undefined in this case
            alert("User Data not found!");
            console.log("No such document!");
            docRef.set({visited:[0]});
            Cookies.set('placesVisited', "|", {path: '' });
            alert("User Data Generated");
            
        }
      }).catch((error) => {
          alert("An error occured.");
          console.log("Error getting document:", error);
      });
    } else {
      // No user is signed in.
      console.log("Not signed in", error);
    }
  }).then(function() {
    location.reload();
});
  
}
function makeCard(vendor, something) {
  var green = "success";
  var gray = "muted";
  var yes = "Visited!";
  var no = "Not Visited Yet";
  var visited = !(something===undefined);
  var card = "<div class='card'><img class='card-img-top' src='../images/vendors/"+vendor.image+"' alt='"+vendor.name+"'><div class='card-body'><h5 class='card-title'>"+vendor.name+"</h5><p class='card-text'>"+vendor.description+"</p><p class='text-"+(visited?green:gray)+"'>"+(visited?yes:no)+"</p></div><div class='card-footer'><div class='btn-group'><a href='https://www."+vendor.link+ "' target='_blank' class='btn btn-primary'>See more information</a><button onclick=\"toggle("+vendor.id+",\'"+something+"\',"+visited+")\" class='btn btn-primary text-white'>"+(visited?"Unmark":"Mark") + " As Visited</button></div></div></div>";
  return card;
}

async function getCards() {
  var s = "";
  var v = Cookies.get('placesVisited');
  if(!v) {
    alert("Getting user data from database");
    await getUserData();
    v = Cookies.get('placesVisited');
  }
  alert(v);
  var placesVisited = v.split("|");
  alert(placesVisited);
  for (x of vendors) {
    y = placesVisited.find(a =>a.includes(x.id.toString()+"@"));
    s += makeCard(x, y);
    alert(x); alert(s);
  }
  return s;
}
