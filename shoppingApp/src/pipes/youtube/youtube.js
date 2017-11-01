var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import {Pipe} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var YoutubePipe = /** @class */ (function () {
    function YoutubePipe(dom) {
        this.dom = dom;
    }
    /**
     * Takes a value and makes it lowercase.
     */
    YoutubePipe.prototype.transform = function (value) {
        console.log(this.dom.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + value));
        return this.dom.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + value);
    };
    YoutubePipe = __decorate([
        Pipe({
            name: 'youtube',
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], YoutubePipe);
    return YoutubePipe;
}());
export { YoutubePipe };
//# sourceMappingURL=youtube.js.map
