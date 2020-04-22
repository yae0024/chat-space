$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class='message'>
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
      var html = `<div class='message'>
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
});