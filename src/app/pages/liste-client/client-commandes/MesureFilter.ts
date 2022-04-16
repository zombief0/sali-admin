import {Pipe, PipeTransform} from "@angular/core";
import {Mesure} from "../../../models/mesure";

@Pipe({
  name: 'mesureFilter'
})
export class MesureFilter implements PipeTransform{
  transform(value: Mesure[], typeVetement: string): any {
    if (!value || !typeVetement) {
      return value;
    }
    console.log(value);
    return value.filter((mesure) => mesure.typeVetement === typeVetement);
  }

}
