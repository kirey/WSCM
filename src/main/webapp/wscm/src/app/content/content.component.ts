import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContentService } from './content.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  constructor(public contentService: ContentService) { }
  positions: any;
  categories: any;
  step: number = 1;
  selectedPosition: any;
  listCategoryWeight: Array<Object> = [];

  panelClosed() {
    this.step = 1;
  }

  next(obj) {
    this.step = 2;
    this.selectedPosition = obj;
    for (let item of this.selectedPosition.contentCategorieses) {
      this.listCategoryWeight.push(item);
    }
    console.log(this.listCategoryWeight);
  }
  back() {
    this.step = 1;
    this.listCategoryWeight = [];
  }

  // Select category -checkbox
  checked(ev, categories) {
    if (ev.checked) {
      if (this.listCategoryWeight.length == 0) {
        this.listCategoryWeight.push({ categories, 'weight': null });
        this.selectedPosition.contentCategorieses.push({ categories, 'weight': null });
      }
      else {
        let push: boolean = false;
        for (let i = 0; i < this.listCategoryWeight.length; i++) {
          if (this.listCategoryWeight[i]['categoryId'] != categories.id) {
            push = true;
          }
        }
        if (push) {
          this.listCategoryWeight.push({ categories, 'weight': null });
          this.selectedPosition.contentCategorieses.push({ categories, 'weight': null });
        }
      }
    }
    else {
      let index = this.listCategoryWeight.findIndex(item => item['categories'] == categories);
      this.listCategoryWeight.splice(index, 1);

      let index2 = this.selectedPosition['contentCategorieses'].findIndex(item => item['categories'] == categories);
      this.selectedPosition['contentCategorieses'].splice(index2, 1);
    }
    console.log(this.listCategoryWeight);
  }
  unchecked(position) {
    if (this.listCategoryWeight.length > 0) {
      let index = this.listCategoryWeight.findIndex(item => item['categories'] == position.categories);
      this.listCategoryWeight.splice(index, 1);

      let index2 = this.selectedPosition['contentCategorieses'].findIndex(item => item['categories'] == position.categories);
      this.selectedPosition['contentCategorieses'].splice(index2, 1);
    }
    console.log(this.listCategoryWeight);
  }

  // Slider for each category
  sliderChange(ev, id, index) {
    if (this.listCategoryWeight.length !== 0) {
      for (let i = 0; i < this.listCategoryWeight.length; i++) {
        if (this.listCategoryWeight[i]['categoryId'] === id) {
          this.listCategoryWeight[i]['weight'] = ev.value;
        }
      }
    }
    console.log(this.listCategoryWeight);
  }
  manageCategories(positions) {
    console.log(positions);
  }

  save() {
    // this.contentService.updateContent(this.selectedPosition, this.selectedWeight.toString(), this.selectedCategory.toString())
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     },
    //     err => console.log(err)
    //   )
  }

  ngOnInit() {
    // Get Positions
    this.contentService.getPositions('home')
      .subscribe(
        res => {
          console.log(res);
          this.positions = res;
        },
        err => console.log(err)
      );

    // Get Categories
    this.contentService.getCategories()
      .subscribe(
        res => {
          console.log(res);
          this.categories = res['data'];
        },
        err => console.log(err)
      );

  }

}
