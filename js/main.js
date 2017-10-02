
var icons = document.querySelectorAll('.icons');
var story = $('.story');
var resume = $('#resume');
var homeBtn = $('.home');
var resumeBtn = $('.resume');

icons.forEach(function(icon){
    icon.addEventListener('mouseenter', function () {
    this.lastChild.style.display = "block"
});
    icon.addEventListener('mouseleave', function () {
    this.lastChild.style.display = "none"
});
});

homeBtn.click(function () {
    resume.slideUp(500, function(){
       story.slideDown();
    });

})
resumeBtn.click(function () {
    story.slideUp(500, function(){
        resume.slideDown();
    });
})


