let LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('openthesaurus.txt');

let found: boolean = false;

if (process.argv[3] == null){
    throw 'Please specify words';
}

let counter: number = 3;
while (process.argv [counter] != null){
    readLineFromDoc(process.argv [counter]);
    counter ++;
}


function readLineFromDoc (searchW: string){
    found = false;

    let list: String[];

    lr.on('line', function (line: String) {
        list = line.split(";");

        for (let word of list){
            if (word.indexOf(searchW) >= 0){
                found = true;
                printList (list, searchW, word);
            }
        }
    });

    lr.on('end', function () {
        if (found == false) throw 'No matches found';
    });
}

function printList(list: String[], searchW: string, wordFound: String){
    console.log(`${wordFound}:`);
    for (let word of list){
        if (word.indexOf(searchW) < 0){
            console.log(`\t${word}`);
        } 
    }
    console.log();
}