package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	u "utils"
)

type Offering struct {
	gorm.Model
	Name   string `json:"name"`
}

/*
 This struct function validate the required parameters sent through the http request body
returns message and true if the requirement is met
*/
// TODO: we need to do some checks!
func (offering *Offering) Validate() (map[string]interface{}, bool) {

	if offering.Name == "" {
		return u.Message(false, "Offering needs to have a name"), false
	}

	//All the required parameters are present
	return u.Message(true, "success"), true
}

func (offering *Offering) Create() (map[string]interface{}) {

	if resp, ok := offering.Validate(); !ok {
		fmt.Println("validation failed")
		return resp
	}

	GetDB().Create(offering)

	resp := u.Message(true, "success")
	resp["offering"] = offering
	return resp
}

func GetOffering(id uint) (*Offering) {

	offering := &Offering{}
	err := GetDB().Table("offerings").Where("id = ?", id).First(offering).Error
	if err != nil {
		return nil
	}
	return offering
}

func GetOfferings() ([]*Offering) {

	offerings := make([]*Offering, 0)
	err := GetDB().Table("offerings").Find(&offerings).Error
	if err != nil {
		return nil
	}

	return offerings
}