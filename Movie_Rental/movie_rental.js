let movieRental = {
    allMovies: [

       {title: 'Looper',             release: 2012, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Looper_poster.jpg', imdb: 'https://www.imdb.com/title/tt1276104/', inventory: [3, 4] }, 
       {title: 'Back To The Future', release: 1985, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg', imdb: 'https://www.imdb.com/title/tt0088763/',inventory: [3, 4] }, 
       {title: 'Inception',          release: 2010, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg', imdb:'https://www.imdb.com/title/tt1375666/', inventory: [3, 4] }, 
       {title: 'Donnie Darko',       release: 2001, available: true, img: 'https://m.media-amazon.com/images/M/MV5BOGRiOGM5MmUtMmI3Yi00ZTFhLTlhZDYtZGNmOWRmYTM4NWE2XkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SY1000_CR0,0,702,1000_AL_.jpg', imdb: 'https://www.imdb.com/title/tt0246578/', inventory: [3, 4]}, 
       {title: 'Primer',             release: 2004, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Primer_%282004_film_poster%29.jpg', imdb: "https://www.imdb.com/title/tt0390384/", inventory: [3, 4] }, 
       {title: 'Terminator 2',       release: 1991, available: true, img: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', imdb: 'https://www.imdb.com/title/tt0103064/', inventory: [3, 4] },
       {title: 'Source Code',        release: 2011, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Source_Code_Poster.jpg/220px-Source_Code_Poster.jpg', imdb: 'https://www.imdb.com/title/tt0945513/', inventory: [3, 4] },
       {title: 'Déjà Vu',            release: 2006, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/DejaVuBigPoster.jpg/220px-DejaVuBigPoster.jpg', imdb: 'https://www.imdb.com/title/tt0453467/', inventory: [3, 4] }

   ],

   displayAllMovies() {

       //access each object in our array indiviually

       // for (let i = 0; i < this.allMovies.length; i++) {
          
       //    console.log(this.allMovies[i]);
          
           
       // }

       movieRental.allMovies.forEach( singleMovie => {

           console.log(singleMovie.img);

           let singleMovieDiv = createDivElement({class: 'movies'});

           let movieTitle = createHeading({size: 2, text: singleMovie.title});

           let movieRD = createHeading({text: singleMovie.release.toString(), size: 4});

           let movieImgDiv = createDivElement({class: 'movieImgDiv'});


           let movieImage = createImg({class: 'movieImages', src: singleMovie.img, alt: singleMovie.title + ' Image'});

           let imdbLink = createHyperLink({openNewTab: true, hreflink: singleMovie.imdb, text: singleMovie.title + 'Imdbpage', class: 'imdblink'})

           singleMovieDiv.appendChild(movieTitle);

           singleMovieDiv.appendChild(movieImgDiv);

           singleMovieDiv.appendChild(movieRD);

           singleMovieDiv.appendChild(imdbLink);

           //new variable to determine what div the subdiv(movieDiv) gets appended to 
           let appendLocation, clickMeText;


           if ( singleMovie.available === true ) {

               appendLocation = 'aDiv';

                clickMeText = createHeading({size: 5, text: 'Double Click to Rent'})

           } else {

               appendLocation = 'rDiv';

                clickMeText = createHeading({size: 5, text: 'Double Click to Return'})
           }

               document.getElementById(appendLocation).appendChild(singleMovieDiv);


            //adding ondblclick property to movie element
           movieImage.ondblclick = movieRental.transferMovie;

           //clickMeText.styl.display = 'none';

           movieImgDiv.appendChild(movieImage);
           movieImgDiv.appendChild(clickMeText);
           
       });

       //create a div that will contain our movie title, movie release, movie img element

       //append that newly created div to the correct div (either aDiv or rDiv) based on a conditional
       

   },
   

   transferMovie() {

    let eventObject = this, //the parent element that called the method

        choosenMovie = eventObject.value != undefined ? eventObject.alt.replace(/ image/, ''):

    //console.log(this);

    //itterate through my array of objects,

    movieRental.allMovies.forEach( movieObject => {

            // console.log(movieObject.title, choosenMovie);

            // if (movieObject.title === choosenMovie && movieObject.available) {

            //         movieObject.available = false
                
            // } else if (movieObject.title === choosenMovie && !movieObject.available) {

            //         movieObject.available = true
            // }

            // if (movieObject.title === choosenMovie) {

            //     movieObject.available = movieObject.available ? false : true;
                
            // }

            if (movieObject.title === choosenMovie) {

                //movieObject.available = !movieObject.available;

                movieObject.inventory[0]--
                
            }

            // movieObject.available = movieObject.title === choosenMovie ? !movieObject.available : movieObject.available;

            
    })
},

createMovieSelects(){

    let availableMoviesArr= [],
        rentedMoviesArr = [];

    movieRental.allMovies.forEach(movieObject => {

        if (movieObject.available === true){
            availableMoviesArr.push(movieObject.title)

        } else if (movieObject.available === false){
            rentedMoviesArr.push(movieObject.title)
        }
        
    });


    let aSelect = createHeading({text:'Available Movies', size: 2});
    let rSelect = createHeading({text:'Movies Being Rented', size: 2});
    let availableSelect = createSelectElement({defaultText: 'Select An Available Movie', array:availableMoviesArr, class: 'movieSelects'})
    let rentedSelect = createSelectElement({defaultText: 'Select A Movie To Return', array: rentedMoviesArr, class: 'movieSelects'})


    availableSelect.onchange = movieRental.transferMovie;
    rentedSelect.onchange = movieRental.transferMovie;


    document.getElementById('sideBar').appendChild(aSelect);
    document.getElementById('sideBar').appendChild(availableSelect);

    document.getElementById('sideBar').appendChild(rSelect);
    document.getElementById('sideBar').appendChild(rentedSelect);


}


}

createInitalDivs()

movieRental.displayAllMovies()

// console.log(movieRental.allMovies);
//create Html elment method CREATES HEADING ELEMENTS PARAMERTERS: heading-text, heading-size

//return the heading element


function createHeading(headingObj) {

   let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');

   heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';

   if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {

       heading.id = headingObj.id
       
   }

   return heading
   
}

function createImg(imageObj) {

   let image = document.createElement('img');
   //let button = document.createElement('button')
   
   image.src = imageObj.src != undefined ? imageObj.src : './img.jpeg';

   image.alt = imageObj.alt != undefined ? imageObj.alt : 'Image Could Not Load';

//    button.innerText = image.src
//    button.addEventListener('click', function imdbLink(){

//    })


   if (imageObj.id != undefined && document.getElementById(imageObj.id) == null ) {

       image.id = imageObj.id;
       
   }

   if ( imageObj.class != undefined ) {

       image.class = imageObj.class;
       
   }

   return image 
}

function createDivElement(divObject) {

   //class and id

   const div = document.createElement('div');

   if (divObject.id != undefined && document.getElementById(divObject.id) == null) {

       div.id = divObject.id; 
       
   }

   if (divObject.class != undefined ) {

       div.class = divObject.class;
       
   }

   return div
   
}

//create our rented div and available div
function createInitalDivs() {
    
    let mainContainer = createDivElement({id: 'mainContainer'});

    let movieDisplays = createDivElement({id: 'movieDisplays'});

    let sideBar = createDivElement({id: 'sideBar'})

   let available = createDivElement({id: 'aDiv', class: 'movieDivs'});

   let rented = createDivElement({id: 'rDiv', class: 'movieDivs'});


   document.body.appendChild(mainContainer);

   mainContainer.appendChild(movieDisplays);
   mainContainer.appendChild(sideBar);

   movieDisplays.appendChild(available);
   movieDisplays.appendChild(rented);

}


function createHyperLink(linkObject){
    const link = document.createElement('a');
    if (linkObject.id != undefined && document.getElementById(linkObject.id) == null){
        link.id = linkObject.id;

    }

    if (linkObject.class != undefined){
        link.className = linkObject.class;

    }

    if (linkObject.openNewTab === true) {
        link.target = '_blank';
    }


    link.innerText = linkObject.text != undefined ? linkObject.txt : 'Untitled Link';
    link.href = linkObject.hreflink != undefined ? linkObject.hrefLink : 'No Link';


    return link
}





/*********************************************
Create a method to switch the state of a movie i.e. true or false

transferMovie(movieSelected) {
    
    let selectElement = this;

            chosenMovie=selectElement.value;
        console.log(this)

    iterate through the array of objects,
    find the object that match the name of chosen movie
    access the available property and switch its value from true to false or vice versa

    before moving on to the frontend, console log movieRental.allMovies

    update the front end
        update the movieDics
        update the selectElements
}
*/




// let testSelect = createSelectElement({
//     defaultText: 'test',
//     array:  [1,2,3,4,5,6]

// })
// document.body.appendChild(testSelect)
// createInitalDivs()
// movieRental.displayAllMovies()



function createSelectElement(selectObject) {

    //click on the select and chose whether you want to rent or return this movie

    let select = document.createElement('select');

    //id
    if (selectObject.id != undefined && document.getElementById(selectObject.id) == null){
        select.id = selectObject.id;
    }


    //className
    if (selectObject.class != undefined) {
        select.className = selectObject.class;
    }


        return select


    //create a default option
    let defaultOpt = document.createElement('option');
    defaultOpt.value = 'default';
    defaultOpt.innerText = selectObject.defaultText == undefined ? 'Select An Option' : selectObject.defaultText;
    defaultOpt.value = '';
    select.appendChild(defaultOpt);

        //iterate through a given array, create child element for each one
    for (let i = 0; i < selectObject.array.length; i++) {
        
        let option = document.createElement('option');
        option.innerText = selectObject.array[i];
        option.value = selectObject.array[i];
        select.appendChild(option);

    }


    return select
    //inner text property
    //vaule property
    //append to the parent

    //optionally add a onchange property  (points to the link/return methods)

    //return
}





// document.createElement('select');  //parent

// document.createElement('option'); //child


// let heading1= createImg({id: 'stuff'})
// console.log(heading1);

document.getElementById('sideBar').innerHtml = '';
document.getElementById('aDiv').innerHtml = '';
document.getElementById('rDiv').innerHtml = '';

movieRental.displayAllMovies()
movieRental.createMovieSelects()


