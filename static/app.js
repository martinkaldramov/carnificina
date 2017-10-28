var assignButton = document.querySelector('#assign');
var reAssignButton = document.querySelector('#re-assign');
var manualAssignButton = document.querySelector('#manual-assign');
var ticketsSection = document.querySelector('.tickets');
var statusP = document.querySelector('.status p');
var assignEmema = document.getElementById('assign-emea');
var assignKl= document.getElementById('assign-kl');
var assignCr= document.getElementById('assign-cr');
var track = document.getElementById('track');
var content = document.querySelector(".status .content");

var emptyContent = () => {
  while (content.firstChild) {
        content.removeChild(content.firstChild);
  }
}

var createP = () => {
  document.createElement('p');

}

var assign = (queue) => {
  var incNumber = document.getElementById('ticket-number').value;
  console.log(incNumber);

  if(incNumber == ""){
    statusP.innerHTML = "Please enter a ticket number";
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
      statusP.innerHTML = `${res.data.incNumber} already assigned to ${res.data.assignedTo}. Do you want to re-assign it?`;
      return;
    }
    statusP.innerHTML = `${res.data.incNumber} has been assigned to ${res.data.assignedTo}`;
  })
  .catch((e) => {
    console.log(e);
  });
}

var reAssign = () => {
  var incNumber = document.getElementById('ticket-number').value;
  var queue = document.querySelector('.queue:checked').value;

  axios.post('/incidents-reassign', {
    incNumber,
    assignedBy: "Georgi Vachev",
    assignedTo: "Dimitar Pelovski",
    queue
  })
  .then((res) => {
    console.log(res);
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

track.onclick = () => {
  emptyContent();  
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
