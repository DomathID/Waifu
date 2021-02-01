function render(template, context) {

    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {  
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}
String.prototype.render = function (context) {
    return render(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('Haha, you opened the console, do you want to see my secret? ', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('What have you copied, please remember to add the source when reprinting', 5000);
});

$.ajax({
    cache: true,
    url: "path/to/waifu-tips.json",
    dataType: "json",
    success: function (result){
        $.each(result.mouseover, function (index, tips){
            $(document).on("mouseover", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips){
            $(document).on("click", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
    }
});

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text ='Hello! Friends from <span style="color:#0099cc;">' + referrer.hostname +'</span>';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text ='Hello! Friends from Baidu search<br>You are searching<span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&') [0] +'</span> Did you find me? ';
        }else if (domain == 'so') {
            text ='Hello! Friends from 360 search<br>You are searching<span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&') [0] +'</span> Did you find me? ';
        }else if (domain == 'google') {
            text ='Hello! Friends from Google search<br>Welcome to read <span style="color:#0099cc;">『' + document.title.split('-')[0] +'』</span>';
        }
    }else {
        if (window.location.href == 'https://imjad.cn/') { //If it is the homepage
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text ='Are you a night owl? Don't sleep at this night, come tomorrow;
            } else if (now > 5 && now <= 7) {
                text ='Good morning! One day's plan is in the morning, a good day is about to begin';
            } else if (now > 7 && now <= 11) {
                text ='Good morning! Work well, don’t sit for long, get up and move around! ';
            } else if (now > 11 && now <= 14) {
                text ='It's noon, I have been working all morning, now it's lunch time! ';
            } else if (now > 14 && now <= 17) {
                text ='It's easy to fall asleep in the afternoon. Have you achieved your sports goal today? ';
            } else if (now > 17 && now <= 19) {
                text ='It's evening! The sunset outside the window is very beautiful, the most beautiful but the sunset is red~';
            } else if (now > 19 && now <= 21) {
                text ='Good evening, how are you doing today? ';
            } else if (now > 21 && now <= 23) {
                text ='It's already so late, rest early, good night~';
            } else {
                text ='Hi~ Come and tease me! ';
            }
        }else {
            text ='Welcome to reading <span style="color:#0099cc;">『' + document.title.split('-')[0] +'』</span>';
        }
    }
    showMessage(text, 6000);
})();

window.setInterval(showHitokoto,30000);

function showHitokoto(){
    $.getJSON('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json',function(result){
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    console.log(text);
    $('.waifu-tips').stop();
    $('.waifu-tips').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}
function hideMessage(timeout){
    $('.waifu-tips').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}
