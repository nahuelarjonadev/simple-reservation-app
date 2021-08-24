import { Component, OnInit } from '@angular/core';

/**
 * A simple header that displays the title of the app
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class AppHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    return;
  }
}
