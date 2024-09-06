$(function(){
    $( "#todos-container ul" ).sortable();
    //For Toggling Task Cross Off
    $("#todos-container").on("click",".container .text",function(){
        $(this).toggleClass("completed");
    });

    //For Deleting Todo on Click
    $("#todos-container").on("click","li span",function(e){
        $(this).parent().parent().fadeOut(500,function(){
            $(this).remove();
        });
        e.stopPropagation();
    });

    //Creation of new Task
    $("#todos-container").on("keypress","input[type='text']",function(e){
        var taskText = $(this).val().trim();
        if(e.which === 13 && taskText){
            $(this).val("");
            $("#todos-container ul").append(`<li draggable="true"><div class="container"><span class="trash"><i class="fas fa-trash-alt"></i></span> <div class="text">${taskText}</div></div></li>`);
        }
    });

    $(".fa-plus").on("click",function(){
        $("input[type='text']").fadeToggle();
    })
})
