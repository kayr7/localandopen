package controllers

import (
//	"fmt"
	"strconv"
	"encoding/json"
	"models"
	u "utils"
	"net/http"
	"os"
)

var CreateVendor = func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("cors"))
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")


//	user := r.Context().Value("user").(uint) //Grab the id of the user that send the request
	vendor := &models.Vendor{}
	err := json.NewDecoder(r.Body).Decode(vendor)
	if err != nil {
		u.Respond(w, u.Message(false, "Unzulässige Anfrage"))
		logging := &models.Logging{}
		logging.Name = "Vendor:Fail:CreateVendor:jsonFail"
		logging.Detail = ""
		logging.Create()
		return
	}
	resp := vendor.Create()
	if !resp["status"].(bool) {
		logging := &models.Logging{}
		logging.Name = "Vendor:Fail:CreateVendor:vendorCreate"
		logging.Detail = resp["message"].(string)
		logging.Create()
	} else {
		logging := &models.Logging{}
		logging.Name="Vendor:Success:CreateVendor:"
		logging.Detail=""
		logging.Create()
	}

	u.Respond(w, resp)
}

var GetVendors = func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("cors"))
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	offering := r.FormValue("offering")
	offset := r.FormValue("offset")
	zip := r.FormValue("zip")

	offsetn, err := strconv.ParseUint(offset, 10, 64)
	if (err != nil) {
		offsetn = 0
	}
	logging := &models.Logging{}
	logging.Name="Vendor:Info:GetVendors:"
	logging.Detail="{'offering': '" + offering + "', 'offset': '"+ offset + "', 'zip': '"+ zip +"'}"
	logging.Create()

	data := models.GetVendorsFiltered(offering, zip, offsetn)
	resp := u.Message(true, "success")
	resp["data"] = data
	u.Respond(w, resp)

}
