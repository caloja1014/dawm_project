import { Component, OnInit } from '@angular/core';

import jquery from "jquery";


const $: JQueryStatic = jquery;

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css','../sb-admin-2.css']
})
export class AsideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (function($) {
      "use strict"; // Start of use strict
    
      // Toggle the side navigation
      $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          (<any>$('.sidebar .collapse')).collapse('hide');
        };
      });
    
    
    })(jQuery);
  }

  
}
