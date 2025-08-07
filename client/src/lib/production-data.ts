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

// Latest production data from CSV (07.08.2025)
export const latestProductionData = `VE-Nummer;Karton-Nr.;Buchungsdatum;Status;Anwender;Gutmenge;Ausschuss;Fehlerart;Fehlerart-Bez.;Gesamt;Teilenummer;WE-/FA-Nr.;Prod.Zeit(Min.);Rüst.Zeit(Min.);Stillst.Zeit(Min.);Freigabebenutzer;Freigabedatum;Sperrbenutzer;Sperrdatum;Fehlerursache;Fehlerursache-Bez.
21073612;406;20250807213141;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;0;0;0;;;;;
21073611;405;20250807213136;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;.4999999999999999999999999999999999999997;0;0;;;;;
;;20250807213126;Frei;Kowalczyk, Kamil;0;1750;d68;Maschine - Sammelbehälter;1750;1471331;10120154;34.49999999999999999999999999999999999998;0;0;;;;;
21073610;404;20250807203138;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;0;0;0;;;;;
21073609;403;20250807203133;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;28.84999999999999999999999999999999999994;0;0;;;;;
;;20250807195703;Frei;Kowalczyk, Kamil;0;5100;d68;Maschine - Sammelbehälter;5100;1471331;10120154;54.99999999999999999999999999999999999993;0;0;;;;;
21073608;402;20250807190221;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;0;0;0;;;;;
21073607;401;20250807190216;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;22.81666666666666666666666666666666666666;0;0;;;;;
21073606;400;20250807182525;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;17.00000000000000000000000000000000000006;0;0;;;;;
21073605;399;20250807175049;Frei;Sefa Gök;3000;0;;;3000;1471331;10120154;32.49999999999999999999999999999999999995;0;0;;;;;
21073604;398;20250807171828;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;61.9999999999999999999999999999999999999;0;0;;;;;
21073603;397;20250807161628;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;0;0;0;;;;;
21073602;396;20250807161623;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;0;0;0;;;;;
21073601;395;20250807161618;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;57.86666666666666666666666666666666666664;0;61.1333333333333333333333333333333333334;;;;;
21073600;394;20250807141700;Frei;Kowalczyk, Kamil;3000;0;;;3000;1471331;10120154;16.49999999999999999999999999999999999995;0;0;;;;;
;;20250807140041;Frei;Khan, Kamran;0;5237;a25;Videokontrolle fehlt/defekt;5237;1471331;10120154;.4999999999999999999999999999999999999997;0;0;;;;;
21073599;393;20250807140028;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;33.99999999999999999999999999999999999995;0;0;;;;;
21073598;392;20250807132626;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;24.68333333333333333333333333333333333333;0;0;;;;;
21073597;391;20250807125128;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;1;0;0;;;;;
21073596;390;20250807125013;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;77.49999999999999999999999999999999999993;0;0;;;;;
21073595;389;20250807113247;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;21.03333333333333333333333333333333333339;0;0;;;;;
21073594;388;20250807110332;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;.4999999999999999999999999999999999999997;0;0;;;;;
21073593;387;20250807110325;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;65.9999999999999999999999999999999999999;0;0;;;;;
21073592;386;20250807095726;Frei;Sainenco, Larisa;3000;0;;;3000;1471331;10120154;26.50000000000000000000000000000000000003;0;0;;;;;
21073591;385;20250807093057;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;23.83333333333333333333333333333333333331;0;0;;;;;
21073590;384;20250807090014;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;16.49999999999999999999999999999999999995;0;0;;;;;
21073589;383;20250807084351;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;33.99999999999999999999999999999999999995;0;0;;;;;
21073588;382;20250807080941;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;13;0;0;;;;;
21073587;381;20250807075653;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;38.60000000000000000000000000000000000006;0;0;;;;;
21073586;380;20250807071346;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;32.13333333333333333333333333333333333333;0;0;;;;;
21073585;379;20250807064128;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;0;0;0;;;;;
21073584;378;20250807064121;Frei;Khan, Kamran;3000;0;;;3000;1471331;10120154;47.51666666666666666666666666666666666668;17.86666666666666666666666666666666666666;0;;;;;
21073583;377;20250807053433;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;12.5;0;0;;;;;
;;20250807052220;Frei;Khan, Abdul Aalla;0;2985;a25;Videokontrolle fehlt/defekt;2985;1471331;10120154;10.5;0;0;;;;;
21073582;376;20250807051151;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;.4999999999999999999999999999999999999997;0;0;;;;;
21073581;375;20250807051112;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;29.23333333333333333333333333333333333337;0;0;;;;;
21073580;374;20250807043852;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;39.99999999999999999999999999999999999995;0;0;;;;;
21073579;373;20250807035842;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;3.5;0;0;;;;;
;;20250807035527;Frei;Khan, Abdul Aalla;0;4969;a25;Videokontrolle fehlt/defekt;4969;1471331;10120154;24.76666666666666666666666666666666666661;0;0;;;;;
21073578;372;20250807032521;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;27.49999999999999999999999999999999999997;0;0;;;;;
21073577;371;20250807025755;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;27.41666666666666666666666666666666666672;0;0;;;;;
21073576;370;20250807021428;Frei;LK36;3000;0;;;3000;1471331;10120154;35.99999999999999999999999999999999999995;0;0;;;;;
21073575;369;20250807013817;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;10.5;0;0;;;;;
21073574;368;20250807012751;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;45.99999999999999999999999999999999999993;0;0;;;;;
21073573;367;20250807004141;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;20.4;0;0;;;;;
21073572;366;20250807001959;Frei;LK33;3000;0;;;3000;1471331;10120154;0;0;0;;;;;
21073571;365;20250807001947;Frei;LK33;3000;0;;;3000;1471331;10120154;19.50000000000000000000000000000000000005;0;0;;;;;
21073570;364;20250806235935;Frei;LK36;3000;0;;;3000;1471331;10120154;33.49999999999999999999999999999999999995;0;0;;;;;
21073569;363;20250806232620;Frei;Khan, Abdul Aalla;3000;0;;;3000;1471331;10120154;40.81666666666666666666666666666666666666;5.68333333333333333333333333333333333333;0;;;;;`;

// Previous production data from CSV (06.08.2025)
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

export const getLatestProductionRecords = (): ProductionRecord[] => {
  return parseProductionCSV(latestProductionData);
};

export const getAllProductionRecords = (): ProductionRecord[] => {
  const previous = parseProductionCSV(productionData);
  const latest = parseProductionCSV(latestProductionData);
  return [...latest, ...previous];
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