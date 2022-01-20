import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Company } from '../Models/company';

@Component({
  selector: "app-company",
  templateUrl: "./company.page.html",
  styleUrls: ["./company.page.scss"],
})
export class CompanyPage implements OnInit {
  private company : any = {}; 
  companys: any = [];
  editMode: boolean = false;
  selected_category_id: number = 0;
  editId: number = 0;

  constructor(public database: DatabaseService) {
    this.getCategories();
    this.getCompanys();
  }

  ngOnInit() {}

  getCategories() {
    this.database.getCategories().then((data) => {
      this.company.categories = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.company.categories.push(data.rows.item(i));
        }
      }
    });
  }

  addCompany() {
    if (!this.company.companyName.length) {
      alert("Enter company name");
      return;
    }

    if (this.company.category_id === 0) {
      alert("Select category");
      return;
    }

    if (this.editMode) {
      this.company.id= this.editId;
      this.database
        .editCompany(this.company)
        .then((data) => {
          this.company.companyName = "";
          this.company.address = "";
          this.company.numberphone = "";
          this.company.email = "";
          this.editMode = false;
          this.editId = 0;
          this.selected_category_id = 0;
          alert(data);
          this.getCompanys();
        });
    } else {
      // add
      this.database
        .addCompany(this.company)
        .then((data) => {
          this.company.companyName = "";
          this.company.address = "";
          this.company.numberphone = "";
          this.company.email = "";
          this.company.category_id = 0;
          alert(data);
          this.getCompanys();
        });
    }
  }

  getCompanys() {
    this.database.getCompanys().then((data) => {
      this.companys = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.companys.push(data.rows.item(i));
        }
      }
    });
  }

  deleteCompany(id: number) {
    this.database.deleteCompany(id).then((data) => {
      alert(data);
      this.getCompanys();
    });
  }

  editCompany(company: any) {
    this.editMode = true;
    this.selected_category_id = company.category_id;
    this.company.companyName = company.company;
    this.company.address = company.address;
    this.company.numberphone = company.numberphone;
    this.company.email = company.email;
    this.editId = company.id;
  }
}
