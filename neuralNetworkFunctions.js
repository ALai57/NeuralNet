
//Data for Neural network
// var myData = [
	// {"id": 0, "T": 97.0, "HR":  71, "S_true":  0, "S_pred":  0},
	// {"id": 1, "T": 99.0, "HR":  57, "S_true":  0, "S_pred":  0},
	// {"id": 2, "T": 98.6, "HR":  52, "S_true":  0, "S_pred":  0},
	// {"id": 3, "T": 99.1, "HR":  63, "S_true":  0, "S_pred":  0},
	// {"id": 4, "T": 99.9, "HR":  72, "S_true":  0, "S_pred":  0},
	// {"id": 5, "T": 98.9, "HR":  74, "S_true":  1, "S_pred":  0},
	// {"id": 6, "T": 99.0, "HR":  73, "S_true":  1, "S_pred":  0},
	// {"id": 7, "T": 99.2, "HR":  80, "S_true":  1, "S_pred":  0},
	// {"id": 8, "T": 98.5, "HR":  81, "S_true":  1, "S_pred":  0},
	// {"id": 9, "T": 99.0, "HR":  85, "S_true":  1, "S_pred":  0},			
	// ];

var myData = [
{"id": 0, "T": 2.781083600, "HR":  2.550537003, "S_true":  0, "S_pred":  0},
{"id": 1, "T": 1.465489372, "HR":  2.362125076, "S_true":  0, "S_pred":  0},
{"id": 2, "T": 3.396561688, "HR":  4.400293529, "S_true":  0, "S_pred":  0},
{"id": 3, "T": 1.388070190, "HR":  1.850220317, "S_true":  0, "S_pred":  0},
{"id": 4, "T": 3.064072320, "HR":  3.005305973, "S_true":  0, "S_pred":  0},
{"id": 5, "T": 7.627531214, "HR":  2.759262235, "S_true":  1, "S_pred":  0},
{"id": 6, "T": 5.332441248, "HR":  2.088626775, "S_true":  1, "S_pred":  0},
{"id": 7, "T": 6.922596716, "HR":  1.771063670, "S_true":  1, "S_pred":  0},
{"id": 8, "T": 8.675418651, "HR": -0.242068655, "S_true":  1, "S_pred":  0},
{"id": 9, "T": 7.673756466, "HR":  3.508563011, "S_true":  1, "S_pred":  0},			
];

// {'weights': [0.13436424411240122, 0.8474337369372327, 0.763774618976614]},
// {'weights': [0.2550690257394217, 0.49543508709194095]} 
// {'weights': [0.4494910647887381, 0.651592972722763]}
// newNet.Layers[0].Neurons[0].SetWeights([0.13436424411240122, 0.8474337369372327])
	
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

// Forward propagate an input
// Calculate errors
// Back propagate errors

function trainNet(nIterations,learningRate){
	var n, i;
	
	for(n=0;n<nIterations;n++){
		for (i=0;i<myData.length;i++){
			
			var dataIn  = [myData[i].T,myData[i].HR];
			var dataOut = myData[i].S_true;
			
			newNet.ForwardPropagate(dataIn);
			newNet.BackPropagateError(dataOut);
			newNet.UpdateNeuralNetWeights(learningRate,dataIn);
		}
		console.log('Iter ' + n);
	}
}

function NeuralNet(nNeuronsPerLayer){
	var n;
	this.Layers = [];
	
	for (n=0;n<(nNeuronsPerLayer.length-1);n++){
		this.Layers[n] = new NeuralLayer(nNeuronsPerLayer[n+1],nNeuronsPerLayer[n]);
	}
	
	this.ForwardPropagate = function(inputs){
		for (n=0;n<this.Layers.length;n++){
			// console.log(inputs);
			this.Layers[n].ActivateLayer(inputs);
			this.Layers[n].TransferLayer();
			inputs = this.Layers[n].GetLayerOutputs();
		}
	}
		
	this.BackPropagateError = function(targetVal){
		var outputLayer = this.Layers.length-1;
		var i, n;
		
		//hidden layers backpropagation
		for (i=this.Layers.length-1;i>-1;i--){
			var theLayer = this.Layers[i];
			var Err = [];
			
			//Get errors from layer above
			if (i===outputLayer){
				// console.log('Output Layer');
				Err = targetVal - this.Layers[outputLayer].GetLayerOutputs();
			}else{
				// console.log('Hidden Layer');
				for (n=0;n<theLayer.Neurons.length;n++){
					Err[n] = backPropagateLayer_ToNeuron(theLayerAbove.Neurons,n);
				}
			}
			
			// console.log('Err == ');
			// console.log(Err);
			
			for (n=0;n<theLayer.Neurons.length;n++){
				if (!Array.isArray(Err)){
					var neuronError = Err;
				}else{
					var neuronError = Err[n];
				}
				// console.log('neuronError = ' + neuronError);
				
				this.Layers[i].Neurons[n].Error.push(neuronError);
				this.Layers[i].Neurons[n].Delta.push(neuronError*theLayer.Neurons[n].TransferDerivative());
			}
			
			var theLayerAbove = this.Layers[i];
		}
		
	}
	
	function backPropagateLayer_ToNeuron(neurons,targetIndex){
		var Err = 0;
		var i; 
		
		for (i=0;i<neurons.length;i++){
			var lastWeight = neurons[i].Weights.length-1;
			var lastError  = neurons[i].Error.length-1;
					
			// console.log('Last Weight');
			// console.log(neurons[i].Weights[lastWeight]);
			// console.log('Last Error');			
			// console.log(neurons[i].Error[lastError]);
			
			Err = Err + neurons[i].Weights[lastWeight][targetIndex]*neurons[i].Error[lastError];
		}
		return Err;
	}
	
	this.UpdateNeuralNetWeights = function(learningRate,inputs){
		for (n=0;n<this.Layers.length;n++){
			this.Layers[n].UpdateLayerWeights(learningRate,inputs);
			inputs = this.Layers[n].GetLayerOutputs();
		}
	}
}

function NeuralLayer(nNeurons, nInputs){
	var n;
	this.Neurons = [];
	for (n=0;n<nNeurons;n++){
		this.Neurons[n] = new Neuron(nInputs);
	}
	
	this.ActivateLayer = function(inputs){
		// console.log('Activating Neurons Index 0 to Index ' + (this.Neurons.length-1));
		for (n=0;n<this.Neurons.length;n++){
			this.Neurons[n].ActivateNeuron(inputs);
		}
	}
	
	this.TransferLayer = function(){
		for (n=0;n<this.Neurons.length;n++){
			this.Neurons[n].TransferNeuron();
		}
	}
	
	this.GetLayerOutputs = function(){
		var theOutput = [];
		
		for (n=0;n<this.Neurons.length;n++){
			var lastOutput = this.Neurons[n].Output.length-1;
			
			theOutput[n] = (this.Neurons[n].Output[lastOutput]);
		}
		return theOutput;
	}
	
	this.UpdateLayerWeights = function(learningRate,inputs){
		for (n=0;n<this.Neurons.length;n++){
			var lastWeight = this.Neurons[n].Weights.length-1;
			var lastDelta  = this.Neurons[n].Delta.length-1;
			
			var D = this.Neurons[n].Delta[lastDelta];
			
			// console.log(this.Neurons[n].Weights[lastWeight]);
			// console.log(learningRate)
			// console.log(inputs.map(function(x){return x * learningRate * D;} ) );
			// console.log(D)
			var update = inputs.map(function(x){return x * learningRate * D;} )
			
			this.Neurons[n].Weights.push( this.Neurons[n].Weights[lastWeight].map(function(a,i){return a+update[i];} ) );
			this.Neurons[n].Bias.push( this.Neurons[n].Bias[lastWeight]+learningRate*D );
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
		var lastWeight = this.Weights.length -1;
		
		this.Weights[lastWeight] = newWeights;  
	}
	
	this.ActivateNeuron = function(inputs){
		var lastWeight = this.Weights.length -1;
		var lastBias   = this.Bias.length -1;
		
		var weights = this.Weights[lastWeight];
		var bias    = this.Bias[lastBias];
		var activation = dotProduct(inputs,weights)+bias;
		this.Activation.push(activation);
	}
	
	this.TransferNeuron =  function(){
		var lastActivation = this.Activation.length -1;
		
		this.Output.push(1/(1+Math.exp(-this.Activation[lastActivation])));
	}
	
	this.TransferDerivative = function(){
		var lastOutput = this.Output.length -1;
		
		return this.Output[lastOutput]*(1-this.Output[lastOutput]);
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




		// //output Layer backpropagation
		// for (n=0;n<this.Layers[outputLayer].Neurons.length;n++){
			// var Err = targetVal - this.Layers[outputLayer].Neurons[n].Output;
			
			// this.Layers[outputLayer].Neurons[n].Error.push(Err);
			// this.Layers[outputLayer].Delta.push(Err*N.TransferDerivative());
		// }
		
			// this.GetLayerErrors = function(){
		// var Err=[];
		// var n;
		
		// for (n=0;n<this.Neurons.length;n++){
			// var lastError = this.Neurons[n].Error.length-1;
			
			// console.log('Neuron ' + n + '. Last error = ' + this.Neurons[n].Error[lastError]);
			// // console.log('Neuron ' + n + '. Errors ' + this.Neurons[n].Error);
			
			// Err.push( this.Neurons[n].Error[lastError] );
			// // Err.push( dotProduct(this.Neurons[n].Delta,this.Neurons[n].Weights) );	
		// }
		
		// return Err;
	// }
	
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
	