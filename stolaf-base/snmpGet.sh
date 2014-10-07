#!/bin/bash

#  Created by Phinehas Bynum on 10/1/14.

# Set separator to comma and save original
OIFS=$IFS
IFS=$','

printerList="mfc-bc110,mfc-bc147,mfc-casualreading,mfc-crossroads,mfc-ellingson,mfc-fireside,mfc-hh407,mfc-hillkitt,mfc-hoyme,mfc-kierk,mfc-kildahl,mfc-larson,mfc-mellby,mfc-mohn,mfc-om245,mfc-pastor,mfc-rand,mfc-rml-1st,mfc-rml115,mfc-rml330,mfc-rml386,mfc-rml433,mfc-rml560,mfc-rmlref,mfc-rns-2nd,mfc-rns258,mfc-rns358,mfc-sac,mfc-scilib,mfc-thorson,mfc-toh101,mfc-toh3,mfc-toh3-east,mfc-toh3-west,mfc-ytt118"

snmpModel () {
    echo `snmpwalk -c public -v 1 $1.printer.stolaf.edu 1.3.6.1.2.1.25.3.2.1.3.1`
}

snmpMFCToner () {
    echo `snmpwalk -c public -v 1 $1.printer.stolaf.edu 1.3.6.1.2.1.43.11.1.1.9.1.1 | awk 'NF>1{print $NF}'`
}

snmpStatus () {
    echo `snmpwalk -c public -v 1 $1.printer.stolaf.edu 1.3.6.1.2.1.25.3.5.1.1 | awk 'NF>1{print $NF}'`
}

snmpStatusCode () {
	code=`snmpwalk -c public -v 1 $1.printer.stolaf.edu 1.3.6.1.2.1.25.3.5.1.2 | awk 'NF>1{print $NF}'`
case "$code" in
00) statusCode="No Error";;
0) statusCode="Low Paper";;
1) statusCode="No Paper";;
2) statusCode="Low Toner";;
3) statusCode="No Toner";;
4) statusCode="Door Open";;
5) statusCode="Printer Jammed";;
6) statusCode="Printer Offline";;
7) statusCode="Service Requested";;
8) statusCode="Input Tray Missing";;
9) statusCode="Output Tray Missing";;
10) statusCode="Marker Supply Missing";;
11) statusCode="Output Tray Nearly Full";;
12) statusCode="Output Tray Full";;
13) statusCode="Input Tray Empty";;
14) statusCode="Preventative Maintenance Overdue";;
#TOSHIBA printers have compound status codes based on paper_empty, paper_nearly_empty, paper_available. We don't care. All of these will print as "paper_empty" for our purposes.
\"@\") statusCode="Tray 1 Empty";;
\"?\") statusCode="Tray 2 Empty";;
80) statusCode="Paper Low";;
*) statusCode="Unknown code $statusCode";;
esac
echo $statusCode
}

echo "Printer,Toner,Status,Error"
for printerName in $printerList; do
    echo -n "$printerName,"
    echo -n `snmpMFCToner $printerName`,
    echo -n `snmpStatus $printerName`,
    echo -n `snmpStatusCode $printerName`
    echo ""
done

#Set separator back to original
IFS=$OIFS
