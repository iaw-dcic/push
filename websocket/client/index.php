<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>IAW - Chat con WebSocket</title>
        <link rel="stylesheet" href="css/estilo.css">
        <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript">
            var user = "Nombre";
        </script>
        <script type="text/javascript" src="js/chat.js"></script>
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body onload="init()">
        <nav class="navbar navbar-default" role="navigation">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">IAW - WebSocket</a>
            </div>
            <div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-3">
              <button id="connect" type="button" class="btn btn-default navbar-btn">
                  <span id="status" class="glyphicon glyphicon-log-in"></span>
                  <span id="changeStatus">Conectarse</span>
              </button>
              <button type="button" class="btn btn-default navbar-btn" id="signin">Ingresar</button>
            </div>
          </div>
        </nav>
        <div class="container">
            <div class="row" id="errors"></div>
            <div class="row">
                <div class="col-md-8">
                    <div class="well" id="messages"></div>
                    <div class="col-lg-6">
                        <div class="input-group">
                          <input id="msg" type="text" class="form-control">
                          <span class="input-group-btn">
                            <button id="send"  class="btn btn-default" type="button">Enviar</button>
                          </span>
                        </div>
                      </div>
                </div>
                <div class="col-md-4">
                    <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Usuarios</th>
                      </tr>
                    </thead>
                    <tbody id="users">
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>
