package controllers

import (
//	"fmt"
	"encoding/json"
	"models"
	u "utils"
	"net/http"
	"os"
)

var CreateOffering = func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", os.Getenv("cors"))
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	offering := &models.Offering{}

	err := json.NewDecoder(r.Body).Decode(offering)
	if err != nil {
		u.Respond(w, u.Message(false, "Error while decoding request body"))
		logging := &models.Logging{}
		logging.Name = "Offering:Fail:CreateOffering:jsonFail"
		logging.Detail = ""
		logging.Create()

		return
	}

	resp := offering.Create()
	if !resp["status"].(bool) {
		logging := &models.Logging{}
		logging.Name = "Offering:Fail:CreateOffering:offeringCreate"
		logging.Detail = resp["message"].(string)
		logging.Create()
	} else {
		logging := &models.Logging{}
		logging.Name="Offering:Success:CreateOffering:"
		logging.Detail=""
		logging.Create()
	}
	u.Respond(w, resp)
}

var GetOfferings = func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", os.Getenv("cors"))
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	data := models.GetOfferings()
	resp := u.Message(true, "success")

	logging := &models.Logging{}
	logging.Name = "Offering:Info:GetOfferings:"
	logging.Detail = ""
	logging.Create()

	resp["data"] = data
	u.Respond(w, resp)
}