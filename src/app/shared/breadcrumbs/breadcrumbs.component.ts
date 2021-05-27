import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public titulo: string | undefined;

  public titulSub$: Subscription;

  constructor(private router: Router) {
    this.titulSub$ = this.getParametros().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = ` ${this.titulo} `;
    });
  }
  ngOnDestroy(): void {
    this.titulSub$.unsubscribe();
  }

  // ({ titulo }) => {
  //   this.titulo = titulo;
  //   document.title = ` ${this.titulo} `;
  // }

  getParametros() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  ngOnInit(): void {}
}
