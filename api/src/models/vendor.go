package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	u "utils"
)

type Vendor struct {
	gorm.Model

	Name   string `json:"name"`
	Offering string `json:"offering"`
	Description string `json:"description"`
	Onlineshop uint `json:"onlineshop"`
	Delivery uint `json:"delivery"`
	MailOrder uint `json:"mail_order"`
	Voucher uint `json:"voucher"`
	Website string `json:"website"`
	Mail string `json:"mail"`
	Phone string `json:"phone"`
	Address string `json:"address"`
	Street string `json:"street"`
	StreetNr string `json:"street_nr"`
	Zip string `json:"zip"`
	City string `json:"city"`
	Country string `json:"country"`
	Acceptance uint `json:"acceptance"` 
	UserId uint   `json:"user_id"` //The user that this Vendor belongs to
}

/*
 This struct function validate the required parameters sent through the http request body
returns message and true if the requirement is met
*/
func (vendor *Vendor) Validate() (map[string]interface{}, bool) {

	if vendor.Name == "" {
		return u.Message(false, "Vendor name should be on the payload"), false
	}

	if vendor.Phone == ""  && vendor.Mail == "" {
		return u.Message(false, "Either Phone number Mail should be provided"), false
	}

	if vendor.Offering == "" {
		return u.Message(false, "Offering should be provided"), false
	}
	if vendor.Onlineshop == 1 && vendor.Website == "" {
		return u.Message(false, "Website should be provided if you have an onlineshop"), false
	}

	if vendor.UserId <= 0 {
		return u.Message(false, "User is not recognized"), false
	}
	fmt.Println("alles OK")

	//All the required parameters are present
	return u.Message(true, "success"), true
}

func (vendor *Vendor) Create() (map[string]interface{}) {

	if resp, ok := vendor.Validate(); !ok {
		return resp
	}

	GetDB().Create(vendor)

	resp := u.Message(true, "success")
	resp["vendor"] = vendor
	return resp
}

func GetVendorsFiltered(offering string, zip string, offset uint64) ([]*Vendor) {
//	vendor := &Vendor{}


	vendors := make([]*Vendor, 0)
	if (len(offering) > 0) {
		if (len(zip) > 0) {
			err := GetDB().Table("vendors").
				Where("offering = ? AND zip LIKE ?", offering, zip+"%").Find(&vendors).Error
			if err != nil {
				return nil
			}
			return vendors	
		}
		err := GetDB().Table("vendors").
			Where("offering = ?", offering).Find(&vendors).Error
		if err != nil {
			return nil
		}
		return vendors	
	} else {
		if (len(zip) > 0) {
			err := GetDB().Table("vendors").
				Where("zip LIKE ?", zip+"%").Find(&vendors).Error
			if err != nil {
				return nil
			}
			return vendors	
		}
	}

	err := GetDB().Table("vendors").Find(&vendors).Error
	if err != nil {
		return nil
	}
	return vendors	
}



func GetVendors() ([]*Vendor) {

	vendors := make([]*Vendor, 0)
	err := GetDB().Table("vendors").Find(&vendors).Error
	if err != nil {
		fmt.Println(err)
		return nil
	}

	return vendors
}