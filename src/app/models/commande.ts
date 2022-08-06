import {Client} from "./client";
import {Mesure} from "./mesure";

export class Commande {
  avance: number;
  coutTotal: number;
  dateCommande: Date;
  dateRetrait: Date;
  id: number;
  client: Client;
  mesures: Mesure[];
  notes: string;
  reste: number;
  echeance: string;
  useMesureStandardPantalon: boolean;
  useMesureStandardChemise: boolean;
  useMesureStandardVeste: boolean;
  livrer: boolean;
}
