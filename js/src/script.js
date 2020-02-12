$(document).ready(function () {
    
    $('body').addClass("loaded");
    var elements = document.querySelectorAll('.scroll-image');

    var config = {
        threshold: 0.01
    };
    var observer;
    function onIntersection(entries) {
        entries.forEach(function (entry, index) {
            if (entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                handleScrolledIntoView(entry.target, index);
            }
        });
    }

    if (!('IntersectionObserver' in window)) {
        Array.from(elements).forEach(el => handleScrolledIntoView(el));
    } else {
        observer = new IntersectionObserver(onIntersection, config);
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    function handleScrolledIntoView(target, delay) {
        if (target.className.indexOf('fold-image') > -1) {
            setTimeout(function () {
                strip_images[target.id].unfold();
            }, 500 + (delay * 200));
        }
        target.classList.add('scrolled');
    }

    $('a').on("click", function () {
        if ($(this).attr("href").charAt(0) === '#') {
            $("html,body").animate({ scrollTop: $($(this).attr("href")).offset().top - 100 }, 750);
        }
    });
    var strip_images = [];
    $('.fold-image').each(function (index) {
        strip_images[$(this).attr("id")] = new OriDomi('#' + $(this).attr("id"), { vPanels: 2, hPanels: 2, touchEnabled: false });
        strip_images[$(this).attr("id")].foldUp();
    });
});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
