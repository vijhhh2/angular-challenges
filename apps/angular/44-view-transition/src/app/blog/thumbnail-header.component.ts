import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'thumbnail-header',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="flex gap-3">
      <img
        ngSrc="assets/profil.webp"
        [style]="'view-transition-name: avatar-' + id()"
        alt=""
        class="rounded-full border border-black p-0.5"
        width="50"
        height="50" />
      <div class="flex flex-col justify-center gap-0.5">
        <span class="text-md font-bold uppercase">Thomas Laforge</span>
        <span class="text-sm">{{ date() }}</span>
      </div>
    </div>
    <img
      ngSrc="assets/angular.webp"
      alt=""
      width="50"
      height="50"
      [style]="'view-transition-name: angular-' + id()" />
  `,
  host: {
    class: 'flex w-full px-4 py-5 gap-4 justify-between',
  },
})
export class ThumbnailHeaderComponent {
  date = input.required<string>();
  id = input.required<string>();
}
