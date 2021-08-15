

//XMLHttpRequest object assigned to a vaiable called request
var request = new XMLHttpRequest()
//open a new connection, using the GET request on the URL endpoint
//the URL retrievesthe trending repositories in a given time interval and sort them according to the number of stars
request.open('GET', 'https://api.github.com/search/repositories?q=pushed:2018-04-30..2021-08-15&sort=stars&order=desc', true)
request.onload = function () {
    //accessing the JSON data
    var data = JSON.parse(this.response)
    //Creating a new Sting in a variable called statusHTML
    var statusHTML = ''

    $.each(data.items, function (i, status) {

        //for each item inside JSON date we get full name, language, #of stars, URL 
        //and append these datat to statusHTML in the form of a table
        statusHTML += '<tr>'
        statusHTML += '<td>' + status.full_name + '</td>'
        statusHTML += '<td>' + status.language + '</td>'
        statusHTML += '<td>' + status.stargazers_count + '</td>'
        statusHTML += '<td>' + status.html_url + '</td>'

        statusHTML += '</tr>'
    })
    //finally append the statusHTML to the HTML table
    $('tbody').html(statusHTML)
}
//send the request
request.send()
