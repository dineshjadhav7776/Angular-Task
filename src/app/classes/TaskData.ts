export class TaskData {
    country_name: string;
    currancy_name: string;
    a_code: string;
    n_code: number;
    status: string;
    constructor(a_code: string,country_name: string,currancy_name: string, n_code: number,status: string) {
      this.country_name = country_name;
      this.currancy_name = currancy_name;
      this.a_code = a_code;
      this.n_code = n_code;
      this.status = status;
    }
  }