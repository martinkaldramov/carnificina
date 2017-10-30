var assignButton = document.querySelector('#assign');
var reAssignButton = document.querySelector('#re-assign');
var manualAssignButton = document.querySelector('#manual-assign');
var ticketsSection = document.querySelector('.tickets');
var statusP = document.querySelector('.status p');
var assignEmema = document.getElementById('assign-emea');
var assignKl= document.getElementById('assign-kl');
var assignCr= document.getElementById('assign-cr');
var trackButton = document.getElementById('track');
var content = document.querySelector(".status .content");

var emptyContent = () => {
  while (content.firstChild) {
        content.removeChild(content.firstChild);
  }
}

var createP = (text, additionalClass) => {
  var statusP = document.createElement('p');
  statusP.className += ' statusP';
  if(additionalClass)
    statusP.className = additionalClass;
  statusP.innerHTML = text;
  content.appendChild(statusP);
}

var createButton = (text, id, click) => {
  var btn = document.createElement('button');
  btn.id += id;
  btn.innerHTML = text;
  btn.onclick = click;
  content.appendChild(btn);
}

var assign = (queue) => {
  var incNumber = document.getElementById('ticket-number').value;
  console.log(incNumber);

  if(incNumber == ""){
    emptyContent();
    createP('Enter a ticket number first.');
    return;
  }

  axios.post('/incidents', {
    incNumber,
    assignedBy: "Kalin Arsenov",
    assignedTo: "Dimitar Pelovski",
    queue: queue
  })
  .then((res) => {
    console.log(res);
    if(res.status == 202){
      if(res.data.assignedTo == 'tracked'){
        reAssign();
        return;
      }
      var txt = `${res.data.incNumber} already assigned to ${res.data.assignedTo}. Do you want to re-assign it?`;
      emptyContent();
      createP(txt);
      createButton('Yes', 'Yes', reAssign);
      createButton('No', 'No', () => {});
      return;
    }
    var txt = `${res.data.incNumber} has been assigned to ${res.data.assignedTo}`;
    emptyContent();
    createP(txt);
    incNumber.value = "";
  })
  .catch((e) => {
    console.log(e);
  });
}

var reAssign = () => {
  var incNumber = document.getElementById('ticket-number').value;
  
  if(incNumber == ""){
    emptyContent();
    createP('Enter a ticket number first.');
    return;
  }

  axios.post('/incidents-reassign', {
    incNumber,
    assignedBy: "Georgi Vachev",
    assignedTo: "Dimitar Pelovski",
  })
  .then((res) => {
    console.log(res);
    incNumber.value = "";
  })
  .catch((e) => {
    console.log(e);
  });
}

var assignAgain = () => {
    
}

var track = () => {
  var incNumber = document.getElementById('ticket-number').value;  

  if(incNumber == ""){
    emptyContent();
    createP('Enter a ticket number first.');
    return;
  }
  axios.post('/incidents-track', {
    incNumber,
    assignedBy: "Bat Georgi"
  })
  .then((res) => {
    console.log(res);  
    var txt = `${res.data.incNumber} has been tracked by ${res.data.assignedBy}`;
    emptyContent();
    createP(txt);
  })
  .catch((e) => {
    console.log(e);  
  });
}

assignEmema.onclick = () => {
  assign(assignEmema.value);  
}

assignCr.onclick = () => {
  assign(assignCr.value);  
}

assignKl.onclick = () => {
  assign(assignKl.value);  
}

reAssignButton.onclick = () => {
  reAssign();
}

trackButton.onclick = () => {
  emptyContent();
  track();
}

axios.get('http://127.0.0.1:3000/incidents')
  .then((res) => {
    console.log(res);
    if(res.status == 200){
      tickets = res.data;
      res.data.forEach((inc) => {
        var id = document.createElement('p');
        var assignee = document.createElement('p');
        var div = document.createElement('div');
        id.innerHTML = inc.incNumber;
        assignee.innerHTML = inc.assignedTo;
        div.appendChild(id);
        div.appendChild(assignee);
        ticketsSection.appendChild(div);
        console.log(inc.incNumber);
      });
    }else
      console.log(res.status, res.statusText);
  })
  .catch((err) => {
    console.log(err);
  });
