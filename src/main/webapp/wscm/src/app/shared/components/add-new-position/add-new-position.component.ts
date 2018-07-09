import {
  Component,
  OnInit,
  ViewEncapsulation,
  Sanitizer,
  SecurityContext
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarService } from './../../services/snackbar.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddNewPositionService } from './add-new-position.service';

@Component({
  selector: 'app-add-new-position',
  templateUrl: './add-new-position.component.html',
  styleUrls: ['./add-new-position.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewPositionComponent implements OnInit {
  panelOpenState: boolean = false;
  selectedPosition: any;
  step: number = 1;
  listCategoryWeight: Array<Object> = [];
  position: any;
  contentCategorieses: any;
  pages: string;
  selectPage: any;
  language: string;
  id: number;
  categoryName: string;
  description: string;
  weight: number;
  css: any;
  html: any;
  script: any;
  categories: any;
  positions: any;
  check: boolean = false;

  constructor(
    public dialog: MatDialog,
    public contentService: AddNewPositionService,
    public snackbar: SnackBarService,
    public sanitizer: DomSanitizer
  ) {}
  // Get All Pages - select box for pages select ********************************
  getAllPages() {
    this.contentService.getPages(this.pages).subscribe(
      res => {
        this.selectPage = res;
      },
      err => console.log(err)
    );
  }

  // GET All Categories **************************************
  getCategory() {
    this.contentService.getCategories().subscribe(
      res => {
        this.categories = res['data'];
        console.log(this.categories);
      },
      err => console.log(err)
    );
  }

  getPositions() {
    this.contentService.getPositions('home').subscribe(
      res => {
        this.positions = res;
      },
      err => console.log(err)
    );
  }

  // Reset Data ************************************
  resetData() {
    this.step = 1;
    this.listCategoryWeight = [];
  }

  // NEXT button ***************************************
  next(obj, step) {
    obj = {
      page: this.pages,
      position: this.position,
      language: this.language,
      html: this.sanitizer.bypassSecurityTrustHtml(this.html),
      css: this.css,
      script: this.script,
      contentCategorieses: [
        {
          categories: {
            id: this.categories.id,
            categoryName: this.categories.categoryName,
            description: this.categories.description
          },
          weight: this.weight
        }
      ]
    };
    console.log(this.html);
    console.log(obj);
    switch (step) {
      case 1:
        this.step = 2;
        this.selectedPosition = obj;
        console.log(this.selectedPosition);
        for (const item of this.selectedPosition.contentCategorieses) {
          this.listCategoryWeight.push(item);
        }
        break;
      case 2:
        this.step = 3;
        this.listCategoryWeight.shift();
        break;
      case 3:
        this.step = 4;
      // delete first default category from this.listCategoryWeight
      // this.listCategoryWeight.shift();
      // break;
    }
    console.log(this.listCategoryWeight);
  }

  // CHECKED CATEGORIES
  // ************************
  checked(ev, categories) {
    if (ev.checked) {
      if (this.listCategoryWeight.length > 0) {
        this.listCategoryWeight.push({ categories, weight: 1 });
        this.selectedPosition.contentCategorieses.push({
          categories,
          weight: 1
        });
      } else {
        const index = this.listCategoryWeight.findIndex(
          item => item['categories'] === categories
        );
        this.listCategoryWeight.splice(index, 1);
        const index2 = this.selectedPosition['contentCategorieses'].findIndex(
          item => item['categories'] === categories
        );
        this.selectedPosition['contentCategorieses'].splice(index2, 1);
      }
      console.log(this.listCategoryWeight);
    }
  }

  // REMOVE  from list 'Selected categories'
  unchecked(position) {
    if (this.listCategoryWeight.length !== 0) {
      const index = this.listCategoryWeight.findIndex(
        item => item['categories'] === position.categories
      );
      this.listCategoryWeight.splice(index, 1);
      const index2 = this.selectedPosition['contentCategorieses'].findIndex(
        item => item['categories'] === position.categories
      );
      this.selectedPosition['contentCategorieses'].splice(index2, 1);
    }
    console.log(this.listCategoryWeight);
  }

  // BACK button ******************************************
  back(currentStep) {
    switch (currentStep) {
      case 2:
        this.step = 1;
        // this.listCategoryWeight = [];
        break;
      case 3:
        this.step = 2;
        break;
      case 4:
        this.step = 3;
        break;
    }
  }

  // Send Request
  save() {
    console.log(this.html);
    this.selectedPosition['contentCategorieses'] = this.listCategoryWeight;
    this.contentService.addContent(this.selectedPosition).subscribe(
      res => {
        console.log(res);
        this.snackbar.openSnackBar('Success', res['data']);
        this.getPositions();
        // this.resetData();
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.getPositions();
    this.getAllPages();
    this.getCategory();
  }
}
