import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'typeMesureFilter'
})
export class TypeMesureFilter implements PipeTransform{
  transform(value: string[], typeVetement: string): any {
    if (!typeVetement) {
      return ['AB', 'B', 'C', 'CA', 'CD', 'COL',
        'E', 'L', 'LM', 'P', 'T', 'TM', 'V', 'm'];
    }

    if (typeVetement === 'CHEMISE') {
      return ['E', 'LM', 'P', 'V', 'TM', 'AB', 'P', 'COL','L'];
    }

    if (typeVetement === 'VESTE') {
      return ['E', 'LM', 'P', 'V', 'TM', 'AB', 'CA', 'CD','L'];
    }

    if (typeVetement === 'PANTALON') {
      return ['T', 'B', 'C', 'L', 'P', 'B', 'm'];
    }
  }

}
