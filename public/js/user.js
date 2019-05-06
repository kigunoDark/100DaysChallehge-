const deleteTeam = (btn) => {
   const teamMateId = btn.parentNode.querySelector('[name=teamMateId]').value;
   const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
   const teamMateEmail = btn.parentNode.querySelector('[name=teamMateEmail]').value;
   const productElement = btn.closest('tbody');

console.log(teamMateId);
fetch('/reject-user/' + teamMateId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf,
            'teamMateEmail':teamMateEmail
        }
   })
   .then(result => {
       return result.json();
   })
   .then(data => {
       console.log(data);
       productElement.parentNode.removeChild(productElement);
   })
   .catch(err =>{
       console.log(err);
   });
}


const deleteTeams = (btn) => {
    const teamMateId = btn.parentNode.querySelector('[name=teamMateId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const teamMateEmail = btn.parentNode.querySelector('[name=teamMateEmail]').value;
    const productElement = btn.closest('table');
 
 console.log(teamMateId);
 fetch('/reject-user/' + teamMateId, {
         method: 'DELETE',
         headers: {
             'csrf-token': csrf,
             'teamMateEmail':teamMateEmail
         }
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        console.log(data);
        productElement.parentNode.removeChild(productElement);
    })
    .catch(err =>{
        console.log(err);
    });
 }