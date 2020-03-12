$(function() {
  function buildHTML(message) {
  // 「もしメッセージに画像が含まれていたら」という条件式
  if (message.image) {
    var html = `<div class="chat-main__message--list">
                <div class="chat-main__message--list__box__top">
                <div class="chat-main__message--list__box__top__user-name">
                  ${message.user_name}
                </div>
                <div class="chat-main__message--list__box__top__date">
                  ${message.created_at}
                </div>
                </div>
                <div class="chat-main__message--list__box__message">
                <p class="chat-main__message--list__box__message__body">
                  ${message.body}
                </p>
                <img class="chat-main__message--list__box__message__image" src=${message.image}>
                </div>
                </div>`
  return html;
  } else {
    var html = `<div class="chat-main__message--list">
                  <div class="chat-main__message--list__box__top">
                    <div class="chat-main__message--list__box__top__user-name">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__message--list__box__top__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__message--list__box__message">
                    <p class="chat-main__message--list__box__message__body">
                     ${message.body}
                    </p>
                  </div>
                </div>`
  return html;
  } 
}

$('.chat-main__message--form__text-box').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax ({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      console.log(message)
      var html = buildHTML(message);
      // debugger
      $('.messages').append(html)
      $('.chat-main').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat-main__message--form__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
});