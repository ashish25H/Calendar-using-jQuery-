const weekDays = $('#week-days');
const monthDropdown = $('#month-dropdown');
const yearDropdown = $('#year-dropdown');
const monthText = $('#month');
const yearText = $('#year');
const ROWS = 6;
const MIN_YEAR = 2010;
const MAX_YEAR = 2040;
const weekDaysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const birthdays = [
    { name: "John Doe", day: 15, month: 5, year: 1990 },
    { name: "Jane Smith", day: 22, month: 9, year: 1985 },
    { name: "David Johnson", day: 10, month: 3, year: 1998 },
    { name: "Emily Brown", day: 7, month: 6, year: 1992 },
    { name: "Michael Davis", day: 14, month: 2, year: 1995 },
    { name: "Sarah Wilson", day: 30, month: 12, year: 1999 },
    { name: "Daniel Thompson", day: 1, month: 9, year: 1997 },
    { name: "Olivia Harris", day: 18, month: 12, year: 1987 },
    { name: "Matthew Martin", day: 25, month: 7, year: 1993 },
    { name: "Sophia Anderson", day: 2, month: 4, year: 1989 },
    { name: "Jacob Clark", day: 9, month: 8, year: 1994 },
    { name: "Emma Lee", day: 28, month: 3, year: 2000 },
    { name: "Christopher Green", day: 12, month: 10, year: 1986 },
    { name: "Ava Taylor", day: 5, month: 1, year: 1991 },
    { name: "James Hill", day: 19, month: 6, year: 1996 },
    { name: "Mia Walker", day: 24, month: 9, year: 1998 },
    { name: "Liam Turner", day: 1, month: 12, year: 1992 },
    { name: "Grace Carter", day: 17, month: 2, year: 1997 },
    { name: "Benjamin Cooper", day: 8, month: 7, year: 1994 },
    { name: "Chloe King", day: 11, month: 4, year: 1999 }
];



let startDate = '';
let endDate = '';
let flag = 0; //when you click on right arrow button it will   increase and it will decrease when you click on left arrow button.
let selectedMonth = new Date().getMonth();
let selectedYear = new Date().getFullYear();
let removeExectingSelection = false;


const addWeekDays = () => {         //adding week days like sun,mon,tue,wed etc.
    let str = '';
    for (let item of weekDaysArray) {
        str += `<div class='grid-item'>${item}</div>`;
    }
    weekDays.html(str);
}
addWeekDays();

const setMonthsInDropdown = () => {         //set month name in month drop down
    let str = '';
    monthArray.forEach((month) => {
        str += `<option value=${month}>${month}</option>`;
    });
    monthDropdown.html(str);
}
setMonthsInDropdown();

let setYearsInDropdown = () => {        //set years in year drop down
    let str = '';
    for (let i = MIN_YEAR; i <= MAX_YEAR; i++) {
        str += `<option value=${i}>${i}</option>`;
    }
    yearDropdown.html(str);
}
setYearsInDropdown();

function addDateRangeClass(startDate, endDate) {
    removeExectingSelection = true;
    let min = +startDate < +endDate ? +startDate : +endDate;
    let max = +startDate > +endDate ? +startDate : +endDate;
    for (let i = min; i <= max; i++) {
        const item = $(`#${i}`);
        item.removeClass('current-date');
        item.addClass('date-range');
    }
}

function removeDateRangeClass(startDate, endDate) {
    let min = +startDate < +endDate ? +startDate : +endDate;
    let max = +startDate > +endDate ? +startDate : +endDate;
    for (let i = min; i <= max; i++) {
        const item = $(`#${i}`);
        item.removeClass('date-range');
    }
}

function addDateRangeFeature() {

    let prevStart = 0;
    let prevEnd = 0;

    $('.month-date').each(function (element) {
        $(this).click(function (event) {

            if (startDate === '' && endDate === '') {
                startDate = $(this).attr('id');
            } else if (endDate === '') {
                endDate = $(this).attr('id');
            }

            if (startDate !== '' && endDate !== '') {
                addDateRangeClass(startDate, endDate);
            }

            if (prevStart === 0 || prevEnd === '' || prevStart !== startDate) {
                if (prevStart !== startDate) {
                    removeDateRangeClass(prevStart, prevEnd);
                }
                prevStart = startDate;
                prevEnd = endDate;
            }

            if (removeExectingSelection) {
                startDate = '';
                endDate = '';

                removeExectingSelection = false;
            }

            event.stopPropagation();

        })
    })

}

function createCalendar(selectedMonth = null, selectedYear = null) {
    let dt = new Date();
    let currentDate = new Date();
    const startString = `<div class='grid-item month-date`;
    const endString = `</div>`;
    let elementDataArr = [];
    let hasDesiredDateOfBirth;

    if (selectedMonth !== null && selectedYear !== null) {
        if (isNaN(selectedMonth)) {
            dt = new Date(`${selectedMonth} 01, ${selectedYear}`);
        } else {
            dt = new Date(`${monthArray[selectedMonth]} 01, ${selectedYear}`);
        }
    }

    monthDropdown.val(monthArray[dt.getMonth()]);
    yearDropdown.val(dt.getFullYear());

    // console.log(flag);
    if (flag !== 0) {
        dt.setMonth(new Date().getMonth() + flag);
    }

    const month = dt.getMonth();
    const year = dt.getFullYear();
    yearText.text(year);
    monthText.text(monthArray[month]);

    //calculates the number of days in a month based on the provided year and month values
    const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

    const dateObj = new Date(year, month, 1);
    const firstDayOfMonth = dateObj.getDay();

    // let count = 1;
    let sunday = count = 1;
    let dateText;
    let lastDayOfPreviousMonth = new Date(year, month, 0).getDate('', month, year);
    for (let i = 1; i <= ROWS; i++) {
        let rowElement = $(`#month-row-${i}`);
        let rowContent = '';

        for (let j = (i * 7 - ROWS); j <= i * 7; j++) {
            hasDesiredDateOfBirth = birthdays.some((item) => item.day === j - firstDayOfMonth && item.month === month + 1);

            if (j <= firstDayOfMonth) {
                //add inactive dates
                rowContent += `${startString} inactive-date'> ${(lastDayOfPreviousMonth - firstDayOfMonth) + j} ${endString}`;
            } else if (j > numberOfDaysInMonth + firstDayOfMonth) {
                //add inactive dates
                rowContent += `${startString} inactive-date'> ${count} ${endString}`;
                count++;
            } else if (j - sunday === 7 || j === 1) {
                //adding sunday here
                dateText = j - firstDayOfMonth;

                if (hasDesiredDateOfBirth) {
                    birthdays.forEach((element, index) => {
                        if (element.month === month + 1 && element.day === dateText) {
                            rowContent += (dateText === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) ? `${startString} current-date sunday birthday' id=${dateText}>${dateText}${endString}` : `${startString} sunday birthday' id=${dateText}> ${dateText} ${endString}`;

                            let elementDate = {
                                elementId: dateText,
                                index: index,
                            }
                            elementDataArr.push(elementDate);
                        }
                    });
                } else {
                    rowContent += (dateText === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) ? `${startString} current-date sunday' id=${dateText}>${dateText}${endString}` : `${startString} sunday' id=${dateText}> ${dateText} ${endString}`;
                }

                sunday = j;

            } else {
                //add normal dates in calendar 
                dateText = j - firstDayOfMonth;

                if (hasDesiredDateOfBirth) {
                    birthdays.forEach((element, index) => {
                        if (element.month === month + 1 && element.day === dateText) {
                                rowContent += (dateText === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) ? `${startString} current-date birthday' id=${dateText}> ${dateText} ${endString}` : `${startString} birthday' id=${dateText}> ${dateText} ${endString}`;

                            let elementDate = {
                                elementId: dateText,
                                index: index,
                            }
                            elementDataArr.push(elementDate);
                        }
                    });
                } else {
                    rowContent += (dateText === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) ? `${startString} current-date' id=${dateText}> ${dateText} ${endString}` : `${startString} ' id=${dateText}> ${dateText} ${endString}`;
                }
            }
        }

        rowElement.html(rowContent);
    }

    let icon = `<i class="fa fa-cake-candles icon"></i>`;
    elementDataArr.map((element) => {
        let hoverBox = `<div class='hoverDateBox' id=${element.elementId + 'hover'}>Name : ${birthdays[element.index].name} <br> DOB : ${birthdays[element.index].day}-${birthdays[element.index].month}-${birthdays[element.index].year}</div>`;
        
        $('#' + element.elementId).append(icon, hoverBox);

        $('.hoverDateBox').hide();

        $('#' + element.elementId).hover(function () {
            $('#' + element.elementId + 'hover').toggle();
        })
    });

    addDateRangeFeature();
}

function handleEvents() {
    $('#next-button').click(function (event) {
        flag++;
        createCalendar();
    });

    $('#back-button').click(function (event) {
        flag--;
        createCalendar();
    });

    $('#current-date-btn').click(function (event) {
        flag = 0;
        selectedMonth = new Date().getMonth();
        selectedYear = new Date().getFullYear();
        createCalendar();
    });

    $('#month-dropdown').change(function (event) {
        // event.stopPropagation();
        selectedMonth = monthDropdown.val();
        flag = 0;
        createCalendar(selectedMonth, selectedYear);
    });

    $('#year-dropdown').change(function (event) {
        // event.stopPropagation();
        selectedYear = yearDropdown.val();
        flag = 0;
        createCalendar(selectedMonth, selectedYear);
    });

    $('body').click(function(event){
        if(event.target.classList.contains('body-class')){
            // console.log(`body event called`);
            location.reload();
        }
    });

}

createCalendar();
handleEvents();
