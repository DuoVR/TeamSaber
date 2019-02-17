$(document).ready(function() {
  $.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
      var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
      options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  $.ajax({
    type: "GET",
    url: "http://networkauditor.org/api-teamsaber/getteams/",
    dataType: "json",
    success: function(data) {
      readData(data);
    }
  });

  function readData(json) {
    teams = [];
    for (var team in json) {
      var teamData = json[team];
      var songObj = {
        "name": teamData["teamName"],
        "score": teamData["score"],
        "color": teamData["color"]
      }

      teams.push(songObj);
    }

    teams.sort(function(a, b) {
      return b.score - a.score
    });

    console.log(teams);

    var tbody = $('tbody');

    for (var i in teams) {
      var team = teams[i]
      var html = '<tr><td class="col1">'
      html += team["name"] + ' - '
      html += team["score"] + '</td></tr>'

      tbody.append(html);
    }
  }
});
