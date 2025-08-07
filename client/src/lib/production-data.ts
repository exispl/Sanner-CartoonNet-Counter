export interface ProductionRecord {
  veNumber: string;
  kartonNr: number;
  buchungsdatum: string;
  status: string;
  anwender: string;
  gutmenge: number;
  ausschuss: number;
  fehlerart?: string;
  fehlerartBez?: string;
  gesamt: number;
  teilenummer: string;
  weNumber: string;
  prodZeit: number;
  rstZeit: number;
  stillstZeit: number;
  freigabebenutzer?: string;
  freigabedatum?: string;
  sperrbenutzer?: string;
  sperrdatum?: string;
  fehlerursache?: string;
  fehlerursacheBez?: string;
}

export const parseProductionCSV = (csvData: string): ProductionRecord[] => {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(';');
  
  return lines.slice(1).map(line => {
    const values = line.split(';');
    
    return {
      veNumber: values[0] || '',
      kartonNr: parseInt(values[1]) || 0,
      buchungsdatum: values[2] || '',
      status: values[3] || '',
      anwender: values[4] || '',
      gutmenge: parseInt(values[5]) || 0,
      ausschuss: parseInt(values[6]) || 0,
      fehlerart: values[7] || undefined,
      fehlerartBez: values[8] || undefined,
      gesamt: parseInt(values[9]) || 0,
      teilenummer: values[10] || '',
      weNumber: values[11] || '',
      prodZeit: parseFloat(values[12]) || 0,
      rstZeit: parseFloat(values[13]) || 0,
      stillstZeit: parseFloat(values[14]) || 0,
      freigabebenutzer: values[15] || undefined,
      freigabedatum: values[16] || undefined,
      sperrbenutzer: values[17] || undefined,
      sperrdatum: values[18] || undefined,
      fehlerursache: values[19] || undefined,
      fehlerursacheBez: values[20] || undefined,
    };
  }).filter(record => record.veNumber); // Filter out empty lines
};

// Real production data from CSV
export const productionData = `VE-Nummer;Karton-Nr.;Buchungsdatum;Status;Anwender;Gutmenge;Ausschuss;Fehlerart;Fehlerart-Bez.;Gesamt;Teilenummer;WE-/FA-Nr.;Prod.Zeit(Min.);Rst.Zeit(Min.);Stillst.Zeit(Min.);Freigabebenutzer;Freigabedatum;Sperrbenutzer;Sperrdatum;Fehlerursache;Fehlerursache-Bez.
21120543;20;20250806212354;Frei;Kowalczyk, Kamil;6000;0;;;6000;1473690;10122750;88.11666666666666666666666666666666666653;0;11.56666666666666666666666666666666666667;;;;;
21120542;19;20250806194409;Frei;Kowalczyk, Kamil;6000;0;;;6000;1473690;10122750;120.783333333333333333333333333333333333;0;0;;;;;
21120541;18;20250806174031;Frei;LK1;6000;0;;;6000;1473690;10122750;44.63333333333333333333333333333333333338;0;.799999999999999999999999999999999999998;;;;;
21120540;17;20250806165503;Frei;Kowalczyk, Kamil;6000;0;;;6000;1473690;10122750;0;0;4.4;;;;;
21120558;3;20250806165039;Frei;Kowalczyk, Kamil;0;0;;;0;1473690;10122750;0;0;.3166666666666666666666666666666666666661;;;;;
21120556;1;20250806165020;Frei;Kowalczyk, Kamil;32;0;;;32;1473690;10122750;4.5;0;10.35;;;;;
21120539;16;20250806163559;Frei;Kowalczyk, Kamil;6000;0;;;6000;1473690;10122750;78.48333333333333333333333333333333333332;0;25.06666666666666666666666666666666666666;;;;;
21120538;15;20250806144233;Frei;Kowalczyk, Kamil;6000;0;;;6000;1473690;10122750;18.04999999999999999999999999999999999997;0;6.58333333333333333333333333333333333333;;;;;
;;20250806135758;Frei;Khan, Kamran;0;2245;a25;Videokontrolle fehlt/defekt;2245;1473690;10122750;16.49999999999999999999999999999999999995;0;0;;;;;
21073566;360;20250806213417;Frei;SoGXXX;3000;0;;;3000;1471331;10120154;31.49999999999999999999999999999999999995;0;0;;;;;
21073565;359;20250806210239;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;.4999999999999999999999999999999999999997;0;0;;;;;
21073564;358;20250806210227;Frei;SoGXXX;3000;0;;;3000;1471331;10120154;82.4999999999999999999999999999999999999;0;0;;;;;
21073563;357;20250806193951;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;41.48333333333333333333333333333333333337;0;14.63333333333333333333333333333333333328;;;;;
;;20250806184328;Frei;Kowalczyk, Kamil;0;4300;d68;Maschine - Sammelbehlter;4300;1471331;10120154;7;0;0;;;;;
21073562;356;20250806183607;Frei;SoGXXX;3000;0;;;3000;1471331;10120154;0;0;0;;;;;
21073561;355;20250806183602;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;.4999999999999999999999999999999999999997;0;0;;;;;
21073560;354;20250806183555;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;91.39999999999999999999999999999999999987;0;0;;;;;
21073559;353;20250806162127;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;0;0;0;;;;;`;

export const getProductionRecords = (): ProductionRecord[] => {
  return parseProductionCSV(productionData);
};

export const getProductionStats = () => {
  const records = getProductionRecords();
  
  const totalProduced = records.reduce((sum, record) => sum + record.gutmenge, 0);
  const totalDefects = records.reduce((sum, record) => sum + record.ausschuss, 0);
  const totalProductionTime = records.reduce((sum, record) => sum + record.prodZeit, 0);
  const totalDowntime = records.reduce((sum, record) => sum + record.stillstZeit, 0);
  
  const efficiency = totalProductionTime > 0 ? 
    ((totalProductionTime / (totalProductionTime + totalDowntime)) * 100) : 0;
  
  const qualityRate = (totalProduced + totalDefects) > 0 ? 
    ((totalProduced / (totalProduced + totalDefects)) * 100) : 0;
  
  return {
    totalProduced,
    totalDefects,
    totalProductionTime,
    totalDowntime,
    efficiency,
    qualityRate,
    recordCount: records.length,
    activeOperators: Array.from(new Set(records.map(r => r.anwender).filter(Boolean))),
    recentRecords: records.slice(0, 5)
  };
};

export const formatDateTime = (dateString: string): string => {
  if (!dateString || dateString.length !== 14) return dateString;
  
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(8, 10);
  const minute = dateString.substring(10, 12);
  const second = dateString.substring(12, 14);
  
  return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
};