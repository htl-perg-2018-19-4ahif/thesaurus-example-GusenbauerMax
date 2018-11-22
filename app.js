var LineByLineReader = require('line-by-line'), lr = new LineByLineReader('openthesaurus.txt');
var found = false;
if (process.argv[3] == null) {
    throw 'Please specify words';
}
var counter = 3;
while (process.argv[counter] != null) {
    readLineFromDoc(process.argv[counter]);
    counter++;
}
function readLineFromDoc(searchW) {
    found = false;
    var list;
    lr.on('line', function (line) {
        list = line.split(";");
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var word = list_1[_i];
            if (word.indexOf(searchW) >= 0) {
                found = true;
                printList(list, searchW, word);
            }
        }
    });
    lr.on('end', function () {
        if (found == false)
            throw 'Not matches found exception';
    });
}
function printList(list, searchW, wordFound) {
    console.log(wordFound + ":");
    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
        var word = list_2[_i];
        if (word.indexOf(searchW) < 0) {
            console.log("\t" + word);
        }
    }
    console.log();
}
