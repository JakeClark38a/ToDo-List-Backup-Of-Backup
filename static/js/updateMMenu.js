export const updateMMenuTabIndicator = function () {
    const indiModeCSS = 'border-r-4 border-primary-200 bg-gradient-to-l from-primary-200/35 to-transparent';
    if ($(document).attr('title') == 'Calendar')
        $('#MMenu-Calendar').addClass(indiModeCSS);
    else if ($(document).attr('title') == 'Today')
        $('#MMenu-Today').addClass(indiModeCSS);
    else if ($(document).attr('title') == 'Team')
        $('#MMenu-Team').addClass(indiModeCSS);
    else
        $('#MMenu-Today').addClass(indiModeCSS);
}
