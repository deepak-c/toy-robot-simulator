angular
    .module('toyRobot', ['smart-table', 'ngMessages'])
    
    // Constants configuration
    .constant("config", {
        ROWS : "5",
        COLS : "5"
    })
        
    .controller('robotController', ['$scope', 'config', function($scope, config) {

        // Controlling the text on initialize/set button 
        $scope.initBtnLabel = "Initialize";
        
        // Bind variable for receiving PLACE command values
        $scope.placeCommand = null;
        
        // Tracker flag to check if the robot has been initialized
        $scope.isInitialized = false;
        
        // List of error messasges
        $scope.errorMessages = [];
        
        // List of info messages
        $scope.infoMessages = [];        
        
        // Base collection to initialize the grid with the robot hidden in all locations. Setting the val to "false" will   
        // show the robot in that position
        $scope.myData = [
                            {row:[{val: true}, {val: true},{val: true}, {val: true}, {val: true}]},
                            {row:[{val: true}, {val: true},{val: true}, {val: true}, {val: true}]},
                            {row:[{val: true}, {val: true},{val: true}, {val: true}, {val: true}]},
                            {row:[{val: true}, {val: true},{val: true}, {val: true}, {val: true}]},
                            {row:[{val: true}, {val: true},{val: true}, {val: true}, {val: true}]}
                        ];  
        // View collection for the smart-table
        $scope.displayedCollection = [].concat($scope.myData);
        
        var _noOfRows = config.ROWS;
        var _noOfCols = config.COLS;        
        var _xPos = null;
        var _yPos = null;
        var _direction = null;        
        
        // Initialize / Set function to place the robot in the specified position
        $scope.initialize = function() {
            _clearMessages();
            if ($scope.placeCommand == null) {                
                $scope.errorMessages.push("commandCannotBeEmpty");                
                return;
            }            
                
            var commandParams = $scope.placeCommand.split(",");
            var xPosVal = commandParams[0];
            var yPosVal = commandParams[1];
            var direction = commandParams[2].toUpperCase();

            _validateMove(xPosVal, yPosVal, direction);

            if ($scope.errorMessages.length == 0) {
                _placeRobot(xPosVal, yPosVal, direction);
            }            
        }
        
        // Move the robot by 1 unit in the current facing direction        
        $scope.moveRobot = function() {
            
            _clearMessages();
            
            var newXPos = null;
            var newYPos = null;
            
            var currentXPos = parseInt((_noOfRows-1) - _xPos);
            var currentYPos = parseInt(_yPos);
            
            switch(_direction) {
                case "NORTH": 
                    newXPos = currentXPos + 1;
                    newYPos = currentYPos;
                    break;
                case "SOUTH":
                    newXPos = currentXPos - 1;
                    newYPos = currentYPos;
                    break;
                case "EAST":
                    newXPos = currentXPos;
                    newYPos = currentYPos + 1;
                    break;
                case "WEST":
                    newXPos = currentXPos;
                    newYPos = currentYPos - 1;
                    break;
                default:
                    newXPos = currentXPos;
                    newYPos = currentYPos;
                    break;                
            }
                      
            //Always validate the new position value before actually moving the robot
            _validateMove(newXPos, newYPos, _direction);

            if ($scope.errorMessages.length == 0) {
                _placeRobot(newXPos, newYPos, _direction);
            }                    
        }
        
        // Rotate the robot facing direction by 90 degrees in the given direction
        $scope.rotate = function(rotateDir) {
            
            _clearMessages();
            
            if (rotateDir === "LEFT") {
                switch (_direction) {
                    case "NORTH":
                        _direction = "WEST";
                        break;
                    case "SOUTH":
                        _direction = "EAST";
                        break;
                    case "EAST":
                        _direction = "NORTH";
                        break;
                    case "WEST":
                        _direction = "SOUTH";
                        break;
                    default:
                        break;
                }
            } else if (rotateDir === "RIGHT") {
                switch (_direction) {
                    case "NORTH":
                        _direction = "EAST";
                        break;
                    case "SOUTH":
                        _direction = "WEST";
                        break;
                    case "EAST":
                        _direction = "SOUTH";
                        break;
                    case "WEST":
                        _direction = "NORTH";
                        break;
                    default:
                        break;
                }
            }
        }
        
        // Report the current position to the user
        $scope.report = function() {
            _clearMessages();
            $scope.infoMessages.push((_noOfRows-1) - _xPos + ", " + _yPos + ", " + _direction);
        }
        
        // Validation Method to check if the proposed move is legit
        function _validateMove(xPos, yPos, direction) {
            _validateX(xPos);
            _validateY(yPos);
            _validateDirection(direction);
        }
        
        // Validate if the xAxis value is in range
        function _validateX(xPos) {
            if (xPos == null ) {
                $scope.errorMessages.push("xPosNotNull");
                return;
            }
            
            if (isNaN(xPos*1) || xPos < 0 || xPos > 4) {
                $scope.errorMessages.push("xPosNotInRange");
                return;
            }
        }
        
        // Validate if the yAxis value is in range
        function _validateY(yPos) {
            if (yPos == null ) {
                $scope.errorMessages.push("yPosNotNull");
                return;
            }
            
            if (isNaN(yPos*1) || yPos < 0 || yPos > 4) {
                $scope.errorMessages.push("yPosNotInRange");
                return;
            }
        }
        
        // Validate if the direction is in allowed set ('EAST', 'WEST', 'NORTH', 'SOUTH')
        function _validateDirection(direction) {
            if (direction == null ) {
                $scope.errorMessages.push("directionNotNull");
                return;
            }
            
            switch(direction) {
                case "EAST": case "WEST": case "NORTH": case "SOUTH": 
                    break;
                default:
                    $scope.errorMessages.push("directionNotValid");
                    return;
            }
        }
        
        // Clear all the messages
        function _clearMessages() {
            $scope.errorMessages = [];
            $scope.infoMessages = [];
        }
        
        // Moves the robot to the specified position. This should be the final step always, after doing all validations
        function _placeRobot(xPos, yPos, direction) {
            setTimeout(function(){
                $scope.$apply(function() {                    
                    var _actualXPos = ((_noOfRows-1) - xPos);
                    var _actualYPos = yPos;
                    var data = angular.copy($scope.myData);
                    
                    if (_xPos != null && _yPos != null) {                        
                        data[_xPos].row[_yPos].val = true;                        
                    }
                    console.log(_actualXPos + ", " + _actualYPos);
                    data[_actualXPos].row[_actualYPos].val = false;                    
                    $scope.myData = data;

                    _xPos = _actualXPos;
                    _yPos = _actualYPos;
                    _direction = direction;
                    $scope.isInitialized = true;
                    $scope.initBtnLabel = "Set";
                });
            }, 200);
        }
    }]);