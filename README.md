# toy-robot-simulator
Toy Robot Simulator using AngularJS, Bootstrap

This is a simple project fully implemented using AngularJS, Bootstrap and Grunt has been used to provide a simple web server for testing. Of course, you can choose to put the files into your own server as you wish.

<b>Requirements to run:</b>

*Install Grunt*<br/>

<code>
npm install -g grunt-cli
</code>

You would need administrator / sudo privileges to install the grunt package.

As the grunt installation uses npm (Node Package Manager), you would need to first install node.js and npm which is available as a package from Node.js site. This readme assumes that you have those packages installed and running successfully.

<b>Running the server</b><br/>
Go the project root directory in terminal and execute the following command: <br/>
<code>
grunt web_server
</code>

If the server starts up successfully, you would see logs like:

<code>
Running "web_server:server" (web_server) task
Starting HTTP Server
  <li> Listening on port 8000
  <li> Cross-Origin Resource Sharing is on
  <li> Cache suppressor is on
  <li> Request logger is on
</code>

<b>App Usage</b><br/>
In your browser, type in the URL: <code>http://localhost:8000/index.html</code><br/>

You will be presented with a 5x5 grid with options to control the robot underneath the grid. 

_Initialize_<br/>
To start with, you first need to initialize the the robot. For this, you need to provide x axis, y axis and direction values in the input text box provided. 
For ex: <code>0,0,NORTH</code>
Until you initialize the robot, no other operations will be available.<br/>
Note: For the purposes of this application, 0,0 is located at the SOUTH WEST corner of the grid. All the unit positions are made relative to this position only.

_Move_<br/>
Moves the robot by 1 unit in the current facing direction. If the robot reaches the end of the grid, it will ignore any further MOVE requests until you change to a direction in which there is room to move.

_Left_<br/>
Rotates the robot facing direction by 90 degrees to the left. For ex. if the current facing direction is NORTH, performing a left operation would bring the facing direction to WEST.

_Right_<br/>
Rotates the robot facing direction by 90 degrees to the right. For ex. if the current facing direction is NORTH, performing a right operation would bring the facing direction to EAST.

_Report_<br/>
Reports the current X Axis, Y Axis position and the facing direction.

<b>Potential Further Improvements:</b><br>
I am new to AngularJS, so I may not have fully utilized the power of AngularJS. 

Following improvements can be made to the application:
<li>Improve the code to fully utilize the power of JS framework.
<li>Adding unit tests
<li>Automation






