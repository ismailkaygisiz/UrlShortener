import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { ValidationService } from 'src/app/core/services/validation.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.css'],
})
export class RedirectPageComponent implements OnInit {
  success: boolean = false;

  constructor(
    private urlService: UrlService,
    private activatedRoute: ActivatedRoute,
    private validationService: ValidationService,
    private toastrService: ToastrService
  ) {}

  private subscription: Subscription;
  public secondsToDday: number = 5;

  private getTimeDifference(response: any) {
    this.allocateTimeUnits(response);
  }

  private allocateTimeUnits(response: any) {
    if (this.secondsToDday > 0 && this.success) this.secondsToDday--;
    else {
      window.location.href = response.data.urlAddress;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.redirect();
  }

  redirect() {
    this.activatedRoute.params.subscribe((params) => {
      this.urlService.getByCode(params['code']).subscribe(
        (response) => {
          this.urlService.redirect(response.data).subscribe(
            (_) => {
              this.success = true;
              this.toastrService.success('Redirecting...', 'Success');
              this.subscription = interval(1000).subscribe((x) => {
                this.getTimeDifference(response);
              });
            },
            (responseError) => {
              this.validationService.showErrors(responseError);
            }
          );
        },
        (responseError) => {
          this.validationService.showErrors(responseError);
        },
        () => {}
      );
    });
  }
}
