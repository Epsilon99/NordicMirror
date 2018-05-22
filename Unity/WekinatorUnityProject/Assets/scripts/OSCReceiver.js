
//You can set these variables in the scene because they are public 
public var RemoteIP : String = "127.0.0.1";
public var SendToPort : int = 6448;
public var ListenerPort : int = 12000;
private var handler : Osc;

public var FafnerGO : GameObject;
public var FafnerAnimator : Animator;
public var FafnerCircle : GameObject;
public var SaerimnerGO : GameObject;
public var SaerimnerAnimator : Animator;
public var SaerimnerCircle : GameObject;

private var leftState : boolean;
private var rightState : boolean;

public var TimeForInput : float;
private var inputTimer : float;
private var timerActive : boolean;
private var inputWasLeft : boolean;

public var FlutterCheckTime : float;
private var FlutterCheckInitiated : boolean;
private var Fluttertimer : float;

//Another timer?! Fuuuuuck
public var CooldownTime : float;
private var cooldownTimer : float;

public function Start ()
{
	cooldownTimer = Time.time;
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached
	
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);		

	//Tell Unity to call function Example1 when message /wek/outputs arrives
	handler.SetAddressHandler("/wek/outputs", HandInput);

	FlutterCheckInitiated = false;
	timerActive = true;
}

//Use the values from OSC to do stuff
function Update () 
{
	if(Time.time > cooldownTimer)
	{
		if(FlutterCheckInitiated == true)
		{
			FlutterCheck();
		}

		//Check Inputs while timer is inactive
		if(timerActive == false)
		{
			inactiveInputs();
		}
		else
		{
			activeInputs();
		}

		//Check if we need timer
		if(timerActive == true)
		{
			InputTimerHandling();
		}
	}
}	


//All the good functions! :D :D :D :D
//Timer

function InputTimerHandling() : void
{
	if(Time.time >= inputTimer)
	{
		cooldownTimer = Time.time + CooldownTime;
		StopTimer();

		if(inputWasLeft == true)
		{
			FafnerAnimator.SetTrigger("Activate");
		}
		else
		{
			Debug.Log("øf øf");
			SaerimnerAnimator.SetTrigger("Activate");
		}
	}
}

function StartTimer(isLeft : boolean) : void
{
	inputTimer = Time.time + TimeForInput;

	inputWasLeft = isLeft;
	timerActive = true;
}

function StopTimer() : void
{
	timerActive = false;

	if(inputWasLeft == true)
	{
		FafnerGO.SendMessage("StartHover");
		FafnerCircle.SendMessage("StopCircleAnimation");
	}
	else
	{
		SaerimnerGO.SendMessage("StartHover");
		SaerimnerCircle.SendMessage("StopCircleAnimation");
	}
}

function FlutterCheck() : void
{
	if(Time.time >= Fluttertimer)
	{
		if(inputWasLeft == true && leftState == false)
		{
			StopTimer();
			FlutterCheckInitiated = false;
		}

		if(inputWasLeft == false && rightState == false)
		{
			StopTimer();
			FlutterCheckInitiated = false;
		}

		FlutterCheckInitiated = false;
	}
}


//Input functions

function inactiveInputs()
{
	if(leftState == true)
	{
		StartTimer(true);
		FafnerGO.SendMessage("StopHover");
		FafnerCircle.SendMessage("StartCircleAnimation", TimeForInput);
	}

	if(rightState == true)
	{
		StartTimer(false);
		SaerimnerGO.SendMessage("StopHover");
		SaerimnerCircle.SendMessage("StartCircleAnimation", TimeForInput);
	}
}

function activeInputs()
{
	if(inputWasLeft == true && leftState == false)
	{
		if(FlutterCheckInitiated == false)
		{
			FlutterTimer = Time.time + FlutterCheckTime;
			FlutterCheckInitiated = true;
		}
	}

	if(inputWasLeft == false && rightState == false)
	{
		if(FlutterCheckInitiated == false)
		{
			FlutterTimer = Time.time + FlutterCheckTime;
			FlutterCheckInitiated = true;
		}
	}
}

//This is called when /wek/outputs arrives, since this is what's specified in Start()
public function HandInput(oscMessage : OscMessage) : void
{	
	var tMessage = Osc.OscMessageToString(oscMessage);

	switch(tMessage){
		case "/wek/outputs 1" :
			leftState = false;
			rightState = false;
			break;

		case "/wek/outputs 2" :
			leftState = true;
			break;

		case "/wek/outputs 3" :
			rightState = true;
			break;
	}
} 