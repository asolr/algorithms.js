/*

 KMEANS Clustering Algorithm (2D or N-Dimensional)

 KMeans(data, k) 
  k = number of clusters
  data = [[x, y, z, ...], [x, y, z, ...],...]

 Efficiency: 	The algorithm shown here is costly mostly because it needs to calculate the distances 
		between every data point in the set and every perspective centroid recursively.  
		If you want to email your ideas or research on faster or more careful centroid 
		estimation that would be helpful.
		
 Further Research: There are several important problems to solve in the kmeans clustering algorithm one is the 
		Nearest Neighbor problem (possible speedup).  
		The other problem that kmeans doesn't notice the convergance on a cluster 
		centroid without getting all the points to converge. 
				
 Warning Non-Determanistic: K-Means doesn't converge on the same data point each time.

 License: Not for use by students... everyone else have at it (FREE & OPEN SOURCE) however I would like to know if 
 	you are working with this code (and I can most likely help and am interested in further research)
 
 Donations are Appricated

 Date: May 27, 2013 - 2013.05.27

 Version: 0.1 pre

*/

function KMeans(data, k) {
	var centroid = RandomK(data, k);
	return Converge(data, centroid);
}

function Converge (data, centroid) {
	var converged = 0;
	var cluster = Assign(data, centroid); 
	var cluster_centroid = Centroid(cluster);
	for(var index = 0; index < cluster_centroid.length; index++) {
		if(centroid.indexOf(cluster_centroid[index]) >= 0) {
			converged++;
		}
	}
	if(converged == centroid.length) {
		return {centroids : cluster_centroid, clusters : cluster};
	} else {
		return Converge(data, cluster_centroid);
	}
}

// Assigns each data element to a centroid
function Assign(data, centroid) {
	var cluster = []; 
	for (var i = 0; i < centroid.length; i++) {
		cluster.push([]);
	}
	for (var i = 0; i < data.length; i++) {
		var point = data[i];
		var hypotenuse = [];
		for (var k = 0; k < centroid.length; k++) {
			var sum = 0;
			for (var dimension = 0; dimension < point.length; dimension++){
				var side = point[dimension] - centroid[k][dimension];
				side *= side;
				sum += side;
			}
			hypotenuse[k] = Math.sqrt(sum);
		}
		var index = hypotenuse.indexOf(Math.min.apply(null, hypotenuse));
		cluster[index].push(point); // push the point into the nearest cluster
	}
	return cluster;
}

// Find the centroid of each cluster
function Centroid(cluster){
	var means = [];
	for(var index = 0; index < cluster.length; index++) {
		means.push(Mean(cluster[index]));
	}
	var centroid = [];
	for (var k = 0; k < means.length; k++) {
		centroid.push(NearestNeighbor(means[k], cluster[k]));
	}
	return centroid;
}

// Find the nearest neighbor to a point
function NearestNeighbor(point, data) {
	var neighbor = [];
	for (var i = 0; i < data.length; i++) {
		var sum = 0;
		for (var dimension = 0; dimension < point.length; dimension++){
			var side = point[dimension] - data[i][dimension];
			side *= side;
			sum += side;
		}
		neighbor.push(Math.sqrt(sum));
	}
	var index = neighbor.indexOf(Math.min.apply(null, neighbor));
	var nearest = data[index];
	return nearest;
}

// Finds the (mean) center of the data (floating point values)
function Mean(data){
	var sum = []; // sum of all the x, y, z dimensions
	var count = data.length; // count of the number of points in the dimension
	var center = []; // location of the estimated centers of cluster
	// clear the sums 
	for (var dimension = 0; dimension < data[0].length; dimension++) {
		sum.push(0);
	}
	// sum the values (per dimension)
	for (var i = 0; i < data.length; i++) {
		for (var dimension = 0; dimension < data[0].length; dimension++) {
			sum[dimension] += data[i][dimension];
		}
	}
	// find the (mean) center (sum/count)
	for (var dimension = 0; dimension < sum.length; dimension++){ 
		center.push(sum[dimension] / count); 
	}
	return center;
}

// k random data points
function RandomK(data, k) {
	var random = [];
	var seats = []; 
	while(k > 0) {
		var chair = Math.round(Math.random() * data.length);
		if(seats.indexOf(chair) < 0 && data[chair] != undefined) {
			seats.push(chair);
			random.push(data[chair]);
			k--;
		}
	}
	return random;
}
