$(document).ready(function() {
    const { API_KEY, API_URL_MOVIE, IMG_MOVIE_PATH } = window.movieAPI;

    const urlParams = new URLSearchParams(window.location.search);
    const searchID = urlParams.get('id') || '';

    function getDetailMovie(id) {
        if (!id) return;

        $.getJSON(`${API_URL_MOVIE}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,similar`, function (data) {
            const { 
                title, overview, poster_path, release_date, runtime, status, vote_average, vote_count, genres, videos, similar, belongs_to_collection, production_companies, credits
            } = data;

            // Gambar utama
            $("#movieImage").attr("src", IMG_MOVIE_PATH + poster_path);

            // Tanggal & durasi
            const formattedDate = release_date?.split("-").reverse().join("-") || '';
            $("#movieDate").text(`${formattedDate} (${runtime || 0} mins)`);

            // Status film
            $("#movieStatus").text(status || 'Unknown');

            // Judul dan ringkasan
            $("#movieTitle").text(title);
            $("#movieSummary").text(overview || 'No summary provided.');

            // Rating
            const fullStars = Math.floor(vote_average);
            const hasHalfStar = vote_average - fullStars >= 0.5;
            const starHTML = [];

            for (let i = 0; i < 10; i++) {
                if (i < fullStars) {
                    starHTML.push('<i class="fa-solid fa-star"></i>');
                } else if (i === fullStars && hasHalfStar) {
                    starHTML.push('<i class="fa-solid fa-star-half-stroke"></i>');
                } else {
                    starHTML.push('<i class="fa-regular fa-star"></i>');
                }
            }

            $("#movieStars").html(starHTML.join(""));
            $("#movieRates").text(`${vote_average.toFixed(1)} / 10 (${vote_count})`);

            // Genre
            const genreHTML = genres.map(genre =>
                `<a class="w-fit px-2 py-1 block border border-theme rounded-sm text-xs" href="#">${genre.name}</a>`
            );
            $("#movieGenres").html(genreHTML.join(""));

            // Trailer
            const trailers = videos.results.filter(v => v.type === "Trailer" && v.site === "YouTube");

            const trailerHTML = [];

            // Element pertama (overlay kiri)
            trailerHTML.push(`
                <div class="absolute top-0 left-0 min-w-1/2 aspect-video bg-theme/50 hidden md:block rounded-2xl snap-center z-20 -translate-x-[calc(50%+8px)]"></div>
            `);

            if (trailers.length === 0) {
                trailerHTML.push(`
                    <div class="min-w-1/2 aspect-video bg-gray-800 rounded-2xl snap-center flex items-center justify-center text-white">
                        No trailers found
                    </div>
                `);
            } else {
                trailers.forEach(v => {
                    trailerHTML.push(`
                        <div class="min-w-4/5 md:min-w-1/2 aspect-video bg-theme rounded-lg md:rounded-2xl snap-center md:translate-x-1/2 z-10">
                            <iframe class="w-full h-full rounded-lg md:rounded-2xl" 
                                src="https://www.youtube.com/embed/${v.key}" 
                                frameborder="0" allowfullscreen>
                            </iframe>
                        </div>
                    `);
                });
            }

            // Elemen terakhir ("Show More")
            trailerHTML.push(`
                <div class="min-w-1/2 aspect-video hidden md:flex items-center justify-end snap-center z-0">
                    <a class="block w-1/2 h-full rounded-l-2xl border border-r-0 border-white text-start snap-center group 
                        hover:border-theme focus:border-theme transition-colors duration-[400ms]" 
                        href="#">
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
                </div>
            `);

            $("#movieTrailers").append(trailerHTML.join(""));

            // Similar movies
            const similarHTML = similar.results.slice(0, 8).map(sim =>
                `<a class="relative w-full aspect-4/6 bg-theme rounded snap-center overflow-hidden group" href="?id=${sim.id}">
                    <img class="w-full aspect-4/6 object-cover object-center" src="${IMG_MOVIE_PATH + sim.poster_path}" alt="${sim.title}" loading="lazy">
                    <div class="absolute top-0 lg:top-full left-0 w-full h-full p-1 flex items-end justify-normal bg-gradient-to-b from-transparent to-black
                        lg:group-hover:top-0 lg:group-focus:top-0 transition-all duration-[400ms]">
                        <span>${sim.title}</span>
                    </div>
                </a>`
            );
            $("#movieSimilars").html(similarHTML.join(""));

            // Collection
            if (belongs_to_collection) {
                $("#movieCollections").html(`
                    <a class="relative w-full aspect-4/6 bg-theme rounded snap-center overflow-hidden group" href="#">
                        <img class="w-full aspect-4/6 object-cover object-center" src="${IMG_MOVIE_PATH + belongs_to_collection.poster_path}" alt="${belongs_to_collection.name}" loading="lazy">
                        <div class="absolute top-0 lg:top-full left-0 w-full h-full p-1 flex items-end justify-normal bg-gradient-to-b from-transparent to-black
                            lg:group-hover:top-0 lg:group-focus:top-0 transition-all duration-[400ms]">
                            <span>${belongs_to_collection.name}</span>
                        </div>
                    </a>
                `);
            }

            // Production Companies
            const prodHTML = production_companies.map(p =>
                `<a class="relative w-full aspect-4/6 bg-theme rounded snap-center overflow-hidden group" 
                    href="https://www.google.com/search?q=${encodeURIComponent(p.name)}" target="_blank" rel="noopener noreferrer">
                    <img class="w-full aspect-4/6 p-2 object-contain object-center" src="${p.logo_path ? IMG_MOVIE_PATH + p.logo_path : '#'}" alt="${p.name}" loading="lazy">
                </a>`
            );
            $("#movieCompanies").html(prodHTML.join(""));

            // Cast
            const castHTML = credits.cast.map(c =>
                `<a class="relative w-full aspect-4/6 bg-theme rounded snap-center overflow-hidden group" href="#">
                    <img class="w-full aspect-4/6 object-cover object-center" src="${c.profile_path ? IMG_MOVIE_PATH + c.profile_path : '#'}" alt="${c.name}" loading="lazy">
                    <div class="absolute top-0 left-0 w-full h-full p-1 flex items-end justify-normal bg-gradient-to-b from-transparent to-black">
                        <span>${c.name}</span>
                    </div>
                </a>`
            );
            $("#movieCasts").html(castHTML.join(""));

            // More Credits
            const crewHTML = credits.crew
                .sort((a, b) => {
                    const jobCompare = a.job.localeCompare(b.job);
                    if (jobCompare !== 0) return jobCompare;
                    return a.name.localeCompare(b.name);
                }).map(c =>
                    `<span class="w-full block p-2">
                        ${c.job}<br><strong>${c.name}</strong>
                    </span>`
                );
            $("#movieCredits").html(crewHTML.join(""));
        });
    }

    getDetailMovie(searchID);

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
