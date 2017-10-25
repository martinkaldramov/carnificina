var assignButton = document.querySelector('#assign');
var reAssignButton = document.querySelector('#reAssign');
var manualAssignButton = document.querySelector('#manualAssign');
var ticketsSection = document.querySelector('.tickets');
var tickets = [];

assignButton.onclick = () => {
  console.log('Click!');  
}

axios.get('http://127.0.0.1:3000/incidents')
  .then((res) => {
    console.log(res);
    if(res.status == 200){
      tickets = res.data;    
      res.data.forEach((inc) => {
        console.log(inc.incNumber);  
      });
    }else
      console.log(res.status, res.statusText);
  })
  .catch((err) => {
    console.log(err);
  });

