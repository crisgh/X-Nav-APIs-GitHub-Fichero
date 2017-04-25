var repoHTML = "<input type='text' name='user' placeholder='User' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' placeholder='Repository' " +
    "id='repo' size='10' />" +
    "<button type='button'>Datos repositorio</button>" +
    "<div id='repodata'/>";

var writeHTML = "<input type='text' name='file' placeholder='File' " +
    "id='file' size='10' />" +
    "<input type='text' name='content' placeholder='Content' " +
    "id='content' size='10' />" +
    "<button type='button' id='write' onclick = this.disabled=true; >Crear Archivo</button>"+
    "<div id='fileupload'/>";

var github;
var myrepo;

function getToken() {
  var token = $("#token").val();

  github = new Github({
    token: token,
    auth: "oauth"
  });

  $("#repoform").html(repoHTML)
  $("div#form button").click(getRepo);
};

function getRepo() {
  var user = $("#user").val();
  var reponame = $("#repo").val();
  myrepo = github.getRepo(user, reponame);
  myrepo.show(showRepo);
};

function showRepo(error, repo) {
  var repodata = $("#repodata");
  if (error) {
    repodata.html("<p>Error code: " + error.error + "</p>");
  } else {
    repodata.html("<p> Datos del repositorio : </p>" +
                  "<ul><li> Nombre completo: " + repo.full_name + "</li>" +
                  "<li>Descripcion: " + repo.description + "</li>" +
                  "<li>Creado en: " + repo.created_at + "</li>" +
                  "</ul>" + writeHTML);

    $("#write").click(writeFile);
  }
};

function writeFile() {
  var file = $("#file").val();
  var content = $("#content").val()
  var fileupload= $("#fileupload");
  fileupload.html("<p> Archivo " + file + " guardado en el repositorio</p>");

  myrepo.write('master', file, content, "Updating data with githubAPI",
  function(err) {
    console.log(err);
  });
};

$(document).ready(function() {
  $("div#form button").click(getToken);
});
