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

    // Image comparison slider
    function initComparisons() {
      var x, i;
      /*find all elements with an "overlay" class:*/
      x = document.getElementsByClassName("img-comp-overlay");
      for (i = 0; i < x.length; i++) {
        /*once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function:*/
        compareImages(x[i]);
      }
      function compareImages(img) {
        var slider, img, clicked = 0, w, h;
        /*get the width and height of the img element*/
        w = img.offsetWidth;
        h = img.offsetHeight;
        /*set the width of the img element to 50%:*/
        img.style.width = (w / 2) + "px";
        /*create slider:*/
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        /*insert slider*/
        img.parentElement.insertBefore(slider, img);
        /*position the slider in the middle:*/
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        /*execute a function when the mouse button is pressed:*/
        slider.addEventListener("mousedown", slideReady);
        /*and another function when the mouse button is released:*/
        window.addEventListener("mouseup", slideFinish);
        /*or touched (for touch screens:*/
        slider.addEventListener("touchstart", slideReady);
        /*and released (for touch screens:*/
        window.addEventListener("touchend", slideFinish);
        function slideReady(e) {
          /*prevent any other actions that may occur when moving over the image:*/
          e.preventDefault();
          /*the slider is now clicked and ready to move:*/
          clicked = 1;
          /*execute a function when the slider is moved:*/
          window.addEventListener("mousemove", slideMove);
          window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
          /*the slider is no longer clicked:*/
          clicked = 0;
        }
        function slideMove(e) {
          var pos;
          /*if the slider is no longer clicked, exit this function:*/
          if (clicked == 0) return false;
          /*get the cursor's x position:*/
          pos = getCursorPos(e)
          /*prevent the slider from being positioned outside the image:*/
          if (pos < 0) pos = 0;
          if (pos > w) pos = w;
          /*execute a function that will resize the overlay image according to the cursor:*/
          slide(pos);
        }
        function getCursorPos(e) {
          var a, x = 0;
          e = (e.changedTouches) ? e.changedTouches[0] : e;
          /*get the x positions of the image:*/
          a = img.getBoundingClientRect();
          /*calculate the cursor's x coordinate, relative to the image:*/
          x = e.pageX - a.left;
          /*consider any page scrolling:*/
          x = x - window.pageXOffset;
          return x;
        }
        function slide(x) {
          /*resize the image:*/
          img.style.width = x + "px";
          /*position the slider:*/
          slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
      }
    }
    initComparisons();
});