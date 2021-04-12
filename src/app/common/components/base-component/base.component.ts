import { Subject } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';
/**
 * Базовый класс для всех компонент
 * Реализует отписку от событий и базовый ngOnDestroy
 */
@Directive()
export class BaseComponent implements OnDestroy {
  public ngUnsubscribe: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
