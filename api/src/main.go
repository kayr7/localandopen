package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"app"
	"controllers"
	"net/http"
	"os"
)

func main() {

	router := mux.NewRouter()

	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/vendors/new", controllers.CreateVendor).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/vendors", controllers.GetVendors).Methods("GET", "OPTIONS") //  user/2/contacts
	router.HandleFunc("/api/offerings/new", controllers.CreateOffering).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/offerings", controllers.GetOfferings).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/info", controllers.CreateLogging).Methods("POST", "OPTIONS")

	router.Use(app.JwtAuthentication) //attach JWT auth middleware

//	router.NotFoundHandler = app.NotFoundHandler

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" //localhost
	}


	err := http.ListenAndServe(":"+port, router) //Launch the app, visit localhost:8000/api
	if err != nil {
		fmt.Print(err)
	}
}


