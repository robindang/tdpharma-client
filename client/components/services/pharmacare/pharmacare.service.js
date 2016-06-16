'use strict';

angular.module('tdpharmaClientApp')
  .service('pharmacare', pharmacare);

pharmacare.$inject = ['$filter', '$localStorage', '$translate', '$window', '$locale', 'amMoment', 'toastr'];

function pharmacare($filter, $storage, $translate, $window, $locale, amMoment, toastr) {
  var moment = $window.moment;
  return {
    getDatePickerDateFormat: function(key) {
      if (!key) {key = 'L';}
      return moment.localeData().longDateFormat(key).replace('DD','dd').replace('YYYY','yyyy');
    },
    getLocale: function() {
      var locale = $storage.locale;
      if (locale) {return locale;}
      return this.updateLocale();
    },
    getLocaleFlagCSSClass: function() {
      var locale = this.getLocale();
      if (locale === 'vi') {return 'flag-icon-vn';}
      if (locale === 'en') {return 'flag-icon-gb';}
      return '';
    },
    getStatus: function(item) {
      if (!item) {return '';}
      if (item.status === 'inactive') {return 'Off Sale';}
      if (item.status === 'active') {return item.amount ? 'On Sale':'Out of Stock';}
      return item.status;
    },
    getStatusCSSClass: function(item) {
      var status = this.getStatus(item);
      if (status === 'Off Sale') {return 'text-danger';}
      if (status === 'On Sale') {return 'text-success';}
      if (status === 'Out of Stock') {return 'text-warning';}
      return '';
    },
    updateLocale: function(locale) {
      if (!locale) {locale = $storage.locale || $translate.use();}
      $storage.locale = locale;      
      amMoment.changeLocale(locale);
      $translate.use(locale);
      if (locale === 'vi') {
        $locale.id = 'vi-vn';
      } else {
        $locale.id = 'en-us';
      }
      return locale;
    },
    getCurrencySymbol: function(){
      var locale = $storage.locale || $translate.use();
      return ((locale === 'vi') ? 'đ ' : '$ ');       
    },
    barcodePrint: function(item) {
      /* jshint quotmark: true */
      var divID = "code-" + item.barcode;
      var printContents = document.getElementById(divID);
      var popupWin = window.open("", "_blank");
      popupWin.document.open();
      popupWin.document.write("<html><head></head><body onload=\"window.print()\"><img src=\"" + printContents.src + "\"/></body></html>");
      popupWin.document.close();
    },
    validateMedBatch: function(batch, name) {
      if (!batch.user_id) {
        toastr.error(name + ': ' + $filter('translate')('AUTHOR_REQUIRED')); return false;
      }
      if (!batch.category_id) {
        toastr.error(name + ': ' + $filter('translate')('CATEGORY_REQUIRED')); return false;
      }    
      if (!batch.mfg_date){
        toastr.error(name + ': ' + $filter('translate')('MFG_DATE_REQUIRED')); return false;
      }
      if (!batch.expire_date) {
        toastr.error(name + ': ' + $filter('translate')('EXPIRE_DATE_REQUIRED')); return false;
      }
      if (!batch.package){
        toastr.error(name + ': ' + $filter('translate')('PACKAGE_REQUIRED')); return false;
      }
      if (!batch.amount_per_pkg) {
        toastr.error(name + ': ' + $filter('translate')('AMOUNT_PER_PKG_REQUIRED')); return false;
      }
      if (!batch.number_pkg) {
        toastr.error(name + ': ' + $filter('translate')('NUM_PACKAGE_REQUIRED')); return false;
      }
      if (!batch.total_units) {
        toastr.error(name + ': ' + $filter('translate')('TOTAL_UNITS_REQUIRED')); return false;
      }
      if (!batch.total_price) {
        toastr.error(name + ': ' + $filter('translate')('PRICE_REQUIRED')); return false;
      }
      return true;
    },
    DYMOInit: function() {
      var printers = dymo.label.framework.getPrinters();      
      if (printers.length === 0) {
        toastr.error($filter('translate')('NO_PRINTER')); return false;
      }
      else {
        // Select the first DYMO printer
        for(var i = 0; i < printers.length - 1; i++) {
          if (printer.printerType === 'labelWriterPrinter') {
            printerName = printer.name;
            break;
          }
        }
      }
    },
    DYMOPrint: function(item) {
      // Label XML object with 128C barcode
      var labelXml = "<ContinuousLabel Version=\"8.0\" Units=\"twips\">\
                      <PaperOrientation>Landscape</PaperOrientation>\
                      <Id>Tape12mm</Id>\
                      <PaperName>12mm</PaperName>\
                      <LengthMode>Auto</LengthMode>\
                      <LabelLength>7200</LabelLength>\
                      <RootCell>\
                        <Length>6000</Length>\
                        <LengthMode>Auto</LengthMode>\
                        <BorderWidth>0</BorderWidth>\
                        <BorderStyle>Solid</BorderStyle>\
                        <BorderColor Alpha=\"255\" Red=\"0\" Green=\"0\" Blue=\"0\"/>\
                        <SubcellsOrientation>Horizontal</SubcellsOrientation>\
                        <Subcells>\
                          <Cell>\
                            <BarcodeObject>\
                              <Name>BARCODE</Name>\
                              <ForeColor Alpha=\"255\" Red=\"0\" Green=\"0\" Blue=\"0\"/>\
                              <BackColor Alpha=\"255\" Red=\"255\" Green=\"255\" Blue=\"255\"/>\
                              <LinkedObjectName></LinkedObjectName>\
                              <Rotation>Rotation0</Rotation>\
                              <IsMirrored>False</IsMirrored>\
                              <IsVariable>False</IsVariable>\
                              <Text>12345798</Text>\
                              <Type>Code39</Type>\
                              <Size>Medium</Size>\
                              <TextPosition>None</TextPosition>\
                              <TextFont Family=\"Helvetica\" Size=\"10\" Bold=\"False\" Italic=\"False\" Underline=\"False\" Strikeout=\"False\"/>\
                              <CheckSumFont Family=\"Helvetica\" Size=\"10\" Bold=\"False\" Italic=\"False\" Underline=\"False\" Strikeout=\"False\"/>\
                              <TextEmbedding>None</TextEmbedding>\
                              <ECLevel>0</ECLevel>\
                              <HorizontalAlignment>Center</HorizontalAlignment>\
                              <QuietZonesPadding Left=\"0\" Right=\"0\" Top=\"0\" Bottom=\"0\"/>\
                            </BarcodeObject>\
                            <ObjectMargin Left=\"200\" Right=\"200\" Top=\"0\" Bottom=\"0\"/>\
                            <Length>4340</Length>\
                            <LengthMode>Auto</LengthMode>\
                            <BorderWidth>0</BorderWidth>\
                            <BorderStyle>Solid</BorderStyle>\
                            <BorderColor Alpha=\"255\" Red=\"0\" Green=\"0\" Blue=\"0\"/>\
                          </Cell>\
                        </Subcells>\
                      </RootCell>\
                    </ContinuousLabel>";

      var label = dymo.label.framework.openLabelXml(labelXml);      
      var printers = dymo.label.framework.getPrinters();
      var printerName = '';
      if (printers.length === 0) {
        toastr.error($filter('translate')('NO_PRINTER')); return false;
      }
      else {
        // Find the first tape printer
        printerName = _.find(printers, function(p){return p.printerType === 'TapePrinter';});
        // Set the value of the barcode object. Refer by the name of the BarcodeObject
        label.setObjectText('BARCODE', item);
        label.print(printerName.name);
      }              
    } 
  };
}


