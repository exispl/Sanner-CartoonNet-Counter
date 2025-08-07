// SAP Production Data - Based on real SAP system screenshots
// Belegungsübersicht Produktionsplanung data integration

export interface SAPProductionOrder {
  auftrag: string; // Order number
  material: string;
  arbeitsplatz: string; // Work center
  bezeichnung: string; // Description
  beginn: string; // Start date
  ende: string; // End date
  status: string;
  mengeGeplant: number; // Planned quantity
  mengeGeliefert: number; // Delivered quantity
  auftragsmenge: number; // Order quantity
  bearbeiterStatus: string;
}

export interface SAPWorkCenter {
  arbeitsplatz: string;
  bezeichnung: string;
  status: 'Aktiv' | 'Inaktiv' | 'Wartung';
  kapazitaet: number;
  auslastung: number;
}

// Real SAP production data from screenshots
export const sapProductionOrders: SAPProductionOrder[] = [
  {
    auftrag: "10212750",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/AL/50/P1C 07.08.25 17.09.25 10.06.25 12081B-1-O&C",
    beginn: "07.08.25",
    ende: "17.09.25",
    status: "Fällig",
    mengeGeplant: 192.000,
    mengeGeliefert: 192.000,
    auftragsmenge: 192.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "10212751",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/AL/50/P1C 14.08.25 24.09.25 17.06.25 Auftrag-Phy",
    beginn: "14.08.25",
    ende: "24.09.25",
    status: "Info",
    mengeGeplant: 48.000,
    mengeGeliefert: 576.000,
    auftragsmenge: 576.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "10212752",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/AL/50/P1C 21.08.25 01.10.25 24.06.25 Auftrag-T-F",
    beginn: "21.08.25",
    ende: "01.10.25",
    status: "Info",
    mengeGeplant: 48.000,
    mengeGeliefert: 576.000,
    auftragsmenge: 576.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "10212753",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/AL/50/P1C 28.08.25 08.10.25 01.07.25 Auftrag-T-F",
    beginn: "28.08.25",
    ende: "08.10.25",
    status: "Info",
    mengeGeplant: 48.000,
    mengeGeliefert: 576.000,
    auftragsmenge: 576.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "10213795",
    material: "B464A-SG2",
    arbeitsplatz: "AUMPET6_SG",
    bezeichnung: "AUMPET6 SG /HCME/AL/50/P1C 21.08.25 01.10.25 24.06.25 Auftrag-P",
    beginn: "21.08.25",
    ende: "01.10.25",
    status: "Info",
    mengeGeplant: 3.456,
    mengeGeliefert: 3.456,
    auftragsmenge: 3.456,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "30212615",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/65G/ACF/P 28.08.25 28.08.25 20.08.25 VX-81-09-12081B-UK",
    beginn: "28.08.25",
    ende: "28.08.25",
    status: "Fällig",
    mengeGeplant: 96.000,
    mengeGeliefert: 96.000,
    auftragsmenge: 96.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "30213869",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/65G/ACF/P 04.09.25 04.09.25 27.08.25 12081B-1-SG1",
    beginn: "04.09.25",
    ende: "04.09.25",
    status: "Info",
    mengeGeplant: 376.000,
    mengeGeliefert: 376.000,
    auftragsmenge: 376.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "30213870",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/65G/ACF/P 11.09.25 11.09.25 03.09.25 12081B-1-SG1",
    beginn: "11.09.25",
    ende: "11.09.25",
    status: "Info",
    mengeGeplant: 376.000,
    mengeGeliefert: 376.000,
    auftragsmenge: 376.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "30213641",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/65G/ACF/P 18.09.25 18.09.25 10.09.25 12081B-1-SG4",
    beginn: "18.09.25",
    ende: "18.09.25",
    status: "Info",
    mengeGeplant: 600.000,
    mengeGeliefert: 600.000,
    auftragsmenge: 600.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "30213642",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/65G/ACF/P 25.09.25 25.09.25 17.09.25 12081B-1-SG4",
    beginn: "25.09.25",
    ende: "25.09.25",
    status: "Info",
    mengeGeplant: 960.000,
    mengeGeliefert: 960.000,
    auftragsmenge: 960.000,
    bearbeiterStatus: "FREI1"
  }
];

// Additional SAP data from second screen
export const additionalSAPOrders: SAPProductionOrder[] = [
  {
    auftrag: "10209405",
    material: "BS54A-SG1",
    arbeitsplatz: "A-17",
    bezeichnung: "A-17 /WC/ Munzbank",
    beginn: "07.08.25",
    ende: "17.09.25",
    status: "Fällig",
    mengeGeplant: 1.264,
    mengeGeliefert: 1.264,
    auftragsmenge: 1.264,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "10212659",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/50/50P1tcg 28.08.25 21.09.25 20.08.25 VX-1350800-GK Auslng P",
    beginn: "28.08.25",
    ende: "21.09.25",
    status: "Info",
    mengeGeplant: 96.000,
    mengeGeliefert: 96.000,
    auftragsmenge: 96.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "10213795",
    material: "B464A-SG2",
    arbeitsplatz: "AUMPET6_SG",
    bezeichnung: "AUMPET6 SG /HCME/50/50P1tcg 21.08.25 01.10.25 24.06.25 Auftrag-P",
    beginn: "21.08.25",
    ende: "01.10.25",
    status: "Info",
    mengeGeplant: 3.456,
    mengeGeliefert: 3.456,
    auftragsmenge: 3.456,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "30212050",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_2A",
    bezeichnung: "AOCB6 2A nestec 50 P1tcg 09.09.25 16.09.25 02.09.25 12080800-1-SG1",
    beginn: "09.09.25",
    ende: "16.09.25",
    status: "Info",
    mengeGeplant: 216.000,
    mengeGeliefert: 216.000,
    auftragsmenge: 216.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "30212645",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/50G/AMP1P 16.09.25 23.09.25 09.09.25 12080800-1-SG1",
    beginn: "16.09.25",
    ende: "23.09.25",
    status: "Info",
    mengeGeplant: 1058.000,
    mengeGeliefert: 1058.000,
    auftragsmenge: 1058.000,
    bearbeiterStatus: "FREI1"
  },
  {
    auftrag: "30212646",
    material: "B464A-SG2",
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B /HCME/50G/AMP1P 23.09.25 30.09.25 16.09.25 12080800-1-SG1",
    beginn: "23.09.25",
    ende: "30.09.25",
    status: "Info",
    mengeGeplant: 1058.000,
    mengeGeliefert: 1058.000,
    auftragsmenge: 1058.000,
    bearbeiterStatus: "FREI1"
  }
];

// Work centers based on SAP data
export const sapWorkCenters: SAPWorkCenter[] = [
  {
    arbeitsplatz: "AOCB6_1B",
    bezeichnung: "AOCB6 1B Production Line",
    status: "Aktiv",
    kapazitaet: 1000,
    auslastung: 85
  },
  {
    arbeitsplatz: "AOCB6_2A", 
    bezeichnung: "AOCB6 2A Production Line",
    status: "Aktiv",
    kapazitaet: 800,
    auslastung: 72
  },
  {
    arbeitsplatz: "AUMPET6_SG",
    bezeichnung: "AUMPET6 SG Special Production",
    status: "Aktiv",
    kapazitaet: 500,
    auslastung: 60
  },
  {
    arbeitsplatz: "A-17",
    bezeichnung: "A-17 Münzbank Production",
    status: "Aktiv",
    kapazitaet: 300,
    auslastung: 45
  }
];

// Combined production orders
export const allSAPOrders = [...sapProductionOrders, ...additionalSAPOrders];

// Helper functions for SAP data processing
export const getSAPOrdersByWorkCenter = (arbeitsplatz: string) => {
  return allSAPOrders.filter(order => order.arbeitsplatz === arbeitsplatz);
};

export const getSAPOrdersByStatus = (status: string) => {
  return allSAPOrders.filter(order => order.status === status);
};

export const getTotalPlannedQuantity = () => {
  return allSAPOrders.reduce((total, order) => total + order.mengeGeplant, 0);
};

export const getTotalDeliveredQuantity = () => {
  return allSAPOrders.reduce((total, order) => total + order.mengeGeliefert, 0);
};

export const getProductionEfficiency = () => {
  const planned = getTotalPlannedQuantity();
  const delivered = getTotalDeliveredQuantity();
  return planned > 0 ? Math.round((delivered / planned) * 100) : 0;
};

// SAP status translations
export const sapStatusTranslations: Record<string, string> = {
  'Fällig': 'Due',
  'Info': 'Information',
  'Aktiv': 'Active',
  'Inaktiv': 'Inactive',
  'Wartung': 'Maintenance'
};

// Material descriptions for better display
export const materialDescriptions: Record<string, string> = {
  'B464A-SG2': 'Standard Cardboard Filler Type SG2',
  'BS54A-SG1': 'Special Cardboard Filler Type SG1'
};