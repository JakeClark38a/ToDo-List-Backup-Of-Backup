import { chadBot } from './chadBot.js';
import { Utils } from './userData.js';

$(document).ready(function () {

    function waitingResponse() {
        return (`
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
        `);
    };

    function chatMessage(message) {
        return (`
        <p class="text-xs font-normal lg:text-base text-gray-900 dark:text-white">`+ message + `</p>
        `)
    }

    function ReplyMessage(id) {
        return (`
        <div id='`+ id + `' class="flex items-start gap-2.5 my-2">
            <img class="w-8 h-8 rounded-full" src="../static/images/gigachad.jpg" alt="Jese image">
            <div class="flex flex-col gap-1">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">Chad</span>
                </div>
                <div id="chat-response"
                class="flex flex-col leading-1.5  p-4 transition-all duration-200 ease-in-out max-w-40 lg:max-w-64 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                
                </div>
            </div>
        </div>

        `);
    }

    function SendMessage(message) {
        return (`
        <div class="flex items-start justify-end gap-2.5 my-2">
            <div class="flex flex-col gap-1">
                <div class="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">You</span>
                </div>
                <div
                    class="flex flex-col leading-1.5 p-4  max-w-40 lg:max-w-64 border-gray-200 bg-gray-100 rounded-s-xl rounded-br-xl dark:bg-gray-700">
                    <p class="text-xs font-normal lg:text-base text-gray-900 dark:text-white">`+ message + `</p>
                </div>
            </div>
            <img class="w-8 h-8 rounded-full" src="../static/images/gigachad.jpg" alt="Jese image">
        </div>
    `);
    }

    async function run() {
        let input = $('#chat-message').val();
        $('#chat-message').val('');
        $('#chat-content').append(SendMessage(input));

        let id = Utils.getUuid();
        $('#chat-content').append(ReplyMessage(id));
        let c = $('#chat-content').find('#' + id);
        setTimeout(c.find('#chat-response').append(waitingResponse()), 500);

        let text = await chadBot.chat(input);

        console.log(text);
        c.find('#chat-response').empty();
        c.find('#chat-response').append(chatMessage(text));
    }

    $('#Chat-Section').find('#chat-send-button').on('click', run);

    $('#Chat-Section').find('#chat-open-button').on('click', () => {
        $('#Chat-Section').find('#chat-box-wrapper').toggle('fast');
        $('#Chat-Section').find('#chat-open-button').hide()
    });

    $('#Chat-Section').find('#close-chat-box').on('click', () => {
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