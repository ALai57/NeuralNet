
//Data for Neural network
var myData = [
	{"id": 0, "T": 97.0, "HR":  71, "S_true":  0, "S_pred":  0},
	{"id": 1, "T": 99.0, "HR":  57, "S_true":  0, "S_pred":  0},
	{"id": 2, "T": 98.6, "HR":  52, "S_true":  0, "S_pred":  0},
	{"id": 3, "T": 99.1, "HR":  63, "S_true":  0, "S_pred":  0},
	{"id": 4, "T": 99.9, "HR":  72, "S_true":  0, "S_pred":  0},
	{"id": 5, "T": 98.9, "HR":  74, "S_true":  1, "S_pred":  0},
	{"id": 6, "T": 99.0, "HR":  73, "S_true":  1, "S_pred":  0},
	{"id": 7, "T": 99.2, "HR":  80, "S_true":  1, "S_pred":  0},
	{"id": 8, "T": 98.5, "HR":  81, "S_true":  1, "S_pred":  0},
	{"id": 9, "T": 99.0, "HR":  85, "S_true":  1, "S_pred":  0},			
	];


// var myData = [
	// {"id": 0, "T": 2.781083600, "HR":  2.550537003, "S_true":  0, "S_pred":  0},
	// {"id": 1, "T": 1.465489372, "HR":  2.362125076, "S_true":  0, "S_pred":  0},
	// {"id": 2, "T": 3.396561688, "HR":  4.400293529, "S_true":  0, "S_pred":  0},
	// {"id": 3, "T": 1.388070190, "HR":  1.850220317, "S_true":  0, "S_pred":  0},
	// {"id": 4, "T": 3.064072320, "HR":  3.005305973, "S_true":  0, "S_pred":  0},
	// {"id": 5, "T": 7.627531214, "HR":  2.759262235, "S_true":  1, "S_pred":  0},
	// {"id": 6, "T": 5.332441248, "HR":  2.088626775, "S_true":  1, "S_pred":  0},
	// {"id": 7, "T": 6.922596716, "HR":  1.771063670, "S_true":  1, "S_pred":  0},
	// {"id": 8, "T": 8.675418651, "HR": -0.242068655, "S_true":  1, "S_pred":  0},
	// {"id": 9, "T": 7.673756466, "HR":  3.508563011, "S_true":  1, "S_pred":  0},			
	// ];	
	

var myNeurons = [
  { "x":  0, "y": +1, "r": 50, "b":    0, "c" : "black"},
  { "x":  0, "y": -1, "r": 50, "b":    0, "c" : "black"},
  { "x":  1, "y": +1, "r": 50, "b":    1, "c" : "black"},
  { "x":  1, "y": -1, "r": 50, "b":    1, "c" : "black"},
  { "x":  2, "y":  0, "r": 50, "b":    1, "c" : "black"},
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
		
		myData[n].S_pred = out5;
		
		obj = {"predicted" : out5, "target": d[n].S_pred};
		networkOutput.push(obj); 
		
	}
	
	return networkOutput;
}

function activate(x){
	return 1/(1+Math.exp(-x));
}

function NeuralNet(nNeuronsPerLayer){
	var n;
	this.Layers = [];
	for (n=0;n<(nNeuronsPerLayer.length-1);n++){
		this.Layers[n] = new NeuralLayer(nNeuronsPerLayer[n+1],nNeuronsPerLayer[n]);
	}
	
	this.ForwardPropagate = function(inputs){
		for (n=0;n<this.Layers.length;n++){
			console.log(inputs);
			this.Layers[n].ActivateLayer(inputs);
			this.Layers[n].TransferLayer();
			inputs = this.Layers[n].GetLayerOutput();
		}
	}
	
	this.BackPropagate_HiddenLayer = function(){
		
	}
}

function NeuralLayer(nNeurons, nInputs){
	var n;
	this.Neurons = [];
	for (n=0;n<nNeurons;n++){
		this.Neurons[n] = new Neuron(nInputs);
	}
	
	this.ActivateLayer = function(inputs){
		for (n=0;n<this.Neurons.length;n++){
			console.log('Activating Neurons 0 - ' + (this.Neurons.length-1));
			this.Neurons[n].ActivateNeuron(inputs);
		}
	}
	
	this.TransferLayer = function(){
		for (n=0;n<this.Neurons.length;n++){
			this.Neurons[n].TransferNeuron();
		}
	}
	
	this.GetLayerOutput = function(){
		var theOutput = [];
		for (n=0;n<this.Neurons.length;n++){
			theOutput[n] = (this.Neurons[n].Output[this.Neurons[n].Output.length-1]);
		}
		return theOutput;
	}
	
	this.UpdateLayerWeights = function(inputs){
		for (n=0;n<this.Neurons.length;n++){
			var N = this.Neurons[n];
			var D = N.Delta[N.Delta.length-1];
			this.Neurons[n].Weights.push( N.Weights[N.Weights.length-1]+LR*inputs*D );
			this.Neurons[n].TransferNeuron;
		}
	}
}

function Neuron(nInputs){
	
	this.Weights = [];
	this.Weights = [Array(nInputs)]; this.Weights[0].fill(1);
	this.Bias = [];
	this.Bias.push(1);
	this.Activation = [];
	this.Output = [];
	this.Error = [];
	this.Delta = [];
	
	this.SetWeights = function(newWeights){
		this.Weights[this.Weights.length-1] = newWeights;  
	}
	
	this.ActivateNeuron = function(inputs){
		var weights = this.Weights[this.Weights.length -1];
		var bias    = this.Bias[this.Bias.length -1];
		var activation = dotProduct(inputs,weights)+bias;
		this.Activation.push(activation);
	}
	
	this.TransferNeuron =  function(){
		this.Output.push(1/(1+Math.exp(-this.Activation[this.Activation.length -1])));
	}
	
	this.TransferDerivative = function(){
		return this.Output[this.Output.length -1]*(1-this.Output[this.Output.length -1]);
	}
	
}

function dotProduct(in1,in2){
	var theSum = 0;
	for (n=0;n<in1.length;n++){
		theSum = theSum + in1[n]*in2[n];
	}
	return theSum;
}

forwardPropagate(myData,myWeights);