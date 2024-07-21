import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExtApiService } from 'src/app/ext-api.service';

@Component({
  selector: 'app-doc-types',
  templateUrl: './doc-types.component.html',
  styleUrls: ['./doc-types.component.scss']
})
export class DocTypesComponent implements OnInit {

  docType: any;
  allSavedDocsTypes = [] as any;
  disableDocTypeRemoveIcon: boolean = false;

  constructor( private formBuilder: FormBuilder, private extApi: ExtApiService){
    this.docType = this.formBuilder.group({
      documentType:    ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loaAllDocuments();
  }

  async addInputType(){

    if(this.docType.value.documentType === ''){

      alert("Document type is empty")
      return
    }

    if(this.allSavedDocsTypes.find((el: any) => el.name === this.docType.value.documentType)){

      alert("type is already added")
      return
    }

    let reqFields = [
      {
        "id": "string",
        "name": this.docType.value.documentType,
        "status": 0
      }
    ]

    try {

      let adTypeRes = await this.extApi.AddDocType(reqFields);
      console.log(adTypeRes)

      this.allSavedDocsTypes.push(
        {
          "id": "string",
          "name": this.docType.value.documentType,
          "status": 0
        }
      )
      
      this.docType.reset();

    } catch (e: any) {
      
      console.log(e)

    }

  }

  async loaAllDocuments(){

    try {
      
      let documentsTypes = await this.extApi.DocTypes();
      this.allSavedDocsTypes = documentsTypes;

    } catch (e: any) {
      
      console.log(e)
    }
  }

  async removeDocType(i: any){

    try {
      
      let removeDOcTypeRes = await this.extApi.UpdateDocType({id: this.allSavedDocsTypes[i].id, name: this.allSavedDocsTypes[i].name, status: 1})
      console.log(removeDOcTypeRes)

      this.allSavedDocsTypes.splice(i, 1);


    } catch (e:any) {
      console.log(e)

      
    }

  }
}
