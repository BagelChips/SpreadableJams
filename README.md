<!----_-_-_- SpreadableJams-_-_-_------>

<!------------------------------------
    Project is viewable at:
    https://www.markariddell.com/SpreadableJams/


Spreadable Jams is a community database of music that has affected people in a definitive way. In order to add to the database, you must submit the rationale behind why said song is indeed a 'Jam'. If your jam description is extraordinary, it could be featured on the main Jam Blog. Keep Jamming!


!Important!
Out of an abundance of caution, you need to provide your own spotify user API credentials on the search feature of this website. We are we are currently working on Jam Spread 2.0 to alleviate this extra step and keep everyone's information safe.
(available at https://developer.spotify.com/dashboard/applications )

<!-- _-_-_- JavaScript Features-_-_-_-->

<!--

1.
    -Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app
    -Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX)

    ///app.js  ///  137 - 223  ///

    Currently using XHRHttp requests.
    In the future, using fetch or axios could reduce the amount of code. Also, I plan to handle authentication using server-side environmental variables, tightening security.

2.
    Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application

    ///app.js  ///  167 - 194  ///
    Populates "searchResults" array with "Jam" objects
    ///app.js  ///  67 - 103   ///
    Function that uses array of objects to create HTML for displaying search results from spotify API requests.

3.
    Create and use a function that accepts two or more values (parameters), calculates or determines a new value based on those inputs, and returns a new value.

    ///app.js  ///  167 - 194  ///
    Function that accounts for user input and whether the string is referring to the "artist" or "track." Returns a string that can attatched to a url and directs user to the appropriate API endpoint.

    ///app.js  ///  107 - 115  ///
    Function that accepts an array of elements and a class. Looping through the elements, the function checks for the indicated class and either adds or removes said class, depending on the elements current state.




 -->
