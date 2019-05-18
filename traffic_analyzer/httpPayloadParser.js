/* simple http parser, that extracts the HOST from a http payload*/
exports.parseHTTPPayload = (payload) => {
    const splitted = payload.split("\n");

    for (let line of splitted) {
        if(line.includes("Host")) {
            line = line.replace(/(\r\n|\n|\r)/gm, "");

            keyValPair = line.split(":");
            return keyValPair.length > 1 ? keyValPair[1].trim() : "";
        }
    } 
    return "";
}