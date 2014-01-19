/*

 convexhull.js : Edge Detection - ConvexHull(data) 
		
 About: 2 Dimensional Scan Only
        The algorithm first sorts all the data by X and then recursivly checks the Upper and Lower Edges.
        From computational geometry the CrossProduct() is used for detecting an edge.
        
 License: FREE & OPEN SOURCE...

 Date: December 25, 2013

 Version: 0.1 pre

*/

function ConvexHull (data) {
	if(data.length <= 3) {
		return data;
	}
	var sorted = data.sort(function(a,b) {if(a[0] < b[0]) {return a[0]-b[0]} else {return a[1]-b[1]}});
	var upper = [sorted[0], sorted[1]];
	var lower = [sorted[0], sorted[1]];
	for (var index = 0; index < sorted.length; index++) {
		point = sorted[index];
		// Upper Hull if negative 
		upper.push(point);
		upper = CheckUpper(upper);
		// Lower Hull if positive
		lower.push(point);
		lower = CheckLower(lower);
	}
	return upper.concat(lower.reverse());
}

/* 
	CrossProduct(): This is the main calculation for detecting an edge in a sorted dataset.
		+ is counter clockwise turn from a to b
		- is clockwise turn from a to b
*/

function CrossProduct(center, a, b) {
	return (a[0] - center[0])*(b[1] - center[1]) - (a[1] - center[1])*(b[0] - center[0]);
}

// Check Upper Edge (looking backwards)
function CheckUpper (data) {
	if(data.length <3) {return data;} 
	if(CrossProduct(data[data.length-1], data[data.length-2], data[data.length-3]) < 0) {
		data.splice(data.length-2,1); // splice off the non-upper edge
		return CheckUpper(data);
	} 
	else {return data;}
}

// Check Lower Edge (looking backwards)
function CheckLower (data) {
	if(data.length <3) {return data;}
	if(CrossProduct(data[data.length-1], data[data.length-2], data[data.length-3]) > 0) {
		data.splice(data.length-2,1);
		return CheckLower(data);
	} 
	else {return data;}
}
