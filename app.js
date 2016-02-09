Parties = new Mongo.Collection("parties");

if (Meteor.isClient){
	angular.module('socially', ['angular-meteor', 'ui.router'
		]);

	/*The PartiesListCtrl controller attaches the party data to the $scope 
	that was injected into our controller funtion. This controller scope is available to
	all bindings located within the div-ng controller="PartiesListCtrl"*/
	/*angular.module('socially').controller('PartiesListCtrl', function($scope, $reactive){
		$reactive(this).attach($scope);*/
	/*Declares a new $scope.parties variable so we don't need to do something like
	$scope.parties = []
	then it binds it to the Parties Mongo*/	

	angular.module('socially').directive('partiesList', function() {
		return {
			restrict: 'E',
			templateUrl: 'parties-list.html',
			controllerAs: 'partiesList',
			controller: function($scope, $reactive) {
				$reactive(this).attach($scope);
				
				this.newParty = {};

				this.helpers({
					parties: () => {
						return Parties.find({});
					}
				});
				/*Parties is a Mongo.Collection object, and the insert method inserts a new object
				to the collection and assign an id for the new object*/

				this.addParty = () => {
					Parties.insert(this.newParty);
					this.newParty = {};
				};

				this.removeParty = (party) => {
					Parties.remove({_id: party._id})
				}
			}
		}
	});
}


