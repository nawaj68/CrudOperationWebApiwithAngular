import {environment} from "src/environments/environment";
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: "avatar"})
export class AvatarPipe implements PipeTransform {
  transform(value: string, alt: string = ""): string {
    const url = `${environment.baseUrl}/images/${value}`;
    return `<img width="50" class="img-thumbnail" src=${url} alt=${alt} />`;
  }
}
