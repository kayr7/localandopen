package controllers

import (
//	"fmt"
	"encoding/json"
	"models"
	u "utils"
	"net/http"
	"os"
)

var CreateLogging = func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", os.Getenv("cors"))
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	logging := &models.Logging{}

	err := json.NewDecoder(r.Body).Decode(logging)
	if err != nil {
		u.Respond(w, u.Message(false, "Fehlerhafte Daten"))
		return
	}

	resp := logging.Create()
	u.Respond(w, resp)
}
