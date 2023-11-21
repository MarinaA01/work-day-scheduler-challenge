// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var rootEl = $('#root');

$(function () {
    var today = dayjs();
    var hour = dayjs().hour();
    var button = $('.saveBtn');
    var description = $('.description');

    // Time blocks fnction 
    function timeBlocks() {
        $('.time-block').each(function() {
            const schedule = parseInt(this.id);
            $(this).toggleClass('past', schedule < hour);
            $(this).toggleClass('present', schedule === hour);
            $(this).toggleClass('future', schedule > hour);
        });
    }

    // Local Storage function
    function textContent() {
        button.click(function(event) {
            event.preventDefault();
            const key = $(this).parent().attr('id');
            const description = description.val('')
            // code from Tiny called JavaScript and localStorage in a nutshell https://www.tiny.cloud/blog/javascript-localstorage/
            localStorage.setItem(key, description);
        });
    }

    function changeColor() {
        $('.time-block').each(function() {
            const schedule = parseInt(this.id);
            if (schedule == hour) {
                // Code from StackOverflow titled JQuery Find #ID RemoveClass and AddClass https://stackoverflow.com/questions/2407179/jquery-find-id-removeclass-and-addclass
                $(this).removeClass('past future').addClass('present');
            } else if (schedule < hour) {
                $(this).removeClass('present future').addClass('past');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    }

    // Local Storage function 
    $('.time-block').each(function() {
        const key = $(this).attr('id');
        const value = localStorage.getItem(key);
        $(this).children('.description').val(value);
    })



// Calling all the functions needed
    timeBlocks();
    textContent();
    changeColor();


    // Current Day code at the top of the page

    $('#currentDay').text(today.format('dddd, MMMM DD'));
});