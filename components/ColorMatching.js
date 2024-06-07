// Pantone-Farblisten
var aPMS = ['250', '251', '252', '253', '254', '255', '256', '257', '258', '259', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '270', '271', '272', '273', '274', '275', '276', '277', '278', '279', '280', '281', '282', '283', '284', '285', '286', '287', '288', '289', '290', '291', '292', '293', '294', '295', '296', '297', '298', '299', '300', '301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '325', '326', '327', '328', '329', '330', '331', '332', '333', '334', '335', '336', '337', '338', '339', '340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '360', '361', '362', '363', '364', '365', '366', '367', '368', '369', '370', '371', '372', '373', '374', '375', '376', '377', '378', '379', '380', '381', '382', '383', '384'];
var aRGB = ['EDEC3F', 'F4F38B', 'FBFBD8', 'F9E547', 'FBEF90', 'FDF9DA', 'FEDD00', 'FEEA66', 'FEF8CC', 'FEDB00', 'FEE966', 'FEF7CC', 'FFCD00', 'FFE116', 'FFF5CC', 'FFC72C', 'FFE7A6', 'FFF4D8', 'FED141', 'FEE38D', 'FEF5D9', 'FFA300', 'FFC766', 'FFECCC', 'FF9E1B', 'FFC476', 'FFEBD1', 'FF8200', 'FFB466', 'FFE6CC', 'FE5000', 'FE9666', 'FEDFD1', 'FF7F32', 'FFB284', 'FFE5D6', 'FC4C02', 'FD9367', 'FEDBCC', 'FA4616', 'FC9073', 'FEDAD0', 'FF808B', 'FFB2B9', 'FFE5E7', 'EF3340', 'F5848C', 'FBD6D8', 'EF426F', 'F58DA8', 'FBD9E2', 'EF4A81', 'F592B3', 'FBDAE5', 'F04E98', 'F694C1', 'FCDBEA', 'E31C79', 'EE76AE', 'F9D1E4', 'E56DB1', 'EFA7D0', 'F9E1EF', 'E93CAC', 'F18ACD', 'FAD8EE', 'E10098', 'ED66C1', 'F9CCEA', 'D539B5', 'E588D2', 'F6D7F0', 'C724B1', 'DD7BD0', 'F3D3EF', 'BB29BB', 'D67ED6', 'F1D4F1', '5BC2E7', '9CDAF0', 'DEF2FA', '00A6D6', '66C9E6', 'CCEDF6', '00B398', '66D1C1', 'CCEFEA', '2C4728', '80907E', 'D4DAD4', '00843D', '66B58A', 'CCE6D8', '00B140', '66D08C', 'CCEFD8', '6CC24A', 'A6DA92', 'E1F2DA', '84BD00', 'B5D766', 'E6F1CC', '787121', 'AEA979', 'E4E2D2', '7A9A01', 'AFC266', 'E4EACC', 'AC8400', 'CDB566', 'EEE6CC', '94450B', 'BE8F6C', 'E9D9CE', 'BE531C', 'D89776', 'F2DCD1', '963821', 'C08779', 'EAD7D2', '653024', 'A2827B', 'E0D5D3', '47271A', '907D75', 'DAD3D1', '512E23', '96817B', 'DCD5D3', '3D3935', '8A8885', 'D8D7D6', '2B2926', '7F7E7C', 'D4D4D3'];
// Zuweisungen für Pantone und RGB-Farben wie in deinem Originalcode

// Berechnet den RGB-Wert aus einem Hex-Code
function hexToRgb(hex) {
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }
  
  // Berechnet die Distanz zwischen zwei RGB-Werten
  function calculateDistance(rgb1, rgb2) {
    return Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2));
  }


  export function PMSColorMatching(rgb, distance = 32) {
    const targetRgb = hexToRgb(rgb);
    let nearest = { distance: Infinity, colour: null, rgb: null };

    for (let i = 0; i < aRGB.length; i++) {
        const pmsRgb = hexToRgb(aRGB[i]);
        const dist = calculateDistance(targetRgb, pmsRgb);

        if (dist < nearest.distance) {
            nearest = { distance: dist, colour: aPMS[i], rgb: aRGB[i] };
        }
    }

    // Zurückgeben eines Arrays, das für die UI-Darstellung geeignet ist
    return [{
        colour: nearest.colour,
        rgb: nearest.rgb,
        description: nearest.distance <= distance ? '' : ' - not within the desired range but the closest match.'
    }];
}
