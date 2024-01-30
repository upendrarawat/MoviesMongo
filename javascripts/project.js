$(document).ready(function(){
$.getJSON("/movie/fetch_all_state",
function(response){
     response.data.map((item)=>{
          $('#stateid').append($('<option>').text(item.statename).val(item._id))
     })
})

$('#stateid').change(function(){

     $.getJSON('/movie/fetch_all_city',{stateid:$('#stateid').val()},
function(response){
     $('#cityid').empty()
     $('#cityid').append($('<option>').text('-Select Type-'))

     response.data.map((item)=>{
          $('#cityid').append($('<option>').text(item.cityname).val(item._id))
     })
})



})
})