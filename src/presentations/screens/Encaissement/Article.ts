export interface Article {
    code:string
	designation: string
    prix: number
    remise:string
    qt: number
};
  
export interface ArticleState {
  list: Article[]
};

export class ArticleDto {
    code:string
	designation: string;
    prix: number;
    remise:string;
    qt: number;
  
    constructor(code:string,designation: string,prix:number,remise:string,qt:number) {
      this.code= code;
        this.designation = designation;
      this.prix = prix;
      this.remise = remise;
      this.qt = qt;
    }
  
    
  }
