import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { strict } from "assert";
import { Company } from './Models/company';

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  tables = {
    categories: "categories",
    companys: "companys",
  };

  constructor(private sqlite: SQLite) {}

  async createDatabase() {
    await this.sqlite
      .create({
        name: "ionic_sqlite_crud3",
        location: "default",
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert("error on creating database " + JSON.stringify(e));
      });

    await this.createTables();
  }

  async createTables() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.categories} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL UNIQUE)`,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.companys} (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER UNSIGNED NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NULL,numberphone VARCHAR(255)  NULL,email VARCHAR(255)  NULL)`,
      []
    );
  }
  


  async addCategory(name: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.categories} (name) VALUES ('${name}')`,
        []
      )
      .then(() => {
        return "category created";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "category already exists";
        }

        return "error on creating category " + JSON.stringify(e);
      });
  }

  async getCategories() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.categories} ORDER BY name ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "error on getting categories " + JSON.stringify(e);
      });
  }

  async deleteCategory(id: number) {
    return this.databaseObj
      .executeSql(`DELETE FROM ${this.tables.categories} WHERE id = ${id}`, [])
      .then(() => {
        return "category deleted";
      })
      .catch((e) => {
        return "error on deleting category " + JSON.stringify(e);
      });
  }

  async editCategory(name: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.categories} SET name = '${name}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "category updated";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "category already exist";
        }

        return "error on updating category " + JSON.stringify(e);
      });
  }

  
  async addCompany(company: Company) {
    const query = `INSERT INTO ${this.tables.companys} (name,address,numberphone,email,category_id) VALUES ('${company.companyName}','${company.address}','${company.numberphone}','${company.email}', ${company.category_id})`;
    return this.databaseObj
      .executeSql(query,[])
      .then(() => {
        return "company created";
      })
      .catch((e) => {
        return "error on creating xx company " + JSON.stringify(e) + query;
      });
  }

  async getCompanys() {
    return this.databaseObj
      .executeSql(
        `SELECT companys.id, companys.category_id, companys.name as company, categories.name as category, companys.address as address,companys.numberphone as numberphone,companys.email as email  FROM companys INNER JOIN categories ON categories.id = companys.category_id ORDER BY company ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "error on getting companys " + JSON.stringify(e);
      });
  }

  async deleteCompany(id: number) {
    return this.databaseObj
      .executeSql(`DELETE FROM ${this.tables.companys} WHERE id = ${id}`, [])
      .then(() => {
        return "company deleted";
      })
      .catch((e) => {
        return "error on deleting company " + JSON.stringify(e);
      });
  }

  async editCompany(company: Company) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.companys} SET name = '${company.companyName}', category_id = ${company.category_id}, address = '${company.address}', numberphone = '${company.numberphone}',email = '${company.email}' WHERE id = ${company.id}`,
        []
      )
      .then(() => {
        return "company updated";
      })
      .catch((e) => {
        return "error on updating company " + JSON.stringify(e);
      });
  }
}
