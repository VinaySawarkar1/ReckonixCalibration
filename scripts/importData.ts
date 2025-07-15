import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Full exported data from /api/export-all
const products = [
  {"name":"MEATEST M160i Precision DC Calibrator","category":"Calibration Systems","subcategory":"Electrical Calibration","shortDescription":"High-precision DC calibrator for voltage and current calibration with advanced features.","fullTechnicalInfo":"The MEATEST M160i is a precision DC calibrator designed for laboratory and industrial applications. It provides high-accuracy voltage and current outputs for calibration of multimeters, data loggers, and other electrical measuring instruments. Features include programmable outputs, temperature compensation, and comprehensive error analysis.","specifications":[{"key":"Voltage Range","value":"0 to 1000V"},{"key":"Current Range","value":"0 to 20A"},{"key":"Accuracy","value":"0.01% of reading + 0.005% of range"},{"key":"Resolution","value":"6½ digits"},{"key":"Output Type","value":"DC Voltage/Current"},{"key":"Interface","value":"USB, RS232, GPIB"},{"key":"Power Supply","value":"100-240V AC, 50/60Hz"},{"key":"Operating Temperature","value":"0°C to +50°C"},{"key":"Dimensions","value":"430 x 133 x 400 mm"},{"key":"Weight","value":"8.5 kg"}],"featuresBenefits":["High accuracy and stability","Programmable output sequences","Temperature compensation","Comprehensive error analysis","Multiple interface options","User-friendly software interface","Built-in self-calibration","Wide voltage and current ranges"],"applications":["Calibration of digital multimeters","Data logger calibration","Process control instrument calibration","Laboratory reference standards","Quality assurance testing","Research and development"],"certifications":["ISO 9001:2015","CE Marking","IEC 61010-1"],"imageUrl":"https://www.meatest.com/ew/ew_images/image?EwImage=2cbc6a4a-4ed0-469c-a99f-f0dfb49ab464&Filter=f764a165-4d4c-47a0-9f0f-ddedb54abee1","imageGallery":["https://www.meatest.com/ew/ew_images/image?EwImage=2cbc6a4a-4ed0-469c-a99f-f0dfb49ab464&Filter=f764a165-4d4c-47a0-9f0f-ddedb54abee1","https://www.meatest.com/ew/ew_images/image?EwImage=6e2e2e2e-4e4e-4e4e-aaaa-111111111111&Filter=f764a165-4d4c-47a0-9f0f-ddedb54abee1"],"catalogPdfUrl":"https://www.meatest.com/catalogs/m160i-catalog.pdf","datasheetPdfUrl":"https://www.meatest.com/datasheets/m160i-datasheet.pdf","homeFeatured":true,"technicalDetails":{"dimensions":"430 x 133 x 400 mm","weight":"8.5 kg","powerRequirements":"100-240V AC, 50/60Hz, 50VA","operatingConditions":"0°C to +50°C, 20-80% RH (non-condensing)","warranty":"3 years","compliance":["IEC 61010-1","EN 61010-1","CE Marking"]},"rank":1},
  // ... (Paste all other product objects here, omitting id, createdAt, views)
];

const customers = [
  {"name":"TechCorp Industries","logoUrl":"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop","category":"Technology","description":"Leading technology solutions provider","industry":"Aerospace & Defense","featured":true},
  {"name":"Precision Manufacturing","logoUrl":"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop","category":"Manufacturing","description":"Advanced precision manufacturing","industry":"Automotive Manufacturing","featured":true},
  {"name":"AeroSpace Solutions","logoUrl":"https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=200&h=100&fit=crop","category":"Aerospace","description":"Comprehensive aerospace solutions","industry":"Aerospace & Defense","featured":true},
  {"name":"AutoTech Systems","logoUrl":"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=100&fit=crop","category":"Automotive","description":"Automotive technology systems","industry":"Automotive Manufacturing","featured":false},
  {"name":"BioMed Research","logoUrl":"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=100&fit=crop","category":"Healthcare","description":"Biomedical research and development","industry":"Pharmaceutical & Biotech","featured":false},
  {"name":"Energy Dynamics","logoUrl":"https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop","category":"Energy","description":"Dynamic energy solutions","industry":"Oil & Gas","featured":false}
];

async function main() {
  for (const product of products) {
    const { id, createdAt, views, ...rest } = product;
    if (rest.specifications) rest.specifications = JSON.stringify(rest.specifications);
    if (rest.featuresBenefits) rest.featuresBenefits = JSON.stringify(rest.featuresBenefits);
    if (rest.applications) rest.applications = JSON.stringify(rest.applications);
    if (rest.certifications) rest.certifications = JSON.stringify(rest.certifications);
    if (rest.imageGallery) rest.imageGallery = JSON.stringify(rest.imageGallery);
    if (rest.technicalDetails) rest.technicalDetails = JSON.stringify(rest.technicalDetails);
    await prisma.product.create({ data: rest });
  }
  for (const customer of customers) {
    const { id, createdAt, ...rest } = customer;
    await prisma.customer.create({ data: rest });
  }
}

main()
  .then(() => {
    console.log('Data import complete!');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 