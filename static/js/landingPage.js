import { chadBot } from './chadBot.js';
import { Utils } from './userData.js';

$(document).ready(function () {

    function waitingResponse() {
        return {
          sendbtn:(`
          <svg class="w-full h-full text-main rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
          </svg>
          `),
          sendbtnwait:(`

          <svg class="w-full h-full text-main rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
          </svg>

          <svg aria-hidden="true" class="w-3/4 h-3/4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>

          `),
          chatbox:(`
        <svg fill="#c2c2c2" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-bounce"
        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 342.382 342.382" xml:space="preserve"
        stroke="#c2c2c2">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <g>
                <path
                  d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219 c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z">
                </path>
              </g>
              <g>
                <path
                  d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219 c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z">
                </path>
              </g>
              <g>
                <path
                  d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219 c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z">
                </path>
              </g>
            </g>
          </g>
        </g>
      </svg>
        `)};
    };

    function MessageDisplay(message, id = Utils.getUuid()) {
        return{
          textcontent:(`
          <p class="text-xs font-normal lg:text-base text-gray-900 dark:text-white">`+ message + `</p>
          `),
          reply:(`
          <div id='`+ id + `' class="flex items-start gap-2.5 my-2">
          <img class="w-8 h-8 rounded-full" src="../static/images/gigachad.jpg" alt="Jese image">
          <div class="flex flex-col gap-1">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">Chad</span>
              </div>
              <div id="chat-response"
              class="flex flex-col leading-1.5  p-4 max-w-40 lg:max-w-64 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p class="text-xs font-normal lg:text-base text-gray-900 dark:text-white">`+ message + `</p>
              </div>
          </div>
      </div>
          `),
          send:(`
        <div class="flex items-start justify-end gap-2.5 my-2">
            <div class="flex flex-col gap-1">
                <div class="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">You</span>
                </div>
                <div id="chat-response"
                    class="flex flex-col leading-1.5 p-4 max-w-40 lg:max-w-64 border-gray-200 bg-gray-100 rounded-s-xl rounded-br-xl dark:bg-gray-700">
                    <p class="text-xs font-normal lg:text-base text-gray-900 dark:text-white">`+ message + `</p>
                </div>
            </div>
            <image class="w-8 h-8 rounded-full" src="../static/images/gigachad.jpg" alt="Jese image">
            </div>
    `)};
    }



    async function run() {
      if(!chadBot.isReady){ return };
        let input = $('#chat-message').val();  // get user input
        $('#chat-message').val('');  // empty input box

        let id = Utils.getUuid(); // random uuid for chat message send by AI in order to add effects

        $('#chat-content').append(MessageDisplay(input,'none').send); // user chat message

        
        $('#chat-content').append(MessageDisplay('',id).reply); // ai chat message 
        let c = $('#chat-content').find('#' + id) 

        c.find('#chat-response').empty(); // empty the chat message box
        c.find('#chat-response').append(waitingResponse().chatbox); // add waiting animation

        $('#Chat-Section').find('#chat-send-button').empty(); // empty the send button
        $('#Chat-Section').find('#chat-send-button').append(waitingResponse().sendbtnwait); // add waiting animation

        let text = await chadBot.chat(input , 'landing'); // get response from AI, the code define if the ai is in the landing or main page

        console.log(text);
        c.find('#chat-response').empty(); // empty the chat message box , remove the loading effect
        c.find('#chat-response').append(MessageDisplay(text,'none').textcontent); // add the response from AI

        $('#Chat-Section').find('#chat-send-button').empty(); // empty the send button
        $('#Chat-Section').find('#chat-send-button').append(waitingResponse().sendbtn); // add the send button svg
        chadBot.isReady = true;
    }

    $('#Chat-Section').find('#chat-send-button').on('click', run);
    $("#chat-message").on('keydown', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        run();
      }
  });
  // e.key is the modern way of detecting keys
  // e.keyCode is deprecated (left here for for legacy browsers support)

    $('#Chat-Section').find('#chat-open-button').on('click', () => { //open and close chat window
        $('#Chat-Section').find('#chat-box-wrapper').toggle('fast');
        $('#Chat-Section').find('#chat-open-button').hide()
    });

    $('#Chat-Section').find('#close-chat-box').on('click', () => { //open and close chat window
        $('#Chat-Section').find('#chat-box-wrapper').toggle('fast');
        $('#Chat-Section').find('#chat-open-button').show()
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