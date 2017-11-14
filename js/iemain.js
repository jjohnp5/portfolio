(function () {
    
        const icons = document.querySelectorAll('.icons');
        const github = document.querySelector('.github');
        const story = $('.story');
        const resume = $('#resume');
        const homeBtn = $('.home');
        const resumeBtn = $('.resume');
        const nav = document.querySelector('nav');
        const navRect = document.querySelector('.banner').getBoundingClientRect();
        const menu = $('.menu');
        const menuBar = document.querySelector('.menu-bar');
        let menuToggle = false;
        const navLinks = document.querySelectorAll('.menu a');
        console.log(navLinks);
        const thumbnailContainer = $('.thumbnails');
        const bigProjDesc = $('.proj p');
        const bigProjImage = $('.proj div');
        const bigProLink = $('.proj a');
        console.log(icons);
        let flagger = 0;
        $.ajax("/projects.json").done(function(data) {
    
            data.project.forEach(function(project) {
                divBG = project.img;
                divName = project.name;
                divDesc = project.desc;
                divTemplate = '<div class="proj-thumb" id="proj-'+project.id+'"></div>';
                thumbnailContainer.append(divTemplate);
                div = $('#proj-' + project.id);
                div.attr({"name": divName, "link": project.link, "desc": divDesc, "technologies": project.technologies});
                console.log(div);
                div.css({
                    'background': 'url(' + divBG + ')', "background-position": "center",
                    "background-size": "cover"
                });
                
                flagger++
            });
            if(flagger === data.project.length){
                createProjListener();
            }
        });
    
        function createProjListener(){
            const projThumbs = document.querySelectorAll('.proj-thumb');
            projThumbs.forEach(function(thumb) {
                thumb.addEventListener('click', function(){
                    for(let i = 0; i < projThumbs.length; i++){
                        projThumbs[i].style.border = "none"
                    }
                    this.style.border = "2px solid black";
                    bigProjImage.css({
                        'background': this.style.background, "background-position": "center",
                        "background-size": "contain", "background-repeat": "no-repeat"
                    })
                    bigProLink.text(this.attributes.name.nodeValue);
                    bigProLink.attr("href", this.attributes.link.nodeValue);
                    bigProjDesc.text(this.attributes.desc.nodeValue);
                    techs = this.attributes.technologies.nodeValue.split(',');
                    icons.forEach(function(icon) {
                        icon.style.display = "none";
                        techs.forEach(function(tech) {
                            if (icon.firstChild.className === tech) {
                                icon.style.display = "block";
                            }
                        })
                    })
                })
            })
        }
    
        
    
    
    
        if(window.innerWidth > 450){
            menu.show();
            menu.css("visibility", "visible");
            navLinks.forEach(function(link){
                link.addEventListener('click', linkListenerDefault)
        })
        }else{
            menu.hide();
            navLinks.forEach(function(link) {
                link.addEventListener('click', linkListener)
            })
    
        }
    
        nav.style.position = "absolute";
        nav.style.top = navRect.height+'px';
        nav.style.left = 0;
        nav.style.height = "auto";
    
    
    
        icons.forEach(function(icon){
            icon.addEventListener('mouseenter', function () {
            this.lastChild.style.display = "block"
        });
            icon.addEventListener('mouseleave', function () {
            this.lastChild.style.display = "none"
        });
        });
        github.addEventListener('mouseenter', function () {
            this.lastChild.style.display = "block"
        });
        github.addEventListener('mouseleave', function () {
            this.lastChild.style.display = "none"
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
        window.onresize = function(){
            if(window.innerWidth > 450){
                menu.show();
                navLinks.forEach(function(link) {
                    link.removeEventListener('click', linkListener)
                    link.addEventListener('click', linkListenerDefault)
    
            })
    
            }else{
                menu.hide();
                navLinks.forEach(function(link) {
                    link.removeEventListener('click', linkListenerDefault);
                    link.addEventListener('click', linkListener)
                })
    
        }
        }
        window.addEventListener('scroll', function(){
            if(window.scrollY >= navRect.height){
                nav.style.position = "fixed";
                nav.style.top = 0;
                nav.style.left = 0;
                nav.style.height = "auto";
                // nav.style.flexDirection = "column";
                // nav.style.alignItems = "flex-start";
                // nav.style.alignContent = "center";
                // menu.style.visibility = "visible";
                // menu.style.flexDirection = "column";
                // menuBar.style.visibility = "visible";
                }else{
                    nav.style.position = "absolute";
                    nav.style.top = navRect.height+'px';
                    nav.style.left = 0;
                    nav.style.height = "auto";
                    // menu.style.visibility = "visible";
                    // menu.style.flexDirection = "row";
                    // menuBar.style.visibility = "hidden";
                    // nav.style.flexDirection = "row";
                    // nav.style.alignItems = "center";
    
                }
        })
        menuBar.addEventListener('click', function () {
            if(!menuToggle) {
                this.classList.add("active");
                menu.slideDown(300, function(){
                    menu.css("visibility", "visible");
                    menuToggle = true;
                });
                // menu.style.WebkitAnimationName = "height";
            }else{
                this.classList.remove("active");
                menu.slideUp(300);
                // menu.style.WebkitAnimationName = "done";
                menuToggle = false;
    
            }
        })
    
    
        function linkListener(){
            menu.slideUp();
            menuToggle = false;
            window.scrollTo(0, this.top)
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            this.classList.add('active');
    
        }
        function linkListenerDefault(){
            menuToggle = false;
            window.scrollTo(0, this.top)
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    
    })();
    
    