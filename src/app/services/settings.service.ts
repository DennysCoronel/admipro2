import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public linkTheme = document.querySelector('#theme');

  constructor() {

    const url =
      localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    this.linkTheme?.setAttribute('href', url);

    this.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    console.log(url);
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach((elem) => {
      elem.classList.remove('working');
      const btnElemnt = elem.getAttribute('data-theme');

      const btUrl = `./assets/css/colors/${btnElemnt}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if (btUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
