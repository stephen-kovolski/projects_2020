/*

[*]createbuttons with 1 heading element

[*]set event listeners -> modify date(which is the function)

    one function for each button, 
    
    [] update the date variable(s), 
    [] update the heading to reflect the date variable
        after the date object is changed the front end should show the changes
        One may ceate a new function that is used to refresh the frontend

[]set heading text to the current date, store the current date in a variable

    [] create a function that will convert th object property into a string format
        optional parameters would be the date formating and the spacers between unit

[]trck the number of days in a month, how many months, year is easiest to deal with

[]When changing a time unit, other units should change accordingly
    *when the going forward a day on the last day of the month OR when going back a day on the first day of the month, the month and day should shift in accordance.
    *what if the date is March 31st and the user goes back one month? make sure there is never an impossible date showing to the client ie. Febuary 31st
    *when an impossible date occurs, the day should be set to the nearest 'real' date
        *** for example, if the current day is set to 3/31 and the user goes back one month, there are two possible ways to solve this correctly, one the date should go to 2/28 or 2/29 depending on the leap year, or consider if it were 2/31, what day would that be in march? well on a leap-year it would be march 2nd but on a non leap year it would be 3rd. If you want the challenge try to make it work the second way ***

days in each month
    31,28,31,30,31,30,31,31,30,31,30,31



*/

//global vairiables

let date = new Date();

let currentDate = {

    year: date.getFullYear(),
    month: date.getMonth() +1,
    day: date.getDate(),

    dayInMonths: [31,28,31,30,31,30,31,31,30,31,30,31]

};





//function calls
createInitalElms()






//functions


//returns a string from the global 'dateInfo' js object
function createTextFromDateObj(separator) {

    let sep = separator != undefined ? separator : '/',

        dateObj = dateInfo,

        day = dateInfo.day > 9 ? dateInfo.day : '0' + dateInfo.day,

        month = dateInfo.month > 9 ? dateInfo.month : '0' + dateInfo.month;

        string = month + sep + day + sep + dateInfo.year;

        return string

}



//creates elements and puts them on the body
function createInitalElms(){

    createHeading({text: createTextFromDateObj('-'), id: 'dateHead'})

    //This creates the current date heading that is shown on the site
    let day = currentDate.day >= 10 ? currentDate.day : '0' + currentDate.day;
    let month = currentDate.month >= 10 ? currentDate.month : '0' + currentDate.month;
    let currentDateString = `${month}/${day}/${currentDate.year}`;


    
    //create the head elm
    //set the properties
    createHeading({text: currentDateString, id: 'dateHead'})
    
    //create all the needed button elms



    //next day, prev day, next month, prev month, next year, prev year, (set back to current date)

    createButton({id: 'nextDay', class: 'navBtns', text: 'Next Day', onClickFunc: modifyDate}),
    createButton({id: 'prevDay', class: 'navBtns', text: 'Prev Day', onClickFunc: modifyDate}),
    createButton({id: 'nextMonth', class: 'navBtns', text: 'Next Month', onClickFunc: modifyDate}),
    createButton({id: 'prevMonth', class: 'navBtns', text: 'Prev Month', onClickFunc: modifyDate}),
    createButton({id: 'nextYear', class: 'navBtns', text: 'Next Year', onClickFunc: modifyDate}),
    createButton({id: 'prevYear', class: 'navBtns', text: 'Prev Year', onClickFunc: modifyDate});


}


//modify the date variable dpeending on which button was clicked
function modifyDate(){

    //find out what button was clicked

    console.log(this);  // Expect the HTML element whichthe functionwas called from 

    let id = this.id,
        curDay = dateInfo.day,
        curMonth = dateInfo.month,
        curYear = dateInfo.year;

    checkForLeapYear(curyear)


    switch (id) {
        case 'nextDay':

            nextDay(curDay, curMonth)

            break;

        case 'prevDay':

            prevDay(curDay, curMonth)

            break;

        case 'nextMonth':

            nextMonth(curMonth)

            break;  
            
        case 'prevMonth':

            prevMonth(curMonth)

            break; 
            
        case 'nextYear':

            break;   

        case 'prevYear':

            break;    
 
    }


    //check for impossible dates like feb 31st
    if ( dateInfo.day > dateInfo.dayinMonths[dateInfo.month-1] ) {

        dateInfo.day = dateInfo.dayInMonths[dateInfo.month-1]

    }



    document.getElementById('dateHead').innerText = createTextFromDateObj('-')
        //update the clinet/ front end display

}

function nextDay(curDay, curMonth) {

    //what month are we in, what is the last day of the month
    //are we in the last day of the month, if so go to the next month.
    //is it demcember?  in which case go to the next year
    //if we are not on the last day of the month simply increase the 'day number by one

    

    if ( curDay < dateInfo.dayInMonths[curMonth-1] ) {
        dateInfo.day++
    } else if (curDay == dateInfo.dayInMonths[curMonth-1] && curMonth != 12 ) {      //at the end of the month, but not the end of the year

            dateInfo.day = 1;
            dateInfo.month++

    } else if (curDay == dateInfo.dayInMonths[curMonth-1] && curMonth == 12) {      //at the end of the month of december

        dateInfo.day = 1;
        dateInfo.month = 1;
        date.year++

    }


}

function prevDay(curDay, curMonth){

    


    if ( curDay > 1 ) {

        dateInfo.day--

    } else if( curDay == 1 && curMont != 1 ){

        dateInfo.day = dateInfo.dayinMonths[curMonth-2];
        dateInfo.month--

    } else if ( curDay == 1 && curMonth == 1 ) {

        dateInfo.day = 31;
        dateInfo.month = 12;
        dateInfo.year--

    }

}

function nextMonth(curMonth){



    if ( curMonth < 12 ) {

        dateInfo.month++

    }else if ( curMonth == 12 ) {

        dateInfo.month = 1;
        dateInfo.year++

    }else {
        console.log('something has gone wrong', dateInfo);
    }


}

function prevMonth(curMonth){


    if ( curMonth > 1 ) {

        dateInfo.month--

    }else if ( curMonth == 1 ) {

        dateInfo.month = 12;
        dateInfo.year--

    }else {
        console.log('something has gone wrong', dateInfo);
    }


}


function checkLeapYear(year){

    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0 )) {

        dateInfo.dayinMonths[1] = 29

    } else {

        dateInfo.dayInMonths[1] = 28

    }

}



//functions that create html elements
function createHeading(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');
 
    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';
 
    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {
 
        heading.id = headingObj.id
        
    }
 
    document.body.appendChild(heading);

}


 function createButton(buttonObj) {

    let button = document.createElement('button');

    if(buttonObj.id != undefined && document.getElementById(buttonObj.id) == null){
        button.id = buttonObj.id
    }
    

    if(buttonObj.class != undefined) {
    button.className = buttonObj.class
 }

    if ( buttonObj.onClickFunc != undefined) {
        button.onclick = buttonObj.onClickFunc;
    }

    if(buttonObj.text != undefined)
    button.innerText = buttonObj.text

    document.body.appendChild(button);
}
