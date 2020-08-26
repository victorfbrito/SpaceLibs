"use strict";

const Route = use("Route");

Route.post("users", "UserController.store").validator("User");
Route.get("/users", "UserController.index");

Route.post("sessions", "SessionController.store").validator("Session");

Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

Route.post("users", "ForgotUsernameController.store").validator(
  "ForgotUsername"
);
Route.post("users", "ForgotUsernameController.update").validator(
  "ResetUsername"
);

Route.post("/files", "FileController.store");
Route.get("/files/:id", "FileController.show");

//apenas acessadas com sessão ativa
Route.group(() => {
  //apiOnly exclui métodos create e edit
  //.resoure = chama TODOS os métodos do controller
  Route.resource("cards", "CardController")
    .apiOnly()
    .validator(new Map([[["cards.store"], ["Card"]]]));
}).middleware(["auth"]);
