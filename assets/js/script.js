// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var rootEl = $('#root');

$(function () {
    var today = dayjs();
    var button = $('.saveBtn');
    $('#currentDay').text(today.format('dddd, MMMM DD'));

    // Time blocks fnction 
    function timeBlocks() {
        var hour = dayjs().hour();
        $('.time-block').each(function() {
            
            const schedule = parseInt($(this).str('id').split('-')[1]);
            // Code from JQuery Documentation - https://api.jquery.com/toggleClass/
            // $(this).toggleClass('past', schedule < hour);
            // $(this).toggleClass('present', schedule === hour);
            // $(this).toggleClass('future', schedule > hour);
            if(schedule < hour) {
                $(this).addClass('past');
            } else if (schedule == hour) {
                $(this).removeClass('past');
                $(this).addClass('present');
            } else {
                $(this).removeClass('past');
                $(this).removeClass('present');
                $(this).addClass('future');
            }
        });
    }

    // Local Storage function
    function textContent() {
        button.click(function(event) {
            event.preventDefault();
            const task = $(this).siblings('.description').val();
            const description = $(this).parent().attr('id');
            // code from Tiny called JavaScript and localStorage in a nutshell https://www.tiny.cloud/blog/javascript-localstorage/
            localStorage.setItem(task);

            for(var i = 9; i < 18; i++) {
                $('hour-' + i + ' .description').val(localStorage.getItem('hour-' + i));
            }
        });
    }

    function changeColor() {
        var currentHour = dayjs().hour();
        $('.time-block').each(function() {
            const schedule = parseInt(this.id).split('-')[1];
            if (schedule == currentHour) {
                // Code from StackOverflow titled JQuery Find #ID RemoveClass and AddClass https://stackoverflow.com/questions/2407179/jquery-find-id-removeclass-and-addclass
                $(this).removeClass('past future').addClass('present');
            } else if (schedule < currentHour) {
                $(this).removeClass('present future').addClass('past');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    }

    // Local Storage function 
    $('#hour-9 .description').val(localStorage.getItem('hour-9'));
    $('#hour-10 .description').val(localStorage.getItem('hour-10'));
    $('#hour-11 .description').val(localStorage.getItem('hour-11'));
    $('#hour-12 .description').val(localStorage.getItem('hour-12'));
    $('#hour-13 .description').val(localStorage.getItem('hour-13'));
    $('#hour-14 .description').val(localStorage.getItem('hour-14'));
    $('#hour-15 .description').val(localStorage.getItem('hour-15'));
    $('#hour-16 .description').val(localStorage.getItem('hour-16'));
    $('#hour-17 .description').val(localStorage.getItem('hour-17'));



// Calling all the functions needed
    timeBlocks();
    setInterval(timeBlocks, 15000);
    setInterval(changeColor, 15000);
    textContent();
    changeColor();


    // Current Day code at the top of the page

    
});