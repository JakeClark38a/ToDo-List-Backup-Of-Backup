import { chadBot } from './chadBot.js';
import { Utils } from './userData.js';
import { chatBox } from './hmtlComponent.js';

$(document).ready(function () {

    async function run() {
      if(!chadBot.isReady){ return };
        let input = $('#chat-message').val();  // get user input
        $('#chat-message').val('');  // empty input box

        let id = Utils.getUuid(); // random uuid for chat message send by AI in order to add effects

        $('#chat-content').append(chatBox.MessageDisplay(input,'none').send); // user chat message

        
        $('#chat-content').append(chatBox.MessageDisplay('',id).reply); // ai chat message 
        let c = $('#chat-content #' + id) 

        c.find('#chat-response').empty(); // empty the chat message box
        c.find('#chat-response').append(chatBox.waitingResponse().waiting_reply); // add waiting animation

        $('#Chat-Section #chat-send-button').empty(); // empty the send button
        $('#Chat-Section #chat-send-button').append(chatBox.waitingResponse().wating_sendbtn); // add waiting animation

        let text = await chadBot.chat(input , 'landing'); // get response from AI, the code define if the ai is in the landing or main page

        console.log(text);
        c.find('#chat-response').empty(); // empty the chat message box , remove the loading effect
        c.find('#chat-response').append(chatBox.MessageDisplay(text,'none').textcontent); // add the response from AI

        $('#Chat-Section #chat-send-button').empty(); // empty the send button
        $('#Chat-Section #chat-send-button').append(chatBox.waitingResponse().sendbtn); // add the send button svg
        chadBot.isReady = true;
    }

    $('#Chat-Section #chat-send-button').on('click', run);
    $("#chat-message").on('keydown', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        run();
      }
  });
  // e.key is the modern way of detecting keys
  // e.keyCode is deprecated (left here for for legacy browsers support)

    $('#Chat-Section #chat-open-button').on('click', () => { //open and close chat window
        $('#Chat-Section #chat-box-wrapper').toggle('fast');
        $('#Chat-Section #chat-open-button').hide()
    });

    $('#Chat-Section #close-chat-box').on('click', () => { //open and close chat window
        $('#Chat-Section #chat-box-wrapper').toggle('fast');
        $('#Chat-Section #chat-open-button').show()
    })


    const navbar = $('#navbar');
    const threshold = 100; // Threshold in pixels to hide/show navbar
    let lastScrollTop = 0;

    $(window).scroll(function () {
        let scrollTop = $(this).scrollTop();
        let isScrollingDown = scrollTop > lastScrollTop;

        if (Math.abs(scrollTop - lastScrollTop) > threshold) {
            navbar.toggleClass('hidden', isScrollingDown);
            lastScrollTop = scrollTop;
        }
    });

    
});