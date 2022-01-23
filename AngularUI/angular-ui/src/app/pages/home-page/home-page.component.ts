import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from 'src/app/core/services/validation.service';
import { UrlModel } from 'src/app/models/urlModel';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  url: UrlModel;
  urlAddForm: FormGroup;

  constructor(
    private urlService: UrlService,
    private validationService: ValidationService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createUrlAddForm();
  }

  createUrlAddForm() {
    this.urlAddForm = this.formBuilder.group({
      urlAddress: [''],
      keyword: [''],
    });
  }

  add() {
    if (this.urlAddForm.valid) {
      let urlForAdd = Object.assign({}, this.urlAddForm.value);
      this.urlService.addWithEntity(urlForAdd).subscribe(
        (response) => {
          this.url = response.data;
          this.url.code = window.location.href + 'r/' + this.url.code;
          this.toastrService.success('Url oluşturuldu.');
        },
        (responseError) => {
          this.validationService.showErrors(responseError);
        },
        () => {}
      );
    }
  }

  notify(payload: any) {
    // Might want to notify the user that something has been pushed to the clipboard
    console.info(`'${payload}' has been copied to clipboard`);
  }
}
