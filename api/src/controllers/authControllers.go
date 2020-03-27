package controllers

import (
	"net/http"
	u "utils"
	"models"
	"encoding/json"
	"os"
)

var CreateAccount = func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", os.Getenv("cors"))
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account) //decode the request body into struct and failed if any error occur
	if err != nil {
		u.Respond(w, u.Message(false, "Unzulässige Anfrage"))
		logging := &models.Logging{}
		logging.Name = "Auth:Fail:CreateAccount:jsonFail"
		logging.Detail = ""
		logging.Create()
		return
	}

	resp := account.Create() //Create account
	if !resp["status"].(bool) {
		logging := &models.Logging{}
		logging.Name = "Auth:Fail:CreateAccount:accountCreate"
		logging.Detail = resp["message"].(string)
		logging.Create()
	} else {
		logging := &models.Logging{}
		logging.Name="Auth:Success:CreateAccount:"
		logging.Detail=""
		logging.Create()
	}
	u.Respond(w, resp)
}

var Authenticate = func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", os.Getenv("cors"))
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account) //decode the request body into struct and failed if any error occur
	if err != nil {
		u.Respond(w, u.Message(false, "Invalid request"))
		logging := &models.Logging{}
		logging.Name = "Auth:Fail:Authenticate:jsonFail"
		logging.Detail = ""
		logging.Create()

		return
	}

	resp := models.Login(account.Email, account.Password)
	if !resp["status"].(bool) {
		logging := &models.Logging{}
		logging.Name = "Auth:Fail:Authenticate:models.Login"
		logging.Detail = resp["message"].(string)
		logging.Create()
	} else {
		logging := &models.Logging{}
		logging.Name="Auth:Success:Authenticate:"
		logging.Detail=""
		logging.Create()
	}

	u.Respond(w, resp)
}