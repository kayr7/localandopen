package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	u "utils"
)

type Logging struct {
	gorm.Model
	Name string `json:"log"`
	Detail string `json:"detail"`
}

/*
 This struct function validate the required parameters sent through the http request body
returns message and true if the requirement is met
*/
// TODO: we need to do some checks!
func (logging *Logging) Validate() (map[string]interface{}, bool) {

	//All the required parameters are present
	return u.Message(true, "success"), true
}

func (logging *Logging) Create() (map[string]interface{}) {

	if resp, ok := logging.Validate(); !ok {
		fmt.Println("validation failed")
		return resp
	}

	GetDB().Create(logging)

	resp := u.Message(true, "success")
	resp["loggin"] = logging
	return resp
}

