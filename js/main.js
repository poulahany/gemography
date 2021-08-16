

//XMLHttpRequest object assigned to a vaiable called request
var request = new XMLHttpRequest()
//open a new connection, using the GET request on the URL endpoint
//the URL retrievesthe trending repositories in a given time interval and sort them according to the number of stars
request.open('GET', 'https://api.github.com/search/repositories?q=created:%3E2021-03-01&sort=stars&order=desc&per_page=100', true)
request.onload = function () {
    //accessing the JSON data
    var data = JSON.parse(this.response)
    //Creating a new Sting in a variable called statusHTML
    var statusHTML = ''
    //creating new array called getLanguage & List
    const getLanguage = []
    const list = []
    // console.log(data)
    $.each(data.items, function (i, status) {
        //for each item in the data push the language in getLanguage
        getLanguage.push(status.language)
    })
    //create a new set out of the getLanguage array and store it in new array called languages 
    const languages = [...new Set(getLanguage)]

    languages.forEach(lang => {
        //for each language in languages we create a new array called repos to store the
        //repos that used this language and the getting the length og this repos array 
        //and store it inside new variable called count then push all this data into list array
        const repos = []
        data.items.forEach(item => {
            if (item.language === lang) repos.push(item.html_url)
        })
        const count = repos.length
        list.push({
            languages: lang,
            total: count,
            repositories: repos
        })
    });
    console.log(list)


    $.each(list, function (i, status) {
        //for each item inside JSON date we get full name, language, #of stars, URL 
        //and append these datat to statusHTML in the form of a table
        statusHTML += '<tr>'
        statusHTML += '<td>' + status.languages + '</td>'
        statusHTML += '<td>' + status.total + '</td>'
        statusHTML += '<td>' + status.repositories + '</td>'
        statusHTML += '</tr>'
    })
    //finally append the statusHTML to the HTML table
    $('tbody').html(statusHTML)
}
//send the request
request.send()
