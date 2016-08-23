$(function() {

  //listenner list all contacts
  $('#list-all').click(function(){
    listAllContacts();
  });

  //listenner search contact form 
  $('#search-contact-form').submit(function(event){
    event.preventDefault();    var $form = $(this);
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
    $.ajax({
      async: false,
      url: "/contacts",
      method: "get",
      data: {keyword: keyword},
      success: function(data){
        result = data;
      }
    });
    return result;
  };

  //create a table and append to page
  function buildTable(list){
    var table = $('<table></table>').addClass('contact-list table table-striped');
    var thead = $('<thead><tr><th>Name</th><th>Email</th><th>Created At</th></tr></thead>')
    var tbody = $('<tbody></tbody>')
    for(i=0; i<list.length; i++){  
        var row = $('<tr></tr>').addClass('contact-list-item');
        var contactName = $('<td></td>').addClass('contact-list-name').text(list[i].name);
        var contactEmail = $('<td></td>').addClass('contact-list-name').text(list[i].email);
        var contactCreatedAt = $('<td></td>').addClass('contact-list-name').text(list[i].created_at);
        row.append(contactName).append(contactEmail).append(contactCreatedAt);
        tbody.append(row);
    }
    table.append(thead).append(tbody);
    $('#contact-list-wrap').html(table);
  }


  //create a contact
  $('#create-contact-form').submit(function(event){
    var $form = $(this);
    event.preventDefault();
    $.ajax({
      url: $form.attr('action'),
      method: "post",
      data: $form.serialize(),
      success: function(data){
        listAllContacts();
      }
    });
  });

});


