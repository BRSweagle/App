var request = require('sync-request');
var metadatasets = [];


function getCDS(CdsId) {
    var res = request('GET', 'https://testing.sweagle.com/api/v1/data/include/' + CdsId + '/snapshot?withTokenReplaced=true&normalize=true', {
        headers: {
            'Authorization': 'Bearer d4b980b0-4a19-45e7-8b56-9d8ff3e3cea8',
            'Accept': 'application/json'
        },
    });
    return JSON.parse(res.getBody('utf8'))
}

//metadataset[0]=getCDS(111914229);
metadatasets[0] = getCDS(111914229);

let arg = '["i-0c034b5c963a27d49"]';
//console.log(JSON.stringify(metadataset,null,2));

//****************** Sweagle .js below  *************************************
// description: Return all data for a given unique node name
// add return in gobus format
var subNode=JSON.parse(arg);
var subset = metadatasets[0];
var nodesWithSameName = 0;


function retrieveAllData(mds, searchTerm) {

    for (var item in mds) {
        if (typeof(mds[item]) === 'object') if (searchTerm === item) {
            nodesWithSameName = nodesWithSameName + 1;

            subset = mds[item];
        } else {
            retrieveAllData(mds[item], searchTerm);
        }
    }
}


if (subNode!=null) {
    retrieveAllData(metadatasets, subNode[0]);
}
else {
    //return metadataset;
    console.log(metadatasets);
}


if (nodesWithSameName === 0) {
    return "ERROR: nodeName not found";
}
else if (nodesWithSameName === 1) {
    var pretext =  "[\n";
    var posttext = "\n]";
    var text="";
    for (var key in subset){
        if (typeof(subset[key]) !== 'object') {
            var text = text +
                "  {\n" +
                "     \"ParameterKey\":" + "\""+ key + "\",\n" +
                "     \"ParameterValue\":" + "\""+ subset[key] + "\"\n" +
                "  },\n";
        }
    }
    text = text.replace(/,\s*$/, "");  //remove last comma
    var returntext = pretext+text+posttext;
//    return returntext;
    console.log(returntext);
}
else {
//    return "ERROR: multiple nodeNames found";
    console.log("ERROR: multiple nodeNames found");
}


