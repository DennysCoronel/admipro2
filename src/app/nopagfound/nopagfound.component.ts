import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagfound',
  templateUrl: './nopagfound.component.html',
  styleUrls: ['./nopagfound.component.css'],
})
export class NopagfoundComponent {
  constructor() {}

  year = new Date().getFullYear();

  ngOnInit(): void {}
}
