$(function() {

  //listenner list all contacts
  $('#list-all').click(function(){
    listAllContacts();
  });

  //listenner search contact form 
  $('#search-contact-form').submit(function(event){
    event.preventDefault();    
    var $form = $(this);
    listAllContacts($form.find('input[name="keyword"]').val());
  });

  //list all contact result found
  function listAllContacts(keyword){
    list = getAllContacts(keyword);
    if (list.length === 0) {
      $('#contact-list-wrap').text("No contact found");
    } else{
      buildTable(list);
    }
  }
  // Get all contact
  var getAllContacts = function(keyword){
    var result = null;
    spinnerShow();
    $.ajax({
      async: false,
      url: "/contacts",
      method: "get",
      data: {keyword: keyword},
      success: function(data){
        result = data;
        setTimeout(spinnerHide,500);
        
      }
    });
    return result;
  };

  var source = $("#contact-list-table-script").html();
  var tableTemplate = Handlebars.compile(source);
      source = $("#contact-list-table-row-script").html();
  var rowTemplate = Handlebars.compile(source);

  //create a table and append to page
  function buildTable(list){
    var rows = "";
    for(i=0; i<list.length; i++){  
        var context = {
                    name: list[i].name,
                    email: list[i].email, 
                    created_at: list[i].created_at,
                    id: list[i].id
                  };
        var row = rowTemplate(context);
        rows += row;
    }
    var table = tableTemplate({rows: rows});
    $('.contact-list-table').remove();
    $('#contact-list-wrap').append(table);
  }


  //create a contact
  $('#create-contact-form').submit(function(event){
    var $form = $(this);
    event.preventDefault();
    spinnerShow();
    $.ajax({
      url: $form.attr('action'),
      method: "post",
      data: $form.serialize(),
      success: function(data){
        spinnerHide();
        listAllContacts();
      }
    });
  });

  //Delete a contact
  $('body').on('click', '.contact-list-table .remove_button', function(e){
    e.preventDefault();
    spinnerShow();
    var $row = $($(this).parents("tr"));
    var id = $row.data("id");
    $.ajax({
      url: '/contacts/' + id,
      method: "delete",
      success: function(data){
        spinnerHide();
        if(data.success){
          $row.remove();
        }
      },
      errors: function(){
      }
    });
  });

  var spinnerShow = function(){
    $('#spinner').removeClass("hidden");
    $('#spinner').addClass("visible");
  }
  var spinnerHide = function(){
    $('#spinner').removeClass("visible");
    $('#spinner').addClass("hidden");
  }
});


