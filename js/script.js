$(document).ready(function() {
    const { IMG_MOVIE_PATH, API_URL_LATEST, API_URL_TRENDING } = window.movieAPI;

    let currentIndex = 0;
    let movies = [];
    let interval;

    getMovies(API_URL_LATEST);
    getTrendingMovies(API_URL_TRENDING);
    getTopRatedMovies(API_URL_TOPRATED);

    function getMovies(url) {
        $.getJSON(url, function(data) {
            movies = data.results.slice(0, 3);
            updateBanner();
            startInterval();
        });
    }

    function updateBanner() {
        if (movies.length === 0) return;
        const movie = movies[currentIndex];

        $(".banner-img").attr("src", IMG_MOVIE_PATH + movie.poster_path);
        $(".banner-img").attr("alt", movie.title);
        $(".banner-title").text(movie.title);
        $(".banner-description").text(movie.overview);
        $(".banner-anchor").attr("href", "./detail.html?id="+movie.id);

        $(".indicator").find("div").stop(true, true).css({width: "0%"});

        $(".indicator").eq(currentIndex).find("div").animate({width: "100%"}, 10000, "linear");
    }

    function nextBanner() {
        currentIndex = (currentIndex + 1) % movies.length;
        updateBanner();
    }

    function startInterval() {
        interval = setInterval(nextBanner, 10000);
    }

    $(".indicator").on("click", function() {
        clearInterval(interval);
        currentIndex = $(this).index();
        updateBanner();
        startInterval();
    });

    function getTrendingMovies(url) {
        $.getJSON(url, function(data) {
            $("#trendingContainer").empty();

            data.results.slice(0, 10).forEach(movie => {
                $("#trendingContainer").append(`
                    <button class="relative min-w-[300px] aspect-6/9 md:aspect-9/16 bg-slate-300/50 rounded-lg text-start snap-center group overflow-hidden" type="button">
                        <img class="w-full h-full object-cover rounded-lg" src="${IMG_MOVIE_PATH + movie.backdrop_path}" alt="${movie.title}" loading="lazy">

                        <div class="absolute bottom-0 left-0 w-full h-full p-4 flex flex-col items-end justify-end bg-gradient-to-b from-transparent to-black opacity-0 translate-y-full
                            group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 has-[:focus]:opacity-100 has-[:focus]:translate-y-0 transition-all duration-[400ms]">
                            <div class="w-full flex items-center justify-normal gap-2 text-sm">
                                <span class="px-4 py-1 border border-theme rounded-full">${movie.vote_count}</span>
                                <span class="flex items-center justify-center gap-1 text-theme">
                                    <span class="text-white">${movie.vote_average.toFixed(1)}</span>
                                    <i class="fa-solid fa-star"></i>
                                </span>
                            </div>
                            <span class="block w-full my-2 text-[1.2rem] md:text-[1.5rem] line-clamp-2 text-white">${movie.title}</span>
                            <p class="w-full mb-4 text-justify text-sm/4 md:text-sm font-light line-clamp-5">${movie.overview}</p>
                            <a class="w-full lg:w-fit px-2 lg:px-4 py-1 text-xs lg:text-sm text-center border border-theme rounded-full font-medium hover:bg-theme focus:bg-theme transition-colors duration-[400ms]"
                                href="./detail.html?id=${movie.id}">
                                more info
                            </a>
                        </div>
                    </button>
                `);
            });

            $("#trendingContainer").append(`
                <a class="min-w-[300px] aspect-6/9 md:aspect-9/16 rounded-lg border border-white text-start snap-center group
                    hover:border-theme focus:border-theme transition-colors duration-[400ms]" 
                    href="./popular.html">
                    <div class="w-full h-full p-4 flex flex-col items-center justify-center gap-2">
                        <div class="w-fit px-4 aspect-square flex items-center justify-center rounded-full border border-white
                            group-hover:border-theme group-hover:bg-theme group-focus:border-theme group-focus:bg-theme transition-colors duration-[400ms]">
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                        <span class="group-hover:text-theme group-hover:font-semibold group-focus:text-theme group-focus:font-semibold transition-all duration-[400ms]">
                            Show More
                        </span>
                    </div>
                </a>
            `);
        });
    }

    function getTopRatedMovies(url) {
        $.getJSON(url, function(data) {
            $("#topRatedContainer").empty();

            data.results.slice(0, 10).forEach(movie => {
                $("#topRatedContainer").append(`
                    <button class="relative min-w-[300px] aspect-6/9 md:aspect-9/16 bg-slate-300/50 rounded-lg text-start snap-center group overflow-hidden" type="button">
                        <img class="w-full h-full object-cover rounded-lg" src="${IMG_MOVIE_PATH + movie.backdrop_path}" alt="${movie.title}" loading="lazy">

                        <div class="absolute bottom-0 left-0 w-full h-full p-4 flex flex-col items-end justify-end bg-gradient-to-b from-transparent to-black opacity-0 translate-y-full
                            group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 has-[:focus]:opacity-100 has-[:focus]:translate-y-0 transition-all duration-[400ms]">
                            <div class="w-full flex items-center justify-normal gap-2 text-sm">
                                <span class="px-4 py-1 border border-theme rounded-full">${movie.vote_count}</span>
                                <span class="flex items-center justify-center gap-1 text-theme">
                                    <span class="text-white">${movie.vote_average.toFixed(1)}</span>
                                    <i class="fa-solid fa-star"></i>
                                </span>
                            </div>
                            <span class="block w-full my-2 text-[1.2rem] md:text-[1.5rem] line-clamp-2 text-white">${movie.title}</span>
                            <p class="w-full mb-4 text-justify text-sm/4 md:text-sm font-light line-clamp-5">${movie.overview}</p>
                            <a class="w-full lg:w-fit px-2 lg:px-4 py-1 text-xs lg:text-sm text-center border border-theme rounded-full font-medium hover:bg-theme focus:bg-theme transition-colors duration-[400ms]"
                                href="./detail.html?id=${movie.id}">
                                more info
                            </a>
                        </div>
                    </button>
                `);
            });
        });
    }

    $(window).scroll(() => {
        if ($(window).scrollTop() >= 30){
            $("header").removeClass("border-transparent").addClass("bg-black/99 border-theme");
        }else{
            $("header").removeClass("bg-black/99 border-theme").addClass("border-transparent");
        }
    });

    $("#openNavBtn").click(function (e) { 
        e.preventDefault();
        $("nav").removeClass("right-full").addClass("right-0");
    });

    $("#closeNavBtn").click(function (e) { 
        e.preventDefault();
        $("nav").removeClass("right-0").addClass("right-full");
    });
});
