import {Pipe, PipeTransform} from "@angular/core";
import {Mesure} from "../../../models/mesure";

@Pipe({
  name: 'mesureFilter'
})
export class MesureFilter implements PipeTransform{
  transform(value: Mesure[], typeVetement: number): any {
    if (!value) {
      return value;
    }

    if (!typeVetement) {
      return value.filter((mesure) => mesure.typeVetement === 'CHEMISE');
    }

    if (typeVetement === 1) {
      return value.filter((mesure) => mesure.typeVetement === 'PANTALON');
    }

    if (typeVetement === 2) {
      return value.filter((mesure) => mesure.typeVetement === 'VESTE');
    }
  }

}
