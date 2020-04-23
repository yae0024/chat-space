$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class='message' data-message-id=${message.id}>
                    <div class='message__first_line'>
                      <p class='message__first_line__user_name'>
                        ${message.user_name}
                      </p>
                      <p class='message__first_line__date'>
                        ${message.created_at}
                      </p>
                    </div>
                    <div class='message__second_line'>
                      <p>
                        ${message.body}
                      </p>
                      <img class="message__second_line__image" src=${message.image}>
                    </div>
                  </div>`
                  return html;
    } else {
      var html = `<div class='message' data-message-id=${message.id}>
                    <div class='message__first_line'>
                      <p class='message__first_line__user_name'>
                        ${message.user_name}
                      </p>
                      <p class='message__first_line__date'>
                        ${message.created_at}
                      </p>
                    </div>
                    <div class='message__second_line'>
                      <p>
                        ${message.body}
                      </p>
                    </div>
                  </div>`
                  return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST", 
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit_btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});