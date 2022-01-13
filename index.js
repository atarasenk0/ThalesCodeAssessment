// Thales JavaScript Assessment for Sofware Engineer role
// Anton Tarasenko
// Commenced: 13/01/2022
// Submitted: 13/01/2022

// -----------------------------------------------
// Assumptions made:
// - grid dimensions may vary
// - word must be >1 characters long
// - word will not appear more than once in each of row OR column OR diagonal
// - word may appear multiple times across row AND column AND diagonal
// - word may be a palindrome i.e. appear forwards as well as in reverse
// - assume that user-specified inputs are correct i.e. fields can't be empty / incorrect
// -----------------------------------------------

const inputForm  = document.getElementById("inputForm");
const inputWord  = document.getElementById("inputWord");
const csvFile    = document.getElementById("csvFile");


// -----------------------------------------------
// Remove commas from the input string using global regex
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags_2
// Split the string based on the new line character
// -----------------------------------------------
function csvToRowArray(str) {
    str = str.replace(/,/g, "");
    const rows = str.split("\n");
    rows.pop();
    return rows;
}
// -----------------------------------------------


// -----------------------------------------------
// Function to take transpose of array
// N.B. in the interest of time, this implementation was COPIED from: 
// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
// -----------------------------------------------
function transpose(arr) {
    const rows = arr.length, cols = arr[0].length;
    const grid = [];
    for (let j = 0; j < cols; j++) {
        grid[j] = Array(rows);
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[j][i] = arr[i][j];
        }
    }
    return grid;
}
// Above function is not my own implementation
// -----------------------------------------------
  

// -----------------------------------------------
// Search horizontally across each row for the word of interest
// Perform the word search forwards and in reverse
// Return integer matches for this specific search
// -----------------------------------------------
function searchHorizontally(arr, word) {
    let count = 0;
    arr.forEach(function (row) {
        let fwdFound = row.includes(word);
        let revFound = row.split("").reverse().join("").includes(word);
        
        // Separate conditional checks required due to palindromes
        // Can potentially arrive at a cleaner implementation with more time
        if (fwdFound){
            count++;
        } 

        if (revFound) {
            count++;
        }
    });
    return count; 
}
// -----------------------------------------------


// -----------------------------------------------
// Search across each column for the word of interest
// This function operates on the transpose of the input array
// Could reuse searchHorizontally() with improved pre-processing of input argument
// -----------------------------------------------
function searchVertically(arr, word) {
    let count = 0;
    arr.forEach(function (row) {
        row = row.join(""); // main difference to horizontal search
        let fwdFound = row.includes(word);
        let revFound = row.split("").reverse().join("").includes(word);
        
        // Separate conditional checks required due to palindromes
        // Can potentially arrive at a cleaner implementation with more time
        if (fwdFound){
            count++;
        } 

        if (revFound) {
            count++;
        }
    });
    return count; 
}
// -----------------------------------------------


// -----------------------------------------------
// Search diagonally across array for the word of interest
// Perform the word search forwards and in reverse
// Return integer matches for this specific search
// -----------------------------------------------
function searchDiagonally(arr, word) {
// TODO: unable to complete in time
// e.g.
// Given: [A, B, C; D, E, F]
// Want to create two array of strings: 
// arr1 = [A, BD, CE, F]
// arr2 = [D, AE, BF, C]
// Would then conduct search across arr1 & arr2 in similar manner to searchHorizontally()
// Potential to reuse searchHorizontally() function
return 0;
}
// -----------------------------------------------


// -----------------------------------------------
// Create event listener for submit event
// addEventListener section is based on the following example:
// https://sebhastian.com/javascript-csv-to-array/
// -----------------------------------------------
inputForm.addEventListener("submit", function (e) {
    // Prevent page refresh (default)
    e.preventDefault();

    const input  = csvFile.files[0];
    const word   = inputWord.value.toLowerCase(); // input is case insensitive
    const reader = new FileReader();

    // Function to execute once reading operation completes using onload
    reader.onload = function (e) {
        const text = e.target.result.toLowerCase(); // grid is case insensitive
        const data = csvToRowArray(text);

        console.log("Searching for word: " + word);
        console.log("wordSearch.csv contents: \n" + text);

        // Perform the search across search grid as per requirements
        const horizonCount  = searchHorizontally(data, word);
        //console.log(horizonCount);

        const diagonalCount = searchDiagonally(data, word);
        //console.log(diagonalCount);

        dataTranspose = transpose(data);
        const verticalCount = searchVertically(dataTranspose, word);
        //console.log(verticalCount);

        const totalCount = horizonCount + verticalCount + diagonalCount;
        //console.log(totalCount);
        
        if (totalCount>0) {
            console.log("Search word \"" + word + "\" found!\n");
            console.log("Total matches: " + totalCount + "\n");
        } else {
            console.log("Search word \"" + word + "\" not found!\n");
        }
    };

    // Read the specified *.csv file
    reader.readAsText(input);

});
// -----------------------------------------------
