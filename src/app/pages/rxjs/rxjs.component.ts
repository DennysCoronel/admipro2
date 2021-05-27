import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
 // public intervaloSubs: Subscription;

  constructor() {
    // this.retornaObs()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (val) => console.log('sus', val),
    //     (err) => console.warn('error', err),
    //     () => console.info('obs terminada')
    //   );

   // this.intervaloSubs = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    console.log('salee');
   // this.intervaloSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      //  take(10),
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 == 0 ? true : false))
    );
  }

  retornaObs(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const setIntervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(setIntervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llEgo a 2');
        }
      }, 1000);
    });

    return obs$;
  }

  ngOnInit(): void {}
}
