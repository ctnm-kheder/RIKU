// Pantone-Farblisten
var aPMS = ['250', '251', '252', '253', '254', '255', '256', '257', '258', '259', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '270', '271', '272', '273', '274', '275', '276', '277', '278', '279', '280', '281', '282', '283', '284', '285', '286', '287', '288', '289', '290', '291', '292', '293', '294', '295', '296', '297', '298', '299', '300', '301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '325', '326', '327', '328', '329', '330', '331', '332', '333', '334', '335', '336', '337', '338', '339', '340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '360', '361', '362', '363', '364', '365', '366', '367', '368', '369', '370', '371', '372', '373', '374', '375', '376', '377', '378', '379', '380', '381', '382', '383', '384'];
var aRGB = ['EDEC3F', 'F4F38B', 'FBFBD8', 'F9E547', 'FBEF90', 'FDF9DA', 'FEDD00', 'FEEA66', 'FEF8CC', 'FEDB00', 'FEE966', 'FEF7CC', 'FFCD00', 'FFE116', 'FFF5CC', 'FFC72C', 'FFE7A6', 'FFF4D8', 'FED141', 'FEE38D', 'FEF5D9', 'FFA300', 'FFC766', 'FFECCC', 'FF9E1B', 'FFC476', 'FFEBD1', 'FF8200', 'FFB466', 'FFE6CC', 'FE5000', 'FE9666', 'FEDFD1', 'FF7F32', 'FFB284', 'FFE5D6', 'FC4C02', 'FD9367', 'FEDBCC', 'FA4616', 'FC9073', 'FEDAD0', 'FF808B', 'FFB2B9', 'FFE5E7', 'EF3340', 'F5848C', 'FBD6D8', 'EF426F', 'F58DA8', 'FBD9E2', 'EF4A81', 'F592B3', 'FBDAE5', 'F04E98', 'F694C1', 'FCDBEA', 'E31C79', 'EE76AE', 'F9D1E4', 'E56DB1', 'EFA7D0', 'F9E1EF', 'E93CAC', 'F18ACD', 'FAD8EE', 'E10098', 'ED66C1', 'F9CCEA', 'D539B5', 'E588D2', 'F6D7F0', 'C724B1', 'DD7BD0', 'F3D3EF', 'BB29BB', 'D67ED6', 'F1D4F1', '5BC2E7', '9CDAF0', 'DEF2FA', '00A6D6', '66C9E6', 'CCEDF6', '00B398', '66D1C1', 'CCEFEA', '2C4728', '80907E', 'D4DAD4', '00843D', '66B58A', 'CCE6D8', '00B140', '66D08C', 'CCEFD8', '6CC24A', 'A6DA92', 'E1F2DA', '84BD00', 'B5D766', 'E6F1CC', '787121', 'AEA979', 'E4E2D2', '7A9A01', 'AFC266', 'E4EACC', 'AC8400', 'CDB566', 'EEE6CC', '94450B', 'BE8F6C', 'E9D9CE', 'BE531C', 'D89776', 'F2DCD1', '963821', 'C08779', 'EAD7D2', '653024', 'A2827B', 'E0D5D3', '47271A', '907D75', 'DAD3D1', '512E23', '96817B', 'DCD5D3', '3D3935', '8A8885', 'D8D7D6', '2B2926', '7F7E7C', 'D4D4D3'];

// Redefine indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(val, fromIndex) {
        if (typeof(fromIndex) != 'number') fromIndex = 0;
        for (var index = fromIndex, len = this.length; index < len; index++)
            if (this[index] == val) return index;
        return -1;
    };
}

// Hauptabstimmungsfunktion
export function PMSColorMatching(rgb, distance) {
    if (!distance) distance = 32;

    var a = new Array();
    var aDis = new Array();
    var aSort = new Array();

    // search near color to chosen color
    var r = parseInt(rgb.substring(0, 2), 16);
    var g = parseInt(rgb.substring(2, 4), 16);
    var b = parseInt(rgb.substring(4, 6), 16);

    for (var i = 0; i < aRGB.length; i++) {
        var rgb1 = aRGB[i];
        var r1 = parseInt(rgb1.substring(0, 2), 16);
        var g1 = parseInt(rgb1.substring(2, 4), 16);
        var b1 = parseInt(rgb1.substring(4, 6), 16);

        // 3D distance
        aDis[i] = Math.sqrt(Math.pow((r - r1), 2) + Math.pow((g - g1), 2) + Math.pow((b - b1), 2));
    }

    // Find all colours within sphere with radius distance
    for (var i = 0; i < aDis.length; i++) {
        if (aDis[i] <= distance) {
            if (a.indexOf(aPMS[i]) == -1) {
                // add this colour
                a.push(aPMS[i]);
                aSort.push({distance: aDis[i], colour: aPMS[i], rgb: aRGB[i]});
            }
        }
    }

    // Sort by distance, asc.
    aSort.sort(function(a, b) {
        return a.distance - b.distance;
    });

    var aSorted = new Array();
    // Rebuild 1-dim array
    for (var i = 0; i < aSort.length; i++) {
        // add this colour
        aSorted.push(aSort[i].colour + ' (' + aSort[i].rgb + ')');
    }

    var aTrunc = new Array();
    // Die drei besten Treffer
    aTrunc = aSorted.slice(0, 3);

    return aTrunc;
}