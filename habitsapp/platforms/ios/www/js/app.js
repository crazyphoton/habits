angular.module('todo', ['ionic'])
/**
 * The Friends factory handles saving and loading friends
 * from local storage, and also lets us save and load the
 * last active friend index.
 */
.factory('Friends', function() {
  return {
    all: function() {
      var friendString = window.localStorage['friends'];
      if(friendString) {
        return angular.fromJson(friendString);
      }
      return [];
    },
    save: function(friends) {
      window.localStorage['friends'] = angular.toJson(friends);
    },
    newFriend: function(friendName) {
      // Add a new friend
      return {
        name: friendName,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveFriend']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveFriend'] = index;
    }
  }
})

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Friends) {

  // A utility function for creating a new friendName with the given friendName
  var createFriend = function(friendName) {
    var newFriend = Friends.newFriend(friendName);
    $scope.friends.push(newFriend);
    Friends.save($scope.friends);
    $scope.selectFriend(newFriend, $scope.friends.length-1);
  }


  // Load or initialize friends
  $scope.friends = Friends.all();

  // Grab the last active, or the first friend
  $scope.activeFriend = $scope.friends[Friends.getLastActiveIndex()];

  // Called to create a new friend
  $scope.newFriend = function() {
    var friendName = prompt('Friend name');
    if(friendName) {
      createFriend(friendName);
    }
  };

  // Called to select the given friend
  $scope.selectFriend = function(friend, index) {
    $scope.activeFriend = friend;
    Friends.setLastActiveIndex(index);
    $scope.sideMenuController.close();
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeFriend) {
      return;
    }
    $scope.activeFriend.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the friends
    Friends.save($scope.friends);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleFriends = function() {
    $scope.sideMenuController.toggleLeft();
  };


  // Try to create the first friend, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.friends.length == 0) {
      while(true) {
        var name = prompt('Your name:');
        if(name) {
          createFriend(name);
          break;
        }
      }
    }
  });

});
