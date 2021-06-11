$(function(){
    LoadReciepies();   
    $("#recipes").on("click", "#delbtn", handleDelete);
    $("#recipes").on("click", "#editbtn", handleUpate);
    $("#addbtn").click(Addrecipes);

});

function handleUpate (){
    $("#UpdateModal").modal("show");    
}


function Addrecipes(){
    var title =  $("#title").val();
    var body =  $("#body").val();
$.ajax({
 URL: "https://usman-recipes.herokuapp.com/api/recipes", 
method: "POST",
data: {title, body},
success: function(response){
    console.log(response);
    LoadReciepies(); 
}
});
}


function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipes");
    let id = parentDiv.attr("data-id");
    console.log(id);
 
    $.ajax({
        URL: "https://usman-recipes.herokuapp.com/api/recipes"+id, 
        method: "DELETE",
        success: function(){
            LoadReciepies(); 
        }
    });
    
}

function LoadReciepies() {
$.ajax({
    URL: "https://usman-recipes.herokuapp.com/api/recipes", 
    method: "GET",
    success: function(response){
        console.log(response);
        var recipes = $("#recipes");
        recipes.empty();
        for (var i=0; i< 10; i++)
        {
           var rec= response[i];
            recipes.append( `<div class= "recipes" data-id="${rec._id}"> <h3> ${rec.title}</h3> <p> <button id ="delbtn"class "btn btn-danger"> delete </button> <button id ="editbtn"class "btn btn-warning"> Edit </button>${rec.body}</p> </div>`);
        }
    }
});
}