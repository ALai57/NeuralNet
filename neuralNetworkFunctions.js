
//Data for Neural network
var myData = [
	{"id": 0, "T": 2.781083600, "HR":  2.550537003, "S_true":  0, "y_pred":  0},
	{"id": 1, "T": 1.465489372, "HR":  2.362125076, "S_true":  0, "y_pred":  0},
	{"id": 2, "T": 3.396561688, "HR":  4.400293529, "S_true":  0, "y_pred":  0},
	{"id": 3, "T": 1.388070190, "HR":  1.850220317, "S_true":  0, "y_pred":  0},
	{"id": 4, "T": 3.064072320, "HR":  3.005305973, "S_true":  0, "y_pred":  0},
	{"id": 5, "T": 7.627531214, "HR":  2.759262235, "S_true":  1, "y_pred":  0},
	{"id": 6, "T": 5.332441248, "HR":  2.088626775, "S_true":  1, "y_pred":  0},
	{"id": 7, "T": 6.922596716, "HR":  1.771063670, "S_true":  1, "y_pred":  0},
	{"id": 8, "T": 8.675418651, "HR": -0.242068655, "S_true":  1, "y_pred":  0},
	{"id": 9, "T": 7.673756466, "HR":  3.508563011, "S_true":  1, "y_pred":  0},			
	];

var myNeurons = [
  { "x":  0, "y": +1, "r": 50, "b":    0, "c" : "black"},
  { "x":  0, "y": -1, "r": 50, "b":    0, "c" : "black"},
  { "x":  1, "y": +1, "r": 50, "b":    0, "c" : "black"},
  { "x":  1, "y": -1, "r": 50, "b":    0, "c" : "black"},
  { "x":  2, "y":  0, "r": 50, "b":    0, "c" : "black"},
  ];
  
var myWeights = [
  { "fromNeuron":  0, "toNeuron": 2, "t": 1, "c" : "black"},
  { "fromNeuron":  0, "toNeuron": 3, "t": 1, "c" : "black"},
  { "fromNeuron":  1, "toNeuron": 2, "t": 1, "c" : "black"},
  { "fromNeuron":  1, "toNeuron": 3, "t": 1, "c" : "black"},
  { "fromNeuron":  2, "toNeuron": 4, "t": 1, "c" : "black"},
  { "fromNeuron":  3, "toNeuron": 4, "t": 1, "c" : "black"},
  ];

function forwardPropagate(d,wts){
	var networkOutput = [];
	
	for (n=0;n<d.length;n++) {
	
		//Hidden Layer
		var in3 = d[n].T*wts[0].t + d[n].HR*wts[2].t + myNeurons[2].b;
		var in4 = d[n].T*wts[1].t + d[n].HR*wts[3].t + myNeurons[3].b;
		var out3 = activate(in3);
		var out4 = activate(in4);
		
		//Output Layer
		var in5 = out3*wts[4].t+out4*wts[5].t + myNeurons[4].b;
		var out5 = activate(in5);
		
		myData[n].y_pred = out5;
		
		obj = {"predicted" : out5, "target": d[n].y};
		networkOutput.push(obj); 
		
	}
	
	return networkOutput;
}

function activate(x){
	return 1/(1+Math.exp(-x));
}

forwardPropagate(myData,myWeights);