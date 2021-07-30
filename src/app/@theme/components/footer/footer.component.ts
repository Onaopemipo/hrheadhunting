import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <a href="javascript:;" class="pull-left">
        <span>Copyright</span>
        © {{currentYr}} HR HeadHunting
    </a>
  `,
})
export class FooterComponent {
  currentYr = (new Date()).getFullYear();
}
