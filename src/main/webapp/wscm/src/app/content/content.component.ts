import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  constructor(public contentService: ContentService) { }

  positions: any;
  enableEditing = { html: false, css: false, script: false }; //Defines whether code can be edited or not
  toggleText: String = 'Enable editing';

  closePanel(ev) {
    // Reset values when expansion panel is closed
    this.enableEditing = { html: false, css: false, script: false }; //Defines whether code can be edited or not
    this.toggleText = 'Enable editing';
  }

  toggled(ev, type) {
    console.log(ev, type);
    this.enableEditing[type] = !this.enableEditing[type];

    if (ev.checked) this.toggleText = "Disable editing";
    else this.toggleText = "Enable editing";
  }

  ngOnInit() {
    this.contentService.getPositions('home')
      .subscribe(
        res => {
          console.log(res);
          this.positions = res;
        },
        err => console.log(err)
      )
  }

}
