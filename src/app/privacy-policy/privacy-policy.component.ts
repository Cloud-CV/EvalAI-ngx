import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const headerHeight = this.document.getElementById('header-static').clientHeight;
    // Only completely visible elements return true:
    const isVisible = (elemTop >= headerHeight) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    // isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  highlightNav(el) {
    const allNavs = this.document.getElementsByClassName('privacy-nav');
    [].forEach.call(allNavs, function (item) {
      item.classList.remove('scroll-selected');
      if (item.id === el) {
        item.className += ' scroll-selected';
      }
    });
  }
  ngOnInit() {
    this.document['manuallyScrolling'] = false;
    const idText = 'privacy-';
    let i = 1;
    const allNavs = this.document.getElementsByClassName('privacy-nav');
    [].forEach.call(allNavs, function (item) {
      item.id = idText + i.toString() + '-nav';
      i = i + 1;
    });
    i = 1;
    const allTargets = this.document.getElementsByClassName('privacy-section-title');
    [].forEach.call(allTargets, function (item) {
      item.id = idText + i.toString();
      i = i + 1;
    });
  }
  // Added listener for header scroll event
  @HostListener('window:scroll', [])
    onWindowScroll(): void {
    if (!this.document['manuallyScrolling']) {
        const allTargets = this.document.getElementsByClassName('privacy-section-title');
        const self = this;
        [].some.call(allTargets, function (item) {
          const elem = self.document.getElementById(item.id);
          if (self.isScrolledIntoView(elem)) {
            self.highlightNav(item.id + '-nav');
            const elemNav = self.document.getElementById(item.id + '-nav');
            if (!self.isScrolledIntoView(elemNav)) {
              elemNav.scrollIntoView();
            }
            return true;
          }
        });
    }
    }

  scroll(event) {
    this.document['manuallyScrolling'] = true;
    setTimeout(() => {
      this.document['manuallyScrolling'] = false;
    }, 2000);
    // getting id of the clicked item
    const target = event.target || event.srcElement || event.currentTarget;
    const id = target.attributes.id.value;
    this.highlightNav(id);

    // Removing -nav from the id of the clicked element
    const elementId = id.slice(0, -4);
    this.document.getElementById(elementId).scrollIntoView();
    const scrolledY = window.scrollY;
    if (scrolledY) {
      const headerHeight = this.document.getElementById('header-static').clientHeight;
      window.scroll(0, scrolledY - headerHeight);
    }
  }
  scrollToTop() {
    this.document.body.scrollTop = this.document.documentElement.scrollTop = 0;
  }
}
