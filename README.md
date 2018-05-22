# Nordic Mirror

This was a project made for the course *Interaction Design II* on 4th semester on *Digital Design* at *Aarhus University*.

The following students worked on this project
* Kevin Tonning
* Maria Orth Christensen
* Rikke Wolf Pedersen
* Rolf Holm
* Mick Holst

## What it does
Nordic Mirror is a smartmiror, that aims to guide people in their personal economy on a day to day basis. It does so by presenting the economy of the user, in an integrated way on their daily activites. Mainly when you meet the mirror during the morning or the evening. Inside the mirror we put two characters who believes in to different ways of spending your money, both based on two mythical creatures from norse mythology; (1) Fafner who tries to guide you in being conservertive in spending and thus enabling the user to save money in the long run and, (2) Særimner who tries to guide you in spending in things you would like, but without overspending them, thus enabling the user to have more money for on your day to day usage.

## How it works
Nordic Mirror was built as a prototype, using a Xbox One Kinect, a monitor with a two-way mirror film on it and a computer to run the program.

The Xbox is hooked to the computer and the input is captured in Processing using the [Kinect PV2 libary](https://github.com/ThomasLengeling/KinectPV2) in conjunction with the [Kinect SDK v2](https://www.microsoft.com/en-us/download/details.aspx?id=44561). 
The Script looks for the skeleton data on the depth map from the kinect, to track where the user hands are. Coordinates are then transmitted locally on the computer via Open Sound Control (OSC). If no hands or both hands are open, the transmission will still happen, but with the coordinates (0,0,0).

[Wekinator](http://www.wekinator.org/) was then used to capture the data from the OSC transmission, where we ran a project with 3 inputs, 1 output, type classifiers with 3 classes. This enabled us to use machine learning to try and interperate the hand coordinates that was transmitted from processing. This was kind of a crucial step, since this was shown at an interacive expo where people could try our project, so difference in variables was going to inevitable.

The Unity project is then responsible for delivering an excecutable program that recieves the Wekinator transmissions and tries to make meaning of them. It also was responsible for handling everything that needed to be drawn at the screen; the characters, text and animations. The Unity OSC part was based on another project, a link will be added when I find the correct project.

## Images
![@kevintonning](https://puu.sh/AqM9u/706a6bc516.png)