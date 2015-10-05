var url = "https://alumnoscurso.azure-mobile.net/Tables/Curso";

var cargar = function(datos) {
    var tabla = "";

    $.each(datos,function(key,elem) {

        tabla += "<tr>";
        tabla += "<td>" + elem.nombre + "</td>";
        tabla += "<td>" + elem.duracion + "</td>";
        tabla += "<td><a href='#' onclick='borrar(\""
            + elem.id + "\")'>Borrar</a></td>";
        tabla += "</tr>";

    });
    $("#cursos").html(tabla);
};
var obtener = function() {

    $.getJSON(url, null, cargar);
};
var buscar=function() {
    var u = url;
    if ($("#txtBus").val() !== "") {
      //  u += "?$filter=nombre eq '" + $("#txtBus").val() + "'";
        u += "?$filter=substringof('" + $("#txtBus").val() +
            "',nombre)";
    }
    $.getJSON(u, null, cargar);
}
var borrar=function(id) {

    $.ajax({
        method: "DELETE",
        url: url + "/" + id,
        error: function() {
            alert("Fallo al borrar");
        },
        success: obtener
        
    });
}
var verFormulario=function() {
    $("#nuevo").show();
}
var alta=function() {
    var data = {
        nombre: $("#txtNom").val(),
        duracion: $("#txtDur").val()
    };
    $.ajax({

        method: "POST",
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        success: function() {
            obtener();
            $("#nuevo").hide();
        },
        error: function() {
            alert("Error al guardar");
        }
    });

}

$(document).ready(function() {

    obtener();

    $("#btnBus").bind("click", buscar);
    $("#btnNue").click(verFormulario);
    $("#btnGua").click(alta);


});