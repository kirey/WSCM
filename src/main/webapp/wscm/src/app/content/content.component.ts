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
  selectedCategory: string;
  selectedWeight: number;
  listCategoryWeight: Array<Object> = [];
  objectCategoryWeight: Object;

  panelClosed() {
    this.step = 1;
  }

  next(obj) {
    this.step = 2;
    this.selectedPosition = obj;
  }
  back() {
    this.step = 1;
    this.listCategoryWeight = [];
  }

  // Select category -checkbox
  checked(ev, id, index) {
    if (ev.checked) {
      if (this.listCategoryWeight.length == 0) {
        this.listCategoryWeight.push({ 'categoryId': id });
      }
      else {
        let push: boolean = false;
        for (let i = 0; i < this.listCategoryWeight.length; i++) {
          if (this.listCategoryWeight[i]['categoryId'] != id) {
            push = true;
          }
        }
        if (push) this.listCategoryWeight.push({ 'categoryId': id });
      }
    }
    else {
      let index = this.listCategoryWeight.findIndex(item => item['categoryId'] == id);
      this.listCategoryWeight.splice(index, 1);
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

  categorySelected() {

  }

  save() {

    this.contentService.updateContent(this.selectedPosition, this.selectedWeight.toString(), this.selectedCategory.toString())
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
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
