angular.module('app').value('toastr', toastr); 

angular.module('app').factory('notifier', function(toastr){
    return{
        notify: function(msg){
            toastr.success(msg);
            console.log(msg);
        }
    }
})