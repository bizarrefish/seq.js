
function SequenceIndex() {
	// symbol -> {position -> symbol}
	this.map = {};
	
	this.first = null;
	this.last = null;
	
	this.length = 0;
}

SequenceIndex.prototype.append = function(symbol) {
	if(this.first == null) {
		this.first = symbol;
	}
	
	// Make sure this symbol has a node
	if(!this.map.hasOwnProperty(symbol)) {
		this.map[symbol] = {};
	}
	
	if(this.last != null) {
		this.map[this.last][this.length] = symbol;
	}
	
	this.length = this.length + 1;
	this.last = symbol;
}

SequenceIndex.prototype.find = function(list) {

	if(!this.map.hasOwnProperty(list[0]))
		return [];
	
	var result = [];
	
	var startNode = this.map[list[0]];
	
	for(var nextPos in startNode) {
	
		if(this.length < (list.length - nextPos - 1))
			continue;
	
		var checkPos = nextPos;
		var checkSym = startNode[checkPos];
		var failed = false;
		
		for(var listPos = 1; listPos < list.length; listPos++) {
			if(checkSym != list[listPos]) {
				failed = true;
				break;
			}
			checkPos++;
			checkSym = this.map[checkSym][checkPos];
		}
		
		if(!failed) {
			result.push(nextPos - 1);
		}
		
	}
	
	if(list[0] == this.last) {
		result.push(this.length-1);
	}
	
	return result;
}


// Example:

var idx = new SequenceIndex();

idx.append("hello")
idx.append("this")
idx.append("is")
idx.append("a")
idx.append("test")

idx.append("furthermore")
idx.append("this")
idx.append("is")
idx.append("a")
idx.append("javascript")
idx.append("program")

console.log("first = " + idx.first);
console.log("last = " + idx.last);
console.log("map = " + JSON.stringify(idx.map));

var results = idx.find(["this","is", "a"]);
console.log(results);
