$(document).ready(function() {
    const { IMG_MOVIE_PATH, API_URL_TRENDING } = window.movieAPI;
    let trendingPage = 1;

    function getPopularMovies(page = 1) {
        $.getJSON(`${API_URL_TRENDING}&page=${page}`, function (data) {
            data.results.forEach(movie => {
                $("#trendingContainer").append(`
                    <button class="relative w-full aspect-6/9 md:aspect-9/16 bg-slate-300/50 rounded-lg text-start snap-center group overflow-hidden" type="button">
                        <img class="w-full h-full object-cover rounded-lg" src="${IMG_MOVIE_PATH + movie.backdrop_path}" alt="${movie.title}" loading="lazy">

                        <div class="absolute bottom-0 left-0 w-full h-full p-4 flex flex-col items-end justify-end bg-gradient-to-b from-transparent to-black opacity-0 translate-y-full
                            group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 has-[:focus]:opacity-100 has-[:focus]:translate-y-0 transition-all duration-[400ms]">
                            <div class="w-full flex items-center justify-normal gap-2 text-xs md:text-sm">
                                <span class="px-4 py-1 hidden md:inline border border-theme rounded-full">${movie.vote_count}</span>
                                <span class="flex items-center justify-center gap-1 text-theme">
                                    <span class="text-white">${movie.vote_average.toFixed(1)}</span>
                                    <i class="fa-solid fa-star"></i>
                                </span>
                            </div>
                            <span class="block w-full my-2 text-[.9rem] md:text-[1.5rem] lg:text-[2rem]/10 line-clamp-2 text-white">${movie.title}</span>
                            <p class="w-full mb-4 text-justify text-xs/3 md:text-sm/3 lg:text-base/4 font-light line-clamp-3 md:line-clamp-5">${movie.overview}</p>
                            <a class="w-full lg:w-fit px-2 lg:px-4 py-1 text-xs lg:text-sm text-center border border-theme rounded-full font-medium hover:bg-theme focus:bg-theme transition-colors duration-[400ms]"
                                href="#">
                                more info
                            </a>
                        </div>
                    </button>
                `);
            });
        });
    }

    getPopularMovies(trendingPage);

    $("#showMoreBtn").on("click", function () {
        trendingPage++;
        getPopularMovies(trendingPage);
    });

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
