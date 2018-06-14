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

  panelClosed() {
    this.step = 1;
  }

  next(obj) {
    this.step = 2;
    this.selectedPosition = obj;
  }
  back() {
    this.step = 1;
  }
  save() {
    this.selectedPosition['contentCategorieses'] = null;

    this.contentService.updateContent(this.selectedPosition, this.selectedWeight.toString(), this.selectedCategory.toString())
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

  checked(ev, id) {
    console.log(ev.checked);
    console.log(id);
  }

  sliderChange(ev, categoryId) {
    console.log(ev);
    console.log(categoryId);

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
