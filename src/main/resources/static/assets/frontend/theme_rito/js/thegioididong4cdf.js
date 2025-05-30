var isRandomBannerTop,bannerTopIndexKey;
bannerTopIndexKey = "BannerTopIndex";
isRandomBannerTop = !1;
$(document).ready(function() {
    var i, u, t;


    u = document.querySelector(".media-slider");
    t = document.querySelectorAll(".media-slider .item");
    u != null && t != null && t.length > 0 && (randomBannerTop(), initCarousel());
    // !isRunLive;
    document.querySelectorAll(".lazyload-after").forEach(n => io.observe(n));
    let f = [];
    f.push('[class^="iconlogo-"], [class*="iconlogo-"]');
    let o = [].slice.call(document.querySelectorAll(f.join()));
    if ("IntersectionObserver" in window) {
        let n = new IntersectionObserver(function(t) {
            t.forEach(function(t) {
                t.isIntersecting && (t.target.classList.add("visible"), n.unobserve(t.target))
            })
        });
        o.forEach(function(t) {
            n.observe(t)
        })
    }
});

function randomBannerTop() {
    var s, f, t, e, h, i;
    if (!isRandomBannerTop) {
        var c = document.querySelector(".banner-media"),
            r = document.querySelector(".media-slider"),
            o = window.location.pathname,
            u = sessionStorage.getItem(bannerTopIndexKey),
            n = parseInt(u);
        if (o != "/" && u == null && randomizeChild(r), u != null && !isNaN(n) && (n + 1 >= document.querySelectorAll(".media-slider .item").length ? n = 0 : n++, n > 0)) {
            for (s = document.querySelectorAll(".media-slider .item"), f = document.createDocumentFragment(), t = 0; t < n; t++) f.appendChild(s[t]);
            r.append(f)
        }
        document.querySelectorAll(".media-slider .item").length > 1 && (e = document.querySelector(".media-slider .item"), h = document.querySelector(".media-slider .item a").getAttribute("href"), o == h && (e.remove(), r.appendChild(e)));
        i = document.querySelector(".media-slider .item");
        // c.style.backgroundColor = i.dataset.backgroundColor;
        i.classList.add("visible");
        n = i.dataset.order;
        sessionStorage.setItem(bannerTopIndexKey, n != null ? n - 1 : 0);
        isRandomBannerTop = !0
    }
}

function initCarousel() {
    var i = document.querySelector(".banner-media"),
        r = document.querySelector(".media-slider .prev"),
        u = document.querySelector(".media-slider .next"),
        n = 0,
        t = document.querySelectorAll(".media-slider .item"),
        f = t.length;
    lazyLoadImg(t[n].querySelector("a img"));
    r != null && r.addEventListener("click", function() {
        t[n].classList.remove("visible");
        n--;
        n < 0 && (n = f - 1);
        t[n].classList.add("visible");
        i.style.backgroundColor = t[n].dataset.backgroundColor;
        lazyLoadImg(t[n].querySelector("a img"))
    });
    u != null && u.addEventListener("click", function() {
        t[n].classList.remove("visible");
        n++;
        n > f - 1 && (n = 0);
        t[n].classList.add("visible");
        i.style.backgroundColor = t[n].dataset.backgroundColor;
        lazyLoadImg(t[n].querySelector("a img"))
    })
}

function lazyLoadImg(n) {
    n.classList.contains("lazyload") && (n.classList.remove("lazyload"), n.classList.add("lazyloaded"), n.setAttribute("src", n.getAttribute("data-src")))
}
